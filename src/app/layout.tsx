import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Neon-K | لوحات جدارية مخصصة",
    template: "%s | Neon-K",
  },
  description:
    "حوّل صورتك للوحة جدارية فنية! ٤ تصاميم: نيون، كانفاس، كريستال، أكريليك عائم. ارفع صورتك واستلمها خلال ٣-٥ أيام.",
  keywords: [
    "لوحات جدارية",
    "طباعة صور",
    "نيون",
    "كانفاس",
    "أكريليك",
    "ديكور",
    "هدايا",
    "wall art",
    "custom print",
  ],
  openGraph: {
    title: "Neon-K | لوحات جدارية مخصصة",
    description: "حوّل صورتك للوحة جدارية! ٤ تصاميم مميزة.",
    type: "website",
    locale: "ar_SA",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark h-full">
      <body className={`${cairo.variable} font-sans min-h-full bg-bg text-text antialiased`}>
        {children}
        <ConsentBanner />
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
