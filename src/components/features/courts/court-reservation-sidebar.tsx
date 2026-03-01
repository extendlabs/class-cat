"use client";

import { useTranslations } from "next-intl";
import { CalendarBlank, Clock } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Court, TimeSlotAvailability } from "@/types/court";

interface CourtReservationSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  court: Court;
  selectedSlots: { date: string; hour: number }[];
  slotMap: Map<string, TimeSlotAvailability>;
  onConfirm: () => void;
  isConfirming?: boolean;
  availableCourtIndices?: number[];
  selectedCourtIndex: number | null;
  onCourtIndexChange: (index: number | null) => void;
  totalCourts: number;
}

function formatDateLong(dateStr: string): string {
  const d = new Date(dateStr);
  const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
  const months = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
  ];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function CourtReservationSidebar({
  open,
  onOpenChange,
  court,
  selectedSlots,
  slotMap,
  onConfirm,
  isConfirming,
  availableCourtIndices,
  selectedCourtIndex,
  onCourtIndexChange,
  totalCourts,
}: CourtReservationSidebarProps) {
  const t = useTranslations("courts");

  if (selectedSlots.length === 0) return null;

  const sortedSlots = [...selectedSlots].sort((a, b) => a.hour - b.hour);
  const date = sortedSlots[0].date;
  const startHour = sortedSlots[0].hour;
  const endHour = sortedSlots[sortedSlots.length - 1].hour + 1;
  const duration = sortedSlots.length;

  const totalPrice = sortedSlots.reduce((sum, s) => {
    const slot = slotMap.get(`${s.date}-${s.hour}`);
    return sum + (slot?.price ?? court.pricePerHour);
  }, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        overlayClassName="bg-transparent"
        className="rounded-l-2xl border-l-0 shadow-[-8px_0_12px_-10px_rgba(0,0,0,0.1)]"
      >
        <SheetHeader>
          <SheetTitle>{t("reservationSummary")}</SheetTitle>
          <SheetDescription>{t("confirmDetails")}</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 space-y-6">
          {/* Court info */}
          <div className="rounded-xl border border-gray-200 shadow-[var(--shadow-soft)] p-4">
            <h4 className="font-semibold text-gray-900">{court.name}</h4>
            <p className="text-sm text-gray-500 mt-1">{court.address}</p>
            <div className="flex gap-2 mt-2">
              <span className="inline-block px-2 py-0.5 bg-coral/10 rounded text-xs font-bold text-coral">
                {t(`sport.${court.sport}`)}
              </span>
              <span className="inline-block px-2 py-0.5 bg-coral/5 border border-coral/10 rounded text-xs font-medium text-gray-700">
                {t(`surface.${court.surface}`)}
              </span>
            </div>
          </div>

          {/* Court preference */}
          {totalCourts > 1 && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                {t("courtPreference")}
              </label>
              <Select
                value={selectedCourtIndex == null ? "any" : String(selectedCourtIndex)}
                onValueChange={(v) => onCourtIndexChange(v === "any" ? null : Number(v))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t("anyAvailable")}</SelectItem>
                  {(availableCourtIndices ?? Array.from({ length: totalCourts }, (_, i) => i + 1)).map(
                    (idx) => (
                      <SelectItem key={idx} value={String(idx)}>
                        {t("courtN", { n: idx })}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarBlank size={20} className="text-coral" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {formatDateLong(date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-coral" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {String(startHour).padStart(2, "0")}:00 – {String(endHour).padStart(2, "0")}:00
                </p>
                <p className="text-xs text-gray-500">
                  {t("durationHours", { count: duration })}
                </p>
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              {t("priceBreakdown")}
            </h4>
            {sortedSlots.map((s) => {
              const slot = slotMap.get(`${s.date}-${s.hour}`);
              const price = slot?.price ?? court.pricePerHour;
              return (
                <div
                  key={`${s.date}-${s.hour}`}
                  className="flex justify-between text-sm py-1"
                >
                  <span className="text-gray-500">
                    {String(s.hour).padStart(2, "0")}:00 – {String(s.hour + 1).padStart(2, "0")}:00
                  </span>
                  <span className="text-gray-700 font-medium">{price} zł</span>
                </div>
              );
            })}
          </div>
        </div>

        <SheetFooter className="border-t border-gray-100 px-4 py-4">
          <div className="flex justify-between text-base font-bold mb-3">
            <span className="text-gray-900">{t("total")}</span>
            <span className="text-coral">{totalPrice} zł</span>
          </div>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="w-full bg-coral hover:bg-coral-hover disabled:opacity-50 text-white py-3 rounded-full text-sm font-bold transition-colors"
          >
            {isConfirming ? t("confirming") : t("confirmReservation")}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
