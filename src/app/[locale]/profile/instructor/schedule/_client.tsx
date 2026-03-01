"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash, PencilSimple, Clock, CalendarDots, Warning } from "@phosphor-icons/react";
import { fetchInstructorSchedule, updateInstructorSchedule, fetchInstructorCalendar, cancelCalendarEntry } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { AnimateIn } from "@/components/ui/animate-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { WeekCalendarView } from "@/components/features/instructor-schedule";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { InstructorScheduleSlot } from "@/types/instructor";
import type { CalendarEntry } from "@/types/affiliation";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CalendarTab({ instructorId }: { instructorId: string }) {
  const queryClient = useQueryClient();
  const { data: entries, isLoading } = useQuery({
    queryKey: ["instructor-calendar", instructorId],
    queryFn: () => fetchInstructorCalendar(instructorId),
  });

  const [cancelTarget, setCancelTarget] = useState<CalendarEntry | null>(null);
  const [cancelNote, setCancelNote] = useState("");

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
    if (entry.status === "confirmed") {
      setCancelTarget(entry);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <Skeleton key={`skeleton-${n}`} className="h-20 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      <WeekCalendarView entries={entries ?? []} onEntryClick={handleEntryClick} />

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
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Warning size={18} className="text-red-500" weight="fill" />
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
                  <label htmlFor="cancel-note-instructor" className="text-xs font-medium text-gray-500">
                    Cancellation note (optional)
                  </label>
                  <Textarea
                    id="cancel-note-instructor"
                    placeholder="e.g. Not feeling well..."
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
    </>
  );
}

export default function InstructorSchedulePage() {
  const { user } = useAuth();
  const instructorId = user?.instructorId ?? "inst-6";
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"availability" | "calendar">("availability");

  const { data: schedule, isLoading } = useQuery({
    queryKey: ["instructor-schedule", instructorId],
    queryFn: () => fetchInstructorSchedule(instructorId),
  });

  const mutation = useMutation({
    mutationFn: (slots: InstructorScheduleSlot[]) => updateInstructorSchedule(instructorId, slots),
    onSuccess: (data) => {
      queryClient.setQueryData(["instructor-schedule", instructorId], data);
      queryClient.invalidateQueries({ queryKey: ["instructor-calendar", instructorId] });
    },
  });

  // Dialog state
  const [dialogMode, setDialogMode] = useState<InstructorScheduleSlot | "add" | null>(null);
  const dialogOpen = dialogMode !== null;
  const editingSlot = typeof dialogMode === "object" ? dialogMode : null;
  const [form, setForm] = useState({ dayOfWeek: 1, startTime: "09:00", endTime: "11:00", recurring: true });
  const [deleteSlotId, setDeleteSlotId] = useState<string | null>(null);

  const openAdd = () => {
    setForm({ dayOfWeek: 1, startTime: "09:00", endTime: "11:00", recurring: true });
    setDialogMode("add");
  };

  const openEdit = (slot: InstructorScheduleSlot) => {
    setForm({ dayOfWeek: slot.dayOfWeek, startTime: slot.startTime, endTime: slot.endTime, recurring: slot.recurring });
    setDialogMode(slot);
  };

  const saveSlot = () => {
    if (!schedule) return;
    let updated: InstructorScheduleSlot[];
    if (editingSlot) {
      updated = schedule.map((s) =>
        s.id === editingSlot.id ? { ...s, ...form } : s
      );
    } else {
      updated = [...schedule, { id: `s-new-${Date.now()}`, ...form }];
    }
    mutation.mutate(updated);
    setDialogMode(null);
  };

  const confirmDelete = () => {
    if (!deleteSlotId || !schedule) return;
    const updated = schedule.filter((s) => s.id !== deleteSlotId);
    mutation.mutate(updated);
    setDeleteSlotId(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-2xl" />
        ))}
      </div>
    );
  }

  // Group slots by day
  const slotsByDay = DAYS.map((day, idx) => ({
    day,
    dayIndex: idx,
    slots: (schedule ?? []).filter((s) => s.dayOfWeek === idx).sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your weekly availability.</p>
        </div>
        {activeTab === "availability" && (
          <Button onClick={openAdd} className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5">
            <Plus size={14} weight="bold" />
            Add Slot
          </Button>
        )}
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("availability")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === "availability"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Availability
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5",
            activeTab === "calendar"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          <CalendarDots size={14} />
          Calendar
        </button>
      </div>

      {activeTab === "calendar" ? (
        <CalendarTab instructorId={instructorId} />
      ) : (
      <>
      {/* Weekly view */}
      <div className="space-y-3">
        {slotsByDay.map(({ day, dayIndex, slots }) => (
          <AnimateIn key={day} delay={dayIndex * 30}>
            <div className="rounded-2xl bg-white p-4 shadow-[var(--shadow-soft)] border border-gray-100/60">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-900">{day}</h3>
                {slots.length === 0 && (
                  <span className="text-xs text-gray-400">No availability</span>
                )}
              </div>
              {slots.length > 0 && (
                <div className="space-y-2">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50/80 group hover:bg-gray-100/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                          <Clock size={14} className="text-coral" weight="fill" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {slot.startTime} – {slot.endTime}
                          </p>
                          {slot.activityTitle && (
                            <p className="text-xs text-gray-500">{slot.activityTitle}</p>
                          )}
                        </div>
                        {slot.recurring && (
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            Recurring
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(slot)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-coral/10 hover:text-coral transition-all"
                        >
                          <PencilSimple size={12} weight="bold" />
                        </button>
                        <button
                          onClick={() => setDeleteSlotId(slot.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                          <Trash size={12} weight="bold" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimateIn>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(v) => !v && setDialogMode(null)}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingSlot ? "Edit Time Slot" : "Add Time Slot"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Day</Label>
              <select
                value={form.dayOfWeek}
                onChange={(e) => setForm({ ...form, dayOfWeek: Number(e.target.value) })}
                className="w-full h-10 rounded-xl border border-gray-200 px-3 text-sm bg-white outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
              >
                {DAYS.map((day, i) => (
                  <option key={day} value={i}>{day}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} className="rounded-xl" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-900">Recurring</Label>
                <p className="text-xs text-gray-500">Repeat every week</p>
              </div>
              <Switch checked={form.recurring} onCheckedChange={(checked) => setForm({ ...form, recurring: checked })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setDialogMode(null)}>Cancel</Button>
            <Button className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={saveSlot}>
              {editingSlot ? "Save Changes" : "Add Slot"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteSlotId} onOpenChange={(v) => !v && setDeleteSlotId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Time Slot?</AlertDialogTitle>
            <AlertDialogDescription>This will remove this availability slot from your schedule.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" className="rounded-full" onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </>
      )}
    </div>
  );
}
