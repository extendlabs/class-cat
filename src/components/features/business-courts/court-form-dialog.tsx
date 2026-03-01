"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Court, CourtSport, CourtSurface, CourtStatus } from "@/types/court";

const SPORTS: CourtSport[] = ["tennis", "padel", "badminton", "squash", "basketball", "volleyball", "futsal"];
const SURFACES: CourtSurface[] = ["clay", "hard", "grass", "synthetic", "parquet", "rubber"];
const STATUSES: CourtStatus[] = ["active", "inactive", "maintenance"];
const DAYS = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  sport: z.string().min(1),
  surface: z.string().min(1),
  indoor: z.boolean(),
  status: z.string().min(1),
  image: z.string().url().or(z.literal("")),
  address: z.string().min(1, "Address is required"),
  pricePerHour: z.number().min(1, "Price must be > 0"),
  courtCount: z.number().min(1, "At least 1 court"),
  amenities: z.string(),
  hours: z.array(z.object({
    day: z.string(),
    open: z.string(),
    close: z.string(),
    closed: z.boolean().optional(),
  })),
});

type FormValues = z.infer<typeof schema>;

const DEFAULT_HOURS = DAYS.map((day) => ({ day, open: "8:00", close: "20:00", closed: false }));

export function CourtFormDialog({
  open,
  onClose,
  onSubmit,
  mode,
  court,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Court>) => void;
  mode: "create" | "edit";
  court?: Court;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg rounded-2xl max-h-[90vh] overflow-y-auto">
        <CourtFormDialogContent
          onClose={onClose}
          onSubmit={onSubmit}
          mode={mode}
          court={court}
        />
      </DialogContent>
    </Dialog>
  );
}

function CourtFormDialogContent({
  onClose,
  onSubmit,
  mode,
  court,
}: {
  onClose: () => void;
  onSubmit: (data: Partial<Court>) => void;
  mode: "create" | "edit";
  court?: Court;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: mode === "edit" && court ? {
      name: court.name,
      sport: court.sport,
      surface: court.surface,
      indoor: court.indoor,
      status: court.status ?? "active",
      image: court.image,
      address: court.address,
      pricePerHour: court.pricePerHour,
      courtCount: court.courtCount ?? 1,
      amenities: court.amenities.join(", "),
      hours: court.operatingHours.length > 0
        ? court.operatingHours.map((h) => ({ ...h, closed: (h as { closed?: boolean }).closed ?? false }))
        : DEFAULT_HOURS,
    } : {
      name: "",
      sport: "tennis",
      surface: "hard",
      indoor: false,
      status: "active",
      image: "",
      address: "",
      pricePerHour: 80,
      courtCount: 1,
      amenities: "",
      hours: DEFAULT_HOURS,
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      name: values.name,
      sport: values.sport as CourtSport,
      surface: values.surface as CourtSurface,
      indoor: values.indoor,
      status: values.status as CourtStatus,
      image: values.image || "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
      address: values.address,
      pricePerHour: values.pricePerHour,
      courtCount: values.courtCount,
      amenities: values.amenities.split(",").map((s) => s.trim()).filter(Boolean),
      operatingHours: values.hours.map((h) => ({
        day: h.day,
        open: h.closed ? "" : h.open,
        close: h.closed ? "" : h.close,
      })),
    });
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "Add Court" : "Edit Court"}</DialogTitle>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-2">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="court-name">Name</Label>
          <Input id="court-name" {...form.register("name")} placeholder="Court name" />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        {/* Sport + Surface row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Sport</Label>
            <Select value={form.watch("sport")} onValueChange={(v) => form.setValue("sport", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {SPORTS.map((s) => (
                  <SelectItem key={s} value={s}><span className="capitalize">{s}</span></SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Surface</Label>
            <Select value={form.watch("surface")} onValueChange={(v) => form.setValue("surface", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {SURFACES.map((s) => (
                  <SelectItem key={s} value={s}><span className="capitalize">{s}</span></SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Status + Indoor row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={form.watch("status")} onValueChange={(v) => form.setValue("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}><span className="capitalize">{s}</span></SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Indoor</Label>
            <div className="flex items-center gap-2 h-9">
              <Switch
                checked={form.watch("indoor")}
                onCheckedChange={(v) => form.setValue("indoor", v)}
              />
              <span className="text-sm text-gray-600">
                {form.watch("indoor") ? "Indoor" : "Outdoor"}
              </span>
            </div>
          </div>
        </div>

        {/* Price + Court count + Image */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="court-price">Price / hour (zł)</Label>
            <Input id="court-price" type="number" {...form.register("pricePerHour", { valueAsNumber: true })} />
            {form.formState.errors.pricePerHour && (
              <p className="text-xs text-red-500">{form.formState.errors.pricePerHour.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="court-count">No. of courts</Label>
            <Input id="court-count" type="number" min={1} {...form.register("courtCount", { valueAsNumber: true })} />
            {form.formState.errors.courtCount && (
              <p className="text-xs text-red-500">{form.formState.errors.courtCount.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="court-image">Image URL</Label>
            <Input id="court-image" {...form.register("image")} placeholder="https://..." />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <Label htmlFor="court-address">Address</Label>
          <Input id="court-address" {...form.register("address")} placeholder="ul. Przykładowa 1, Warszawa" />
          {form.formState.errors.address && (
            <p className="text-xs text-red-500">{form.formState.errors.address.message}</p>
          )}
        </div>

        {/* Amenities */}
        <div className="space-y-1.5">
          <Label htmlFor="court-amenities">Amenities (comma-separated)</Label>
          <Input id="court-amenities" {...form.register("amenities")} placeholder="szatnia, prysznice, parking" />
        </div>

        {/* Operating Hours */}
        <div className="space-y-2">
          <Label>Operating Hours</Label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto rounded-xl border border-gray-100 p-3">
            {DAYS.map((day, i) => {
              const isClosed = form.watch(`hours.${i}.closed`) ?? false;
              return (
              <div
                key={day}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                  isClosed ? "bg-gray-50" : ""
                }`}
              >
                <span className={`text-xs w-20 flex-shrink-0 truncate ${isClosed ? "text-gray-400" : "text-gray-600"}`}>{day}</span>
                <div className={`flex items-center gap-1.5 transition-opacity ${isClosed ? "opacity-30 pointer-events-none" : ""}`}>
                  <Input
                    className="h-8 text-xs w-[72px]"
                    {...form.register(`hours.${i}.open`)}
                    disabled={isClosed}
                    placeholder="8:00"
                  />
                  <span className="text-gray-300 text-xs">–</span>
                  <Input
                    className="h-8 text-xs w-[72px]"
                    {...form.register(`hours.${i}.close`)}
                    disabled={isClosed}
                    placeholder="20:00"
                  />
                </div>
                <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
                  <span className={`text-[10px] font-medium ${isClosed ? "text-red-400" : "text-gray-400"}`}>
                    {isClosed ? "Closed" : "Open"}
                  </span>
                  <Switch
                    checked={isClosed}
                    onCheckedChange={(checked) => form.setValue(`hours.${i}.closed`, checked)}
                    className="scale-75"
                  />
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" className="rounded-full" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="rounded-full bg-coral hover:bg-coral-hover text-white">
            {mode === "create" ? "Create Court" : "Save Changes"}
          </Button>
        </div>
      </form>
    </>
  );
}
