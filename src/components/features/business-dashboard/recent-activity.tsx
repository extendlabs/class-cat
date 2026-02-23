import {
  Bell,
  CalendarCheck,
  ChatCircle,
  Warning,
  Megaphone,
} from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";

const NOTIFICATION_ICONS: Record<string, typeof Bell> = {
  booking: CalendarCheck,
  review: ChatCircle,
  system: Warning,
  promotion: Megaphone,
};

const NOTIFICATION_COLORS: Record<string, string> = {
  booking: "text-blue-500 bg-blue-50",
  review: "text-amber-500 bg-amber-50",
  system: "text-gray-500 bg-gray-100",
  promotion: "text-purple-500 bg-purple-50",
};

export function RecentActivity({
  notifications,
  formatRelativeTime,
}: {
  notifications: { id: string; type: string; title: string; body: string; timestamp: string }[];
  formatRelativeTime: (timestamp: string) => string;
}) {
  return (
    <AnimateIn delay={150}>
      <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60 h-full">
        <div className="flex items-center gap-2 mb-6">
          <Bell size={18} className="text-coral" weight="bold" />
          <h3 className="text-sm font-bold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="space-y-4">
          {notifications.slice(0, 5).map((n) => {
            const Icon = NOTIFICATION_ICONS[n.type] ?? Bell;
            const colorClass =
              NOTIFICATION_COLORS[n.type] ?? "text-gray-500 bg-gray-100";
            return (
              <div key={n.id} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}
                >
                  <Icon size={14} weight="fill" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium leading-tight">
                    {n.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {n.body}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">
                  {formatRelativeTime(n.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AnimateIn>
  );
}
