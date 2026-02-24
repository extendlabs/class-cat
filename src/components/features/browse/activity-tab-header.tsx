"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterSidebar } from "@/components/features/filter-sidebar";
import type { BrowseFilters } from "@/api/activities";

interface ActivityTabHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  filters: BrowseFilters;
  onFilterChange: (key: string, value: string | string[] | number | undefined) => void;
  onClearFilters: () => void;
}

export function ActivityTabHeader({
  activeTab,
  onTabChange,
  filters,
  onFilterChange,
  onClearFilters,
}: ActivityTabHeaderProps) {
  const t = useTranslations("browse");

  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
            <TabsTrigger value="popular">{t("popular")}</TabsTrigger>
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
          </TabsList>
        </Tabs>
        <Link
          href="/courts"
          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:border-coral/30 hover:text-coral hover:bg-coral/5 transition-all"
        >
          {t("courts")}
        </Link>
      </div>
      <FilterSidebar
        filters={filters}
        onFilterChange={onFilterChange}
        onClear={onClearFilters}
        activeCount={
          [
            filters.priceMin != null || filters.priceMax != null,
            !!filters.distance,
            filters.times?.length ? true : !!filters.time,
            !!filters.groupType,
            !!filters.ageRange,
            filters.minRating != null,
            filters.cities?.length ? true : !!filters.city,
          ].filter(Boolean).length
        }
      />
    </div>
  );
}
