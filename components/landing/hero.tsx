import Link from "next/link";
import styles from "@/app/landing.module.css";

export function Hero() {
  return (
    <header
      id="top"
      className={styles.heroPad}
      style={{
        position: "relative",
        padding: "84px 40px 90px",
        background: "radial-gradient(120% 90% at 85% -10%,#FFEEE2 0%,#FFFFFF 55%)",
      }}
    >
      <div
        className={styles.herogrid}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "#B8420F",
              background: "#FFF1EA",
              border: "1px solid #FFDCC7",
              padding: "7px 13px",
              borderRadius: 999,
            }}
          >
            <i className="ph-fill ph-sparkle" style={{ fontSize: 14 }} />
            Now with real-time reasoning
          </span>
          <h1
            className={styles.heroh1}
            style={{
              fontSize: 60,
              lineHeight: 1.04,
              letterSpacing: "-.03em",
              fontWeight: 800,
              margin: "22px 0 0",
            }}
          >
            The AI that actually <span style={{ color: "#FF6B2C" }}>gets things done.</span>
          </h1>
          <p
            className={styles.herop}
            style={{ fontSize: 19, lineHeight: 1.55, color: "#5B524B", margin: "22px 0 0", maxWidth: 520 }}
          >
            SoftlexAI is your always-on assistant for work and life — answer anything, draft anything,
            understand your files, and move faster. One clean conversation, endless capability.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <Link
              href="/chat"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                background: "linear-gradient(135deg,#FF7A3C,#E85818)",
                padding: "15px 26px",
                borderRadius: 12,
                boxShadow: "0 10px 24px rgba(232,88,24,.32)",
              }}
            >
              Start chatting free <i className="ph-bold ph-arrow-right" />
            </Link>
            <a
              href="#how"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontSize: 16,
                fontWeight: 600,
                color: "#1B1714",
                background: "#fff",
                border: "1.5px solid #EBE1D9",
                padding: "15px 24px",
                borderRadius: 12,
              }}
            >
              See how it works
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 26, fontSize: 14, color: "#7A716A" }}>
            <div style={{ display: "flex" }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#FFB98F", border: "2px solid #fff" }} />
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#FF8A57", border: "2px solid #fff", marginLeft: -9 }} />
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#E85818", border: "2px solid #fff", marginLeft: -9 }} />
            </div>
            <span>Trusted by <strong style={{ color: "#1B1714" }}>120,000+</strong> people worldwide</span>
          </div>
        </div>

        {/* HERO CHAT MOCKUP */}
        <div style={{ position: "relative" }}>
          <div
            className={styles.animGlow}
            style={{
              position: "absolute",
              inset: "-10% -6% -6% -4%",
              background: "radial-gradient(closest-side,rgba(255,107,44,.22),transparent)",
              filter: "blur(30px)",
            }}
          />
          <div
            style={{
              position: "relative",
              background: "#fff",
              border: "1px solid #F0E7DF",
              borderRadius: 20,
              boxShadow: "0 30px 60px -20px rgba(90,50,20,.22)",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderBottom: "1px solid #F4ECE5" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFCBB4" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFE0CE" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F1E9E2" }} />
              <span style={{ marginLeft: 8, fontSize: 13, fontWeight: 600, color: "#8A807A" }}>SoftlexAI</span>
            </div>
            <div style={{ padding: "22px 20px", display: "flex", flexDirection: "column", gap: 16, background: "#FFFDFC" }}>
              <div
                className={styles.animFloatUp}
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "78%",
                  background: "linear-gradient(135deg,#FF7A3C,#E85818)",
                  color: "#fff",
                  padding: "12px 15px",
                  borderRadius: "14px 14px 4px 14px",
                  fontSize: 14.5,
                }}
              >
                Plan a 3-day trip to Lisbon on a mid budget.
              </div>
              <div
                className={styles.animFloatUp}
                style={{ animationDelay: ".35s", alignSelf: "flex-start", maxWidth: "86%", display: "flex", gap: 10 }}
              >
                <span
                  style={{
                    flex: "none",
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "#FFF1EA",
                    color: "#E85818",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="ph-fill ph-sparkle" style={{ fontSize: 14 }} />
                </span>
                <div style={{ background: "#fff", border: "1px solid #F0E7DF", padding: "12px 15px", borderRadius: "14px 14px 14px 4px", fontSize: 14.5, color: "#2A2420" }}>
                  Here&apos;s a balanced plan. <strong>Day 1</strong> — Alfama &amp; the São Jorge castle at
                  sunset. <strong>Day 2</strong> — Belém pastries, then Sintra. <strong>Day 3</strong>…
                  <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
                    <span className={styles.animDot} style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF8A57" }} />
                    <span className={styles.animDot} style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF8A57", animationDelay: ".2s" }} />
                    <span className={styles.animDot} style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF8A57", animationDelay: ".4s" }} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 16px 16px", padding: "11px 14px", background: "#fff", border: "1.5px solid #EEE4DC", borderRadius: 14 }}>
              <span style={{ flex: 1, fontSize: 14, color: "#B4A99F" }}>
                Ask SoftlexAI anything…
                <span className={styles.animBlink} style={{ display: "inline-block", width: 1.5, height: 15, background: "#FF6B2C", marginLeft: 2, verticalAlign: "middle" }} />
              </span>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#FF7A3C,#E85818)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="ph-fill ph-paper-plane-right" style={{ fontSize: 15 }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
