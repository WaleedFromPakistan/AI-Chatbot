import styles from "@/app/landing.module.css";

export function TrustStats() {
  return (
    <section className={styles.secpad} style={{ padding: "34px 40px", borderTop: "1px solid #F4ECE5", borderBottom: "1px solid #F4ECE5", background: "#FFFBF8" }}>
      <div className={styles.statgrid} style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", color: "#1B1714" }}>120k+</div>
          <div style={{ fontSize: 13.5, color: "#7A716A", marginTop: 3 }}>Active users</div>
        </div>
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", color: "#1B1714" }}>40+</div>
          <div style={{ fontSize: 13.5, color: "#7A716A", marginTop: 3 }}>Languages</div>
        </div>
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", color: "#1B1714" }}>99.9%</div>
          <div style={{ fontSize: 13.5, color: "#7A716A", marginTop: 3 }}>Uptime</div>
        </div>
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", color: "#FF6B2C" }}>4.9/5</div>
          <div style={{ fontSize: 13.5, color: "#7A716A", marginTop: 3 }}>Average rating</div>
        </div>
      </div>
    </section>
  );
}
