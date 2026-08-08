import Link from "next/link";
import styles from "@/app/landing.module.css";

export function FinalCta() {
  return (
    <section className={styles.secpad} style={{ padding: 40 }}>
      <div className={styles.ctabox} style={{ maxWidth: 1180, margin: "0 auto", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#FF7A3C,#E85818)", borderRadius: 28, padding: "72px 48px", textAlign: "center", color: "#fff" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-8%", width: 340, height: 340, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
        <div style={{ position: "absolute", bottom: "-50%", left: "-6%", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,.10)" }} />
        <div style={{ position: "relative" }}>
          <h2 className={styles.ctah2} style={{ fontSize: 46, lineHeight: 1.08, letterSpacing: "-.03em", fontWeight: 800 }}>
            Ready to talk to the smartest AI?
          </h2>
          <p style={{ fontSize: 19, opacity: 0.94, margin: "18px auto 0", maxWidth: 520 }}>
            Join 120,000+ people getting more done with SoftlexAI. Free to start, no credit card required.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            <Link href="/chat" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 16, fontWeight: 700, color: "#E85818", background: "#fff", padding: "15px 28px", borderRadius: 12, boxShadow: "0 12px 26px rgba(0,0,0,.16)" }}>
              Start chatting free <i className="ph-bold ph-arrow-right" />
            </Link>
            <a href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 16, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,.16)", border: "1.5px solid rgba(255,255,255,.4)", padding: "15px 26px", borderRadius: 12 }}>
              View pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
