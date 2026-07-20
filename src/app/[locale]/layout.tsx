import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Manrope, Source_Sans_3 } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { locales, Locale, defaultLocale } from "@/i18n/config";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import frMessages from "@/i18n/messages/fr.json";
import enMessages from "@/i18n/messages/en.json";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="h-32" style={{ background: "#026D41" }} />,
  ssr: true,
});

const messages = { fr: frMessages, en: enMessages };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#026D41",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const msg = messages[locale as Locale] || messages[defaultLocale];
  const baseUrl = "https://bondejeuner.bnbgroupe.com";

  return {
    title: {
      default: msg.metadata.title,
      template: `%s | Bon Déjeuner RDC`,
    },
    description: msg.metadata.description,
    keywords: msg.metadata.keywords,
    authors: [{ name: "Bon Déjeuner RDC" }],
    creator: "Bon Déjeuner RDC",
    publisher: "Bon Déjeuner RDC",
    metadataBase: new URL(baseUrl),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: `${baseUrl}/${locale}/`,
      languages: { fr: `${baseUrl}/fr/`, en: `${baseUrl}/en/`, "x-default": `${baseUrl}/fr/` },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${baseUrl}/${locale}/`,
      siteName: "Bon Déjeuner RDC",
      title: msg.metadata.title,
      description: msg.metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title: msg.metadata.title,
      description: msg.metadata.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`h-full antialiased ${manrope.variable} ${sourceSans3.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-[#4A4A4A]">
        <MotionConfig reducedMotion="user">
          <LanguageProvider initialLocale={locale as Locale}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
