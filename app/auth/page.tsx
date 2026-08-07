import type { Metadata } from "next";
import { AuthView } from "./auth-view";

export const metadata: Metadata = {
  title: "Sign in — SoftlexAI",
  description: "Sign in or create your SoftlexAI account.",
};

export default function AuthPage() {
  return <AuthView />;
}
