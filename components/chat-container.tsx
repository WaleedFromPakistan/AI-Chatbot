
// components/chat-container.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';

export function ChatContainer() {
  const [mounted, setMounted] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Generates session ID and signals that we have successfully mounted on the client
  useEffect(() => {
    setMounted(true);
    let storedSession = localStorage.getItem('chat_session_id');
    if (!storedSession) {
      storedSession = crypto.randomUUID();
      localStorage.setItem('chat_session_id', storedSession);
    }
    setSessionId(storedSession);
  }, []);

  const { 
    messages = [], 
    input = '', 
    handleInputChange, 
    handleSubmit,
  } = useChat({
    api: '/api/chat',
    body: { sessionId },
  });

  // Always scroll smoothly to the newest message
  useEffect(() => {
    if (mounted) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, mounted]);

  // 2. Render a non-interactive placeholder during Server-Side Rendering (SSR)
  if (!mounted) {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-zinc-400 animate-pulse">Initializing assistant...</span>
        </div>
        <div className="mt-2">
          <div className="flex gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-4 bg-white dark:bg-zinc-900">
            <input
              disabled
              placeholder="Loading..."
              className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm text-zinc-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // 3. Render the fully active, hydrated chat interface on the client
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              Welcome to your Assistant!
            </h2>
            <p className="text-xs text-zinc-400 max-w-xs mt-1">
              Start typing below to test the connection to your free OpenRouter API and Supabase backend.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))
        )}

        {/* Loading Indicator */}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex items-center gap-2 text-zinc-400">
            <div className="h-8 w-8 rounded-full bg-zinc-50 dark:bg-zinc-800 animate-pulse" />
            <span className="text-xs animate-pulse">Typing...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Message Input Box */}
      <div className="mt-2">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}