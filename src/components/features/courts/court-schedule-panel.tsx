"use client";

import { useMemo } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { SpinnerGap } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { Court, TimeSlotAvailability } from "@/types/court";

interface CourtSchedulePanelProps {
  court: Court;
  weekStart: string;
  slots: TimeSlotAvailability[];
  selectedSlots: { date: string; hour: number }[];
  onToggleSlot: (date: string, hour: number) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7-21
const DAY_LABELS_PL = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatWeekRange(weekStart: string): string {
  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const months = [
    "sty", "lut", "mar", "kwi", "maj", "cze",
    "lip", "sie", "wrz", "paź", "lis", "gru",
  ];
  return `${start.getDate()} ${months[start.getMonth()]} – ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`;
}

export function CourtSchedulePanel({
  court,
  weekStart,
  slots,
  selectedSlots,
  onToggleSlot,
  onPrevWeek,
  onNextWeek,
  onClose,
  isLoading,
}: CourtSchedulePanelProps) {
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

  const isSelected = (date: string, hour: number) =>
    selectedSlots.some((s) => s.date === date && s.hour === hour);

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr === today;
  };

  return (
    <div className="flex flex-col h-full rounded-[24px] overflow-hidden bg-white border border-gray-200 shadow-[var(--shadow-soft)]">
      {/* Header — week nav + close */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-coral/[0.06] bg-coral/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 justify-center">
            <button
              type="button"
              onClick={onPrevWeek}
              className="w-7 h-7 rounded-full bg-white border border-coral/15 shadow-[var(--shadow-soft)] flex items-center justify-center text-gray-500 hover:text-coral hover:border-coral/30 hover:shadow-[var(--shadow-hover)] transition-all"
            >
              <CaretLeft size={14} weight="bold" />
            </button>
            <span className="text-sm font-semibold text-gray-800 min-w-[180px] text-center">
              {formatWeekRange(weekStart)}
            </span>
            <button
              type="button"
              onClick={onNextWeek}
              className="w-7 h-7 rounded-full bg-white border border-coral/15 shadow-[var(--shadow-soft)] flex items-center justify-center text-gray-500 hover:text-coral hover:border-coral/30 hover:shadow-[var(--shadow-hover)] transition-all"
            >
              <CaretRight size={14} weight="bold" />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-coral hover:bg-coral/5 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* Schedule Grid — scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto no-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <SpinnerGap size={32} className="text-coral animate-spin" />
          </div>
        ) : (
          <div className="min-w-[480px] p-3">
            {/* Day headers — sticky */}
            <div className="grid grid-cols-[48px_repeat(7,1fr)] gap-1 mb-2 sticky top-0 bg-white z-10 pb-1">
              <div />
              {days.map((date, i) => (
                <div
                  key={date}
                  className={cn(
                    "text-center rounded-lg py-1",
                    isToday(date) && "bg-coral/5"
                  )}
                >
                  <div className={cn(
                    "text-[11px] font-medium",
                    isToday(date) ? "text-coral" : "text-gray-500"
                  )}>
                    {DAY_LABELS_PL[i]}
                  </div>
                  <div className={cn(
                    "text-xs font-semibold",
                    isToday(date) ? "text-coral" : "text-gray-700"
                  )}>
                    {formatDate(date)}
                  </div>
                </div>
              ))}
            </div>

            {/* Hour rows */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-[48px_repeat(7,1fr)] gap-1 mb-1"
              >
                <div className="text-[11px] text-gray-500 font-medium flex items-center justify-end pr-1.5 tabular-nums">
                  {String(hour).padStart(2, "0")}:00
                </div>
                {days.map((date) => {
                  const slot = slotMap.get(`${date}-${hour}`);
                  const available = slot?.available ?? false;
                  const selected = isSelected(date, hour);
                  const price = slot?.price ?? court.pricePerHour;

                  return (
                    <button
                      key={`${date}-${hour}`}
                      type="button"
                      disabled={!available}
                      onClick={() => available && onToggleSlot(date, hour)}
                      className={cn(
                        "h-8 rounded-lg text-[11px] font-medium transition-all duration-150",
                        selected
                          ? "bg-coral text-white shadow-[var(--shadow-hover)] scale-[1.02]"
                          : available
                            ? "bg-white text-gray-600 border border-coral/10 hover:border-coral/30 hover:text-coral hover:bg-coral/5 hover:shadow-[var(--shadow-soft)]"
                            : "bg-gray-50/50 text-gray-300 cursor-not-allowed border border-transparent"
                      )}
                    >
                      {available ? price : "—"}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
