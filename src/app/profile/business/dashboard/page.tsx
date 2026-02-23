"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Users,
  CalendarCheck,
  Star,
  CurrencyDollar,
  SquaresFour,
  Clock,
} from "@phosphor-icons/react";
import {
  fetchBusinessStats,
  fetchBusinessActivities,
  fetchBusinessNotifications,
  fetchWeeklyBookings,
} from "@/api/business-portal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardStats,
  BookingsTrendChart,
  RecentActivity,
  UpcomingClasses,
  TopPerforming,
} from "@/components/features/business-dashboard";
import type { StatCardData } from "@/components/features/business-dashboard";

export default function BusinessDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["business-stats"],
    queryFn: fetchBusinessStats,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["business-activities"],
    queryFn: fetchBusinessActivities,
  });

  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ["business-notifications"],
    queryFn: fetchBusinessNotifications,
  });

  const { data: weeklyBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["weekly-bookings"],
    queryFn: fetchWeeklyBookings,
  });

  const isLoading =
    statsLoading || activitiesLoading || notificationsLoading || bookingsLoading;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  const upcomingClasses = (activities ?? [])
    .filter((a) => a.status === "active" && a.nextSessionDate)
    .sort(
      (a, b) =>
        new Date(a.nextSessionDate).getTime() -
        new Date(b.nextSessionDate).getTime()
    )
    .slice(0, 4);

  const topPerforming = (activities ?? [])
    .filter((a) => a.status === "active")
    .sort(
      (a, b) =>
        b.enrolledCount / b.maxCapacity - a.enrolledCount / a.maxCapacity
    )
    .slice(0, 4);

  const maxBookings = Math.max(
    ...(weeklyBookings ?? []).map((w) => w.bookings),
    1
  );

  const statCards: StatCardData[] = [
    {
      label: "Students",
      value: stats?.totalStudents.toLocaleString() ?? "0",
      icon: Users,
      color: "text-blue-500 bg-blue-50",
    },
    {
      label: "Bookings",
      value: stats?.totalBookings.toLocaleString() ?? "0",
      icon: CalendarCheck,
      color: "text-coral bg-coral/10",
    },
    {
      label: "Rating",
      value: stats?.avgRating.toFixed(1) ?? "0",
      icon: Star,
      color: "text-amber-500 bg-amber-50",
    },
    {
      label: "Revenue",
      value: `$${stats?.monthlyRevenue.toLocaleString() ?? "0"}`,
      icon: CurrencyDollar,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      label: "Activities",
      value: String(stats?.activitiesCount ?? 0),
      icon: SquaresFour,
      color: "text-purple-500 bg-purple-50",
    },
    {
      label: "Upcoming",
      value: String(stats?.upcomingClasses ?? 0),
      icon: Clock,
      color: "text-indigo-500 bg-indigo-50",
    },
  ];

  function formatRelativeTime(timestamp: string) {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your business performance.
        </p>
      </div>

      <DashboardStats statCards={statCards} />

      <div className="grid md:grid-cols-2 gap-6">
        <BookingsTrendChart weeklyBookings={weeklyBookings ?? []} maxBookings={maxBookings} />
        <RecentActivity notifications={notifications ?? []} formatRelativeTime={formatRelativeTime} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <UpcomingClasses upcomingClasses={upcomingClasses} />
        <TopPerforming topPerforming={topPerforming} />
      </div>
    </div>
  );
}
