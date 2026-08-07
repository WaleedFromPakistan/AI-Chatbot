import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { plusJakarta } from "./fonts";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "SoftlexAI — The AI that actually gets things done",
  description:
    "SoftlexAI is your always-on assistant for work and life — answer anything, draft anything, understand your files, and move faster.",
};

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

export default function Home() {
  return (
    <div className={`${styles.root} ${plusJakarta.variable}`}>
      <Script src="https://unpkg.com/@phosphor-icons/web@2.1.1" strategy="afterInteractive" />
      <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
        {/* NAV */}
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

        {/* HERO */}
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

        {/* TRUST STAT BAND */}
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

        {/* FEATURES */}
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
              {[
                { icon: "ph-lightning", title: "Instant answers", body: "Real-time reasoning gives you accurate, sourced responses in seconds — not paragraphs of fluff." },
                { icon: "ph-file-text", title: "Understands your files", body: "Drop in a PDF, spreadsheet, or image. SoftlexAI reads it, summarizes it, and answers questions about it." },
                { icon: "ph-pen-nib", title: "Writes like you", body: "Emails, docs, code, posts. Set the tone once and get drafts that sound like they came from you." },
                { icon: "ph-translate", title: "Speaks 40+ languages", body: "Translate, localize, and converse fluently across languages — context and nuance intact." },
                { icon: "ph-clock-counter-clockwise", title: "Remembers context", body: "Every chat is saved and searchable. Pick up any conversation exactly where you left off." },
                { icon: "ph-shield-check", title: "Private by design", body: "Your conversations are encrypted and never used to train models without your explicit consent." },
              ].map((f) => (
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

        {/* HOW IT WORKS */}
        <section id="how" className={styles.secpad} style={{ padding: "96px 40px", background: "linear-gradient(180deg,#FFF8F3,#FFFFFF)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>How it works</span>
              <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 0" }}>
                Up and running in seconds
              </h2>
            </div>
            <div className={styles.grid3} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 56 }}>
              {[
                { num: "01", icon: "ph-chat-circle-text", title: "Ask anything", body: "Type a question or paste your task into the prompt bar. No setup, no prompt engineering required." },
                { num: "02", icon: "ph-brain", title: "Watch it reason", body: "SoftlexAI thinks step by step, pulls in your files and context, and streams a clear answer back." },
                { num: "03", icon: "ph-rocket-launch", title: "Take action", body: "Refine, copy, or export. Continue the thread anytime — every conversation is saved automatically." },
              ].map((s) => (
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

        {/* USE CASES */}
        <section className={styles.secpad} style={{ padding: "96px 40px", background: "#fff" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ maxWidth: 640 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>Use cases</span>
              <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 0" }}>
                One assistant, every kind of work
              </h2>
            </div>
            <div className={styles.grid2} style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginTop: 48 }}>
              {[
                { icon: "ph-briefcase", title: "Work & productivity", body: "Draft emails, summarize meetings, build spreadsheets, and prep for that presentation in minutes." },
                { icon: "ph-code", title: "Code & build", body: "Write, debug, and explain code across languages. Ship features and fix bugs with a pair beside you." },
                { icon: "ph-graduation-cap", title: "Learn & research", body: "Break down hard topics, study for exams, and get answers you can actually trust and verify." },
                { icon: "ph-palette", title: "Create & brainstorm", body: "Generate ideas, outlines, campaigns, and stories. Turn a blank page into a first draft instantly." },
              ].map((u) => (
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

        {/* TESTIMONIALS */}
        <section className={styles.secpad} style={{ padding: "96px 40px", background: "#FFFBF8", borderTop: "1px solid #F4ECE5", borderBottom: "1px solid #F4ECE5" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>Loved by users</span>
              <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 0" }}>
                Don&apos;t take our word for it
              </h2>
            </div>
            <div className={styles.grid3} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 52 }}>
              {[
                { quote: "SoftlexAI cut my email time in half. It genuinely writes the way I do — I barely edit anymore.", name: "Maya Rodriguez", role: "Product Manager", color: "#FFB98F" },
                { quote: "The file understanding is unreal. I dropped in a 40-page report and had answers before my coffee cooled.", name: "James Okafor", role: "Data Analyst", color: "#FF8A57" },
                { quote: "Cleanest chat interface I've used. It stays out of my way and just helps. Worth every penny of Pro.", name: "Sofia Lindqvist", role: "Software Engineer", color: "#E85818" },
              ].map((t) => (
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

        {/* PRICING */}
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

        {/* FAQ */}
        <section id="faq" className={styles.secpad} style={{ padding: "96px 40px", background: "#FFFBF8", borderTop: "1px solid #F4ECE5" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF6B2C" }}>FAQ</span>
              <h2 className={styles.sech2} style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 800, margin: "14px 0 40px" }}>
                Questions, answered
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { q: "Is SoftlexAI free to use?", a: "Yes. The Free plan gives you unlimited standard chats, full history, and daily file uploads. Upgrade to Pro anytime for advanced reasoning and unlimited uploads.", open: true },
                { q: "Is my data private?", a: "Absolutely. Conversations are encrypted in transit and at rest, and we never train on your data without your explicit opt-in. You can delete any chat permanently at any time." },
                { q: "What kinds of files can I upload?", a: "PDFs, Word docs, spreadsheets, CSVs, images, and plain text. SoftlexAI reads the content, understands structure, and answers questions grounded in what you shared." },
                { q: "Can I cancel my subscription?", a: "Anytime, with one click. There are no lock-in contracts — you keep Pro features until the end of your billing period, then drop back to Free." },
              ].map((item) => (
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

        {/* FINAL CTA */}
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

        {/* FOOTER */}
        <footer className={styles.secpad} style={{ padding: "52px 40px 40px", background: "#fff", borderTop: "1px solid #F4ECE5" }}>
          <div className={styles.foot} style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#FF7A3C,#E85818)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <i className="ph-fill ph-chat-teardrop-dots" style={{ fontSize: 15 }} />
              </span>
              <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-.02em" }}>
                Softlex<span style={{ color: "#FF6B2C" }}>AI</span>
              </span>
            </a>
            <div style={{ display: "flex", gap: 28, fontSize: 14, color: "#6E645C", flexWrap: "wrap" }}>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <Link href="/auth">Sign in</Link>
            </div>
            <span style={{ fontSize: 13.5, color: "#9A9088" }}>© 2026 SoftlexAI. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
