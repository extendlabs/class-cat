"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Buildings,
  Prohibit,
  PaperPlaneTilt,
  X,
  CalendarPlus,
  Warning,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import {
  fetchBusinessInstructors,
  fetchBusinessActivities,
  proposeSlotToInstructor,
} from "@/api/business-portal";
import { fetchInstructorCalendar, cancelCalendarEntry } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { WeekCalendarView } from "@/components/features/instructor-schedule";
import type { CalendarEntry } from "@/types/affiliation";

interface ProposeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export default function PageContent({ instructorId }: { instructorId: string }) {
  const { user } = useAuth();
  const t = useTranslations("businessInstructors");
  const businessId = user?.businessId ?? "biz-1";
  const businessName = "Studio Harmonii";
  const queryClient = useQueryClient();

  const [proposeSlot, setProposeSlot] = useState<ProposeSlot | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const [recurring, setRecurring] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<CalendarEntry | null>(null);
  const [cancelNote, setCancelNote] = useState("");

  const { data: instructors, isLoading: instLoading } = useQuery({
    queryKey: ["business-instructors", businessId],
    queryFn: () => fetchBusinessInstructors(businessId),
    enabled: !!businessId,
  });

  const instructor = instructors?.find((i) => i.instructorId === instructorId);

  const { data: entries, isLoading: calLoading } = useQuery({
    queryKey: ["instructor-calendar", instructorId],
    queryFn: () => fetchInstructorCalendar(instructorId),
    enabled: !!instructorId,
  });

  const { data: activities } = useQuery({
    queryKey: ["business-activities"],
    queryFn: () => fetchBusinessActivities(),
  });

