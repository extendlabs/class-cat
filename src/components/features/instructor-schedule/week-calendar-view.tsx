"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { CaretLeft, CaretRight, Buildings, Clock, Prohibit } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalendarEntry } from "@/types/affiliation";

const HOUR_HEIGHT = 64;
const START_HOUR = 7;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const GUTTER_WIDTH = 48;
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Local-time date string (avoids UTC off-by-one from toISOString) */
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function topFromTime(time: string): number {
  const minutes = timeToMinutes(time);
  return ((minutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;
}

function heightFromTimes(start: string, end: string): number {
  const startMin = timeToMinutes(start);
  const endMin = timeToMinutes(end);
  return ((endMin - startMin) / 60) * HOUR_HEIGHT;
}

interface PositionedEntry extends CalendarEntry {
  column: number;
  totalColumns: number;
}

function layoutOverlaps(entries: CalendarEntry[]): PositionedEntry[] {
  if (entries.length === 0) return [];
  const sorted = [...entries].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );

  const groups: CalendarEntry[][] = [];
  let currentGroup: CalendarEntry[] = [sorted[0]];
  let groupEnd = timeToMinutes(sorted[0].endTime);

  for (let i = 1; i < sorted.length; i++) {
    const entryStart = timeToMinutes(sorted[i].startTime);
    if (entryStart < groupEnd) {
      currentGroup.push(sorted[i]);
      groupEnd = Math.max(groupEnd, timeToMinutes(sorted[i].endTime));
    } else {
      groups.push(currentGroup);
      currentGroup = [sorted[i]];
      groupEnd = timeToMinutes(sorted[i].endTime);
    }
  }
  groups.push(currentGroup);

  const result: PositionedEntry[] = [];
  for (const group of groups) {
    const totalColumns = group.length;
    group.forEach((entry, col) => {
      result.push({ ...entry, column: col, totalColumns });
    });
  }
  return result;
}

function getEntryStyles(entry: CalendarEntry, viewerBusinessId?: string) {
  if (viewerBusinessId) {
    const isOwn = entry.businessId === viewerBusinessId;
    if (!isOwn) {
      return "bg-gray-100/40 border-l-gray-200 border-l-[3px]";
    }
    if (entry.status === "cancelled") {
      return "bg-gray-100 border-l-gray-300 opacity-50 border-l-[3px] line-through";
    }
    if (entry.status === "pending_approval") {
      return "bg-amber-50 border-l-amber-400 border-l-[3px] border-dashed";
    }
    return "bg-blue-50 border-l-blue-500 border-l-[3px]";
  }

  if (entry.status === "cancelled") {
    return "bg-gray-100 border-l-gray-300 opacity-50 border-l-[3px]";
  }
  if (entry.status === "pending_approval") {
    return "bg-amber-50 border-l-amber-400 border-l-[3px] border-dashed";
  }
  if (entry.businessId) {
    return "bg-blue-50 border-l-blue-500 border-l-[3px]";
  }
  return "bg-coral/10 border-l-coral border-l-[3px]";
}

interface WeekCalendarViewProps {
  entries: CalendarEntry[];
  viewerBusinessId?: string;
  onEmptySlotClick?: (date: string, hour: number) => void;
  onEntryClick?: (entry: CalendarEntry) => void;
}

export function WeekCalendarView({
  entries,
  viewerBusinessId,
  onEmptySlotClick,
  onEntryClick,
}: WeekCalendarViewProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const today = formatDate(now);
  const weekStart = useMemo(() => {
    const monday = getMonday(now);
    monday.setDate(monday.getDate() + weekOffset * 7);
    return monday;
  }, [now, weekOffset]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return { date: formatDate(d), dayNum: d.getDate(), label: DAY_LABELS[i] };
    });
  }, [weekStart]);

  const entriesByDay = useMemo(() => {
    const map = new Map<string, CalendarEntry[]>();
    for (const day of weekDays) {
      map.set(day.date, []);
    }
    for (const entry of entries) {
      const dayEntries = map.get(entry.date);
      if (dayEntries) dayEntries.push(entry);
    }
    return map;
  }, [entries, weekDays]);

  const weekLabel = useMemo(() => {
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return `${weekStart.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}, ${end.getFullYear()}`;
  }, [weekStart]);

  const isCurrentWeek = weekOffset === 0;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowTop = ((nowMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;
  const showNowLine =
    isCurrentWeek &&
    nowMinutes >= START_HOUR * 60 &&
    nowMinutes <= END_HOUR * 60;

  const todayColumnIndex = isCurrentWeek
    ? weekDays.findIndex((d) => d.date === today)
    : -1;

  const handleColumnClick = useCallback(
    (date: string, e: React.MouseEvent<HTMLDivElement>) => {
      if (!onEmptySlotClick) return;
      if (e.target !== e.currentTarget) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const rawHour = START_HOUR + y / HOUR_HEIGHT;
      const hour = Math.floor(rawHour);
      if (hour >= START_HOUR && hour < END_HOUR) {
        onEmptySlotClick(date, hour);
      }
    },
    [onEmptySlotClick]
  );

  const gridHeight = TOTAL_HOURS * HOUR_HEIGHT;

  return (
    <div className="rounded-2xl bg-white border border-gray-100/60 shadow-[var(--shadow-soft)] overflow-hidden">
      {/* Header controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-8 w-8 p-0"
            onClick={() => setWeekOffset((w) => w - 1)}
          >
            <CaretLeft size={14} weight="bold" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-8 w-8 p-0"
            onClick={() => setWeekOffset((w) => w + 1)}
          >
            <CaretRight size={14} weight="bold" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-8 px-3 text-xs font-medium"
            onClick={() => setWeekOffset(0)}
          >
            Today
          </Button>
        </div>
        <p className="text-sm font-semibold text-gray-900">{weekLabel}</p>
      </div>

      {/* Day header row */}
      <div className="flex border-b border-gray-100">
        <div style={{ width: GUTTER_WIDTH }} className="shrink-0" />
        <div className="flex-1 grid grid-cols-7">
          {weekDays.map((day) => (
            <div
              key={day.date}
              className={cn(
                "text-center py-2 border-l border-gray-100",
                day.date === today && "bg-coral/5"
              )}
            >
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                {day.label}
              </p>
              <p
                className={cn(
                  "text-base font-bold mt-0.5",
                  day.date === today
                    ? "text-white bg-coral w-7 h-7 rounded-full flex items-center justify-center mx-auto text-sm"
                    : "text-gray-900"
                )}
              >
                {day.dayNum}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Time grid — flex layout: gutter | day columns */}
      <div className="flex">
        {/* Time gutter */}
        <div className="shrink-0 relative" style={{ width: GUTTER_WIDTH, height: gridHeight }}>
          {Array.from({ length: TOTAL_HOURS }, (_, i) => {
            const hour = START_HOUR + i;
            return (
              <div
                key={hour}
                className="absolute right-2 text-[11px] text-gray-400 font-normal tabular-nums text-right leading-none"
                style={{ top: i * HOUR_HEIGHT - 6 }}
              >
                {String(hour).padStart(2, "0")}:00
              </div>
            );
          })}
        </div>

        {/* Day columns */}
        <div className="flex-1 grid grid-cols-7 relative" style={{ height: gridHeight }}>
          {/* Horizontal grid lines */}
          {Array.from({ length: TOTAL_HOURS }, (_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-gray-100/60"
              style={{ top: i * HOUR_HEIGHT }}
            />
          ))}

          {/* Day columns with events */}
          {weekDays.map((day, colIdx) => {
            const dayEntries = entriesByDay.get(day.date) ?? [];
            const positioned = layoutOverlaps(dayEntries);
            return (
              <div
                key={day.date}
                className={cn(
                  "relative border-l border-gray-100/40",
                  day.date === today && "bg-coral/[0.02]",
                  onEmptySlotClick && "cursor-pointer"
                )}
                style={{ height: gridHeight }}
                onClick={(e) => handleColumnClick(day.date, e)}
              >
                {positioned.map((entry) => {
                  const top = topFromTime(entry.startTime);
                  const height = heightFromTimes(entry.startTime, entry.endTime);
                  const width =
                    entry.totalColumns > 1
                      ? `calc(${100 / entry.totalColumns}% - 4px)`
                      : "calc(100% - 8px)";
                  const left =
                    entry.totalColumns > 1
                      ? `calc(${(entry.column * 100) / entry.totalColumns}% + 2px)`
                      : "4px";

                  const isOwn = !viewerBusinessId || entry.businessId === viewerBusinessId;
                  const isBusy = viewerBusinessId && !isOwn;

                  return (
                    <div
                      key={entry.id}
                      className={cn(
                        "absolute rounded-[10px] px-2 py-1.5 overflow-hidden transition-shadow hover:shadow-sm",
                        !isBusy && "cursor-pointer",
                        getEntryStyles(entry, viewerBusinessId)
                      )}
                      style={{ top, height, width, left }}
                      title={
                        isBusy
                          ? `Busy\n${entry.startTime} – ${entry.endTime}`
                          : `${entry.startTime} – ${entry.endTime}\n${entry.activityTitle}`
                      }
                      onClick={(e) => {
                        if (!isBusy && onEntryClick) {
                          e.stopPropagation();
                          onEntryClick(entry);
                        }
                      }}
                    >
                      {isBusy ? (
                        <>
                          <p className="text-[10px] font-medium text-gray-400 leading-tight">
                            {entry.startTime} – {entry.endTime}
                          </p>
                          <p className="text-[11px] font-medium text-gray-400 leading-tight mt-0.5 flex items-center gap-1">
                            <Prohibit size={10} className="shrink-0" />
                            Busy
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] font-bold text-gray-700 leading-tight truncate">
                            {entry.startTime} – {entry.endTime}
                          </p>
                          <p className="text-[11px] font-medium text-gray-800 leading-tight truncate mt-0.5">
                            {entry.activityTitle}
                          </p>
                          {entry.businessName && height >= 48 && (
                            <span className="inline-flex items-center gap-0.5 mt-0.5 text-[9px] text-blue-600 bg-blue-100/80 px-1 py-px rounded font-medium truncate max-w-full">
                              <Buildings size={8} weight="fill" className="shrink-0" />
                              {entry.businessName}
                            </span>
                          )}
                          {!entry.businessId && !viewerBusinessId && height >= 48 && (
                            <span className="inline-flex items-center gap-0.5 mt-0.5 text-[9px] text-coral bg-coral/10 px-1 py-px rounded font-medium">
                              <Clock size={8} weight="fill" className="shrink-0" />
                              Freelance
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Current time indicator */}
                {showNowLine && colIdx === todayColumnIndex && (
                  <div
                    className="absolute left-0 right-0 z-10 pointer-events-none"
                    style={{ top: nowTop }}
                  >
                    <div className="relative">
                      <div className="absolute -left-[5px] -top-[5px] w-[10px] h-[10px] rounded-full bg-red-500" />
                      <div className="h-[2px] bg-red-500 w-full" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
