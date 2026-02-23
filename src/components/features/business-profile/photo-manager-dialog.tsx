"use client";

import Image from "next/image";
import { DotsSixVertical, Trash, UploadSimple } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ManagedPhoto, BusinessPageAction } from "@/types/business-profile";

export function PhotoManagerDialog({
  open,
  managedPhotos,
  dragOverIdx,
  dragIdx,
  dispatch,
  photoUploadRef,
}: {
  open: boolean;
  managedPhotos: ManagedPhoto[] | null;
  dragOverIdx: number | null;
  dragIdx: number | null;
  dispatch: React.Dispatch<BusinessPageAction>;
  photoUploadRef: React.RefObject<HTMLInputElement | null>;
}) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !managedPhotos) return;
    const newPhotos = Array.from(files).map((file, i) => ({
      id: `new-${Date.now()}-${i}`,
      src: URL.createObjectURL(file),
      alt: file.name,
      caption: "",
    }));
    dispatch({ type: "SET_MANAGED_PHOTOS", payload: [...managedPhotos, ...newPhotos] });
    e.target.value = "";
  };

  const handlePhotoReplace = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !managedPhotos) return;
    const updated = [...managedPhotos];
    updated[index] = { ...updated[index], src: URL.createObjectURL(file) };
    dispatch({ type: "SET_MANAGED_PHOTOS", payload: updated });
  };

  const removePhoto = (index: number) => {
    if (!managedPhotos) return;
    dispatch({ type: "SET_MANAGED_PHOTOS", payload: managedPhotos.filter((_, i) => i !== index) });
  };

  const handleDragStart = (idx: number) => dispatch({ type: "SET_DRAG", payload: { dragIdx: idx, dragOverIdx: null } });
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAG", payload: { dragIdx, dragOverIdx: idx } });
  };
  const handleDrop = (idx: number) => {
    if (dragIdx === null || !managedPhotos) return;
    const items = [...managedPhotos];
    const [moved] = items.splice(dragIdx, 1);
    items.splice(idx, 0, moved);
    dispatch({ type: "SET_MANAGED_PHOTOS", payload: items });
    dispatch({ type: "SET_DRAG", payload: { dragIdx: null, dragOverIdx: null } });
  };
  const handleDragEnd = () => dispatch({ type: "SET_DRAG", payload: { dragIdx: null, dragOverIdx: null } });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && dispatch({ type: "SET_PHOTO_MANAGER_OPEN", payload: false })}>
      <DialogContent className="rounded-2xl sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Photos</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 -mt-1">Drag to reorder. First photo is the cover image.</p>
        <div className="flex-1 overflow-y-auto py-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {managedPhotos?.map((photo, idx) => (
              <div
                key={photo.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={() => handleDrop(idx)}
                onDragEnd={handleDragEnd}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all group/photo cursor-grab active:cursor-grabbing ${
                  dragOverIdx === idx ? "border-coral scale-[1.02] shadow-lg" : dragIdx === idx ? "opacity-50 border-gray-200" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="200px" />
                {idx === 0 && (
                  <span className="absolute top-2 left-2 bg-coral text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Cover
                  </span>
                )}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/photo:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                    <DotsSixVertical size={14} className="text-gray-500" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover/photo:opacity-100 transition-all duration-200">
                  <label className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-coral hover:text-white transition-all duration-200 text-gray-500 hover:scale-110">
                    <UploadSimple size={12} weight="bold" />
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoReplace(idx, e)} />
                  </label>
                  <button
                    onClick={() => removePhoto(idx)}
                    className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all duration-200 text-gray-500 hover:scale-110"
                  >
                    <Trash size={12} weight="bold" />
                  </button>
                </div>
              </div>
            ))}

            <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 hover:border-coral/40 hover:bg-coral/5 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-gray-400 hover:text-coral">
              <UploadSimple size={24} />
              <span className="text-xs font-bold">Add Photo</span>
              <input ref={photoUploadRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={() => { dispatch({ type: "SET_MANAGED_PHOTOS", payload: null }); dispatch({ type: "SET_PHOTO_MANAGER_OPEN", payload: false }); }}>
            Cancel
          </Button>
          <Button className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={() => dispatch({ type: "SET_PHOTO_MANAGER_OPEN", payload: false })}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
