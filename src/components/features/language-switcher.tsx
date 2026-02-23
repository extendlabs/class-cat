"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");

  const toggle = () => {
    const next = locale === "en" ? "pl" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-gray-200/60 bg-white/80 px-2.5 py-1 text-xs font-medium text-gray-600 hover:border-coral/20 hover:text-coral transition-all",
        className
      )}
      aria-label={t("label")}
    >
      <span className={cn(locale === "en" && "text-coral font-bold")}>{t("en")}</span>
      <span className="text-gray-300">/</span>
      <span className={cn(locale === "pl" && "text-coral font-bold")}>{t("pl")}</span>
    </button>
  );
}
