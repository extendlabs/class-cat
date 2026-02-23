"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { ProfileState, ProfileAction } from "@/types/instructor-profile";
import { ICON_OPTIONS } from "@/types/instructor-profile";

export function AchievementDialog({
  state,
  dispatch,
  saveAchievement,
}: {
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
  saveAchievement: () => void;
}) {
  return (
    <Dialog open={state.achievementDialogOpen} onOpenChange={(v) => !v && dispatch({ type: "CLOSE_ACHIEVEMENT_DIALOG" })}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{state.editingAchievementIdx !== null ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-500">Icon</Label>
            <div className="flex gap-2">
              {ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => dispatch({ type: "SET_ACHIEVEMENT_FORM", form: { ...state.achievementForm, icon: opt.value } })}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    state.achievementForm.icon === opt.value
                      ? "bg-coral text-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <opt.Icon size={18} weight="fill" />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-500">Title</Label>
            <Input
              value={state.achievementForm.title}
              onChange={(e) => dispatch({ type: "SET_ACHIEVEMENT_FORM", form: { ...state.achievementForm, title: e.target.value } })}
              placeholder="e.g. National Champion 2024"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-500">Description</Label>
            <Textarea
              value={state.achievementForm.description}
              onChange={(e) => dispatch({ type: "SET_ACHIEVEMENT_FORM", form: { ...state.achievementForm, description: e.target.value } })}
              placeholder="Brief description of the achievement..."
              rows={3}
              className="resize-none rounded-xl"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={() => dispatch({ type: "CLOSE_ACHIEVEMENT_DIALOG" })}>Cancel</Button>
          <Button className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={saveAchievement} disabled={!state.achievementForm.title.trim()}>
            {state.editingAchievementIdx !== null ? "Save Changes" : "Add Achievement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
