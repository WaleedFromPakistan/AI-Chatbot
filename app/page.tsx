import { ChatContainer } from "@/components/chat-container";
import { Bot } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* App Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white dark:bg-indigo-500">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              AI Assistant
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Llama 3.3 • Supabase Powered
            </p>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="flex-1 overflow-hidden bg-white dark:bg-zinc-900 max-w-4xl w-full mx-auto md:shadow-sm md:border-x md:border-zinc-200 dark:md:border-zinc-800 p-4">
        <ChatContainer />
      </main>
    </div>
  );
}