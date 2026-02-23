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
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { BusinessCategory, BusinessOnboardingData } from "@/types/business-portal";

const CATEGORIES: { value: BusinessCategory; label: string; icon: typeof Heart }[] = [
  { value: "wellness", label: "Wellness", icon: Heart },
  { value: "sports", label: "Sports", icon: Trophy },
  { value: "arts", label: "Arts", icon: Palette },
  { value: "music", label: "Music", icon: MusicNotes },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "cooking", label: "Cooking", icon: CookingPot },
  { value: "dance", label: "Dance", icon: PersonSimpleRun },
  { value: "fitness", label: "Fitness", icon: Barbell },
  { value: "outdoor", label: "Outdoor", icon: Mountains },
  { value: "tech", label: "Tech", icon: Desktop },
];

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
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        What type of business?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose the category that best describes your business.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setData((d) => ({ ...d, category: cat.value }));
              setErrors({});
            }}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center",
              data.category === cat.value
                ? "border-coral bg-coral/5 text-coral"
                : "border-gray-100 hover:border-gray-200 text-gray-600"
            )}
          >
            <cat.icon
              size={24}
              weight={data.category === cat.value ? "fill" : "regular"}
            />
            <span className="text-xs font-bold">{cat.label}</span>
          </button>
        ))}
      </div>
      {errors.category && (
        <p className="text-xs text-red-500 mt-3">{errors.category}</p>
      )}
    </div>
  );
}
