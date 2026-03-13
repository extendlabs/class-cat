"use client";

import { useTranslations } from "next-intl";
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
  fetchProviderDashboard,
} from "@/api/business-portal";
import { fetchMyBusinessProfile } from "@/api/business";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardStats,
  BookingsTrendChart,
  RecentActivity,
  UpcomingClasses,
  TopPerforming,
  PendingRequestsCard,
} from "@/components/features/business-dashboard";
import type { StatCardData } from "@/components/features/business-dashboard";

export default function BusinessDashboardPage() {
  const t = useTranslations("businessDashboard");
  const tNotifications = useTranslations("notifications");

  const { data: businessProfile } = useQuery({
    queryKey: ["my-business-profile"],
    queryFn: fetchMyBusinessProfile,
  });
  const providerSlug = businessProfile?.providerSlug ?? null;

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["provider-dashboard", providerSlug],
    queryFn: () => fetchProviderDashboard(providerSlug!),
    enabled: !!providerSlug,
  });

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

  const overview = dashboard?.overview;

  const weeklyBookings = (dashboard?.enrollmentTrends ?? []).map((trend) => ({
    week: new Date(trend.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    bookings: trend.count,
  }));

  const dashActivities = dashboard?.activities ?? [];

  const upcomingClasses = dashActivities
    .filter((a) => a.isOpen)
    .slice(0, 4)
    .map((a) => ({
      id: a.slug,
      title: a.name,
      nextSessionDate: "",
      duration: "",
      enrolledCount: a.enrolledUsers,
      maxCapacity: 0,
    }));

  const topPerforming = [...dashActivities]
    .sort((a, b) => b.enrolledUsers - a.enrolledUsers)
    .slice(0, 4)
    .map((a) => ({
      id: a.slug,
      title: a.name,
      enrolledCount: a.enrolledUsers,
      maxCapacity: 0,
      rating: a.meanReviewScore ? Math.round((a.meanReviewScore / 10) * 5 * 10) / 10 : 0,
    }));

  const maxBookings = Math.max(...weeklyBookings.map((w) => w.bookings), 1);

  const latestReviews = dashboard?.reviews?.latest ?? [];
  const notifications = latestReviews.map((r) => ({
    id: r.slug,
    type: "review",
    title: `New review for "${r.activityName}"`,
    body: r.comment,
    timestamp: r.createdAt,
  }));

  const avgRating = overview?.meanReviewScore
    ? Math.round((overview.meanReviewScore / 10) * 5 * 10) / 10
    : 0;

  const statCards: StatCardData[] = [
    {
      label: t("students"),
      value: (overview?.totalEnrollments ?? 0).toLocaleString(),
      icon: Users,
      color: "text-blue-500 bg-blue-50",
    },
    {
      label: t("bookings"),
      value: (overview?.totalEnrollments ?? 0).toLocaleString(),
      icon: CalendarCheck,
      color: "text-coral bg-coral/10",
    },
    {
      label: t("rating"),
      value: avgRating.toFixed(1),
      icon: Star,
      color: "text-amber-500 bg-amber-50",
    },
    {
      label: t("revenue"),
      value: "$0",
      icon: CurrencyDollar,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      label: t("activities"),
      value: String(overview?.totalActivities ?? 0),
      icon: SquaresFour,
      color: "text-purple-500 bg-purple-50",
    },
    {
      label: t("upcoming"),
      value: String(overview?.activeActivities ?? 0),
      icon: Clock,
      color: "text-indigo-500 bg-indigo-50",
    },
  ];

  function formatRelativeTime(timestamp: string) {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return tNotifications("minutesAgo", { count: minutes });
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return tNotifications("hoursAgo", { count: hours });
    const days = Math.floor(hours / 24);
    return tNotifications("daysAgo", { count: days });
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("subtitle")}
        </p>
      </div>

      <DashboardStats statCards={statCards} />

      <div className="grid md:grid-cols-2 gap-6">
        <BookingsTrendChart weeklyBookings={weeklyBookings} maxBookings={maxBookings} />
        <RecentActivity notifications={notifications} formatRelativeTime={formatRelativeTime} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <UpcomingClasses upcomingClasses={upcomingClasses} />
        <TopPerforming topPerforming={topPerforming} />
      </div>
    </div>
  );
}
