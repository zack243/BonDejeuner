"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

export default function Products() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

  return (
    <section id="produits" ref={sectionRef} className="bg-white overflow-hidden py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — Product image */}
          <motion.div
            className="sr-left w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative"
              style={{ width: "clamp(280px, 45vw, 520px)", height: "clamp(280px, 45vw, 520px)" }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            >
              <Image
                src="/images/product.png"
                alt="Flocons d'Avoine Bon Déjeuner"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                quality={90}
                priority
                className="object-contain"
                style={{ filter: "drop-shadow(0 24px 56px rgba(29,93,43,0.18))" }}
              />
            </motion.div>
          </motion.div>

          {/* Right — Text + CTA */}
          <motion.div
            className="sr w-full lg:w-1/2 flex flex-col items-start text-left"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-black uppercase tracking-widest"
              style={{ background: "rgba(29,93,43,0.08)", color: "#1D5D2B" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1D5D2B" }} />
              {t("products.badge") as string}
            </span>

            <h2 className="font-black text-[#222] leading-tight mb-4" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
              {t("products.title") as string}
            </h2>

            <p className="text-[#222]/60 text-lg leading-relaxed mb-6 max-w-md">
              {t("products.subtitle") as string}
            </p>

            <p className="text-[#222]/70 leading-relaxed mb-8 max-w-lg">
              {t("products.description") as string}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "#FFF8EC" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#4F8F38" }} />
                <span className="text-xs font-black text-[#1D5D2B] uppercase tracking-wider">100% Naturel</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "#FFF8EC" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#F59E0B" }} />
                <span className="text-xs font-black text-[#1D5D2B] uppercase tracking-wider">Riche en Fibres</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "#FFF8EC" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#D92525" }} />
                <span className="text-xs font-black text-[#1D5D2B] uppercase tracking-wider">Énergie Matinale</span>
              </div>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black text-sm"
              style={{ background: "#1D5D2B", color: "#F4D233", boxShadow: "0 8px 24px rgba(29,93,43,0.35)" }}
            >
              Commander maintenant
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
