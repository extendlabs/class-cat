"use client";

import { SpinnerGap } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { PopularCard } from "@/components/features/browse/popular-card";
import { EmptyState } from "@/components/features/browse/empty-state";
import type { BrowseActivity } from "@/api/mock-data";

interface DesktopActivityListProps {
  activities: BrowseActivity[];
  activeActivityId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  listRef: React.RefObject<HTMLDivElement | null>;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function DesktopActivityList({
  activities,
  activeActivityId,
  onHover,
  onLeave,
  isFetching,
  isFetchingNextPage,
  listRef,
  sentinelRef,
}: DesktopActivityListProps) {
  return (
    <div className="col-span-5 flex flex-col h-full overflow-hidden">
      <div ref={listRef} className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar pb-4 scroll-smooth">
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
