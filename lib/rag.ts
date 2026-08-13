// lib/rag.ts
// Retrieval side of the RAG pipeline, built on LangChain.js, fully local:
// - Embeddings: transformers.js running in-process (Xenova/all-MiniLM-L6-v2)
//   — no API key, no external service, no separate install (just the npm
//   package; the model weights download once and are cached on disk).
// - Vector store: LangChain's MemoryVectorStore (pure JS, brute-force
//   cosine similarity — no native deps, so it needs no build toolchain).
//   Persisted to a JSON file on disk so it survives server restarts.
// scripts/ingest.ts writes vectorstore/store.json; this file reads it.
import fs from "node:fs/promises";
import path from "node:path";
import { pipeline, type FeatureExtractionPipeline } from "@xenova/transformers";
import { Embeddings, type EmbeddingsParams } from "@langchain/core/embeddings";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";

export const EMBEDDING_MODEL = "Xenova/all-MiniLM-L6-v2";

export const VECTOR_STORE_DIR = path.join(process.cwd(), "vectorstore");
const VECTOR_STORE_FILE = path.join(VECTOR_STORE_DIR, "store.json");
const MIN_SIMILARITY = 0.3;

interface StoredVector {
  content: string;
  embedding: number[];
  metadata: Record<string, unknown>;
}

let embedderPromise: Promise<FeatureExtractionPipeline> | null = null;

function getEmbedder(): Promise<FeatureExtractionPipeline> {
  if (!embedderPromise) {
    embedderPromise = pipeline("feature-extraction", EMBEDDING_MODEL) as Promise<FeatureExtractionPipeline>;
  }
  return embedderPromise;
}

class LocalEmbeddings extends Embeddings {
  constructor(params: EmbeddingsParams = {}) {
    super(params);
  }

  async embedQuery(text: string): Promise<number[]> {
    const embedder = await getEmbedder();
    const output = await embedder(text, { pooling: "mean", normalize: true });
    return Array.from(output.data as Float32Array);
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const embedder = await getEmbedder();
    const vectors: number[][] = [];
    for (const text of texts) {
      const output = await embedder(text, { pooling: "mean", normalize: true });
      vectors.push(Array.from(output.data as Float32Array));
    }
    return vectors;
  }
}

export function getEmbeddings(): LocalEmbeddings {
  return new LocalEmbeddings();
}

export async function loadVectorStore(embeddings: LocalEmbeddings = getEmbeddings()): Promise<MemoryVectorStore> {
  const store = await MemoryVectorStore.fromExistingIndex(embeddings);
  try {
    const raw = await fs.readFile(VECTOR_STORE_FILE, "utf-8");
    store.memoryVectors = JSON.parse(raw) as (typeof store.memoryVectors);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  return store;
}

export async function saveVectorStore(store: MemoryVectorStore): Promise<void> {
  await fs.mkdir(VECTOR_STORE_DIR, { recursive: true });
  const vectors: StoredVector[] = store.memoryVectors.map(({ content, embedding, metadata }) => ({
    content,
    embedding,
    metadata,
  }));
  await fs.writeFile(VECTOR_STORE_FILE, JSON.stringify(vectors), "utf-8");
}

export interface RetrievedChunk {
  content: string;
  fileName: string;
  similarity: number;
}

export async function retrieveContext(query: string, matchCount = 5): Promise<RetrievedChunk[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const store = await loadVectorStore();
    if (store.memoryVectors.length === 0) return [];

    const results = await store.similaritySearchWithScore(trimmed, matchCount);
    return results
      .filter(([, score]) => score >= MIN_SIMILARITY)
      .map(([doc, score]) => ({
        content: doc.pageContent,
        fileName: (doc.metadata?.source as string) ?? "unknown",
        similarity: score,
      }));
  } catch (error) {
    console.error("RAG retrieval failed:", error);
    return [];
  }
}

export function buildContextBlock(chunks: RetrievedChunk[]): string | null {
  if (chunks.length === 0) return null;

  const sections = chunks.map((chunk, i) => `[${i + 1}] (from ${chunk.fileName})\n${chunk.content}`);

  return [
    "You have access to the following excerpts from the user's documents.",
    "Use them to answer the question when relevant, and cite sources by their file name.",
    "If the excerpts don't contain the answer, say so and answer from general knowledge instead.",
    "",
    sections.join("\n\n"),
  ].join("\n");
}
