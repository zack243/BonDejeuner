"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[#1D5D2B]"
      style={{ height: "100dvh", minHeight: "580px", maxHeight: "960px" }}
      aria-label="Section hero Bon Déjeuner"
    >
      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      {/* DESKTOP */}
      <div className="hidden lg:flex absolute inset-0" style={{ paddingTop: 64 }}>

        {/* LEFT 45% — Hero image */}
        <div className="relative shrink-0 overflow-hidden"
          style={{ width: "45%", height: "100%", display: "flex", alignItems: "flex-end", paddingLeft: "5%" }}>
          <div className="relative w-full h-full">
            <Image
              src="/hero-bondejeuner.png"
              alt="Bon Déjeuner — Votre Énergie du Matin"
              fill
              priority
              fetchPriority="high"
              sizes="45vw"
              quality={80}
              className="object-contain"
              style={{ objectPosition: "bottom center" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,0,0,0.28) 0%, transparent 70%)" }}
            />
          </div>
        </div>

        {/* RIGHT 55% — Floating product + CTA */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 pb-8" style={{ marginTop: 16 }}>

          {/* Floating product (no background) */}
          <motion.div
            className="relative"
            style={{ width: "clamp(280px, 32vw, 420px)", height: "clamp(280px, 32vw, 420px)" }}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src="/images/product.png"
              alt="Flocons d'Avoine Bon Déjeuner"
              fill
              sizes="(max-width: 1024px) 80vw, 420px"
              priority
              quality={85}
              className="object-contain"
              style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.45))" }}
            />
          </motion.div>

          {/* Yellow CTA card */}
          <div className="w-full max-w-[620px]">
            <div style={{
              background: "#F4D233",
              borderRadius: 22,
              padding: "22px 28px",
              boxShadow: "0 12px 50px rgba(244,210,51,0.35), 0 4px 20px rgba(0,0,0,0.10)",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3 w-fit"
                  style={{ background: "rgba(29,93,43,0.10)", border: "1px solid rgba(29,93,43,0.15)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#1D5D2B" }} />
                  <span className="font-black text-[8px] uppercase tracking-[0.12em]" style={{ color: "#1D5D2B" }}>
                    {t("hero.tagline") as string}
                  </span>
                </div>
                <h1 className="font-black leading-[1.15] mb-2" style={{ color: "#1D5D2B", fontSize: "clamp(1.2rem,2.2vw,1.75rem)" }}>
                  {t("hero.line1") as string}{" "}
                  <span>{t("hero.line2") as string}</span>
                </h1>
                <p className="leading-[1.55]" style={{ color: "rgba(29,93,43,0.80)", fontSize: "clamp(0.72rem,0.9vw,0.82rem)" }}>
                  {t("hero.subtitle") as string}
                </p>
              </div>
              <div className="flex flex-col gap-2.5 shrink-0">
                <motion.a
                  href="#produits"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 font-black rounded-full whitespace-nowrap"
                  style={{ background: "#1D5D2B", color: "#F4D233", fontSize: "0.84rem", padding: "11px 26px" }}
                >
                  {t("hero.ctaPrimary") as string}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                <a href="#apropos"
                  className="inline-flex items-center justify-center whitespace-nowrap"
                  style={{ color: "rgba(29,93,43,0.70)", fontSize: "0.76rem" }}>
                  {t("hero.ctaSecondary") as string}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden flex flex-col" style={{ minHeight: "92svh", maxHeight: "720px", paddingTop: 60 }}>
        <div className="relative flex-1 overflow-hidden" style={{ minHeight: "38%", maxHeight: "45%" }}>
          <Image src="/hero-bondejeuner.png" alt="Bon Déjeuner" fill priority sizes="100vw" quality={75}
            className="object-contain" style={{ objectPosition: "bottom center" }} />
          <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(29,93,43,0.6), transparent)" }} />
        </div>

        {/* Floating product on mobile */}
        <div className="flex justify-center" style={{ marginTop: -40, marginBottom: -20, zIndex: 15 }}>
          <motion.div
            className="relative"
            style={{ width: "clamp(180px, 55vw, 280px)", height: "clamp(180px, 55vw, 280px)" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src="/images/product.png"
              alt="Flocons d'Avoine Bon Déjeuner"
              fill
              sizes="(max-width: 1024px) 80vw, 280px"
              priority
              quality={80}
              className="object-contain"
              style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.45))" }}
            />
          </motion.div>
        </div>

        <div className="shrink-0 px-4 pb-6" style={{ zIndex: 10, position: "relative" }}>
          <div className="w-full rounded-2xl px-4 py-3.5 flex flex-col gap-1.5"
            style={{ background: "#F4D233", boxShadow: "0 8px 32px rgba(244,210,51,0.35)" }}>
            <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 w-fit"
              style={{ background: "rgba(29,93,43,0.10)", border: "1px solid rgba(29,93,43,0.15)" }}>
              <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#1D5D2B" }} />
              <span className="font-black text-[7px] uppercase tracking-[0.12em]" style={{ color: "#1D5D2B" }}>
                {t("hero.tagline") as string}
              </span>
            </div>
            <h1 className="font-black leading-tight text-lg" style={{ color: "#1D5D2B" }}>
              {t("hero.line1") as string}{" "}{t("hero.line2") as string}
            </h1>
            <p className="text-[11px] leading-snug" style={{ color: "rgba(29,93,43,0.80)" }}>
              {t("hero.subtitle") as string}
            </p>
            <div className="flex items-center gap-3 mt-0.5">
              <a href="#produits" className="inline-flex items-center gap-1.5 px-4 py-2 font-black rounded-full text-xs"
                style={{ background: "#1D5D2B", color: "#F4D233" }}>
                {t("hero.ctaPrimary") as string}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#apropos" className="text-[11px]" style={{ color: "rgba(29,93,43,0.70)" }}>
                {t("hero.ctaSecondary") as string}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}