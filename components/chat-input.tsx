// components/chat-input.tsx
'use client';

import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export function ChatInput({ 
  input = '', 
  handleInputChange, 
  handleSubmit, 
  isLoading = false 
}: ChatInputProps) {
  // Guaranteed fallbacks prevent ANY crash on pre-render or hydration
  const safeInput = input || '';
  const safeOnChange = handleInputChange || (() => {});
  const safeOnSubmit = handleSubmit || ((e) => e.preventDefault());

  return (
    <form onSubmit={safeOnSubmit} className="flex gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-4 bg-white dark:bg-zinc-900">
      <input
        value={safeInput}
        onChange={safeOnChange}
        disabled={isLoading}
        placeholder={isLoading ? 'Thinking...' : 'Ask me anything...'}
        className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !safeInput.trim()}
        className="flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-white hover:bg-indigo-700 transition active:scale-95 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:scale-100 disabled:text-zinc-400"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}