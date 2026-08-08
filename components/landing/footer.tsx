import Link from "next/link";
import styles from "@/app/landing.module.css";

export function Footer() {
  return (
    <footer className={styles.secpad} style={{ padding: "52px 40px 40px", background: "#fff", borderTop: "1px solid #F4ECE5" }}>
      <div className={styles.foot} style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#FF7A3C,#E85818)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <i className="ph-fill ph-chat-teardrop-dots" style={{ fontSize: 15 }} />
          </span>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-.02em" }}>
            Softlex<span style={{ color: "#FF6B2C" }}>AI</span>
          </span>
        </a>
        <div style={{ display: "flex", gap: 28, fontSize: 14, color: "#6E645C", flexWrap: "wrap" }}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <Link href="/auth">Sign in</Link>
        </div>
        <span style={{ fontSize: 13.5, color: "#9A9088" }}>© 2026 SoftlexAI. All rights reserved.</span>
      </div>
    </footer>
  );
}
