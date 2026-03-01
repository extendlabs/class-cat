"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  CalendarCheck,
  Star,
  ChatCircle,
  Clock,
  CalendarBlank,
  Briefcase,
  Handshake,
  Envelope,
  CurrencyCircleDollar,
  Buildings,
  ArrowRight,
  Lightning,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { fetchInstructorStats, fetchInstructorProfile, fetchSlotProposals, fetchInstructorAffiliations } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { AnimateIn } from "@/components/ui/animate-in";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorDashboardPage() {
  const t = useTranslations("instructorDashboard");
  const { user } = useAuth();
  const instructorId = user?.instructorId ?? "inst-6";

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["instructor-stats", instructorId],
    queryFn: () => fetchInstructorStats(instructorId),
  });

  const { data: instructor, isLoading: profileLoading } = useQuery({
    queryKey: ["instructor-profile", instructorId],
    queryFn: () => fetchInstructorProfile(instructorId),
  });

  const { data: proposals } = useQuery({
    queryKey: ["slot-proposals", instructorId],
    queryFn: () => fetchSlotProposals(instructorId),
    enabled: !!instructorId,
  });

  const { data: affiliations } = useQuery({
    queryKey: ["instructor-affiliations", instructorId],
    queryFn: () => fetchInstructorAffiliations(instructorId),
    enabled: !!instructorId,
  });

  const pendingProposals = proposals?.filter((p) => p.status === "pending") ?? [];
  const pendingAffiliations = affiliations?.filter((a) => a.status === "pending") ?? [];

  const isLoading = statsLoading || profileLoading;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  const statCards = [
    { label: t("students"), value: stats?.totalStudents.toLocaleString() ?? "0", icon: Users, color: "text-blue-500 bg-blue-50" },
    { label: t("activeClasses"), value: String(stats?.activeClasses ?? 0), icon: CalendarCheck, color: "text-coral bg-coral/10" },
    { label: t("rating"), value: stats?.avgRating.toFixed(1) ?? "0", icon: Star, color: "text-amber-500 bg-amber-50" },
    { label: t("reviews"), value: String(stats?.totalReviews ?? 0), icon: ChatCircle, color: "text-purple-500 bg-purple-50" },
    { label: t("upcoming"), value: String(stats?.upcomingClasses ?? 0), icon: Clock, color: "text-indigo-500 bg-indigo-50" },
    { label: t("freelanceClasses"), value: String(stats?.freelanceClasses ?? 0), icon: Briefcase, color: "text-teal-500 bg-teal-50" },
    { label: t("partnerships"), value: String(stats?.affiliatedBusinesses ?? 0), icon: Handshake, color: "text-emerald-500 bg-emerald-50" },
    { label: t("pendingProposals"), value: String(pendingProposals.length), icon: Envelope, color: "text-orange-500 bg-orange-50" },
    { label: t("monthlyEarnings"), value: `${(stats?.monthlyEarnings ?? 0).toLocaleString()} zł`, icon: CurrencyCircleDollar, color: "text-green-500 bg-green-50" },
    { label: t("freelanceIncome"), value: `${(stats?.freelanceEarnings ?? 0).toLocaleString()} zł`, icon: Briefcase, color: "text-teal-500 bg-teal-50" },
    { label: t("businessIncome"), value: `${(stats?.businessEarnings ?? 0).toLocaleString()} zł`, icon: Buildings, color: "text-blue-500 bg-blue-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      {/* Stat Cards */}
      <AnimateIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-[var(--shadow-soft)] border border-gray-100/60">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color} mb-2`}>
                <stat.icon size={16} weight="fill" />
              </div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </AnimateIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <AnimateIn delay={100}>
          <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60 h-full">
            <div className="flex items-center gap-2 mb-6">
              <CalendarBlank size={18} className="text-coral" weight="bold" />
              <h3 className="text-sm font-bold text-gray-900">{t("upcomingClasses")}</h3>
            </div>
            <div className="space-y-3">
              {instructor?.classes.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <CalendarCheck size={18} className="text-coral" weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.location} &middot; {activity.spotsLeft ? t("spotsLeft", { count: activity.spotsLeft }) : t("full")}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] bg-coral/10 text-coral border-0">
                    {activity.price}
                  </Badge>
                </div>
              ))}
              {(!instructor?.classes || instructor.classes.length === 0) && (
                <p className="text-sm text-gray-400 text-center py-6">{t("noUpcoming")}</p>
              )}
            </div>
          </div>
        </AnimateIn>

        {/* Recent Reviews */}
        <AnimateIn delay={150}>
          <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60 h-full">
            <div className="flex items-center gap-2 mb-6">
              <Star size={18} className="text-coral" weight="bold" />
              <h3 className="text-sm font-bold text-gray-900">{t("recentReviews")}</h3>
            </div>
            <div className="space-y-4">
              {instructor?.reviews.slice(0, 4).map((review) => (
                <div key={review.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-coral">
                    {review.authorInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{review.authorName}</p>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={10} weight="fill" className="text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{review.text}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{review.date}</span>
                </div>
              ))}
              {(!instructor?.reviews || instructor.reviews.length === 0) && (
                <p className="text-sm text-gray-400 text-center py-6">{t("noReviews")}</p>
              )}
            </div>
          </div>
        </AnimateIn>

        {/* Pending Actions */}
        <AnimateIn delay={200}>
          <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60 h-full">
            <div className="flex items-center gap-2 mb-6">
              <Lightning size={18} className="text-coral" weight="bold" />
              <h3 className="text-sm font-bold text-gray-900">{t("pendingActions")}</h3>
            </div>
            <div className="space-y-3">
              {pendingProposals.length > 0 && (
                <Link href="/profile/instructor/proposals" className="flex items-center gap-3 p-3 rounded-xl bg-orange-50/80 hover:bg-orange-100/80 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Envelope size={18} className="text-orange-500" weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{t("pendingProposalsAction", { count: pendingProposals.length })}</p>
                    <div className="mt-1 space-y-0.5">
                      {pendingProposals.slice(0, 2).map((p) => (
                        <p key={p.id} className="text-xs text-gray-500 truncate">
                          {p.activityTitle} · {p.businessName} · {p.date}
                        </p>
                      ))}
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-coral transition-colors flex-shrink-0" />
                </Link>
              )}

              {pendingAffiliations.length > 0 && (
                <Link href="/profile/instructor/affiliations" className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Handshake size={18} className="text-emerald-500" weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{t("pendingAffiliationsAction", { count: pendingAffiliations.length })}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-coral transition-colors flex-shrink-0" />
                </Link>
              )}

              {pendingProposals.length === 0 && pendingAffiliations.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">{t("noPending")}</p>
              )}
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
