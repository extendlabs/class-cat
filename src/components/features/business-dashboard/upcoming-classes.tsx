import { CalendarBlank, CalendarCheck } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { Badge } from "@/components/ui/badge";

export function UpcomingClasses({
  upcomingClasses,
}: {
  upcomingClasses: { id: string; title: string; nextSessionDate: string; duration: string; enrolledCount: number; maxCapacity: number }[];
}) {
  return (
    <AnimateIn delay={200}>
      <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60 h-full">
        <div className="flex items-center gap-2 mb-6">
          <CalendarBlank size={18} className="text-coral" weight="bold" />
          <h3 className="text-sm font-bold text-gray-900">
            Upcoming Classes
          </h3>
        </div>
        <div className="space-y-3">
          {upcomingClasses.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                <CalendarCheck
                  size={18}
                  className="text-coral"
                  weight="fill"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.nextSessionDate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    }
                  )}{" "}
                  &middot; {activity.duration}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="text-[10px] bg-coral/10 text-coral border-0"
              >
                {activity.enrolledCount}/{activity.maxCapacity}
              </Badge>
            </div>
          ))}
          {upcomingClasses.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              No upcoming classes.
            </p>
          )}
        </div>
      </div>
    </AnimateIn>
  );
}
