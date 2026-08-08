import styles from "@/app/landing.module.css";

const useCases = [
  { icon: "ph-briefcase", title: "Work & productivity", body: "Draft emails, summarize meetings, build spreadsheets, and prep for that presentation in minutes." },
  { icon: "ph-code", title: "Code & build", body: "Write, debug, and explain code across languages. Ship features and fix bugs with a pair beside you." },
  { icon: "ph-graduation-cap", title: "Learn & research", body: "Break down hard topics, study for exams, and get answers you can actually trust and verify." },
  { icon: "ph-palette", title: "Create & brainstorm", body: "Generate ideas, outlines, campaigns, and stories. Turn a blank page into a first draft instantly." },
];

export function UseCases() {
  return (
    <section className={styles.secpad} style={{ padding: "96px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 640 }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>Use cases</span>
          <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 0" }}>
            One assistant, every kind of work
          </h2>
        </div>
        <div className={styles.grid2} style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginTop: 48 }}>
          {useCases.map((u) => (
            <div key={u.title} style={{ display: "flex", gap: 18, background: "#FFFBF8", border: "1px solid #F1E7DF", borderRadius: 16, padding: 26 }}>
              <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: "#FFF1EA", color: "#E85818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21 }}>
                <i className={`ph-fill ${u.icon}`} />
              </span>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{u.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#6E645C" }}>{u.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
