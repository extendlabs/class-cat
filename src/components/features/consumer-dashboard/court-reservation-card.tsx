"use client";

import { useTranslations } from "next-intl";
import {
  CalendarBlank,
  Clock,
  Trash,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RESERVATION_STATUS_STYLES } from "@/lib/status-styles";
import type { CourtReservation } from "@/types/court";

export function CourtReservationCard({
  reservation,
  variant,
  onCancel,
}: {
  reservation: CourtReservation;
  variant: "upcoming" | "past";
  onCancel?: (id: string) => void;
}) {
  const t = useTranslations("profile.myCourts");
  const isPast = variant === "past";
  const canCancel =
    !isPast &&
    onCancel &&
    (reservation.status === "confirmed" || reservation.status === "pending");

  const formatTime = (hour: number) => `${hour}:00`;

  return (
    <div
      className={`rounded-2xl bg-white overflow-hidden shadow-[var(--shadow-soft)] border border-gray-100/60 ${
        isPast
          ? "opacity-75"
          : "hover:shadow-[var(--shadow-hover)] hover:border-coral/10 transition-all"
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-gray-900 text-sm truncate">
              {reservation.courtName}
            </h4>
            <Badge
              className={`text-[10px] shrink-0 capitalize border ${RESERVATION_STATUS_STYLES[reservation.status]}`}
            >
              {reservation.status}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarBlank size={12} />
              {new Date(reservation.date).toLocaleDateString("pl-PL", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatTime(reservation.startHour)} –{" "}
              {formatTime(reservation.startHour + reservation.durationHours)}
            </span>
            <span className="flex items-center gap-1 font-medium text-gray-700">
              {reservation.totalPrice} zł
            </span>
          </div>
        </div>
        {canCancel && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>{t("cancelTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("cancelDescription", { court: reservation.courtName })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  {t("keepReservation")}
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  className="rounded-full"
                  onClick={() => onCancel?.(reservation.id)}
                >
                  {t("yesCancel")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
