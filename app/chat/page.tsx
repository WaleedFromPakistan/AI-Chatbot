import type { Metadata } from "next";
import { ChatView } from "./chat-view";

export const metadata: Metadata = {
  title: "Chat — SoftlexAI",
  description: "Chat with SoftlexAI.",
};

export default function ChatPage() {
  return <ChatView />;
}
