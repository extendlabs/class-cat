import { Star, TrendUp } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { Progress } from "@/components/ui/progress";

export function TopPerforming({
  topPerforming,
}: {
  topPerforming: { id: string; title: string; enrolledCount: number; maxCapacity: number; rating: number }[];
}) {
  return (
    <AnimateIn delay={250}>
      <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60 h-full">
        <div className="flex items-center gap-2 mb-6">
          <TrendUp size={18} className="text-coral" weight="bold" />
          <h3 className="text-sm font-bold text-gray-900">
            Top Performing
          </h3>
        </div>
        <div className="space-y-4">
          {topPerforming.map((activity) => {
            const fillRate = Math.round(
              (activity.enrolledCount / activity.maxCapacity) * 100
            );
            return (
              <div key={activity.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <span className="text-xs font-semibold text-gray-600 ml-2 flex-shrink-0">
                    {fillRate}%
                  </span>
                </div>
                <Progress
                  value={fillRate}
                  className="h-2 bg-gray-100 [&>[data-slot=progress-indicator]]:bg-coral"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  {activity.enrolledCount} / {activity.maxCapacity}{" "}
                  enrolled &middot;{" "}
                  <Star size={10} weight="fill" className="inline text-amber-400" />{" "}
                  {activity.rating}
                </p>
              </div>
            );
          })}
          {topPerforming.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              No active activities.
            </p>
          )}
        </div>
      </div>
    </AnimateIn>
  );
}