  const proposeMutation = useMutation({
    mutationFn: ({
      activityId,
      activityTitle,
      date,
      startTime,
      endTime,
      isRecurring,
    }: {
      activityId: string;
      activityTitle: string;
      date: string;
      startTime: string;
      endTime: string;
      isRecurring: boolean;
    }) =>
      proposeSlotToInstructor(
        businessId,
        businessName,
        instructorId,
        activityId,
        activityTitle,
        date,
        startTime,
        endTime,
        isRecurring
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor-calendar", instructorId] });
      setProposeSlot(null);
      setSelectedActivityId("");
      setRecurring(false);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: ({ entry, note }: { entry: CalendarEntry; note?: string }) =>
      cancelCalendarEntry(entry, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor-calendar", instructorId] });
      setCancelTarget(null);
      setCancelNote("");
    },
  });

  const handleEntryClick = (entry: CalendarEntry) => {
    // Only allow cancelling own confirmed entries
    if (entry.businessId === businessId && entry.status === "confirmed") {
      setCancelTarget(entry);
      setCancelNote("");
    }
  };

  const isLoading = instLoading || calLoading;

  const handleEmptySlotClick = (date: string, hour: number) => {
    const startTime = `${String(hour).padStart(2, "0")}:00`;
    const endHour = Math.min(hour + 1, 21);
    const endTime = `${String(endHour).padStart(2, "0")}:00`;
    setProposeSlot({ date, startTime, endTime });
    setSelectedActivityId("");
    setRecurring(false);
  };

  const handlePropose = () => {
    if (!proposeSlot || !selectedActivityId) return;
    const activity = activities?.find((a) => a.id === selectedActivityId);
    if (!activity) return;
    proposeMutation.mutate({
      activityId: selectedActivityId,
      activityTitle: activity.title,
      date: proposeSlot.date,
      startTime: proposeSlot.startTime,
      endTime: proposeSlot.endTime,
      isRecurring: recurring,
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-[500px] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/profile/business/instructors"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={14} weight="bold" />
        {t("title")}
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={instructor?.avatar} alt={instructor?.name} />
          <AvatarFallback className="bg-coral/10 text-coral font-bold">
            {instructor?.name
              .split(" ")
              .map((n) => n[0])
              .join("") ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {instructor?.name ?? "Instructor"} — {t("viewSchedule")}
          </h1>
          {instructor?.specialty && (
            <p className="text-sm text-gray-500 mt-0.5">{instructor.specialty}</p>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-blue-50 border-l-[3px] border-l-blue-500" />
          <Buildings size={12} className="text-blue-500" />
          Your Activities
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gray-100/40 border-l-[3px] border-l-gray-200" />
          <Prohibit size={12} className="text-gray-400" />
          Busy
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-50 border-l-[3px] border-l-amber-400 border-dashed" />
          Pending
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gray-100 border-l-[3px] border-l-gray-300 opacity-50" />
          Cancelled
        </span>
        <span className="ml-auto text-[11px] text-gray-400 flex items-center gap-1">
          <CalendarPlus size={12} />
          Click empty slot to propose
        </span>
      </div>

      {/* Calendar */}
      <WeekCalendarView
        entries={entries ?? []}
        viewerBusinessId={businessId}
        onEmptySlotClick={handleEmptySlotClick}
        onEntryClick={handleEntryClick}
      />

      {/* Cancel Session Dialog */}
      <AlertDialog
        open={!!cancelTarget}
        onOpenChange={(v) => {
          if (!v) {
            setCancelTarget(null);
            setCancelNote("");
          }
        }}
      >
        <AlertDialogContent className="sm:max-w-md rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold flex items-center gap-2">
              <Warning size={18} className="text-amber-500" />
              Cancel Session
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Are you sure you want to cancel this session?</p>
                {cancelTarget && (
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 space-y-1">
                    <p className="font-semibold text-gray-900">{cancelTarget.activityTitle}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(cancelTarget.date + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      &middot; {cancelTarget.startTime} – {cancelTarget.endTime}
                    </p>
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500">
                    Cancellation note (optional)
                  </label>
                  <Textarea
                    placeholder="e.g. Instructor is sick..."
                    value={cancelNote}
                    onChange={(e) => setCancelNote(e.target.value)}
                    className="rounded-xl resize-none"
                    rows={2}
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Keep Session</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-red-600 hover:bg-red-700 text-white"
              disabled={cancelMutation.isPending}
              onClick={() => {
                if (cancelTarget) {
                  cancelMutation.mutate({
                    entry: cancelTarget,
                    note: cancelNote.trim() || undefined,
                  });
                }
              }}
            >
              {cancelMutation.isPending ? "Cancelling..." : "Cancel Session"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Propose Dialog */}
      <Dialog
        open={!!proposeSlot}
        onOpenChange={(v) => {
          if (!v) {
            setProposeSlot(null);
            setSelectedActivityId("");
            setRecurring(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <PaperPlaneTilt size={18} className="text-coral" />
              Propose Time Slot
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Date */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-500">Date</Label>
              <Input
                type="date"
                value={proposeSlot?.date ?? ""}
                onChange={(e) =>
                  setProposeSlot((prev) =>
                    prev ? { ...prev, date: e.target.value } : prev
                  )
                }
                className="rounded-xl"
              />
            </div>

            {/* Time range */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-500">Start</Label>
                <Input
                  type="time"
                  value={proposeSlot?.startTime ?? ""}
                  onChange={(e) =>
                    setProposeSlot((prev) =>
                      prev ? { ...prev, startTime: e.target.value } : prev
                    )
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-500">End</Label>
                <Input
                  type="time"
                  value={proposeSlot?.endTime ?? ""}
                  onChange={(e) =>
                    setProposeSlot((prev) =>
                      prev ? { ...prev, endTime: e.target.value } : prev
                    )
                  }
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Activity picker */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-500">Activity</Label>
              <Select
                value={selectedActivityId}
                onValueChange={setSelectedActivityId}
              >
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Choose an activity..." />
                </SelectTrigger>
                <SelectContent>
                  {(activities ?? [])
                    .filter((a) => a.status === "active")
                    .map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recurring toggle */}
            <div className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-gray-700">Recurring weekly</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {proposeSlot?.date
                    ? `Every ${new Date(proposeSlot.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" })}`
                    : "Repeat every week on the same day"}
                </p>
              </div>
              <Switch checked={recurring} onCheckedChange={setRecurring} />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setProposeSlot(null);
                  setSelectedActivityId("");
                }}
              >
                <X size={14} className="mr-1" />
                Cancel
              </Button>
              <Button
                className="rounded-full bg-coral hover:bg-coral-hover text-white"
                disabled={!selectedActivityId || proposeMutation.isPending}
                onClick={handlePropose}
              >
                <PaperPlaneTilt size={14} className="mr-1" />
                {proposeMutation.isPending ? "Sending..." : "Send Proposal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
