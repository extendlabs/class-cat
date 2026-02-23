"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  EnvelopeSimple,
  Briefcase,
  FacebookLogo,
  InstagramLogo,
} from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";

export function ContactClient() {
  const t = useTranslations("contact");

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

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimateIn delay={80}>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 p-6">
              <div className="w-12 h-12 bg-coral/8 rounded-xl flex items-center justify-center text-coral mb-4">
                <EnvelopeSimple size={24} weight="duotone" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t("emailTitle")}</h3>
              <a
                href={`mailto:${t("emailAddress")}`}
                className="text-coral hover:text-coral-hover font-medium transition-colors"
              >
                {t("emailAddress")}
              </a>
              <p className="text-gray-500 text-sm leading-relaxed mt-3">{t("emailDescription")}</p>
            </div>
          </AnimateIn>

          <AnimateIn delay={160}>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 p-6">
              <div className="w-12 h-12 bg-coral/8 rounded-xl flex items-center justify-center text-coral mb-4">
                <Briefcase size={24} weight="duotone" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t("businessTitle")}</h3>
              <a
                href={`mailto:${t("businessEmail")}`}
                className="text-coral hover:text-coral-hover font-medium transition-colors"
              >
                {t("businessEmail")}
              </a>
              <p className="text-gray-500 text-sm leading-relaxed mt-3">{t("businessDescription")}</p>
            </div>
          </AnimateIn>
        </div>

        {/* Social */}
        <AnimateIn delay={100}>
          <section className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">
              {t("socialTitle")}
            </h2>
            <p className="text-gray-500 mb-6">{t("socialDescription")}</p>
            <div className="flex gap-3 justify-center">
              <a
                href="#"
                rel="nofollow"
                aria-label="Facebook"
                className="w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <FacebookLogo size={20} />
              </a>
              <a
                href="#"
                rel="nofollow"
                aria-label="Instagram"
                className="w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <InstagramLogo size={20} />
              </a>
              <a
                href={`mailto:${t("emailAddress")}`}
                aria-label="Email"
                className="w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <EnvelopeSimple size={20} />
              </a>
            </div>
          </section>
        </AnimateIn>

        {/* FAQ note */}
        <AnimateIn delay={100}>
          <section className="text-center">
            <p className="text-gray-500">
              {t("faqNote")}{" "}
              <Link href="/help" className="text-coral hover:text-coral-hover font-medium transition-colors">
                {t("faqLink")}
              </Link>
            </p>
          </section>
        </AnimateIn>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
