"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  Trophy,
  Palette,
  MusicNotes,
  GraduationCap,
  CookingPot,
  PersonSimpleRun,
  Barbell,
  Mountains,
  Desktop,
  Tag,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { fetchCategories } from "@/api/categories";
import { Skeleton } from "@/components/ui/skeleton";
import type { BusinessOnboardingData } from "@/types/business-portal";

const SLUG_TO_ICON: Record<string, Icon> = {
  wellness: Heart,
  sports: Trophy,
  arts: Palette,
  music: MusicNotes,
  education: GraduationCap,
  cooking: CookingPot,
  dance: PersonSimpleRun,
  fitness: Barbell,
  outdoor: Mountains,
  tech: Desktop,
};

export function CategoryStep({
  data,
  errors,
  setData,
  setErrors,
}: {
  data: BusinessOnboardingData;
  errors: Record<string, string>;
  setData: React.Dispatch<React.SetStateAction<BusinessOnboardingData>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        What type of business?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose the category that best describes your business.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {(categories ?? []).map((cat) => {
            const IconComponent = SLUG_TO_ICON[cat.slug] ?? Tag;
            const isSelected = data.category === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setData((d) => ({ ...d, category: cat.slug }));
                  setErrors({});
                }}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center",
                  isSelected
                    ? "border-coral bg-coral/5 text-coral"
                    : "border-gray-100 hover:border-gray-200 text-gray-600"
                )}
              >
                {cat.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cat.icon} alt={cat.name} className="w-6 h-6 object-contain" />
                ) : (
                  <IconComponent size={24} weight={isSelected ? "fill" : "regular"} />
                )}
                <span className="text-xs font-bold">{cat.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {errors.category && (
        <p className="text-xs text-red-500 mt-3">{errors.category}</p>
      )}
    </div>
  );
}
