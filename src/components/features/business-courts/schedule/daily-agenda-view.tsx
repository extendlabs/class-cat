"use client";

import { useMemo } from "react";
import { CaretLeft, CaretRight, User, Lock, LockOpen } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { TimeSlotAvailability, CourtSlotDetail } from "@/types/court";

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7);

interface DailyAgendaViewProps {
  date: string;
  totalCourts: number;
  slots: TimeSlotAvailability[];
  getDetails: (date: string, hour: number) => CourtSlotDetail[];
  onPrevDay: () => void;
  onNextDay: () => void;
  onSlotClick: (date: string, hour: number) => void;
}

function formatAgendaDate(dateStr: string): string {
  const d = new Date(dateStr);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${dayNames[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function DailyAgendaView({
  date,
  totalCourts,
  slots,
  getDetails,
  onPrevDay,
  onNextDay,
  onSlotClick,
}: DailyAgendaViewProps) {
  const daySlots = useMemo(
    () => slots.filter((s) => s.date === date),
    [slots, date]
  );

  const slotMap = useMemo(() => {
    const m = new Map<number, TimeSlotAvailability>();
    for (const s of daySlots) m.set(s.hour, s);
    return m;
  }, [daySlots]);

  const courtIndices = useMemo(
    () => Array.from({ length: totalCourts }, (_, i) => i + 1),
    [totalCourts]
  );

  const today = new Date().toISOString().split("T")[0];
  const isToday = date === today;

  return (
    <>
      {/* Day navigation */}
      <div className="flex items-center justify-center gap-3 px-6 py-3 bg-coral/[0.02] border-b border-coral/[0.06]">
        <button
          type="button"
          onClick={onPrevDay}
          className="w-8 h-8 rounded-full bg-white border border-coral/15 shadow-[var(--shadow-soft)] flex items-center justify-center text-gray-500 hover:text-coral hover:border-coral/30 hover:shadow-[var(--shadow-hover)] transition-all active:scale-95"
        >
          <CaretLeft size={14} weight="bold" />
        </button>
        <span className={cn(
          "text-sm font-semibold min-w-[240px] text-center",
          isToday ? "text-coral" : "text-gray-800"
        )}>
          {formatAgendaDate(date)}
          {isToday && <span className="ml-2 text-[11px] font-medium text-coral/70">(Today)</span>}
        </span>
        <button
          type="button"
          onClick={onNextDay}
          className="w-8 h-8 rounded-full bg-white border border-coral/15 shadow-[var(--shadow-soft)] flex items-center justify-center text-gray-500 hover:text-coral hover:border-coral/30 hover:shadow-[var(--shadow-hover)] transition-all active:scale-95"
        >
          <CaretRight size={14} weight="bold" />
        </button>
      </div>

      {/* Agenda grid */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[500px] p-4">
          {/* Court column headers */}
          <div
            className="grid gap-1 mb-2"
            style={{ gridTemplateColumns: `52px repeat(${totalCourts}, 1fr)` }}
          >
            <div />
            {courtIndices.map((courtNumber) => (
              <div
                key={`court-${courtNumber}`}
                className="text-center py-1.5 rounded-xl bg-gray-50 border border-gray-100/60"
              >
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Court {courtNumber}
                </div>
              </div>
            ))}
          </div>

          {/* Hour rows */}
          {HOURS.map((hour) => {
            const slot = slotMap.get(hour);
            const isClosed = slot?.closed === true;
            const details = !isClosed ? getDetails(date, hour) : [];

            return (
              <div
                key={hour}
                className="grid gap-1 mb-1"
                style={{ gridTemplateColumns: `52px repeat(${totalCourts}, 1fr)` }}
              >
                <div className="text-[11px] text-gray-400 font-medium flex items-center justify-end pr-2 tabular-nums">
                  {String(hour).padStart(2, "0")}:00
                </div>
                {courtIndices.map((courtNumber) => {
                  if (isClosed) {
                    return (
                      <div
                        key={`court-${courtNumber}`}
                        className="h-11 rounded-[10px] bg-gray-100/40 border border-gray-100/40"
                      />
                    );
                  }

                  const detail = details.find((d) => d.courtIndex === courtNumber);
                  const status = detail?.status ?? "available";

                  return (
                    <button
                      key={`court-${courtNumber}`}
                      type="button"
                      onClick={() => onSlotClick(date, hour)}
                      className={cn(
                        "h-11 rounded-[10px] flex items-center gap-1.5 px-2.5 text-[11px] font-medium transition-all duration-150 cursor-pointer",
                        status === "booked"
                          ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100/60"
                          : status === "blocked"
                            ? "bg-gray-50 text-gray-400 border border-dashed border-gray-200 hover:bg-gray-100/60"
                            : "bg-white text-gray-600 border border-gray-100 hover:border-coral/30 hover:text-coral hover:bg-coral/5"
                      )}
                    >
                      {status === "booked" ? (
                        <>
                          <User size={12} weight="bold" className="flex-shrink-0" />
                          <span className="truncate">{detail?.bookedBy ?? "Booked"}</span>
                        </>
                      ) : status === "blocked" ? (
                        <>
                          <Lock size={12} weight="bold" className="flex-shrink-0" />
                          <span>Blocked</span>
                        </>
                      ) : (
                        <>
                          <LockOpen size={12} weight="bold" className="flex-shrink-0" />
                          <span>Free</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
