import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "@/app/landing.module.css";

const checkItem: CSSProperties = { display: "flex", gap: 9 };
const checkIcon: CSSProperties = { color: "#FF6B2C", marginTop: 2 };
const planCta: CSSProperties = {
  display: "block",
  textAlign: "center",
  fontSize: 15,
  fontWeight: 600,
  color: "#1B1714",
  background: "#fff",
  border: "1.5px solid #EBE1D9",
  padding: 12,
  borderRadius: 11,
};
const planDivider: CSSProperties = { height: 1, background: "#F4ECE5", margin: "22px 0" };
const planList: CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 11,
  fontSize: 14,
  color: "#4A423C",
};

export function Pricing() {
  return (
    <section id="pricing" className={styles.secpad} style={{ padding: "96px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>Pricing</span>
          <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 0" }}>
            Simple, honest pricing
          </h2>
          <p style={{ fontSize: 18, color: "#5B524B", margin: "16px 0 0" }}>Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
        </div>
        <div className={styles.grid3} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 52, alignItems: "start" }}>
          {/* Free */}
          <div style={{ background: "#fff", border: "1px solid #EEE4DC", borderRadius: 18, padding: 30 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Free</h3>
            <div style={{ margin: "14px 0 4px" }}>
              <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-.03em" }}>$0</span>
              <span style={{ fontSize: 15, color: "#8A807A" }}>/mo</span>
            </div>
            <p style={{ fontSize: 14, color: "#6E645C", marginBottom: 22 }}>For getting started with everyday tasks.</p>
            <Link href="/auth#signup" style={planCta}>Get started</Link>
            <div style={planDivider} />
            <ul style={planList}>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Unlimited standard chats</li>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Chat history &amp; search</li>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />3 file uploads / day</li>
            </ul>
          </div>
          {/* Pro */}
          <div style={{ position: "relative", background: "linear-gradient(180deg,#FFF6F0,#fff)", border: "2px solid #FF6B2C", borderRadius: 18, padding: 30, boxShadow: "0 20px 44px -18px rgba(232,88,24,.35)" }}>
            <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", fontSize: 12, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#FF7A3C,#E85818)", padding: "5px 14px", borderRadius: 999 }}>
              MOST POPULAR
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#B8420F" }}>Pro</h3>
            <div style={{ margin: "14px 0 4px" }}>
              <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-.03em" }}>$18</span>
              <span style={{ fontSize: 15, color: "#8A807A" }}>/mo</span>
            </div>
            <p style={{ fontSize: 14, color: "#6E645C", marginBottom: 22 }}>For power users who live in the chat.</p>
            <Link
              href="/auth#signup"
              style={{ display: "block", textAlign: "center", fontSize: 15, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#FF7A3C,#E85818)", padding: 12, borderRadius: 11, boxShadow: "0 8px 18px rgba(232,88,24,.3)" }}
            >
              Start Pro trial
            </Link>
            <div style={{ height: 1, background: "#F7E6DB", margin: "22px 0" }} />
            <ul style={planList}>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Everything in Free</li>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Advanced reasoning model</li>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Unlimited file uploads</li>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Priority speed</li>
            </ul>
          </div>
          {/* Team */}
          <div style={{ background: "#fff", border: "1px solid #EEE4DC", borderRadius: 18, padding: 30 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Team</h3>
            <div style={{ margin: "14px 0 4px" }}>
              <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-.03em" }}>$32</span>
              <span style={{ fontSize: 15, color: "#8A807A" }}>/user</span>
            </div>
            <p style={{ fontSize: 14, color: "#6E645C", marginBottom: 22 }}>For teams that build together.</p>
            <Link href="/auth#signup" style={planCta}>Contact sales</Link>
            <div style={planDivider} />
            <ul style={planList}>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Everything in Pro</li>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Shared workspaces</li>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Admin &amp; SSO</li>
              <li style={checkItem}><i className="ph-bold ph-check" style={checkIcon} />Dedicated support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
