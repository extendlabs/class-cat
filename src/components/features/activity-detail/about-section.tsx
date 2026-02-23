import { useTranslations } from "next-intl";
import { Lightbulb, Package } from "@phosphor-icons/react";
import type { ActivityDetail } from "@/types/activity";
import { AnimateIn } from "@/components/ui/animate-in";

export function AboutSection({ activity }: { activity: ActivityDetail }) {
  const t = useTranslations("activity");
  return (
    <AnimateIn delay={100} className="mt-16">
      <div>
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          {t("overview")}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          {t("aboutThisClass")}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-8">
          {activity.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] flex gap-4 hover:shadow-[var(--shadow-hover)] transition-shadow">
            <div className="w-10 h-10 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb size={20} className="text-coral" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">
                {t("skillLevel")}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {activity.skillLevel}
              </p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] flex gap-4 hover:shadow-[var(--shadow-hover)] transition-shadow">
            <div className="w-10 h-10 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package size={20} className="text-coral" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">
                {t("materialsIncluded")}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {activity.materialsIncluded}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
