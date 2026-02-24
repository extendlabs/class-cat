"use client";

import { SpinnerGap } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { CourtCard } from "./court-card";
import { EmptyState } from "@/components/features/browse/empty-state";
import type { Court } from "@/types/court";

interface DesktopCourtListProps {
  courts: Court[];
  selectedCourtId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string) => void;
  onLeave: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  listRef: React.RefObject<HTMLDivElement | null>;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function DesktopCourtList({
  courts,
  selectedCourtId,
  onSelect,
  onHover,
  onLeave,
  isFetching,
  isFetchingNextPage,
  listRef,
  sentinelRef,
}: DesktopCourtListProps) {
  return (
    <div className="col-span-5 flex flex-col h-full overflow-hidden">
      <div ref={listRef} className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar pb-4 scroll-smooth">
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
