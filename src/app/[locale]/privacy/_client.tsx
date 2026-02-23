"use client";

import { useTranslations } from "next-intl";
import { AnimateIn } from "@/components/ui/animate-in";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";

interface Section {
  titleKey: string;
  textKey: string;
}

const sections: Section[] = [
  { titleKey: "introTitle", textKey: "introText" },
  { titleKey: "collectTitle", textKey: "collectText" },
  { titleKey: "useTitle", textKey: "useText" },
  { titleKey: "sharingTitle", textKey: "sharingText" },
  { titleKey: "cookiesTitle", textKey: "cookiesText" },
  { titleKey: "rightsTitle", textKey: "rightsText" },
  { titleKey: "contactTitle", textKey: "contactText" },
];

export function PrivacyClient() {
  const t = useTranslations("privacy");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-24">
        <AnimateIn>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-sm text-gray-400 mb-2">{t("lastUpdated")}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 mb-12">
              {t("templateNotice")}
            </div>

            <div className="space-y-10">
              {sections.map((s) => (
                <section key={s.titleKey}>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{t(s.titleKey)}</h2>
                  <p className="text-gray-600 leading-relaxed">{t(s.textKey)}</p>
                </section>
              ))}
            </div>
          </div>
        </AnimateIn>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
