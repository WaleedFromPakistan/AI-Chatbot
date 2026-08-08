import styles from "@/app/landing.module.css";

const testimonials = [
  { quote: "SoftlexAI cut my email time in half. It genuinely writes the way I do — I barely edit anymore.", name: "Maya Rodriguez", role: "Product Manager", color: "#FFB98F" },
  { quote: "The file understanding is unreal. I dropped in a 40-page report and had answers before my coffee cooled.", name: "James Okafor", role: "Data Analyst", color: "#FF8A57" },
  { quote: "Cleanest chat interface I've used. It stays out of my way and just helps. Worth every penny of Pro.", name: "Sofia Lindqvist", role: "Software Engineer", color: "#E85818" },
];

export function Testimonials() {
  return (
    <section className={styles.secpad} style={{ padding: "96px 40px", background: "#FFFBF8", borderTop: "1px solid #F4ECE5", borderBottom: "1px solid #F4ECE5" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>Loved by users</span>
          <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 0" }}>
            Don&apos;t take our word for it
          </h2>
        </div>
        <div className={styles.grid3} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 52 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid #F1E7DF", borderRadius: 16, padding: 26 }}>
              <div style={{ color: "#FF6B2C", fontSize: 15, marginBottom: 12 }}>
                <i className="ph-fill ph-star" /><i className="ph-fill ph-star" /><i className="ph-fill ph-star" /><i className="ph-fill ph-star" /><i className="ph-fill ph-star" />
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#2A2420" }}>&quot;{t.quote}&quot;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 20 }}>
                <span style={{ width: 38, height: 38, borderRadius: "50%", background: t.color }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "#8A807A" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
