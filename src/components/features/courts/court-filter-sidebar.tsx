"use client";

import { useTranslations } from "next-intl";
import { Faders, Star, StarHalf } from "@phosphor-icons/react";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { CourtFilters } from "@/api/courts";
import type { CourtSurface } from "@/types/court";

const SURFACE_OPTIONS: CourtSurface[] = ["clay", "hard", "grass", "synthetic", "parquet", "rubber"];
const CITY_OPTIONS = ["Warszawa", "Kraków", "Wrocław", "Gdańsk", "Poznań", "Katowice", "Łódź"];

interface CourtFilterSidebarProps {
  filters: CourtFilters;
  onFilterChange: (key: string, value: string | number | boolean | undefined) => void;
  onClear: () => void;
  activeCount: number;
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all border cursor-pointer",
        active
          ? "bg-coral text-white border-coral shadow-sm"
          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      )}
    >
      {label}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h4 className="text-sm font-semibold text-gray-900 mb-3">{children}</h4>;
}

function StarsPicker({ value, onChange }: { value: number | undefined; onChange: (v: number | undefined) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value ?? 0;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative w-7 h-7 cursor-pointer">
          <div
            className="absolute inset-y-0 left-0 w-1/2 z-10"
            role="button"
            tabIndex={0}
            onMouseEnter={() => setHovered(star - 0.5)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(value === star - 0.5 ? undefined : star - 0.5)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(value === star - 0.5 ? undefined : star - 0.5); } }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 z-10"
            role="button"
            tabIndex={0}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(value === star ? undefined : star)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(value === star ? undefined : star); } }}
          />
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-200 hover:scale-110">
            {display >= star ? (
              <Star size={24} weight="fill" className="text-coral transition-colors duration-200" />
            ) : display >= star - 0.5 ? (
              <StarHalf size={24} weight="fill" className="text-coral transition-colors duration-200" />
            ) : (
              <Star size={24} weight="regular" className="text-gray-300 transition-colors duration-200" />
            )}
          </div>
        </div>
      ))}
      {value != null && (
        <span className="ml-2 text-sm text-gray-500">{value}+</span>
      )}
    </div>
  );
}

export function CourtFilterSidebar({ filters, onFilterChange, onClear, activeCount }: CourtFilterSidebarProps) {
  const t = useTranslations("courts");
  const tFilters = useTranslations("filters");

  const priceMin = filters.priceMin ?? 0;
  const priceMax = filters.priceMax ?? 300;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer flex-shrink-0"
        >
          <Faders size={18} className="text-gray-600" />
          <span className="text-gray-700">{tFilters("title")}</span>
          {activeCount > 0 && (
            <span className="bg-coral text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        overlayClassName="bg-transparent"
        className="rounded-l-2xl border-l-0 shadow-[-8px_0_12px_-10px_rgba(0,0,0,0.1)] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>{tFilters("title")}</SheetTitle>
          <SheetDescription>{tFilters("subtitle")}</SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-6 space-y-6">
          {/* Surface */}
          <div>
            <SectionLabel>{t("surfaceLabel")}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {SURFACE_OPTIONS.map((surface) => (
                <FilterPill
                  key={surface}
                  label={t(`surface.${surface}`)}
                  active={filters.surface === surface}
                  onClick={() => onFilterChange("surface", filters.surface === surface ? undefined : surface)}
                />
              ))}
            </div>
          </div>

          {/* Indoor/Outdoor */}
          <div>
            <SectionLabel>{t("indoorOutdoor")}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              <FilterPill
                label={t("all")}
                active={filters.indoor == null}
                onClick={() => onFilterChange("indoor", undefined)}
              />
              <FilterPill
                label={t("indoor")}
                active={filters.indoor === true}
                onClick={() => onFilterChange("indoor", filters.indoor === true ? undefined : true)}
              />
              <FilterPill
                label={t("outdoor")}
                active={filters.indoor === false}
                onClick={() => onFilterChange("indoor", filters.indoor === false ? undefined : false)}
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <SectionLabel>{tFilters("price")}</SectionLabel>
            <div className="px-1">
              <Slider
                min={0}
                max={300}
                step={10}
                value={[priceMin, priceMax]}
                onValueChange={([min, max]: number[]) => {
                  onFilterChange("priceMin", min === 0 && max === 300 ? undefined : min);
                  onFilterChange("priceMax", min === 0 && max === 300 ? undefined : max);
                }}
                className="[&_[data-slot=slider-range]]:bg-coral [&_[data-slot=slider-thumb]]:border-coral"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{priceMin} zł</span>
                <span>{priceMax === 300 ? "300+ zł" : `${priceMax} zł`}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <SectionLabel>{tFilters("rating")}</SectionLabel>
            <StarsPicker
              value={filters.minRating}
              onChange={(v) => onFilterChange("minRating", v)}
            />
          </div>

          {/* City */}
          <div>
            <SectionLabel>{tFilters("city")}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {CITY_OPTIONS.map((city) => (
                <FilterPill
                  key={city}
                  label={city}
                  active={filters.city === city}
                  onClick={() => onFilterChange("city", filters.city === city ? undefined : city)}
                />
              ))}
            </div>
          </div>

          {/* Clear */}
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="w-full py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {tFilters("clearAll")}
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
