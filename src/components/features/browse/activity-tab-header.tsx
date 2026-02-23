"use client";

import { useTranslations } from "next-intl";
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
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="popular">{t("popular")}</TabsTrigger>
          <TabsTrigger value="all">{t("all")}</TabsTrigger>
        </TabsList>
      </Tabs>
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
