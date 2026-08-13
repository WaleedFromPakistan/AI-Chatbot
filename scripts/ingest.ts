// scripts/ingest.ts
// Run with `npm run ingest`. Reads every PDF in documents/, splits it with
// LangChain's RecursiveCharacterTextSplitter, embeds each chunk in-process
// via transformers.js, and rebuilds the local vector store at
// vectorstore/store.json. Fully local: no Supabase, no external APIs,
// nothing to install or run separately.
// Skips the rebuild entirely if no document changed since the last run
// (tracked via vectorstore/manifest.json, keyed by content hash).
import { existsSync, readdirSync, readFileSync } from "node:fs";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.resolve(process.cwd(), file);
    if (existsSync(p)) {
      process.loadEnvFile(p);
    }
  }
}

type Manifest = Record<string, string>;

async function readManifest(manifestPath: string): Promise<Manifest> {
  try {
    return JSON.parse(await fs.readFile(manifestPath, "utf-8")) as Manifest;
  } catch {
    return {};
  }
}

function manifestsMatch(a: Manifest, b: Manifest): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => a[key] === b[key]);
}

async function main() {
  loadEnv();

  const { getEmbeddings, saveVectorStore, VECTOR_STORE_DIR, EMBEDDING_MODEL } = await import("../lib/rag");
  const { MemoryVectorStore } = await import("@langchain/classic/vectorstores/memory");
  const { PDFLoader } = await import("@langchain/community/document_loaders/fs/pdf");
  const { RecursiveCharacterTextSplitter } = await import("@langchain/textsplitters");

  const docsDir = path.resolve(process.cwd(), "documents");
  if (!existsSync(docsDir)) {
    console.error(`No documents/ folder found at ${docsDir}`);
    process.exit(1);
  }

  const files = readdirSync(docsDir).filter((f) => f.toLowerCase().endsWith(".pdf"));
  if (files.length === 0) {
    console.log("No PDF files found in documents/. Add some and re-run `npm run ingest`.");
    return;
  }

  const manifestPath = path.join(VECTOR_STORE_DIR, "manifest.json");
  const previousManifest = await readManifest(manifestPath);
  const currentManifest: Manifest = {};
  for (const fileName of files) {
    const buffer = readFileSync(path.join(docsDir, fileName));
    currentManifest[fileName] = createHash("sha256").update(buffer).digest("hex");
  }

  if (manifestsMatch(previousManifest, currentManifest)) {
    console.log("No changes in documents/ since last ingest. Nothing to do.");
    return;
  }

  console.log(`Embedding via local model "${EMBEDDING_MODEL}"`);
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 150 });
  const store = new MemoryVectorStore(getEmbeddings());

  for (const fileName of files) {
    console.log(`Processing ${fileName}...`);
    const pages = await new PDFLoader(path.join(docsDir, fileName)).load();
    const docs = await splitter.splitDocuments(pages);

    if (docs.length === 0) {
      console.warn(`  No extractable text in ${fileName}, skipping.`);
      continue;
    }

    for (const doc of docs) {
      doc.metadata = { ...doc.metadata, source: fileName };
    }

    console.log(`  Embedding ${docs.length} chunk(s)...`);
    await store.addDocuments(docs);
  }

  await saveVectorStore(store);
  await fs.mkdir(VECTOR_STORE_DIR, { recursive: true });
  await fs.writeFile(manifestPath, JSON.stringify(currentManifest, null, 2), "utf-8");

  console.log(`Ingestion complete. ${store.memoryVectors.length} chunk(s) stored in ${VECTOR_STORE_DIR}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
