"use client";

import { useTranslations } from "next-intl";
import { BookOpen, HourglassSimple, ClockCounterClockwise } from "@phosphor-icons/react";
import { EnrollmentCard } from "./enrollment-card";
import type { EnrollmentRequest } from "@/types/enrollment";

function EmptyState({ icon: Icon, message }: { icon: React.ComponentType<{ size: number; className?: string }>; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-200 rounded-2xl">
      <Icon size={32} className="text-gray-300 mb-2" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

export function MyClassesTab({ enrollments }: { enrollments: EnrollmentRequest[] }) {
  const t = useTranslations("profile.myClasses");
  const today = new Date().toISOString().split("T")[0];

  const upcoming = enrollments.filter(
    (e) => e.status === "accepted" && e.cohortEndDate && e.cohortEndDate >= today
  );
  const pending = enrollments.filter((e) => e.status === "pending");
  const past = enrollments.filter(
    (e) =>
      e.status === "rejected" ||
      (e.status === "accepted" && e.cohortEndDate && e.cohortEndDate < today)
  );

  return (
    <div className="space-y-8">
      {/* Upcoming */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          <BookOpen size={16} className="text-coral" />
          {t("upcoming")}
        </h3>
        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((e) => (
              <EnrollmentCard key={e.id} enrollment={e} variant="upcoming" />
            ))}
          </div>
        ) : (
          <EmptyState icon={BookOpen} message={t("noUpcoming")} />
        )}
      </section>

      {/* Pending */}
      {pending.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
            <HourglassSimple size={16} className="text-amber-500" />
            {t("pending")}
          </h3>
          <div className="space-y-3">
            {pending.map((e) => (
              <EnrollmentCard key={e.id} enrollment={e} variant="pending" />
            ))}
          </div>
        </section>
      )}

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
            <ClockCounterClockwise size={16} className="text-gray-400" />
            {t("past")}
          </h3>
          <div className="space-y-3">
            {past.map((e) => (
              <EnrollmentCard key={e.id} enrollment={e} variant="past" />
            ))}
          </div>
        </section>
      )}

      {enrollments.length === 0 && (
        <EmptyState icon={BookOpen} message={t("noUpcoming")} />
      )}
    </div>
  );
}
