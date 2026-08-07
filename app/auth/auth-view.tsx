"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { plusJakarta } from "../fonts";
import styles from "./auth.module.css";

type Mode = "signin" | "signup";

const fieldLabel: CSSProperties = { fontSize: 13.5, fontWeight: 600, color: "#3A332E" };
const fieldInput: CSSProperties = {
  width: "100%",
  border: "1.5px solid #EEE2D8",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 15,
  color: "#1B1714",
  transition: "border-color .12s, box-shadow .12s",
};
const oauthButton: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  width: "100%",
  background: "#fff",
  border: "1.5px solid #EBE1D9",
  borderRadius: 12,
  padding: 12,
  fontSize: 14.5,
  fontWeight: 600,
  color: "#2A2420",
  cursor: "pointer",
};

export function AuthView() {
  const [mode, setMode] = useState<Mode>("signin");
  const router = useRouter();

  useEffect(() => {
    const hash = (window.location.hash || "").toLowerCase();
    const search = (window.location.search || "").toLowerCase();
    if (hash.includes("signup") || search.includes("signup")) {
      setMode("signup");
    }
  }, []);

  const signup = mode === "signup";

  const goToApp = () => router.push("/chat");

  const heading = signup ? "Create your account" : "Welcome back";
  const subheading = signup
    ? "Start chatting free — no credit card required."
    : "Sign in to continue to SoftlexAI.";
  const cta = signup ? "Create account" : "Sign in";
  const pwPlaceholder = signup ? "At least 8 characters" : "Enter your password";
  const switchPrompt = signup ? "Already have an account?" : "New to SoftlexAI?";
  const switchLabel = signup ? "Sign in" : "Create one";

  return (
    <div className={`${styles.root} ${plusJakarta.variable}`}>
      <Script src="https://unpkg.com/@phosphor-icons/web@2.1.1" strategy="afterInteractive" />
      <div style={{ display: "flex", minHeight: "100vh", width: "100%", background: "#fff" }}>
        {/* BRAND PANEL */}
        <div
          className={styles.brandpanel}
          style={{
            flex: "none",
            width: "44%",
            maxWidth: 560,
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(150deg,#FF7A3C,#E85818)",
            color: "#fff",
            padding: "44px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            className={styles.glowAnim}
            style={{ position: "absolute", top: "-14%", right: "-10%", width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,.12)" }}
          />
          <div style={{ position: "absolute", bottom: "-18%", left: "-12%", width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,.10)" }} />

          <Link href="/" style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, width: "max-content" }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ph-fill ph-chat-teardrop-dots" style={{ fontSize: 17 }} />
            </span>
            <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-.02em" }}>SoftlexAI</span>
          </Link>

          <div style={{ position: "relative", maxWidth: 380 }}>
            <h1 style={{ fontSize: 38, lineHeight: 1.12, letterSpacing: "-.03em", fontWeight: 800 }}>
              The AI that actually gets things done.
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 30 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <i className="ph-fill ph-lightning" style={{ fontSize: 20, marginTop: 1, opacity: 0.95 }} />
                <span style={{ fontSize: 15, opacity: 0.95 }}>Instant, sourced answers in seconds</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <i className="ph-fill ph-file-text" style={{ fontSize: 20, marginTop: 1, opacity: 0.95 }} />
                <span style={{ fontSize: 15, opacity: 0.95 }}>Understands your files and context</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <i className="ph-fill ph-shield-check" style={{ fontSize: 20, marginTop: 1, opacity: 0.95 }} />
                <span style={{ fontSize: 15, opacity: 0.95 }}>Private by design, encrypted end to end</span>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ display: "flex" }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.5)", border: "2px solid #fff" }} />
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.35)", border: "2px solid #fff", marginLeft: -10 }} />
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.25)", border: "2px solid #fff", marginLeft: -10 }} />
            </div>
            <span style={{ fontSize: 14, opacity: 0.95 }}>
              Joined by <strong>120,000+</strong> people
            </span>
          </div>
        </div>

        {/* FORM PANEL */}
        <div className={styles.formwrap} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div key={mode} className={styles.fadeUpAnim} style={{ width: "100%", maxWidth: 400 }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: "#8A807A", marginBottom: 26 }}>
              <i className="ph-bold ph-arrow-left" style={{ fontSize: 14 }} />
              Back to home
            </Link>

            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.02em" }}>{heading}</h2>
            <p style={{ fontSize: 15, color: "#7A716A", marginTop: 6 }}>{subheading}</p>

            {/* OAuth */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
              <button type="button" className={styles.oauth} onClick={goToApp} style={oauthButton}>
                <i className="ph-bold ph-google-logo" style={{ fontSize: 18, color: "#E85818" }} />
                Continue with Google
              </button>
              <button type="button" className={styles.oauth} onClick={goToApp} style={oauthButton}>
                <i className="ph-fill ph-github-logo" style={{ fontSize: 18, color: "#1B1714" }} />
                Continue with GitHub
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "22px 0" }}>
              <span style={{ flex: 1, height: 1, background: "#F1E7DF" }} />
              <span style={{ fontSize: 12.5, color: "#B0A69D", fontWeight: 600 }}>or</span>
              <span style={{ flex: 1, height: 1, background: "#F1E7DF" }} />
            </div>

            {/* Fields */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goToApp();
              }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <label style={{ display: signup ? "flex" : "none", flexDirection: "column", gap: 7 }}>
                <span style={fieldLabel}>Full name</span>
                <input type="text" placeholder="Alex Morgan" style={fieldInput} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <span style={fieldLabel}>Email</span>
                <input type="email" placeholder="you@example.com" style={fieldInput} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={fieldLabel}>Password</span>
                  <a href="#" style={{ display: signup ? "none" : "block", fontSize: 12.5, fontWeight: 600, color: "#E85818" }}>
                    Forgot?
                  </a>
                </div>
                <input type="password" placeholder={pwPlaceholder} style={fieldInput} />
              </label>

              <button
                type="submit"
                className={styles.authbtn}
                style={{
                  marginTop: 4,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  fontSize: 15.5,
                  fontWeight: 700,
                  color: "#fff",
                  background: "linear-gradient(135deg,#FF7A3C,#E85818)",
                  border: "none",
                  padding: 14,
                  borderRadius: 12,
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(232,88,24,.28)",
                }}
              >
                {cta} <i className="ph-bold ph-arrow-right" style={{ fontSize: 15 }} />
              </button>
            </form>

            <p style={{ display: signup ? "block" : "none", fontSize: 12.5, color: "#9A9088", textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
              By continuing you agree to our{" "}
              <a href="#" style={{ color: "#E85818", fontWeight: 600 }}>Terms</a> and{" "}
              <a href="#" style={{ color: "#E85818", fontWeight: 600 }}>Privacy Policy</a>.
            </p>

            <p style={{ fontSize: 14, color: "#7A716A", textAlign: "center", marginTop: 22 }}>
              {switchPrompt}{" "}
              <button
                type="button"
                onClick={() => setMode(signup ? "signin" : "signup")}
                style={{ border: "none", background: "transparent", fontFamily: "inherit", fontSize: 14, fontWeight: 700, color: "#E85818", cursor: "pointer", padding: 0 }}
              >
                {switchLabel}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
