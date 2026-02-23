"use client";

import {
  Camera,
  MagnifyingGlass,
  SpinnerGap,
  ArrowLeft,
  UserPlus,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Instructor } from "@/types/activity";
import type { BusinessPageState, BusinessPageAction, InstructorFormData } from "@/types/business-profile";

function InstructorAvatarAndName({
  instructorForm,
  dispatch,
  instructorAvatarInputRef,
}: {
  instructorForm: InstructorFormData;
  dispatch: React.Dispatch<BusinessPageAction>;
  instructorAvatarInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative group/avatar">
        <Avatar className="w-16 h-16 ring-4 ring-coral/10">
          {instructorForm.avatar ? <AvatarImage src={instructorForm.avatar} alt="Preview" /> : null}
          <AvatarFallback className="text-lg bg-coral/10 text-coral font-bold">
            {instructorForm.name ? instructorForm.name.charAt(0).toUpperCase() : "?"}
          </AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={() => instructorAvatarInputRef.current?.click()}
          className="absolute inset-0 rounded-full bg-black/0 group-hover/avatar:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover/avatar:opacity-100"
        >
          <Camera size={18} className="text-white drop-shadow-md" />
        </button>
        <input
          ref={instructorAvatarInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { avatar: URL.createObjectURL(file) } });
          }}
        />
      </div>
      <div className="flex-1 space-y-2">
        <Label>Name</Label>
        <Input
          value={instructorForm.name}
          onChange={(e) => dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { name: e.target.value } })}
          placeholder="Instructor name"
        />
      </div>
    </div>
  );
}

export function InstructorDialog({
  state,
  currentInstructors,
  dispatch,
  instructorAvatarInputRef,
  onSaveInstructor,
  onInviteUser,
  onLookupEmail,
}: {
  state: BusinessPageState;
  currentInstructors: Instructor[];
  dispatch: React.Dispatch<BusinessPageAction>;
  instructorAvatarInputRef: React.RefObject<HTMLInputElement | null>;
  onSaveInstructor: () => Promise<void>;
  onInviteUser: () => Promise<void>;
  onLookupEmail: () => Promise<void>;
}) {
  const {
    instructorDialogOpen,
    editingInstructor,
    dialogStep,
    lookupEmail,
    lookupResult,
    lookupLoading,
    instructorForm,
  } = state;

  return (
    <Dialog open={instructorDialogOpen} onOpenChange={(v) => !v && dispatch({ type: "SET_INSTRUCTOR_DIALOG_OPEN", payload: false })}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingInstructor
              ? "Edit Instructor"
              : dialogStep === "found"
                ? "User Found"
                : dialogStep === "not-found"
                  ? "User Not Found"
                  : "Add Instructor"}
          </DialogTitle>
        </DialogHeader>

        {/* Step: email */}
        {!editingInstructor && dialogStep === "email" && (
          <div className="space-y-4 py-2">
            <p className="text-sm text-gray-500">
              Search for an existing user by email, or add a new instructor manually.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                value={lookupEmail}
                onChange={(e) => dispatch({ type: "SET_LOOKUP_EMAIL", payload: e.target.value })}
                placeholder="instructor@email.com"
                onKeyDown={(e) => e.key === "Enter" && onLookupEmail()}
              />
              <Button
                className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5 shrink-0"
                onClick={onLookupEmail}
                disabled={!lookupEmail.trim() || lookupLoading}
              >
                {lookupLoading ? (
                  <SpinnerGap size={16} className="animate-spin" />
                ) : (
                  <MagnifyingGlass size={16} />
                )}
                Search
              </Button>
            </div>
            <button
              onClick={() => {
                dispatch({ type: "SET_DIALOG_STEP", payload: "not-found" });
                dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { createAccount: false } });
              }}
              className="text-sm text-coral hover:text-coral-hover font-medium transition-colors"
            >
              Skip, add manually
            </button>
          </div>
        )}

        {/* Step: found */}
        {!editingInstructor && dialogStep === "found" && lookupResult && (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-4 rounded-xl border border-green-200 bg-green-50/50 p-4">
              <Avatar className="w-14 h-14 ring-4 ring-green-100">
                {lookupResult.avatar ? <AvatarImage src={lookupResult.avatar} alt={lookupResult.name} /> : null}
                <AvatarFallback className="text-lg bg-green-100 text-green-700 font-bold">
                  {lookupResult.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{lookupResult.name}</p>
                <p className="text-sm text-gray-500 truncate">{lookupResult.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">Member since {new Date(lookupResult.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="rounded-full gap-1.5"
                onClick={() => { dispatch({ type: "SET_DIALOG_STEP", payload: "email" }); dispatch({ type: "SET_LOOKUP_RESULT", payload: null }); }}
              >
                <ArrowLeft size={14} />
                Back
              </Button>
              <Button
                className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5"
                onClick={onInviteUser}
                disabled={lookupLoading}
              >
                {lookupLoading ? (
                  <SpinnerGap size={16} className="animate-spin" />
                ) : (
                  <UserPlus size={16} />
                )}
                Invite as Instructor
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Step: not-found */}
        {!editingInstructor && dialogStep === "not-found" && (
          <div className="space-y-4 py-2">
            {lookupEmail.trim() && (
              <p className="text-sm text-gray-500">
                No account found for <span className="font-medium text-gray-700">{lookupEmail}</span>. Create a new instructor below.
              </p>
            )}
            <InstructorAvatarAndName
              instructorForm={instructorForm}
              dispatch={dispatch}
              instructorAvatarInputRef={instructorAvatarInputRef}
            />
            <div className="space-y-2">
              <Label>Specialty</Label>
              <Input
                value={instructorForm.specialty}
                onChange={(e) => dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { specialty: e.target.value } })}
                placeholder="e.g. Yoga & Meditation"
              />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3">
              <div>
                <Label className="text-sm font-medium text-gray-900">Create Account</Label>
                <p className="text-xs text-gray-500 mt-0.5">Allow instructor to log in and manage their profile</p>
              </div>
              <Switch checked={instructorForm.createAccount} onCheckedChange={(checked) => dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { createAccount: checked } })} />
            </div>
            {instructorForm.createAccount && (
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={instructorForm.email}
                  onChange={(e) => dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { email: e.target.value } })}
                  placeholder="instructor@email.com"
                />
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                className="rounded-full gap-1.5"
                onClick={() => { dispatch({ type: "SET_DIALOG_STEP", payload: "email" }); dispatch({ type: "SET_LOOKUP_RESULT", payload: null }); }}
              >
                <ArrowLeft size={14} />
                Back
              </Button>
              <Button className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={onSaveInstructor} disabled={!instructorForm.name.trim()}>
                Add Instructor
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Step: edit */}
        {(editingInstructor || dialogStep === "edit") && (
          <div className="space-y-4 py-2">
            <InstructorAvatarAndName
              instructorForm={instructorForm}
              dispatch={dispatch}
              instructorAvatarInputRef={instructorAvatarInputRef}
            />
            <div className="space-y-2">
              <Label>Specialty</Label>
              <Input
                value={instructorForm.specialty}
                onChange={(e) => dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { specialty: e.target.value } })}
                placeholder="e.g. Yoga & Meditation"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={instructorForm.email}
                onChange={(e) => dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { email: e.target.value } })}
                placeholder="instructor@email.com"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" className="rounded-full" onClick={() => dispatch({ type: "SET_INSTRUCTOR_DIALOG_OPEN", payload: false })}>Cancel</Button>
              <Button className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={onSaveInstructor} disabled={!instructorForm.name.trim()}>
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
