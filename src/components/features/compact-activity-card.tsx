"use client";

import { Star } from "@phosphor-icons/react";
import type { Activity } from "@/types/activity";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function CompactActivityCard({ activity }: { activity: Activity }) {
  const t = useTranslations("browse");
  const currency = activity.currency ?? "zł";
  return (
    <Link
      href={`/activity/${activity.id}`}
      className="group bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:border-coral/20 transition-all overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {activity.priceAmount !== undefined && (
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-gray-900 shadow-sm">
            {activity.priceAmount === 0 ? t("free") : `${activity.priceAmount} ${currency}`}
          </div>
        )}
      </div>
      <div className="p-3">
        <h4 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-coral transition-colors">
          {activity.title}
        </h4>
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} weight="fill" className="text-coral" />
          <span className="text-xs font-bold text-gray-900">{activity.rating}</span>
          <span className="text-[10px] text-gray-400">({activity.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
}
