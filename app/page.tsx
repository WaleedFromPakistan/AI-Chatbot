import Script from "next/script";
import type { Metadata } from "next";
import { plusJakarta } from "./fonts";
import styles from "./landing.module.css";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { TrustStats } from "@/components/landing/trust-stats";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { UseCases } from "@/components/landing/use-cases";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "SoftlexAI — The AI that actually gets things done",
  description:
    "SoftlexAI is your always-on assistant for work and life — answer anything, draft anything, understand your files, and move faster.",
};

export default function Home() {
  return (
    <div className={`${styles.root} ${plusJakarta.variable}`}>
      <Script src="https://unpkg.com/@phosphor-icons/web@2.1.1" strategy="afterInteractive" />
      <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
        <Nav />
        <Hero />
        <TrustStats />
        <Features />
        <HowItWorks />
        <UseCases />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
        <Footer />
      </div>
    </div>
  );
}
