"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Users,
  GraduationCap,
  ShieldCheck,
} from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";

export function AboutClient() {
  const t = useTranslations("about");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-24 space-y-20 md:space-y-28">
        {/* Hero */}
        <AnimateIn>
          <section className="relative bg-secondary rounded-[40px] p-8 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-coral/[0.12] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-coral/[0.08] rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <span className="inline-block uppercase tracking-widest text-coral font-bold text-xs mb-4">
                {t("badge")}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 text-wrap-balance">
                {t("heroTitle")}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {t("heroSubtitle")}
              </p>
            </div>
          </section>
        </AnimateIn>

        {/* Mission */}
        <AnimateIn delay={100}>
          <section className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6">
              {t("missionTitle")}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("missionDescription")}
            </p>
          </section>
        </AnimateIn>

        {/* Values */}
        <AnimateIn delay={100}>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-10 text-center">
              {t("valuesTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { titleKey: "communityTitle" as const, descKey: "communityDescription" as const, Icon: Users },
                { titleKey: "accessTitle" as const, descKey: "accessDescription" as const, Icon: GraduationCap },
                { titleKey: "qualityTitle" as const, descKey: "qualityDescription" as const, Icon: ShieldCheck },
              ].map((v, i) => (
                <AnimateIn key={v.titleKey} delay={i * 80}>
                  <div className="rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 p-6 text-center">
                    <div className="w-12 h-12 bg-coral/8 rounded-xl flex items-center justify-center text-coral mb-4 mx-auto">
                      <v.Icon size={24} weight="duotone" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{t(v.titleKey)}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{t(v.descKey)}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </section>
        </AnimateIn>

        {/* CTA */}
        <AnimateIn delay={100}>
          <section className="relative rounded-[40px] p-10 md:p-16 overflow-hidden bg-secondary text-center">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-coral/[0.12] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-coral/[0.08] rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                {t("ctaTitle")}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-coral hover:bg-coral-hover text-white px-10 py-4 rounded-full font-bold shadow-sm shadow-coral/20 transition-all hover:-translate-y-0.5 text-center"
                >
                  {t("ctaExplore")}
                </Link>
                <Link
                  href="/for-business"
                  className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-full font-bold shadow-[var(--shadow-soft)] border border-gray-200 transition-all hover:-translate-y-0.5 text-center"
                >
                  {t("ctaForBusiness")}
                </Link>
              </div>
            </div>
          </section>
        </AnimateIn>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
