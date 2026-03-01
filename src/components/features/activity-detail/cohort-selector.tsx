"use client";

import { useTranslations } from "next-intl";
import { CalendarBlank, Users } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { Cohort } from "@/types/enrollment";
import { BRAND_ACCENT } from "@/lib/constants";

export function CohortSelector({
  cohorts,
  selectedCohortId,
  onSelect,
}: {
  cohorts: Cohort[];
  selectedCohortId: string | null;
  onSelect: (id: string) => void;
}) {
  const t = useTranslations("activity");

  if (cohorts.length === 0) return null;

  return (
    <div>
      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
        {t("selectCohort")}
      </span>
      <div className="space-y-2">
        {cohorts.map((cohort) => {
          const isSelected = selectedCohortId === cohort.id;
          const isFull = cohort.status === "full";
          const spotsFilled = cohort.currentParticipants / cohort.maxParticipants;

          return (
            <button
              key={cohort.id}
              onClick={() => !isFull && onSelect(cohort.id)}
              disabled={isFull}
              className={cn(
                "w-full text-left p-3 rounded-xl border transition-all",
                isSelected
                  ? "border-coral bg-coral/5 shadow-[var(--shadow-hover)]"
                  : isFull
                    ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                    : "border-gray-100 hover:border-coral/30 cursor-pointer"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={cn(
                  "text-sm font-semibold",
                  isSelected ? "text-coral" : "text-gray-900"
                )}>
                  {cohort.name}
                </span>
                {isFull && (
                  <span className="text-[9px] font-bold uppercase tracking-wide text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                    {t("cohortFull")}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <CalendarBlank size={12} />
                  {formatDateRange(cohort.startDate, cohort.endDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {cohort.currentParticipants}/{cohort.maxParticipants}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${spotsFilled * 100}%`,
                      backgroundColor: BRAND_ACCENT,
                    }}
                  />
                </div>
                <span className="text-[10px] font-medium text-gray-400">
                  {cohort.maxParticipants - cohort.currentParticipants} {t("spotsLeft")}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  return `${s.toLocaleDateString("pl-PL", opts)} – ${e.toLocaleDateString("pl-PL", opts)}`;
}
