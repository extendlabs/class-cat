"use client";

import Image from "next/image";
import { Star, MapPin } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Court } from "@/types/court";

interface CourtCardProps {
  court: Court;
  isActive?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}

export function CourtCard({
  court,
  isActive,
  onClick,
  onHover,
  onLeave,
}: CourtCardProps) {
  const t = useTranslations("courts");

  return (
    <button
      type="button"
      data-court-id={court.id}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "w-full text-left bg-white p-3.5 rounded-xl shadow-[var(--shadow-soft)] border transition-all cursor-pointer group",
        isActive
          ? "border-coral/30 shadow-[var(--shadow-hover)]"
          : "border-gray-100 hover:shadow-[var(--shadow-hover)] hover:border-coral/20"
      )}
    >
      <div className="flex gap-3.5">
        <div className="w-[96px] h-[96px] flex-shrink-0 relative rounded-xl overflow-hidden">
          <Image
            alt={court.name}
            fill
            sizes="96px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            src={court.image}
          />
        </div>
        <div className="flex flex-col justify-between flex-1 py-0.5 min-w-0">
          <div>
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-gray-900 text-[15px] leading-tight group-hover:text-coral transition-colors truncate">
                {court.name}
              </h3>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="inline-block px-2 py-0.5 bg-secondary rounded text-xs font-medium text-gray-600">
                  {t(`surface.${court.surface}`)}
                </span>
                {court.indoor && (
                  <span className="inline-block px-2 py-0.5 bg-coral/10 rounded text-xs font-bold text-coral">
                    {t("indoor")}
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">
              {court.businessName}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 truncate flex items-center gap-1">
              <MapPin size={12} />
              {court.address}
            </p>
          </div>
          <div className="mt-2 flex justify-between items-end">
            <div className="flex items-center gap-1">
              <Star size={14} weight="fill" className="text-coral" />
              <span className="text-sm font-bold text-gray-900">
                {court.rating}
              </span>
              <span className="text-xs text-gray-400">
                ({court.reviewCount})
              </span>
            </div>
            <span className="text-base font-bold text-gray-900">
              {court.pricePerHour} zł
              <span className="text-xs font-normal text-gray-400">
                {t("perHour")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
