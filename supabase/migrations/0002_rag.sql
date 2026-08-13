-- RAG (retrieval-augmented generation) support for the SoftlexAI chatbot.
-- Adds a pgvector-backed store so /api/chat can ground answers in files
-- ingested from the local `documents/` folder via `npm run ingest`.
-- Uses LangChain.js's SupabaseVectorStore, which expects a table with
-- (id, content, metadata, embedding) columns and a `match_<table>` RPC
-- taking (query_embedding, match_count, filter).
-- Run this in the Supabase SQL editor (or via `supabase db push`) after
-- 0001_conversations.sql.

create extension if not exists vector;

-- One row per source file ingested from the documents/ folder, used by
-- scripts/ingest.ts to skip re-ingesting unchanged files.
create table if not exists public.rag_sources (
  id uuid primary key default gen_random_uuid(),
  file_name text not null unique,
  file_hash text not null,
  chunk_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.rag_sources enable row level security;

-- Chunk + embedding store consumed directly by @langchain/community's
-- SupabaseVectorStore. Embedding dimension (768) matches Ollama's
-- `nomic-embed-text` model used by lib/rag.ts and scripts/ingest.ts.
-- Each row's metadata includes { source_id, source: <file name>, ... }.
create table if not exists public.rag_chunks (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb not null default '{}',
  embedding vector(768)
);

create index if not exists rag_chunks_embedding_idx
  on public.rag_chunks using hnsw (embedding vector_cosine_ops);

create index if not exists rag_chunks_source_id_idx
  on public.rag_chunks (((metadata ->> 'source_id')));

alter table public.rag_chunks enable row level security;

-- No RLS policies are defined: like conversations/chat_messages, this app
-- only talks to Supabase from server-side code using the service role key,
-- which bypasses RLS. RLS is enabled with zero policies so the anon key
-- (if ever exposed to the client) gets no access by default.

-- Similarity search RPC required by SupabaseVectorStore (queryName:
-- "match_rag_chunks" in lib/rag.ts / scripts/ingest.ts).
create or replace function public.match_rag_chunks(
  query_embedding vector(768),
  match_count int default 5,
  filter jsonb default '{}'
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
stable
as $$
begin
  return query
  select
    rag_chunks.id,
    rag_chunks.content,
    rag_chunks.metadata,
    1 - (rag_chunks.embedding <=> query_embedding) as similarity
  from public.rag_chunks
  where rag_chunks.metadata @> filter
  order by rag_chunks.embedding <=> query_embedding
  limit match_count;
end;
$$;
