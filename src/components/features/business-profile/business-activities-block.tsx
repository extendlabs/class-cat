"use client";

import { CompactActivityCard } from "@/components/features/compact-activity-card";
import { AnimateIn } from "@/components/ui/animate-in";
import type { BusinessPageAction } from "@/types/business-profile";

export function BusinessActivitiesBlock({
  activities,
  filteredActivities,
  activityCategories,
  activeCategory,
  dispatch,
}: {
  activities: { length: number };
  filteredActivities: React.ComponentProps<typeof CompactActivityCard>["activity"][];
  activityCategories: string[];
  activeCategory: string;
  dispatch: React.Dispatch<BusinessPageAction>;
}) {
  return (
    <AnimateIn delay={200} className="mt-16">
      <div>
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          Explore
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
          Classes & Activities{" "}
          <span className="text-gray-400 font-normal text-lg">
            ({activities.length})
          </span>
        </h3>

        {activityCategories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {activityCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => dispatch({ type: "SET_ACTIVE_CATEGORY", payload: cat })}
                className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-coral text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-coral/30"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredActivities.map((activity) => (
            <CompactActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
