import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Mochiy_Pop_P_One } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mochiyPop = Mochiy_Pop_P_One({
  variable: "--font-logo",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://classcat.pl"),
  title: {
    default: "ClassCat — Znajdź Zajęcia Blisko Siebie",
    template: "%s | ClassCat",
  },
  description: "Odkryj lokalne zajęcia i aktywności w Twojej okolicy. Przeglądaj fitness, sztukę, muzykę, gotowanie i więcej.",
  openGraph: {
    siteName: "ClassCat",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} ${mochiyPop.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
