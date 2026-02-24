"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Faders, NavigationArrow, CaretDown, Star, StarHalf } from "@phosphor-icons/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FILTER_DISTANCES,
  FILTER_TIMES,
  FILTER_AGE_RANGES,
  FILTER_CITIES,
  FILTER_GROUP_TYPES,
} from "@/lib/filter-options";
import type { BrowseFilters } from "@/api/activities";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: BrowseFilters;
  onFilterChange: (key: string, value: string | string[] | number | undefined) => void;
  onClear: () => void;
  activeCount: number;
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all border cursor-pointer",
        active
          ? "bg-coral text-white border-coral shadow-sm"
          : "bg-white text-gray-600 border-gray-200 hover:border-coral/30 hover:text-coral hover:bg-coral/5"
      )}
    >
      {label}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h4 className="text-sm font-semibold text-gray-900 mb-3">{children}</h4>;
}

function StarsPicker({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value ?? 0;

  const handleClick = (step: number) => {
    onChange(value === step ? undefined : step);
  };

  const handleHover = (step: number) => {
    setHovered(step);
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative w-7 h-7 cursor-pointer">
          {/* Left half */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 z-10"
            role="button"
            tabIndex={0}
            onMouseEnter={() => handleHover(star - 0.5)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(star - 0.5)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(star - 0.5); } }}
          />
          {/* Right half */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 z-10"
            role="button"
            tabIndex={0}
            onMouseEnter={() => handleHover(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(star)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(star); } }}
          />
          {/* Star icon */}
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

export function FilterSidebar({ filters, onFilterChange, onClear, activeCount }: FilterSidebarProps) {
  const t = useTranslations("filters");
  const tCommon = useTranslations("common");
  const [locationGranted, setLocationGranted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // Multiselect times
  const activeTimes = filters.times ?? (filters.time ? [filters.time] : []);
  const toggleTime = useCallback((t: string) => {
    const next = activeTimes.includes(t)
      ? activeTimes.filter((v) => v !== t)
      : [...activeTimes, t];
    onFilterChange("times", next.length > 0 ? next : undefined);
  }, [activeTimes, onFilterChange]);

  // Multiselect cities
  const activeCities = filters.cities ?? (filters.city ? [filters.city] : []);
  const toggleCity = useCallback((c: string) => {
    const next = activeCities.includes(c)
      ? activeCities.filter((v) => v !== c)
      : [...activeCities, c];
    onFilterChange("cities", next.length > 0 ? next : undefined);
  }, [activeCities, onFilterChange]);

  // Price slider
  const priceMin = filters.priceMin ?? 0;
  const priceMax = filters.priceMax ?? 70;

  const handleRequestLocation = useCallback(() => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationGranted(true);
        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);
      }
    );
  }, []);

  // Time popover label
  const timeLabel = activeTimes.length > 0
    ? activeTimes.map((t) => {
        const found = FILTER_TIMES.find((ft) => ft.value === t);
        // Show short name in trigger (e.g. "Morning" not "Morning (6:00–12:00)")
        return found ? found.value.charAt(0).toUpperCase() + found.value.slice(1) : t;
      }).join(", ")
    : t("selectTimes");

  // City popover label
  const cityLabel = activeCities.length > 0
    ? activeCities.length <= 2
      ? activeCities.join(", ")
      : t("citiesCount", { count: activeCities.length })
    : t("selectCities");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-gray-200 bg-white hover:border-coral/30 hover:text-coral hover:bg-coral/5 transition-all cursor-pointer"
        >
          <Faders size={18} className="text-gray-600" />
          <span className="text-gray-700">{t("title")}</span>
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
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("subtitle")}</SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-6 space-y-6">
          {/* 1. Price — dual-thumb slider */}
          <div>
            <SectionLabel>{t("price")}</SectionLabel>
            <div className="px-1">
              <Slider
                min={0}
                max={70}
                step={5}
                value={[priceMin, priceMax]}
                onValueChange={([min, max]: number[]) => {
                  onFilterChange("priceMin", min === 0 && max === 70 ? undefined : min);
                  onFilterChange("priceMax", min === 0 && max === 70 ? undefined : max);
                }}
                className="[&_[data-slot=slider-range]]:bg-coral [&_[data-slot=slider-thumb]]:border-coral"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{priceMin} {tCommon("zl")}</span>
                <span>{priceMax === 70 ? `70+ ${tCommon("zl")}` : `${priceMax} ${tCommon("zl")}`}</span>
              </div>
            </div>
          </div>

          {/* 2. Distance — gated behind geolocation */}
          <div>
            <SectionLabel>{t("distance")}</SectionLabel>
            {!locationGranted ? (
              <button
                type="button"
                onClick={handleRequestLocation}
                disabled={locationLoading}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-gray-200 bg-white hover:border-coral/30 hover:bg-coral/5 text-gray-600 hover:text-coral transition-all cursor-pointer disabled:opacity-50"
              >
                <NavigationArrow size={16} />
                {locationLoading ? t("requesting") : t("shareLocation")}
              </button>
            ) : (
              <div className="flex flex-wrap gap-2">
                {FILTER_DISTANCES.map((d) => (
                  <FilterPill
                    key={d.value}
                    label={d.label}
                    active={filters.distance === d.value}
                    onClick={() =>
                      onFilterChange("distance", filters.distance === d.value ? undefined : d.value)
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* 3. Time — popover with checkboxes (shows hour ranges) */}
          <div>
            <SectionLabel>{t("time")}</SectionLabel>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center justify-between gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-all cursor-pointer w-full max-w-[260px]",
                    activeTimes.length > 0
                      ? "bg-coral/5 text-coral border-coral/30"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  )}
                >
                  <span className="truncate">{timeLabel}</span>
                  <CaretDown size={14} className="flex-shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="start">
                {FILTER_TIMES.map((t) => (
                  <label
                    key={t.value}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Checkbox
                      checked={activeTimes.includes(t.value)}
                      onCheckedChange={() => toggleTime(t.value)}
                      className="data-[state=checked]:bg-coral data-[state=checked]:border-coral"
                    />
                    <span className="text-sm text-gray-700">{t.label}</span>
                  </label>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* 4. Group Type — radio pills */}
          <div>
            <SectionLabel>{t("groupType")}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {FILTER_GROUP_TYPES.map((g) => (
                <FilterPill
                  key={g.value}
                  label={g.label}
                  active={
                    g.value === "both"
                      ? !filters.groupType || filters.groupType === "both"
                      : filters.groupType === g.value
                  }
                  onClick={() =>
                    onFilterChange("groupType", g.value === "both" ? undefined : g.value)
                  }
                />
              ))}
            </div>
          </div>

          {/* 5. Age Range — pills */}
          <div>
            <SectionLabel>{t("ageRange")}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {FILTER_AGE_RANGES.map((a) => (
                <FilterPill
                  key={a.value}
                  label={a.label}
                  active={filters.ageRange === a.value}
                  onClick={() =>
                    onFilterChange("ageRange", filters.ageRange === a.value ? undefined : a.value)
                  }
                />
              ))}
            </div>
          </div>

          {/* 6. Rating — stars picker */}
          <div>
            <SectionLabel>{t("rating")}</SectionLabel>
            <StarsPicker
              value={filters.minRating}
              onChange={(v) => onFilterChange("minRating", v)}
            />
          </div>

          {/* 7. City — multi-select dropdown */}
          <div>
            <SectionLabel>{t("city")}</SectionLabel>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center justify-between gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-all cursor-pointer w-full max-w-[260px]",
                    activeCities.length > 0
                      ? "bg-coral/5 text-coral border-coral/30"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  )}
                >
                  <span className="truncate">{cityLabel}</span>
                  <CaretDown size={14} className="flex-shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                {FILTER_CITIES.map((c) => (
                  <label
                    key={c.value}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Checkbox
                      checked={activeCities.includes(c.value)}
                      onCheckedChange={() => toggleCity(c.value)}
                      className="data-[state=checked]:bg-coral data-[state=checked]:border-coral"
                    />
                    <span className="text-sm text-gray-700">{c.label}</span>
                  </label>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* 8. Clear all */}
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="w-full py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {t("clearAll")}
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
