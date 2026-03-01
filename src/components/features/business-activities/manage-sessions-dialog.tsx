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
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { fetchActivitySessions, cancelCalendarEntry } from "@/api/instructor";
import type { BusinessActivity } from "@/types/business-portal";
import type { CalendarEntry } from "@/types/affiliation";

export function ManageSessionsDialog({
  activity,
  onClose,
}: {
  activity: BusinessActivity | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelNote, setCancelNote] = useState("");

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["activity-sessions", activity?.id],
    queryFn: () => fetchActivitySessions(activity!.id),
    enabled: !!activity,
  });

  const cancelMutation = useMutation({
    mutationFn: ({ entry, note }: { entry: CalendarEntry; note?: string }) =>
      cancelCalendarEntry(entry, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-sessions", activity?.id] });
      queryClient.invalidateQueries({ queryKey: ["instructor-calendar"] });
      setCancellingId(null);
      setCancelNote("");
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
              No upcoming sessions found.
            </div>
          ) : (
            <div className="space-y-2 py-2">
              {sessions.map((session) => {
                const isCancelled = session.status === "cancelled";
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
                          {new Date(session.date + "T00:00:00").toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p
                          className={cn(
                            "text-xs text-gray-500 mt-0.5",
                            isCancelled && "line-through"
                          )}
                        >
                          {session.startTime} – {session.endTime}
                        </p>
                      </div>

                      {isCancelled ? (
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            <Warning size={10} />
                            Cancelled
                          </span>
                          {session.cancellationNote && (
                            <p className="text-[11px] text-gray-400 mt-1 max-w-[180px] truncate">
                              {session.cancellationNote}
                            </p>
                          )}
                        </div>
                      ) : isCancellingThis ? null : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-xs text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shrink-0"
                          onClick={() => {
                            setCancellingId(session.id);
                            setCancelNote("");
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>

                    {isCancellingThis && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                        <Textarea
                          placeholder="Cancellation note (optional)..."
                          value={cancelNote}
                          onChange={(e) => setCancelNote(e.target.value)}
                          className="rounded-xl resize-none text-sm"
                          rows={2}
                        />
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full text-xs"
                            onClick={() => {
                              setCancellingId(null);
                              setCancelNote("");
                            }}
                          >
                            Back
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-full bg-red-600 hover:bg-red-700 text-white text-xs"
                            disabled={cancelMutation.isPending}
                            onClick={() => {
                              cancelMutation.mutate({
                                entry: session,
                                note: cancelNote.trim() || undefined,
                              });
                            }}
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
