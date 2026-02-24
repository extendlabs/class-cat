"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Star, Heart } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { translateAgeRange } from "@/lib/translate-activity";
import { useLikedActivities } from "@/hooks/use-liked-activities";
import type { BrowseActivity } from "@/api/mock-data";

interface PopularCardProps {
  activity: BrowseActivity;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export function PopularCard({
  activity,
  isActive,
  onHover,
  onLeave,
}: PopularCardProps) {
  const t = useTranslations("browse");
  const tAge = useTranslations("ageRange");
  const currency = activity.currency ?? "zł";
  const { toggleLike, isLiked } = useLikedActivities();
  const liked = isLiked(activity.id);
  return (
    <Link
      href={`/activity/${activity.id}`}
      data-activity-id={activity.id}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`bg-white p-3.5 rounded-xl shadow-[var(--shadow-soft)] border ${isActive ? "border-coral/30 shadow-[var(--shadow-hover)]" : "border-gray-100"} hover:shadow-[var(--shadow-hover)] hover:border-coral/20 transition-all cursor-pointer group block`}
    >
      <div className="flex gap-3.5">
        <div className="w-[96px] h-[96px] flex-shrink-0 relative rounded-xl overflow-hidden">
          <Image
            alt={activity.title}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            src={activity.image}
          />
          {activity.spotsLeft != null && activity.spotsLeft <= 8 && (
            <span className="absolute top-1.5 left-1.5 bg-coral text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              {t("spotsLeft", { count: activity.spotsLeft })}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1 py-0.5 min-w-0">
          <div>
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-gray-900 text-[15px] leading-tight group-hover:text-coral transition-colors truncate">
                {activity.title}
              </h3>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {activity.groupType && (
                  <span className="inline-block px-2 py-0.5 bg-secondary rounded text-xs font-medium text-gray-600">
                    {activity.groupType === "both"
                      ? t("groupAndIndividual")
                      : activity.groupType === "group"
                        ? t("group")
                        : t("individual")}
                  </span>
                )}
                <span className="inline-block px-2 py-0.5 bg-coral/10 rounded text-xs font-bold text-coral">
                  {translateAgeRange(activity.ageRange, tAge)}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLike({ id: activity.id, title: activity.title, image: activity.image });
                  }}
                  className="-mr-1 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Heart
                    size={16}
                    weight={liked ? "fill" : "regular"}
                    className="text-coral transition-colors"
                  />
                </button>
              </div>
            </div>
            {activity.provider && (
              <p className="text-xs text-gray-500 mt-1 truncate">
                {activity.provider}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              {activity.address}
            </p>
          </div>
          <div className="mt-2 flex justify-between items-end">
            <div className="flex items-center gap-1">
              <Star size={14} weight="fill" className="text-coral" />
              <span className="text-sm font-bold text-gray-900">
                {activity.rating}
              </span>
              <span className="text-xs text-gray-400">
                ({activity.reviewCount})
              </span>
            </div>
            <span className="text-base font-bold text-gray-900">
              {activity.price === 0 ? (
                <span className="text-sm font-semibold text-green-600">{t("free")}</span>
              ) : (
                <>
                  {activity.price} {currency}<span className="text-xs font-normal text-gray-400">{t("perLesson")}</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
