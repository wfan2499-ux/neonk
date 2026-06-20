import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import ConsentBanner from "@/components/ConsentBanner";
import Providers from "@/components/Providers";
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
    "تصاميم نيون جاهزة وجودة عالية، توصل بسرعة داخل السعودية. اختر تصميمك، ادفع أونلاين، ويوصلك بدون انتظار شحن دولي.",
  keywords: [
    "لوحات نيون",
    "نيون جداري",
    "ديكور نيون",
    "تصاميم نيون",
    "هدايا",
    "neon signs",
    "wall art",
    "Saudi Arabia",
  ],
  openGraph: {
    title: "Neon-K | لوحات نيون جاهزة",
    description: "تصاميم نيون جاهزة توصلك بسرعة داخل السعودية.",
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
        <Providers>
          {children}
          <ConsentBanner />
        </Providers>
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
