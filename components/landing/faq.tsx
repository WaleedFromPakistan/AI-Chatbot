import styles from "@/app/landing.module.css";

const faqs = [
  { q: "Is SoftlexAI free to use?", a: "Yes. The Free plan gives you unlimited standard chats, full history, and daily file uploads. Upgrade to Pro anytime for advanced reasoning and unlimited uploads.", open: true },
  { q: "Is my data private?", a: "Absolutely. Conversations are encrypted in transit and at rest, and we never train on your data without your explicit opt-in. You can delete any chat permanently at any time." },
  { q: "What kinds of files can I upload?", a: "PDFs, Word docs, spreadsheets, CSVs, images, and plain text. SoftlexAI reads the content, understands structure, and answers questions grounded in what you shared." },
  { q: "Can I cancel my subscription?", a: "Anytime, with one click. There are no lock-in contracts — you keep Pro features until the end of your billing period, then drop back to Free." },
];

export function Faq() {
  return (
    <section id="faq" className={styles.secpad} style={{ padding: "96px 40px", background: "#FFFBF8", borderTop: "1px solid #F4ECE5" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>FAQ</span>
          <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 40px" }}>
            Questions, answered
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((item) => (
            <details key={item.q} className={styles.faq} open={item.open} style={{ background: "#fff", border: "1px solid #F1E7DF", borderRadius: 14, padding: "4px 20px" }}>
              <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, cursor: "pointer", listStyle: "none", padding: "16px 0", fontSize: 16.5, fontWeight: 600 }}>
                {item.q}
                <span className={styles.faqPlus} style={{ flex: "none", color: "#FF6B2C", fontSize: 20, transition: "transform .2s" }}>
                  <i className="ph-bold ph-plus" />
                </span>
              </summary>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#6E645C", padding: "0 0 16px" }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
