"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  FacebookLogo,
  InstagramLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { LanguageSwitcher } from "@/components/features/language-switcher";

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <footer className={cn("relative overflow-hidden mt-20 pt-16 pb-8 bg-secondary", className)}>
      {/* Decorative blurred shapes */}
      <div className="absolute -top-20 right-1/4 w-80 h-80 bg-coral/[0.05] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/6 w-64 h-64 bg-coral/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link
              href="/"
              className="flex items-center gap-1.5 mb-6 group cursor-pointer"
            >
              <span className="text-2xl text-coral" style={{ fontFamily: 'var(--font-logo)' }}>
                ClassCat
              </span>
              <Image
                src="/logo-cat.png"
                alt="ClassCat logo"
                width={58}
                height={58}
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                rel="nofollow"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/70 border border-coral/[0.08] rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <FacebookLogo size={18} />
              </a>
              <a
                href="#"
                rel="nofollow"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/70 border border-coral/[0.08] rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <InstagramLogo size={18} />
              </a>
              <a
                href="#"
                rel="nofollow"
                aria-label="Email"
                className="w-9 h-9 bg-white/70 border border-coral/[0.08] rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <EnvelopeSimple size={18} />
              </a>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t("discover")}</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-coral transition-colors">
                  {t("browseClasses")}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-coral transition-colors">
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/for-business" className="hover:text-coral transition-colors">
                  {t("forBusiness")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t("company")}</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/about" className="hover:text-coral transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coral transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t("legalAndSupport")}</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/help" className="hover:text-coral transition-colors">
                  {t("helpFaq")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-coral transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-coral transition-colors">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-coral/[0.08] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              {t("copyright")}
            </div>
            <LanguageSwitcher />
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              {t("terms")}
            </Link>
            <Link href="/sitemap.xml" className="hover:text-gray-900 transition-colors">
              {t("sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
