"use client";

import { MapTrifold, SpinnerGap } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { AnimateIn } from "@/components/ui/animate-in";
import { MapView } from "@/components/features/map-view";
import { PopularCard } from "@/components/features/browse/popular-card";
import { EmptyState } from "@/components/features/browse/empty-state";
import type { BrowseActivity } from "@/api/mock-data";

interface MobileActivityLayoutProps {
  activities: BrowseActivity[];
  mapActivities: BrowseActivity[];
  activeActivityId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
  onMarkerClick: (id: string) => void;
  showMobileMap: boolean;
  onToggleMobileMap: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function MobileActivityLayout({
  activities,
  mapActivities,
  activeActivityId,
  onHover,
  onLeave,
  onMarkerClick,
  showMobileMap,
  onToggleMobileMap,
  isFetching,
  isFetchingNextPage,
  sentinelRef,
}: MobileActivityLayoutProps) {
  const t = useTranslations("browse");
  return (
    <div className="lg:hidden">
      <div className="mb-4 flex justify-end">
        <button
          onClick={onToggleMobileMap}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:text-coral hover:border-coral/30 transition-colors"
        >
          <MapTrifold size={18} />
          {showMobileMap ? t("hideMap") : t("viewMap")}
        </button>
      </div>
      {showMobileMap && (
        <div className="h-[300px] mb-6 rounded-[24px] overflow-hidden">
          <MapView
            activities={mapActivities}
            activeId={activeActivityId ?? undefined}
            onMarkerClick={onMarkerClick}
          />
        </div>
      )}
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <AnimateIn key={activity.id} delay={index < 4 ? index * 80 : 0}>
            <PopularCard
              activity={activity}
              isActive={activeActivityId === activity.id}
              onHover={() => onHover(activity.id)}
              onLeave={onLeave}
            />
          </AnimateIn>
        ))}
        {activities.length === 0 && !isFetching && (
          <EmptyState />
        )}
        <div ref={sentinelRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-3">
            <SpinnerGap size={24} className="text-coral animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
