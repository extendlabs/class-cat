"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhotoCarouselModal } from "@/components/features/photo-carousel-modal";
import { PhotoManagerDialog } from "@/components/features/business-profile/photo-manager-dialog";
import { HoursEditDialog } from "@/components/features/business-profile/hours-edit-dialog";
import { InstructorDialog } from "@/components/features/business-profile/instructor-dialog";
import { LocationDialog } from "@/components/features/business-profile/location-dialog";
import type { Instructor } from "@/types/activity";
import type { BusinessPageState, BusinessPageAction, BusinessData } from "@/types/business-profile";

export function EditDialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-2">{children}</div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={onClose}>Cancel</Button>
          <Button className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={onClose}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function BusinessDialogs({
  state,
  business,
  currentInstructors,
  allImages,
  dispatch,
  photoUploadRef,
  instructorAvatarInputRef,
  onSaveInstructor,
  onInviteUser,
  onLookupEmail,
  onConfirmDeleteInstructor,
  onSaveLocation,
  onConfirmDeleteLocation,
}: {
  state: BusinessPageState;
  business: BusinessData;
  currentInstructors: Instructor[];
  allImages: { src: string; alt: string; caption?: string }[];
  dispatch: React.Dispatch<BusinessPageAction>;
  photoUploadRef: React.RefObject<HTMLInputElement | null>;
  instructorAvatarInputRef: React.RefObject<HTMLInputElement | null>;
  onSaveInstructor: () => Promise<void>;
  onInviteUser: () => Promise<void>;
  onLookupEmail: () => Promise<void>;
  onConfirmDeleteInstructor: () => void;
  onSaveLocation: () => void;
  onConfirmDeleteLocation: () => void;
}) {
  return (
    <>
      <PhotoManagerDialog
        open={state.photoManagerOpen}
        managedPhotos={state.managedPhotos}
        dragOverIdx={state.dragOverIdx}
        dragIdx={state.dragIdx}
        dispatch={dispatch}
        photoUploadRef={photoUploadRef}
      />

      <HoursEditDialog
        open={state.editSection === "hours"}
        editingHours={state.editingHours}
        dispatch={dispatch}
      />

      <EditDialog open={state.editSection === "contact"} onClose={() => dispatch({ type: "SET_EDIT_SECTION", payload: null })} title="Edit Contact Info">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={business.contact.phone} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={business.contact.email} />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input defaultValue={business.contact.website} />
          </div>
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input defaultValue={business.social.instagram} />
          </div>
          <div className="space-y-2">
            <Label>Facebook</Label>
            <Input defaultValue={business.social.facebook} />
          </div>
        </div>
      </EditDialog>

      <InstructorDialog
        state={state}
        currentInstructors={currentInstructors}
        dispatch={dispatch}
        instructorAvatarInputRef={instructorAvatarInputRef}
        onSaveInstructor={onSaveInstructor}
        onInviteUser={onInviteUser}
        onLookupEmail={onLookupEmail}
      />

      <AlertDialog open={!!state.deleteInstructorId} onOpenChange={(v) => !v && dispatch({ type: "SET_DELETE_INSTRUCTOR_ID", payload: null })}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Instructor?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to remove this instructor? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" className="rounded-full" onClick={onConfirmDeleteInstructor}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <LocationDialog
        open={state.locationDialogOpen}
        editingLocation={state.editingLocation}
        locationForm={state.locationForm}
        locationCoords={state.locationCoords}
        dispatch={dispatch}
        onSave={onSaveLocation}
      />

      <AlertDialog open={!!state.deleteLocationId} onOpenChange={(v) => !v && dispatch({ type: "SET_DELETE_LOCATION_ID", payload: null })}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Location?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to remove this location? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" className="rounded-full" onClick={onConfirmDeleteLocation}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PhotoCarouselModal
        images={allImages}
        open={state.galleryOpen}
        onOpenChange={(v) => dispatch({ type: "SET_GALLERY_OPEN", payload: v })}
        currentIndex={state.galleryIndex}
        onIndexChange={(i) => dispatch({ type: "SET_GALLERY_INDEX", payload: i })}
      />
    </>
  );
}
