"use client";

import { MapTrifold, SpinnerGap } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { AnimateIn } from "@/components/ui/animate-in";
import { MapView } from "@/components/features/map-view";
import { CourtCard } from "./court-card";
import { EmptyState } from "@/components/features/browse/empty-state";
import type { Court, TimeSlotAvailability } from "@/types/court";
import type { BrowseActivity } from "@/api/mock-data";
import { CourtSchedulePanel } from "./court-schedule-panel";

interface MobileCourtLayoutProps {
  courts: Court[];
  mapActivities: BrowseActivity[];
  selectedCourtId: string | null;
  selectedCourt: Court | null;
  onSelect: (id: string) => void;
  onHover: (id: string) => void;
  onLeave: () => void;
  onMarkerClick: (id: string) => void;
  showMobileMap: boolean;
  onToggleMobileMap: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  // Schedule props
  weekStart: string;
  slots: TimeSlotAvailability[];
  selectedSlots: { date: string; hour: number }[];
  onToggleSlot: (date: string, hour: number) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onClose: () => void;
  isSlotsLoading: boolean;
}

export function MobileCourtLayout({
  courts,
  mapActivities,
  selectedCourtId,
  selectedCourt,
  onSelect,
  onHover,
  onLeave,
  onMarkerClick,
  showMobileMap,
  onToggleMobileMap,
  isFetching,
  isFetchingNextPage,
  sentinelRef,
  weekStart,
  slots,
  selectedSlots,
  onToggleSlot,
  onPrevWeek,
  onNextWeek,
  onClose,
  isSlotsLoading,
}: MobileCourtLayoutProps) {
  const t = useTranslations("browse");

  return (
    <div className="lg:hidden">
      {/* Schedule panel when court is selected */}
      {selectedCourt && (
        <div className="mb-6 h-[500px]">
          <CourtSchedulePanel
            court={selectedCourt}
            weekStart={weekStart}
            slots={slots}
            selectedSlots={selectedSlots}
            onToggleSlot={onToggleSlot}
            onPrevWeek={onPrevWeek}
            onNextWeek={onNextWeek}
            onClose={onClose}
            isLoading={isSlotsLoading}
          />
        </div>
      )}

      {/* Map toggle */}
      {!selectedCourt && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={onToggleMobileMap}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:text-coral hover:border-coral/30 transition-colors"
          >
            <MapTrifold size={18} />
            {showMobileMap ? t("hideMap") : t("viewMap")}
          </button>
        </div>
      )}

      {showMobileMap && !selectedCourt && (
        <div className="h-[300px] mb-6 rounded-[24px] overflow-hidden">
          <MapView
            activities={mapActivities}
            activeId={selectedCourtId ?? undefined}
            onMarkerClick={onMarkerClick}
          />
        </div>
      )}

      <div className="space-y-3">
        {courts.map((court, index) => (
          <AnimateIn key={court.id} delay={index < 4 ? index * 80 : 0}>
            <CourtCard
              court={court}
              isActive={selectedCourtId === court.id}
              onClick={() => onSelect(court.id)}
              onHover={() => onHover(court.id)}
              onLeave={onLeave}
            />
          </AnimateIn>
        ))}
        {courts.length === 0 && !isFetching && <EmptyState />}
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
