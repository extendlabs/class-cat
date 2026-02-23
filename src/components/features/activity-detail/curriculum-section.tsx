import { useTranslations } from "next-intl";
import type { CurriculumItem } from "@/types/activity";
import { AnimateIn } from "@/components/ui/animate-in";

export function CurriculumSection({ curriculum }: { curriculum: CurriculumItem[] }) {
  const t = useTranslations("activity");
  return (
    <AnimateIn delay={300} className="mt-16">
      <div>
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          {t("program")}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
          {t("curriculum")}
        </h3>
        <div className="relative space-y-0">
          {curriculum.map((item, i) => {
            const isLast = i === curriculum.length - 1;
            return (
              <div
                key={item.week}
                className={`relative pl-14 ${isLast ? "" : "pb-10"}`}
              >
                {/* Connecting line */}
                {!isLast && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-coral/20 to-gray-100" />
                )}
                {/* Number badge */}
                <div
                  className={`absolute left-0 top-1 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs z-10 shadow-sm transition-all ${
                    i === 0
                      ? "bg-gradient-to-br from-coral to-coral-hover text-white shadow-coral/20"
                      : "bg-white border border-gray-200 text-gray-400"
                  }`}
                >
                  W{item.week}
                </div>
                <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimateIn>
  );
}
