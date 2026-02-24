"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Star, MapPin } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { cn } from "@/lib/utils";
import type { Court, CourtSport } from "@/types/court";

export function BusinessCourts({ courts }: { courts: Court[] }) {
  const t = useTranslations("courts");
  const [activeSport, setActiveSport] = useState<CourtSport | null>(null);

  const filteredCourts = activeSport
    ? courts.filter((c) => c.sport === activeSport)
    : courts;

  const availableSports = Array.from(new Set(courts.map((c) => c.sport)));

  return (
    <AnimateIn delay={200} className="mt-16">
      <div>
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          {t("businessCourtsTitle")}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
          {t("businessCourtsTitle")}{" "}
          <span className="text-gray-400 font-normal text-lg">
            ({courts.length})
          </span>
        </h3>

        {/* Sport filter chips */}
        {availableSports.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveSport(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                !activeSport
                  ? "bg-coral text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-coral/30"
              )}
            >
              {t("allSports")}
            </button>
            {availableSports.map((sport) => (
              <button
                key={sport}
                onClick={() =>
                  setActiveSport(activeSport === sport ? null : sport)
                }
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                  activeSport === sport
                    ? "bg-coral text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-coral/30"
                )}
              >
                {t(`sport.${sport}`)}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-xl shadow-[var(--shadow-soft)] border border-gray-100 overflow-hidden hover:shadow-[var(--shadow-hover)] hover:border-coral/20 transition-all group"
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={court.image}
                  alt={court.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-2 left-2 bg-coral text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  {t(`sport.${court.sport}`)}
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm text-gray-900 truncate group-hover:text-coral transition-colors">
                  {court.name}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5 truncate flex items-center gap-1">
                  <MapPin size={10} />
                  {court.address}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Star size={12} weight="fill" className="text-coral" />
                    <span className="text-xs font-bold text-gray-900">
                      {court.rating}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {court.pricePerHour} zł
                    <span className="text-xs font-normal text-gray-400">
                      {t("perHour")}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
