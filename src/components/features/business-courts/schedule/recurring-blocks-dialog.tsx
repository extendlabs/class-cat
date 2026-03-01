"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash, X } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  fetchRecurringBlocks,
  createRecurringBlock,
  deleteRecurringBlock,
} from "@/api/business-portal";
import type { RecurringBlock } from "@/types/court";

const DAY_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface RecurringBlocksDialogProps {
  open: boolean;
  onClose: () => void;
  courtId: string;
  totalCourts: number;
}

export function RecurringBlocksDialog({
  open,
  onClose,
  courtId,
  totalCourts,
}: RecurringBlocksDialogProps) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ day: 0, start: 8, end: 10, court: "all", label: "" });

  const { data: blocks = [] } = useQuery({
    queryKey: ["recurring-blocks", courtId],
    queryFn: () => fetchRecurringBlocks(courtId),
    enabled: open,
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<RecurringBlock, "id">) => createRecurringBlock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-blocks", courtId] });
      queryClient.invalidateQueries({ queryKey: ["court-week-slots", courtId] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRecurringBlock(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring-blocks", courtId] });
      queryClient.invalidateQueries({ queryKey: ["court-week-slots", courtId] });
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setFormData({ day: 0, start: 8, end: 10, court: "all", label: "" });
  };

  const handleCreate = () => {
    createMutation.mutate({
      courtId,
      dayOfWeek: formData.day,
      startHour: formData.start,
      endHour: formData.end,
      courtIndex: formData.court === "all" ? undefined : Number(formData.court),
      label: formData.label || undefined,
    });
  };

  const hours = Array.from({ length: 15 }, (_, i) => i + 7);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">Recurring Blocks</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Existing blocks */}
          {blocks.length === 0 && !showForm && (
            <p className="text-sm text-gray-500 text-center py-4">
              No recurring blocks yet. Add one to automatically block slots every week.
            </p>
          )}

          {blocks.map((block) => (
            <div
              key={block.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/50"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">
                  {DAY_LABELS[block.dayOfWeek]}{" "}
                  {String(block.startHour).padStart(2, "0")}:00–
                  {String(block.endHour).padStart(2, "0")}:00
                </p>
                <p className="text-[11px] text-gray-500">
                  {block.courtIndex ? `Court ${block.courtIndex}` : "All courts"}
                  {block.label && ` · ${block.label}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deleteMutation.mutate(block.id)}
                disabled={deleteMutation.isPending}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}

          {/* Add form */}
          {showForm ? (
            <div className="space-y-3 p-3 rounded-xl border border-coral/20 bg-coral/[0.02]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">New Block</span>
                <button
                  type="button"
                  onClick={resetForm}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="recurring-block-day" className="text-[11px] font-medium text-gray-500 mb-1 block">Day</label>
                  <Select value={String(formData.day)} onValueChange={(v) => setFormData(prev => ({ ...prev, day: Number(v) }))}>
                    <SelectTrigger id="recurring-block-day" className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAY_LABELS.map((label, i) => (
                        <SelectItem key={label} value={String(i)}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="recurring-block-court" className="text-[11px] font-medium text-gray-500 mb-1 block">Court</label>
                  <Select value={formData.court} onValueChange={(v) => setFormData(prev => ({ ...prev, court: v }))}>
                    <SelectTrigger id="recurring-block-court" className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All courts</SelectItem>
                      {Array.from({ length: totalCourts }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          Court {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="recurring-block-from" className="text-[11px] font-medium text-gray-500 mb-1 block">From</label>
                  <Select value={String(formData.start)} onValueChange={(v) => setFormData(prev => ({ ...prev, start: Number(v) }))}>
                    <SelectTrigger id="recurring-block-from" className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((h) => (
                        <SelectItem key={h} value={String(h)}>
                          {String(h).padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="recurring-block-to" className="text-[11px] font-medium text-gray-500 mb-1 block">To</label>
                  <Select value={String(formData.end)} onValueChange={(v) => setFormData(prev => ({ ...prev, end: Number(v) }))}>
                    <SelectTrigger id="recurring-block-to" className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.filter((h) => h > formData.start).map((h) => (
                        <SelectItem key={h} value={String(h)}>
                          {String(h).padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                      <SelectItem value="22">22:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="recurring-block-label" className="text-[11px] font-medium text-gray-500 mb-1 block">Label (optional)</label>
                <input
                  id="recurring-block-label"
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g. Team practice, Maintenance"
                  className="w-full h-8 px-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
                />
              </div>

              <button
                type="button"
                onClick={handleCreate}
                disabled={createMutation.isPending || formData.end <= formData.start}
                className={cn(
                  "w-full h-8 rounded-lg text-xs font-medium transition-colors",
                  formData.end > formData.start
                    ? "bg-coral text-white hover:bg-coral-hover"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                Create Block
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-1.5 h-9 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500 hover:text-coral hover:border-coral/30 transition-colors"
            >
              <Plus size={14} weight="bold" />
              Add Recurring Block
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
