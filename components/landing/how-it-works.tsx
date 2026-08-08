import styles from "@/app/landing.module.css";

const steps = [
  { num: "01", icon: "ph-chat-circle-text", title: "Ask anything", body: "Type a question or paste your task into the prompt bar. No setup, no prompt engineering required." },
  { num: "02", icon: "ph-brain", title: "Watch it reason", body: "SoftlexAI thinks step by step, pulls in your files and context, and streams a clear answer back." },
  { num: "03", icon: "ph-rocket-launch", title: "Take action", body: "Refine, copy, or export. Continue the thread anytime — every conversation is saved automatically." },
];

export function HowItWorks() {
  return (
    <section id="how" className={styles.secpad} style={{ padding: "96px 40px", background: "linear-gradient(180deg,#FFF8F3,#FFFFFF)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>How it works</span>
          <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 0" }}>
            Up and running in seconds
          </h2>
        </div>
        <div className={styles.grid3} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 56 }}>
          {steps.map((s) => (
            <div key={s.num} style={{ position: "relative", background: "#fff", border: "1px solid #F1E7DF", borderRadius: 18, padding: "30px 26px" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#FF6B2C" }}>{s.num}</span>
              <span style={{ display: "flex", width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#FF7A3C,#E85818)", color: "#fff", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "14px 0 16px", boxShadow: "0 8px 18px rgba(232,88,24,.28)" }}>
                <i className={`ph-fill ${s.icon}`} />
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#6E645C" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
