import { ChartLineUp } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";

export function BookingsTrendChart({
  weeklyBookings,
  maxBookings,
}: {
  weeklyBookings: { week: string; bookings: number }[];
  maxBookings: number;
}) {
  return (
    <AnimateIn delay={100}>
      <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60 h-full">
        <div className="flex items-center gap-2 mb-6">
          <ChartLineUp size={18} className="text-coral" weight="bold" />
          <h3 className="text-sm font-bold text-gray-900">
            Bookings Trend
          </h3>
        </div>
        <div className="flex items-end gap-2 h-40">
          {weeklyBookings.map((week) => (
            <div
              key={week.week}
              className="flex-1 flex flex-col items-center gap-1.5 group"
            >
              <span className="text-[10px] font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {week.bookings}
              </span>
              <div
                className="w-full bg-coral/70 rounded-t-md transition-all duration-500 hover:bg-coral cursor-default"
                style={{
                  height: `${(week.bookings / maxBookings) * 100}%`,
                  minHeight: "4px",
                }}
              />
              <span className="text-[10px] text-gray-400">
                {week.week}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
