-- Multi-conversation chat history for the SoftlexAI chat UI.
-- Run this in the Supabase SQL editor (or via `supabase db push`) before the
-- new /chat page and /api/conversations routes are used.

create extension if not exists pgcrypto;

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  title text not null default 'New chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists conversations_session_id_updated_at_idx
  on public.conversations (session_id, updated_at desc);

alter table public.conversations enable row level security;

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  conversation_id uuid references public.conversations(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- Guards the case where chat_messages already existed (from an earlier,
-- session-only version of this app) without a conversation_id column.
alter table public.chat_messages
  add column if not exists conversation_id uuid references public.conversations(id) on delete cascade;

create index if not exists chat_messages_conversation_id_idx
  on public.chat_messages (conversation_id, created_at);

alter table public.chat_messages enable row level security;

-- No policies are defined: this app talks to Supabase only from server-side
-- API routes using the service role key, which bypasses RLS. RLS is enabled
-- with zero policies so the anon key (if ever exposed to the client) gets no
-- access by default.
