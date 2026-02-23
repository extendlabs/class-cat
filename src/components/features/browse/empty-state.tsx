"use client";

import { useTranslations } from "next-intl";
import { Star } from "@phosphor-icons/react";

export function EmptyState() {
  const t = useTranslations("browse");

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Star size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold mb-1 text-gray-900">
        {t("noResults")}
      </h3>
      <p className="text-sm text-gray-500 max-w-sm">
        {t("noResultsHint")}
      </p>
    </div>
  );
}
