"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { locale, t, locales, setLocale } = useLanguage();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const links = [
    { label: t("nav.home") as string,       anchor: "#accueil"    },
    { label: t("nav.products") as string,   anchor: "#produits"   },
    { label: t("nav.categories") as string, anchor: "#categories" },
    { label: t("nav.recipes") as string,    anchor: "#recettes"   },
    { label: t("nav.about") as string,      anchor: "#apropos"    },
    { label: t("nav.contact") as string,    anchor: "#contact"    },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "#FDEA02",
        boxShadow: scrolled ? "0 2px 24px rgba(2,109,65,0.18)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href={`/${locale}/`} className="flex-shrink-0 relative" style={{ width: 240, height: 84 }}>
            <Image
              src="/bon-dejeuner-logo.png"
              alt="Bon Déjeuner"
              fill
              sizes="180px"
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {links.map((link) => (
              <a
                key={link.anchor}
                href={link.anchor}
                className="px-3 lg:px-5 py-2.5 text-[15px] lg:text-base font-semibold rounded-full transition-colors"
                style={{ color: "#026D41" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(2,109,65,0.10)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Language dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-black rounded-full transition-colors"
                style={{ background: "#026D41", color: "#FDEA02" }}
                aria-label="Changer de langue"
              >
                {locale.toUpperCase()}
                <svg className={`w-4 h-4 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[130px] z-50">
                  {locales.map((loc) => {
                    const currentPath = pathname.replace(/^\/(fr|en)/, "") || "/";
                    return (
                      <Link
                        key={loc}
                        href={`/${loc}${currentPath}`}
                        onClick={() => { setLocale(loc); setLangOpen(false); }}
                        className="block px-4 py-2.5 text-sm font-semibold transition-colors"
                        style={{
                          background: locale === loc ? "rgba(2,109,65,0.08)" : "transparent",
                          color: locale === loc ? "#026D41" : "#4A4A4A",
                        }}
                      >
                        {loc === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA button */}
            <a
              href="#produits"
              className="hidden sm:flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 font-black text-sm md:text-[15px] rounded-full transition-all whitespace-nowrap"
              style={{ background: "#026D41", color: "#FDEA02", boxShadow: "0 4px 14px rgba(2,109,65,0.35)" }}
            >
              {t("nav.discover") as string}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#026D41" }}
              aria-label={mobileOpen ? "Fermer" : "Menu"}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ background: "#FDEA02", borderColor: "rgba(2,109,65,0.15)" }}>
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.anchor}
                href={link.anchor}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-base font-semibold rounded-xl transition-colors"
                style={{ color: "#026D41" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#produits"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 font-black rounded-xl transition-colors"
              style={{ background: "#026D41", color: "#FDEA02" }}
            >
              {t("nav.discover") as string}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
