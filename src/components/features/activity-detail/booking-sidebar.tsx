"use client";

import { useTranslations } from "next-intl";
import {
  Star,
  ShieldCheck,
  CalendarBlank,
  CaretDown,
  BookOpen,
} from "@phosphor-icons/react";
import type { Activity, ActivityDetail } from "@/types/activity";
import { BRAND_ACCENT } from "@/lib/constants";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const ACCENT = BRAND_ACCENT;

function RelatedCard({ activity }: { activity: Activity }) {
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
          sizes="80px"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-coral transition-colors">
          {activity.title}
        </h4>
        <div className="flex items-center gap-1 mt-1">
          <Star size={14} weight="fill" className="text-coral" />
          <span className="text-xs font-bold text-gray-900">
            {activity.rating}
          </span>
          <span className="text-[10px] text-gray-400">
            ({activity.reviewCount})
          </span>
        </div>
        <div className="mt-2 text-sm font-bold text-gray-900">
          {activity.priceAmount} {currency}
          <span className="text-[10px] text-gray-400 font-normal">
            {tCommon("perSession")}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BookingSidebar({
  activity,
  selectedTime,
  onSelectTime,
}: {
  activity: ActivityDetail;
  selectedTime: number;
  onSelectTime: (index: number) => void;
}) {
  const t = useTranslations("activity");
  const tCommon = useTranslations("common");
  const currency = activity.currency ?? "zł";
  return (
    <div className="sticky top-20 space-y-6">
      {/* Booking Card */}
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
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-coral/8">
            <div className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
            <span className="text-[10px] font-bold uppercase text-coral tracking-wide">
              {t("quickResponse")}
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              {t("preferredDate")}
            </span>
            <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl hover:border-coral/40 hover:shadow-[var(--shadow-hover)] transition-all group">
              <div className="flex items-center gap-3">
                <CalendarBlank
                  size={18}
                  className="text-gray-400 group-hover:text-coral transition-colors"
                />
                <span className="text-sm font-medium text-gray-700">
                  {activity.nextDate}
                </span>
              </div>
              <CaretDown size={16} className="text-gray-400" />
            </button>
          </div>

          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              {t("preferredTime")}
            </span>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {activity.availableTimes.map((time, i) => (
                <button
                  key={time}
                  onClick={() => onSelectTime(i)}
                  className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    selectedTime === i
                      ? "border-coral bg-coral/5 text-coral font-bold shadow-[var(--shadow-hover)]"
                      : "border-gray-100 hover:border-coral/30 text-gray-600"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-1">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ((activity.totalSlots -
                        activity.slotsRemaining) /
                        activity.totalSlots) *
                      100
                    }%`,
                    backgroundColor: ACCENT,
                  }}
                />
              </div>
              <span className="text-[11px] font-bold whitespace-nowrap text-coral">
                {activity.slotsRemaining}/{activity.totalSlots} {tCommon("left")}
              </span>
            </div>
          </div>
        </div>

        <button
          className="w-full text-white py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-4 bg-coral hover:bg-coral-hover"
          style={{
            boxShadow: `0 10px 25px -5px ${ACCENT}33`,
          }}
        >
          {t("sendInquiry")}
        </button>

        <p className="text-center text-[12px] text-gray-400 leading-relaxed mb-6 italic">
          {t("inquiryNote")}
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
            <ShieldCheck
              size={20}
              weight="fill"
              className="text-white"
            />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900">
              {t("guarantee")}
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {t("guaranteeDescription")}
            </p>
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
