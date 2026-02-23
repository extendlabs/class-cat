"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { X } from "@phosphor-icons/react";
import { OnboardingWizard } from "@/components/features/onboarding-wizard";

export default function PageContent() {
  const t = useTranslations("onboarding");

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo-cat.png"
              alt="ClassCat logo"
              width={36}
              height={36}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span
              className="text-lg text-coral"
              style={{ fontFamily: "var(--font-logo)" }}
            >
              ClassCat
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X size={16} />
            {t("exit")}
          </Link>
        </div>
      </header>

      {/* Wizard */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <OnboardingWizard />
      </main>
    </div>
  );
}
