"use client";

import { useCallback } from "react";
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
import { SidebarMap } from "@/components/features/sidebar-map";
import type { BusinessLocation } from "@/types/business";
import type { LocationFormData, BusinessPageAction } from "@/types/business-profile";

export function LocationDialog({
  open,
  editingLocation,
  locationForm,
  locationCoords,
  dispatch,
  onSave,
}: {
  open: boolean;
  editingLocation: BusinessLocation | null;
  locationForm: LocationFormData;
  locationCoords: { lat: number; lng: number };
  dispatch: React.Dispatch<BusinessPageAction>;
  onSave: () => void;
}) {
  const handleCoordinateChange = useCallback(
    (coords: { lat: number; lng: number }) => dispatch({ type: "SET_LOCATION_COORDS", payload: coords }),
    [dispatch]
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && dispatch({ type: "SET_LOCATION_DIALOG_OPEN", payload: false })}>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingLocation ? "Edit Location" : "Add Location"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Location Name</Label>
            <Input value={locationForm.name} onChange={(e) => dispatch({ type: "UPDATE_LOCATION_FORM", payload: { name: e.target.value } })} placeholder="e.g. Main Studio" />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input value={locationForm.address} onChange={(e) => dispatch({ type: "UPDATE_LOCATION_FORM", payload: { address: e.target.value } })} placeholder="e.g. ul. Krakowska 15, Krakow" />
          </div>
          <div className="space-y-2">
            <Label>Pin on Map</Label>
            <SidebarMap lat={locationCoords.lat} lng={locationCoords.lng} address={locationForm.address || "Click to set location"} interactive onCoordinateChange={handleCoordinateChange} />
            <div className="flex gap-4 text-xs text-gray-400">
              <span>Lat: {locationCoords.lat.toFixed(4)}</span>
              <span>Lng: {locationCoords.lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={() => dispatch({ type: "SET_LOCATION_DIALOG_OPEN", payload: false })}>Cancel</Button>
          <Button className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={onSave} disabled={!locationForm.name.trim()}>
            {editingLocation ? "Save Changes" : "Add Location"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
