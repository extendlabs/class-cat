"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CaretLeft,
  CaretRight,
  SpinnerGap,
  ArrowLeft,
  Lock,
  LockOpen,
  User,
  CalendarBlank,
  ListBullets,
  Repeat,
} from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  fetchBusinessCourt,
  fetchCourtWeekSlots,
  fetchSlotDetails,
  toggleSingleCourtSlot,
} from "@/api/business-portal";
import { DailyAgendaView } from "@/components/features/business-courts/schedule/daily-agenda-view";
import { RecurringBlocksDialog } from "@/components/features/business-courts/schedule/recurring-blocks-dialog";
import type { TimeSlotAvailability, CourtSlotDetail } from "@/types/court";

type ViewMode = "week" | "agenda";

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7);
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatWeekRange(weekStart: string): string {
  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${start.getDate()} ${months[start.getMonth()]} – ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`;
}

function formatSlotDay(dateStr: string): string {
  const d = new Date(dateStr);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${dayNames[d.getDay()]} ${d.getDate()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function PageContent({ courtId }: { courtId: string }) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const courtsPath = pathname.split("/").slice(0, -2).join("/");

  const [weekStart, setWeekStart] = useState(() => {
    const monday = getMonday(new Date());
    return monday.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; hour: number } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [agendaDate, setAgendaDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [recurringOpen, setRecurringOpen] = useState(false);

  const { data: court, isLoading: courtLoading } = useQuery({
    queryKey: ["business-court", courtId],
    queryFn: () => fetchBusinessCourt(courtId),
  });

  const totalCourts = court?.courtCount ?? 1;

  const { data: slots = [] } = useQuery({
    queryKey: ["court-week-slots", courtId, weekStart],
    queryFn: () => fetchCourtWeekSlots(courtId, weekStart),
    enabled: !!court,
    placeholderData: keepPreviousData,
  });

  const { data: slotDetails = [] } = useQuery({
    queryKey: ["slot-details", courtId, weekStart, selectedSlot?.date, selectedSlot?.hour],
    queryFn: () => fetchSlotDetails(courtId, weekStart, selectedSlot!.date, selectedSlot!.hour),
    enabled: !!selectedSlot,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ courtIndex, direction }: { courtIndex: number; direction: "block" | "unblock" }) =>
      toggleSingleCourtSlot(courtId, weekStart, selectedSlot!.date, selectedSlot!.hour, courtIndex, direction),
    onSuccess: ({ slots: newSlots, details: newDetails }) => {
      queryClient.setQueryData(["court-week-slots", courtId, weekStart], newSlots);
      queryClient.setQueryData(
        ["slot-details", courtId, weekStart, selectedSlot?.date, selectedSlot?.hour],
        newDetails
      );
    },
  });

  const days = useMemo(() => {
    const result: string[] = [];
    const start = new Date(weekStart);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      result.push(d.toISOString().split("T")[0]);
    }
    return result;
  }, [weekStart]);

  const slotMap = useMemo(() => {
    const map = new Map<string, TimeSlotAvailability>();
    for (const s of slots) {
      map.set(`${s.date}-${s.hour}`, s);
    }
    return map;
  }, [slots]);

  // Agenda view: compute week start for the selected agenda date
  const agendaWeekStart = useMemo(() => {
    const d = new Date(agendaDate);
    const monday = getMonday(d);
    return monday.toISOString().split("T")[0];
  }, [agendaDate]);

  const { data: agendaSlots = [] } = useQuery({
    queryKey: ["court-week-slots", courtId, agendaWeekStart],
    queryFn: () => fetchCourtWeekSlots(courtId, agendaWeekStart),
    enabled: !!court && viewMode === "agenda",
    placeholderData: keepPreviousData,
  });

  // Detail cache for agenda view — prefetch all hours for the selected day
  const { data: agendaDayDetails = new Map<number, CourtSlotDetail[]>() } = useQuery({
    queryKey: ["agenda-day-details", courtId, agendaWeekStart, agendaDate],
    queryFn: async () => {
      const daySlots = agendaSlots.filter((s) => s.date === agendaDate && !s.closed);
      const results = new Map<number, CourtSlotDetail[]>();
      for (const s of daySlots) {
        const details = await fetchSlotDetails(courtId, agendaWeekStart, agendaDate, s.hour);
        results.set(s.hour, details);
      }
      return results;
    },
    enabled: !!court && viewMode === "agenda" && agendaSlots.length > 0,
  });

  const getAgendaDetails = (date: string, hour: number): CourtSlotDetail[] => {
    return agendaDayDetails.get(hour) ?? [];
  };

  const prevAgendaDay = () => {
    const d = new Date(agendaDate);
    d.setDate(d.getDate() - 1);
    setAgendaDate(d.toISOString().split("T")[0]);
  };

  const nextAgendaDay = () => {
    const d = new Date(agendaDate);
    d.setDate(d.getDate() + 1);
    setAgendaDate(d.toISOString().split("T")[0]);
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr === today;
  };

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d.toISOString().split("T")[0]);
  };

  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d.toISOString().split("T")[0]);
  };

  if (courtLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <SpinnerGap size={32} className="text-coral animate-spin" />
      </div>
    );
  }

  if (!court) {
    return (
      <div className="max-w-7xl mx-auto space-y-4">
        <Link
          href={courtsPath}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-coral transition-colors"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to Courts
        </Link>
        <p className="text-gray-500">Court not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Back link */}
      <Link
        href={courtsPath}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-coral transition-colors"
      >
        <ArrowLeft size={16} weight="bold" />
        Back to Courts
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {court.name}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {court.sport.charAt(0).toUpperCase() + court.sport.slice(1)} · {court.indoor ? "Indoor" : "Outdoor"} · {totalCourts} {totalCourts === 1 ? "court" : "courts"} · {court.pricePerHour} zł/hr
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                viewMode === "week"
                  ? "bg-coral/10 text-coral"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <CalendarBlank size={14} />
              Week
            </button>
            <button
              type="button"
              onClick={() => setViewMode("agenda")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                viewMode === "agenda"
                  ? "bg-coral/10 text-coral"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <ListBullets size={14} />
              Day
            </button>
          </div>
          {/* Recurring blocks */}
          <button
            type="button"
            onClick={() => setRecurringOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:text-coral hover:border-coral/30 transition-colors"
          >
            <Repeat size={14} />
            Recurring
          </button>
        </div>
      </div>

      {/* Schedule card */}
      <div className="rounded-2xl bg-white shadow-[var(--shadow-soft)] border border-gray-100/60 overflow-hidden">
        {viewMode === "week" ? (
          <>
            {/* Week navigation */}
            <div className="flex items-center justify-center gap-3 px-6 py-3 bg-coral/[0.02] border-b border-coral/[0.06]">
              <button
                type="button"
                onClick={prevWeek}
                className="w-8 h-8 rounded-full bg-white border border-coral/15 shadow-[var(--shadow-soft)] flex items-center justify-center text-gray-500 hover:text-coral hover:border-coral/30 hover:shadow-[var(--shadow-hover)] transition-all active:scale-95"
              >
                <CaretLeft size={14} weight="bold" />
              </button>
              <span className="text-sm font-semibold text-gray-800 min-w-[200px] text-center">
                {formatWeekRange(weekStart)}
              </span>
              <button
                type="button"
                onClick={nextWeek}
                className="w-8 h-8 rounded-full bg-white border border-coral/15 shadow-[var(--shadow-soft)] flex items-center justify-center text-gray-500 hover:text-coral hover:border-coral/30 hover:shadow-[var(--shadow-hover)] transition-all active:scale-95"
              >
                <CaretRight size={14} weight="bold" />
              </button>
            </div>

            {/* Schedule Grid */}
            <div className="overflow-x-auto no-scrollbar">
              <div className="min-w-[700px] p-4">
                {/* Day headers */}
                <div className="grid grid-cols-[52px_repeat(7,1fr)] gap-1 mb-2 sticky top-0 bg-white z-10 pb-1">
                  <div />
                  {days.map((date, i) => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => { setAgendaDate(date); setViewMode("agenda"); }}
                      className={cn(
                        "text-center rounded-xl py-1.5 transition-colors cursor-pointer",
                        isToday(date)
                          ? "bg-coral/5 ring-1 ring-coral/10"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <div className={cn(
                        "text-[11px] font-medium uppercase tracking-wider",
                        isToday(date) ? "text-coral" : "text-gray-400"
                      )}>
                        {DAY_LABELS[i]}
                      </div>
                      <div className={cn(
                        "text-xs font-bold mt-0.5",
                        isToday(date) ? "text-coral" : "text-gray-700"
                      )}>
                        {formatDate(date)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Hour rows */}
                {HOURS.map((hour) => (
                  <div key={hour} className="grid grid-cols-[52px_repeat(7,1fr)] gap-1 mb-1">
                    <div className="text-[11px] text-gray-400 font-medium flex items-center justify-end pr-2 tabular-nums">
                      {String(hour).padStart(2, "0")}:00
                    </div>
                    {days.map((date) => {
                      const slot = slotMap.get(`${date}-${hour}`);
                      const hasData = !!slot;
                      const isClosed = slot?.closed === true;
                      const avail = slot?.availableCount ?? 0;
                      const booked = slot?.bookedCount ?? 0;
                      const allBooked = hasData && !isClosed && booked === totalCourts;
                      const hasBookings = hasData && !isClosed && booked > 0 && !allBooked;
                      const noneAvailable = hasData && !isClosed && avail === 0;
                      const isSelected = selectedSlot?.date === date && selectedSlot?.hour === hour;

                      if (isClosed) {
                        return (
                          <div
                            key={`${date}-${hour}`}
                            className="h-9 rounded-[10px] bg-gray-100/40 border border-gray-100/40"
                          />
                        );
                      }

                      return (
                        <button
                          key={`${date}-${hour}`}
                          type="button"
                          onClick={() => setSelectedSlot({ date, hour })}
                          className={cn(
                            "h-9 rounded-[10px] text-[11px] font-semibold transition-all duration-150 tabular-nums cursor-pointer",
                            isSelected && "ring-2 ring-coral ring-offset-1",
                            !hasData
                              ? "bg-gray-50/50 border border-gray-100/60"
                              : allBooked
                                ? "bg-coral/15 text-coral/70 border border-coral/15"
                                : hasBookings && noneAvailable
                                  ? "bg-amber-50/80 text-amber-600/70 border border-dashed border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                                  : hasBookings
                                    ? "bg-amber-50 text-amber-700 border border-amber-200 hover:border-amber-300 hover:bg-amber-100/60 hover:shadow-[var(--shadow-soft)]"
                                    : noneAvailable
                                      ? "bg-gray-50 text-gray-300 border border-dashed border-gray-200 hover:bg-gray-100/60 hover:border-gray-300"
                                      : "bg-white text-gray-700 border border-gray-100 hover:border-coral/30 hover:text-coral hover:bg-coral/5 hover:shadow-[var(--shadow-soft)]"
                          )}
                          title={hasData ? `${avail} available · ${booked} booked — click to manage` : "Loading…"}
                        >
                          {hasData && avail > 0 ? (
                            <span>{avail}</span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <DailyAgendaView
            date={agendaDate}
            totalCourts={totalCourts}
            slots={agendaSlots}
            getDetails={getAgendaDetails}
            onPrevDay={prevAgendaDay}
            onNextDay={nextAgendaDay}
            onSlotClick={(date, hour) => setSelectedSlot({ date, hour })}
          />
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 px-6 py-3.5 border-t border-gray-100/60 bg-secondary/40 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-md border border-gray-100 bg-white shadow-[var(--shadow-soft)]" />
            <span className="text-[11px] font-medium text-gray-500">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-md bg-amber-50 border border-amber-200" />
            <span className="text-[11px] font-medium text-gray-500">Has bookings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-md bg-coral/15 border border-coral/15" />
            <span className="text-[11px] font-medium text-gray-500">Fully booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-md bg-gray-50 border border-dashed border-gray-200" />
            <span className="text-[11px] font-medium text-gray-500">Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-md bg-gray-100/40 border border-gray-100/40" />
            <span className="text-[11px] font-medium text-gray-500">Closed</span>
          </div>
        </div>
      </div>

      {/* Slot detail sidebar */}
      <Sheet open={!!selectedSlot} onOpenChange={(open) => !open && setSelectedSlot(null)}>
        <SheetContent side="right" className="w-[340px] sm:max-w-[340px] p-0 gap-0">
          {selectedSlot && (
            <>
              <SheetHeader className="px-5 pt-5 pb-4 border-b border-gray-100/60">
                <SheetTitle className="text-base font-bold text-gray-900 tracking-tight">
                  Manage Courts
                </SheetTitle>
                <SheetDescription className="text-xs text-gray-500 mt-0.5">
                  {formatSlotDay(selectedSlot.date)} · {String(selectedSlot.hour).padStart(2, "0")}:00–{String(selectedSlot.hour + 1).padStart(2, "0")}:00
                </SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-2">
                  {slotDetails.map((detail) => (
                    <div
                      key={detail.courtIndex}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3 transition-colors",
                        detail.status === "booked"
                          ? "bg-amber-50/60 border-amber-200/60"
                          : detail.status === "blocked"
                            ? "bg-gray-50 border-gray-200/60"
                            : "bg-white border-gray-100 shadow-[var(--shadow-soft)]"
                      )}
                    >
                      {/* Status indicator */}
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        detail.status === "booked"
                          ? "bg-amber-100"
                          : detail.status === "blocked"
                            ? "bg-gray-200/80"
                            : "bg-emerald-50"
                      )}>
                        {detail.status === "booked" ? (
                          <User size={14} weight="bold" className="text-amber-600" />
                        ) : detail.status === "blocked" ? (
                          <Lock size={14} weight="bold" className="text-gray-400" />
                        ) : (
                          <LockOpen size={14} weight="bold" className="text-emerald-600" />
                        )}
                      </div>

                      {/* Court info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800">
                          Court {detail.courtIndex}
                        </p>
                        {detail.status === "booked" ? (
                          <p className="text-[11px] text-amber-600 truncate">
                            {detail.bookedBy}
                          </p>
                        ) : (
                          <p className={cn(
                            "text-[11px]",
                            detail.status === "blocked" ? "text-gray-400" : "text-emerald-600"
                          )}>
                            {detail.status === "blocked" ? "Blocked" : "Available"}
                          </p>
                        )}
                      </div>

                      {/* Toggle button (only for available/blocked) */}
                      {detail.status !== "booked" && (
                        <button
                          type="button"
                          onClick={() =>
                            toggleMutation.mutate({
                              courtIndex: detail.courtIndex,
                              direction: detail.status === "available" ? "block" : "unblock",
                            })
                          }
                          disabled={toggleMutation.isPending}
                          className={cn(
                            "h-7 px-2.5 rounded-lg text-[11px] font-medium transition-colors",
                            detail.status === "available"
                              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              : "bg-coral/10 text-coral hover:bg-coral/20"
                          )}
                        >
                          {detail.status === "available" ? "Block" : "Unblock"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {slotDetails.length === 0 && (
                  <div className="flex items-center justify-center py-8">
                    <SpinnerGap size={24} className="text-coral animate-spin" />
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <RecurringBlocksDialog
        open={recurringOpen}
        onClose={() => setRecurringOpen(false)}
        courtId={courtId}
        totalCourts={totalCourts}
      />
    </div>
  );
}
