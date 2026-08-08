import Link from "next/link";
import styles from "@/app/landing.module.css";

export function Nav() {
  return (
    <nav
      className={styles.lnav}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        background: "rgba(255,255,255,.82)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #F1E9E2",
      }}
    >
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: "linear-gradient(135deg,#FF7A3C,#E85818)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(232,88,24,.35)",
          }}
        >
          <i className="ph-fill ph-chat-teardrop-dots" style={{ fontSize: 17 }} />
        </span>
        <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-.02em" }}>
          Softlex<span style={{ color: "#FF6B2C" }}>AI</span>
        </span>
      </a>
      <div className={styles.navlinks} style={{ display: "flex", alignItems: "center", gap: 34 }}>
        <a href="#features" style={{ fontSize: 14.5, fontWeight: 500, color: "#5B524B" }}>Features</a>
        <a href="#how" style={{ fontSize: 14.5, fontWeight: 500, color: "#5B524B" }}>How it works</a>
        <a href="#pricing" style={{ fontSize: 14.5, fontWeight: 500, color: "#5B524B" }}>Pricing</a>
        <a href="#faq" style={{ fontSize: 14.5, fontWeight: 500, color: "#5B524B" }}>FAQ</a>
      </div>
      <div className={styles.navcta} style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/auth" style={{ fontSize: 14.5, fontWeight: 600, color: "#1B1714", padding: "9px 4px" }}>
          Sign in
        </Link>
        <Link
          href="/auth#signup"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 14.5,
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg,#FF7A3C,#E85818)",
            padding: "10px 18px",
            borderRadius: 10,
            boxShadow: "0 6px 16px rgba(232,88,24,.28)",
          }}
        >
          Sign up <i className="ph-bold ph-arrow-right" style={{ fontSize: 14 }} />
        </Link>
      </div>
    </nav>
  );
}
