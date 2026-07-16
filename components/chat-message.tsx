// components/chat-message.tsx
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'data';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950">
          <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
          isUser
            ? 'bg-indigo-600 text-white rounded-tr-none'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 rounded-tl-none'
        }`}
      >
        {content}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}