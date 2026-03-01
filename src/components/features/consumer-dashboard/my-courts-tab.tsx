"use client";

import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TennisBall, ClockCounterClockwise } from "@phosphor-icons/react";
import { CourtReservationCard } from "./court-reservation-card";
import { updateReservationStatus } from "@/api/court-service";
import type { CourtReservation } from "@/types/court";

function EmptyState({ icon: Icon, message }: { icon: React.ComponentType<{ size: number; className?: string }>; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-200 rounded-2xl">
      <Icon size={32} className="text-gray-300 mb-2" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

export function MyCourtsTab({ reservations }: { reservations: CourtReservation[] }) {
  const t = useTranslations("profile.myCourts");
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  const cancelMutation = useMutation({
    mutationFn: (id: string) => updateReservationStatus(id, "cancelled"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-court-reservations"] });
    },
  });

  const upcoming = reservations.filter(
    (r) => r.date >= today && (r.status === "confirmed" || r.status === "pending")
  );
  const past = reservations.filter(
    (r) => r.date < today || r.status === "cancelled" || r.status === "rejected"
  );

  return (
    <div className="space-y-8">
      {/* Upcoming */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          <TennisBall size={16} className="text-coral" />
          {t("upcoming")}
        </h3>
        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((r) => (
              <CourtReservationCard
                key={r.id}
                reservation={r}
                variant="upcoming"
                onCancel={(id) => cancelMutation.mutate(id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState icon={TennisBall} message={t("noUpcoming")} />
        )}
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
            <ClockCounterClockwise size={16} className="text-gray-400" />
            {t("past")}
          </h3>
          <div className="space-y-3">
            {past.map((r) => (
              <CourtReservationCard key={r.id} reservation={r} variant="past" />
            ))}
          </div>
        </section>
      )}

      {reservations.length === 0 && (
        <EmptyState icon={TennisBall} message={t("noUpcoming")} />
      )}
    </div>
  );
}
