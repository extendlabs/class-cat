"use client";

import { Clock } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { BusinessPageAction } from "@/types/business-profile";

export function HoursEditDialog({
  open,
  editingHours,
  dispatch,
}: {
  open: boolean;
  editingHours: { day: string; open: string; close: string; closed?: boolean }[] | null;
  dispatch: React.Dispatch<BusinessPageAction>;
}) {
  const updateHour = (idx: number, field: "open" | "close", value: string) => {
    if (!editingHours) return;
    const updated = [...editingHours];
    updated[idx] = { ...updated[idx], [field]: value };
    dispatch({ type: "SET_EDITING_HOURS", payload: updated });
  };

  const toggleDayClosed = (idx: number, closed: boolean) => {
    if (!editingHours) return;
    const updated = [...editingHours];
    updated[idx] = { ...updated[idx], closed };
    dispatch({ type: "SET_EDITING_HOURS", payload: updated });
  };

  const closeDialog = () => {
    dispatch({ type: "SET_EDIT_SECTION", payload: null });
    dispatch({ type: "SET_EDITING_HOURS", payload: null });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) closeDialog(); }}>
      <DialogContent className="rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Operating Hours</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 -mt-1">Set your business hours for each day.</p>
        <div className="space-y-2 py-2">
          {editingHours?.map((h, i) => {
            const isClosed = h.closed ?? false;
            return (
              <div
                key={h.day}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                  isClosed ? "bg-gray-50" : "bg-white border border-gray-100"
                }`}
              >
                <span className={`text-sm w-28 flex-shrink-0 ${isClosed ? "text-gray-400" : "font-medium text-gray-800"}`}>
                  {h.day}
                </span>
                <div className={`flex items-center gap-2 transition-opacity ${isClosed ? "opacity-30 pointer-events-none" : ""}`}>
                  <div className="relative">
                    <Clock size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="time"
                      value={h.open}
                      disabled={isClosed}
                      onChange={(e) => updateHour(i, "open", e.target.value)}
                      className="h-9 w-[6.5rem] rounded-lg border border-gray-200 bg-white pl-8 pr-2 text-sm text-gray-700 outline-none transition-all focus:border-coral focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed"
                    />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">–</span>
                  <div className="relative">
                    <Clock size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="time"
                      value={h.close}
                      disabled={isClosed}
                      onChange={(e) => updateHour(i, "close", e.target.value)}
                      className="h-9 w-[6.5rem] rounded-lg border border-gray-200 bg-white pl-8 pr-2 text-sm text-gray-700 outline-none transition-all focus:border-coral focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 ml-auto flex-shrink-0">
                  <span className={`text-xs font-medium ${isClosed ? "text-red-400" : "text-gray-400"}`}>
                    {isClosed ? "Closed" : "Open"}
                  </span>
                  <Switch
                    checked={isClosed}
                    onCheckedChange={(checked) => toggleDayClosed(i, checked)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={closeDialog}>
            Cancel
          </Button>
          <Button className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={closeDialog}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
