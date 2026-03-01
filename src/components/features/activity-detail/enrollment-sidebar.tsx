"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, BookOpen, ChatCircle, Star } from "@phosphor-icons/react";
import type { ActivityDetail } from "@/types/activity";
import { useEnrollment } from "@/hooks/use-enrollment";
import { Link } from "@/i18n/navigation";
import { useChatSidebar } from "@/components/features/chat-sidebar-context";
import Image from "next/image";
import { BRAND_ACCENT } from "@/lib/constants";
import { CohortSelector } from "./cohort-selector";

function RelatedCard({ activity }: { activity: import("@/types/activity").Activity }) {
  const tCommon = useTranslations("common");
  const currency = activity.currency ?? "zł";
  return (
    <Link
      href={`/activity/${activity.id}`}
      className="group bg-white rounded-2xl border border-gray-100 p-3 flex gap-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:border-coral/20 transition-all"
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-coral transition-colors">
          {activity.title}
        </h4>
        <div className="flex items-center gap-1 mt-1">
          <Star size={14} weight="fill" className="text-coral" />
          <span className="text-xs font-bold text-gray-900">{activity.rating}</span>
          <span className="text-[10px] text-gray-400">({activity.reviewCount})</span>
        </div>
        <div className="mt-2 text-sm font-bold text-gray-900">
          {activity.priceAmount} {currency}
          <span className="text-[10px] text-gray-400 font-normal">{tCommon("perSession")}</span>
        </div>
      </div>
    </Link>
  );
}

export function EnrollmentSidebar({
  activity,
}: {
  activity: ActivityDetail;
}) {
  const t = useTranslations("activity");
  const tCommon = useTranslations("common");
  const { openToConversation } = useChatSidebar();
  const currency = activity.currency ?? "zł";
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);

  const { cohorts, enrollment, apply, isApplying, applyResult } = useEnrollment(activity.id);

  const handleApply = () => {
    if (!selectedCohortId) return;
    apply(selectedCohortId);
  };

  // Determine button state
  const isEnrolled = enrollment?.status === "accepted";
  const isPending = enrollment?.status === "pending";
  const justApplied = !!applyResult;

  const handleOpenChat = () => {
    if (enrollment?.conversationId) {
      openToConversation(enrollment.conversationId);
    } else if (applyResult?.conversation?.id) {
      openToConversation(applyResult.conversation.id);
    }
  };

  return (
    <div className="sticky top-20 space-y-6">
      {/* Enrollment Card */}
      <div className="bg-white rounded-3xl shadow-[var(--shadow-soft)] border border-gray-100 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-3xl font-bold text-gray-900">
              {activity.priceAmount} {currency}
            </span>
            <span className="text-gray-400 text-sm">
              {" "}{tCommon("perSession")}
            </span>
          </div>
        </div>

        {/* Cohort Selector */}
        {cohorts.length > 0 && !isEnrolled && !isPending && !justApplied && (
          <div className="mb-6">
            <CohortSelector
              cohorts={cohorts}
              selectedCohortId={selectedCohortId}
              onSelect={setSelectedCohortId}
            />
          </div>
        )}

        {/* Capacity bar */}
        <div className="flex items-center gap-2 px-1 mb-6">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((activity.totalSlots - activity.slotsRemaining) / activity.totalSlots) * 100}%`,
                backgroundColor: BRAND_ACCENT,
              }}
            />
          </div>
          <span className="text-[11px] font-bold whitespace-nowrap text-coral">
            {activity.slotsRemaining}/{activity.totalSlots} {tCommon("left")}
          </span>
        </div>

        {/* Action Button */}
        {isEnrolled ? (
          <button
            onClick={handleOpenChat}
            className="w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-4 bg-emerald-500 hover:bg-emerald-600"
            style={{ boxShadow: `0 10px 25px -5px rgba(16,185,129,0.3)` }}
          >
            <ChatCircle size={20} weight="fill" />
            {t("enrolledOpenChat")}
          </button>
        ) : isPending || justApplied ? (
          <button
            disabled
            className="w-full text-gray-500 py-4 rounded-xl font-bold text-lg mb-4 bg-gray-100 cursor-not-allowed"
          >
            {t("applicationPending")}
          </button>
        ) : (
          <button
            onClick={handleApply}
            disabled={!selectedCohortId || isApplying}
            className="w-full text-white py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-4 bg-coral hover:bg-coral-hover disabled:opacity-50 disabled:pointer-events-none"
            style={{ boxShadow: `0 10px 25px -5px ${BRAND_ACCENT}33` }}
          >
            {isApplying ? tCommon("loading") : t("applyNow")}
          </button>
        )}

        <p className="text-center text-[12px] text-gray-400 leading-relaxed mb-6 italic">
          {t("enrollmentNote")}
        </p>

        <div className="border-t border-gray-100 pt-5">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-coral/8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <BookOpen size={12} className="text-coral" />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t("noPaymentNote")}
            </p>
          </div>
        </div>
      </div>

      {/* Guarantee badge */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[var(--shadow-soft)]">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-coral to-coral-hover rounded-xl flex items-center justify-center shadow-sm">
            <ShieldCheck size={20} weight="fill" className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900">{t("guarantee")}</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">{t("guaranteeDescription")}</p>
          </div>
        </div>
      </div>

      {/* Related Activities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            {t("similarActivities")}
          </h3>
          <Link
            href="/?tab=all"
            className="text-xs font-bold text-coral hover:text-coral-hover transition-colors"
          >
            {tCommon("viewAll")}
          </Link>
        </div>
        <div className="space-y-3">
          {activity.relatedActivities.map((rel) => (
            <RelatedCard key={rel.id} activity={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}
