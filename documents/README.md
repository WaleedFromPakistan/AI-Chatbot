Drop PDF files in this folder, then run:

```
npm run ingest
```

This is a fully local pipeline (no Supabase, no external APIs, nothing to
install or run separately). It reads every `.pdf` in this folder, splits it
into overlapping chunks with LangChain's `RecursiveCharacterTextSplitter`,
embeds each chunk in-process via transformers.js (Xenova/all-MiniLM-L6-v2 —
weights download once on first run and are cached on disk), and stores the
result in `vectorstore/store.json` (a LangChain `MemoryVectorStore` dump,
loaded back into memory on each chat request).

Re-running the command rebuilds the whole store if *any* file in this
folder was added, changed, or removed since the last run (tracked by
content hash in `vectorstore/manifest.json`); if nothing changed, it's a
no-op.

The chat API (`app/api/chat/route.ts`) retrieves the most relevant chunks
for each user message from `vectorstore/store.json` and includes them as
context for the model. Chat/conversation history is unaffected by any of
this and still goes through Supabase as before.
