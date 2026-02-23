import type { Icon } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";

export interface StatCardData {
  label: string;
  value: string;
  icon: Icon;
  color: string;
}

export function DashboardStats({ statCards }: { statCards: StatCardData[] }) {
  return (
    <AnimateIn>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-4 shadow-[var(--shadow-soft)] border border-gray-100/60"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color} mb-2`}
            >
              <stat.icon size={16} weight="fill" />
            </div>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </AnimateIn>
  );
}
