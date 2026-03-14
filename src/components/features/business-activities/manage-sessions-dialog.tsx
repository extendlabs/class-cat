"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarX, Warning } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  fetchProviderActivitySessions,
  cancelProviderActivitySession,
} from "@/api/business-portal";
import type { BusinessActivity } from "@/types/business-portal";

export function ManageSessionsDialog({
  activity,
  providerSlug,
  onClose,
}: {
  activity: BusinessActivity | null;
  providerSlug: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["activity-sessions", providerSlug, activity?.id],
    queryFn: () => fetchProviderActivitySessions(providerSlug, activity!.id),
    enabled: !!activity && !!providerSlug,
  });

  const cancelMutation = useMutation({
    mutationFn: (sessionId: number) =>
      cancelProviderActivitySession(providerSlug, activity!.id, sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-sessions", providerSlug, activity?.id] });
      setCancellingId(null);
    },
  });

  return (
    <Dialog open={!!activity} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg rounded-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <CalendarX size={18} className="text-coral" />
            Manage Sessions
          </DialogTitle>
          {activity && (
            <p className="text-sm text-gray-500 mt-1">{activity.title}</p>
          )}
        </DialogHeader>

        <div className="overflow-y-auto -mx-6 px-6 flex-1">
          {isLoading ? (
            <div className="space-y-3 py-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : !sessions?.length ? (
            <div className="text-center py-8 text-sm text-gray-400">
              No sessions found. Add a date in the Schedule tab when editing the activity.
            </div>
          ) : (
            <div className="space-y-2 py-2">
              {sessions.map((session) => {
                const isCancelled = session.is_cancelled;
                const isCancellingThis = cancellingId === session.id;

                return (
                  <div
                    key={session.id}
                    className={cn(
                      "rounded-xl border p-3 transition-colors",
                      isCancelled
                        ? "bg-gray-50 border-gray-100"
                        : "bg-white border-gray-100 hover:border-gray-200"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className={cn("flex-1 min-w-0", isCancelled && "opacity-50")}>
                        <p
                          className={cn(
                            "text-sm font-medium text-gray-900",
                            isCancelled && "line-through"
                          )}
                        >
                          {new Date(session.date + "T00:00:00").toLocaleDateString("pl-PL", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        {(session.start_time || session.end_time) && (
                          <p className={cn("text-xs text-gray-500 mt-0.5", isCancelled && "line-through")}>
                            {session.start_time ?? "??"} – {session.end_time ?? "??"}
                          </p>
                        )}
                      </div>

                      {isCancelled ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                          <Warning size={10} />
                          Cancelled
                        </span>
                      ) : isCancellingThis ? null : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-xs text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shrink-0"
                          onClick={() => setCancellingId(session.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>

                    {isCancellingThis && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full text-xs"
                            onClick={() => setCancellingId(null)}
                          >
                            Back
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-full bg-red-600 hover:bg-red-700 text-white text-xs"
                            disabled={cancelMutation.isPending}
                            onClick={() => cancelMutation.mutate(session.id)}
                          >
                            {cancelMutation.isPending ? "Cancelling..." : "Confirm Cancel"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
