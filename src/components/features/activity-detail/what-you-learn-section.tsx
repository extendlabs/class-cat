import { useTranslations } from "next-intl";
import { Sparkle, CheckCircle } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";

export function WhatYouLearnSection({ items }: { items: string[] }) {
  const t = useTranslations("activity");
  return (
    <AnimateIn delay={200} className="mt-10">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)] p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-coral to-coral-hover rounded-xl flex items-center justify-center text-white shadow-sm">
            <Sparkle size={18} weight="fill" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            {t("whatYoullLearn")}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3 group">
              <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-100 transition-colors">
                <CheckCircle
                  size={16}
                  weight="fill"
                  className="text-green-500"
                />
              </div>
              <span className="text-gray-600 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
