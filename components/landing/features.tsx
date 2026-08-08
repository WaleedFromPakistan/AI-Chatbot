import styles from "@/app/landing.module.css";

const features = [
  { icon: "ph-lightning", title: "Instant answers", body: "Real-time reasoning gives you accurate, sourced responses in seconds — not paragraphs of fluff." },
  { icon: "ph-file-text", title: "Understands your files", body: "Drop in a PDF, spreadsheet, or image. SoftlexAI reads it, summarizes it, and answers questions about it." },
  { icon: "ph-pen-nib", title: "Writes like you", body: "Emails, docs, code, posts. Set the tone once and get drafts that sound like they came from you." },
  { icon: "ph-translate", title: "Speaks 40+ languages", body: "Translate, localize, and converse fluently across languages — context and nuance intact." },
  { icon: "ph-clock-counter-clockwise", title: "Remembers context", body: "Every chat is saved and searchable. Pick up any conversation exactly where you left off." },
  { icon: "ph-shield-check", title: "Private by design", body: "Your conversations are encrypted and never used to train models without your explicit consent." },
];

export function Features() {
  return (
    <section id="features" className={styles.secpad} style={{ padding: "96px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 640 }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>Features</span>
          <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 0" }}>
            Everything you need in one conversation
          </h2>
          <p style={{ fontSize: 18, color: "#5B524B", margin: "16px 0 0" }}>
            Powerful on its own, seamless together. SoftlexAI handles the heavy lifting so you can focus on the thinking.
          </p>
        </div>
        <div className={styles.grid3} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 52 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "#FFFBF8", border: "1px solid #F1E7DF", borderRadius: 16, padding: 26 }}>
              <span style={{ display: "flex", width: 46, height: 46, borderRadius: 12, background: "#FFF1EA", color: "#E85818", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                <i className={`ph-fill ${f.icon}`} />
              </span>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: "18px 0 8px", letterSpacing: "-.01em" }}>{f.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#6E645C" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
