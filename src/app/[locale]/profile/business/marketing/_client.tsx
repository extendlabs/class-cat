"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Megaphone,
  Plus,
} from "@phosphor-icons/react";
import {
  fetchPromotions,
  fetchBusinessActivities,
  createPromotion,
} from "@/api/business-portal";
import { AnimateIn } from "@/components/ui/animate-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
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
  DialogFooter,
} from "@/components/ui/dialog";
import type { BusinessPromotion } from "@/types/business-portal";

const PROMO_STATUS: Record<BusinessPromotion["status"], string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
  ended: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function PageContent() {
  const queryClient = useQueryClient();
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [newPromo, setNewPromo] = useState({
    activityId: "",
    activityTitle: "",
    dailyBudget: 10,
    startDate: "",
    endDate: "",
  });

  const { data: promotions, isLoading: promosLoading } = useQuery({
    queryKey: ["promotions"],
    queryFn: fetchPromotions,
  });

  const { data: activities } = useQuery({
    queryKey: ["business-activities"],
    queryFn: fetchBusinessActivities,
  });

  const createPromoMutation = useMutation({
    mutationFn: createPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
      setPromoDialogOpen(false);
    },
  });

  if (promosLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <AnimateIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Promotions
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Promote your activities and reach more students.
            </p>
          </div>
          <Button
            onClick={() => setPromoDialogOpen(true)}
            className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5"
            size="sm"
          >
            <Plus size={14} weight="bold" />
            New Promotion
          </Button>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <div className="space-y-3">
          {promotions?.map((promo) => (
            <div
              key={promo.id}
              className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60 hover:shadow-[var(--shadow-hover)] transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {promo.activityTitle}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ${promo.dailyBudget}/day &middot; {promo.startDate} – {promo.endDate}
                  </p>
                </div>
                <Badge className={`text-[10px] capitalize border ${PROMO_STATUS[promo.status]}`}>
                  {promo.status}
                </Badge>
              </div>
              <div className="flex gap-6 mt-4 text-xs text-gray-500">
                <span>
                  <strong className="text-gray-900">{promo.impressions.toLocaleString()}</strong> impressions
                </span>
                <span>
                  <strong className="text-gray-900">{promo.clicks.toLocaleString()}</strong> clicks
                </span>
                <span>
                  <strong className="text-gray-900">
                    {promo.impressions > 0
                      ? ((promo.clicks / promo.impressions) * 100).toFixed(1)
                      : "0"}
                    %
                  </strong>{" "}
                  CTR
                </span>
              </div>
            </div>
          ))}
          {(!promotions || promotions.length === 0) && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
              <Megaphone size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No promotions yet.</p>
            </div>
          )}
        </div>
      </AnimateIn>

      {/* New Promotion Dialog */}
      <Dialog open={promoDialogOpen} onOpenChange={setPromoDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Promotion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Activity</Label>
              <Select
                value={newPromo.activityId}
                onValueChange={(v) => {
                  const act = activities?.find((a) => a.id === v);
                  setNewPromo((p) => ({
                    ...p,
                    activityId: v,
                    activityTitle: act?.title ?? "",
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  {activities?.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Daily Budget ($)</Label>
              <Input
                type="number"
                min={1}
                value={newPromo.dailyBudget}
                onChange={(e) =>
                  setNewPromo((p) => ({ ...p, dailyBudget: Number(e.target.value) }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={newPromo.startDate}
                  onChange={(e) =>
                    setNewPromo((p) => ({ ...p, startDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={newPromo.endDate}
                  onChange={(e) =>
                    setNewPromo((p) => ({ ...p, endDate: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setPromoDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-full bg-coral hover:bg-coral-hover text-white"
              disabled={!newPromo.activityId || !newPromo.startDate || !newPromo.endDate}
              onClick={() => {
                createPromoMutation.mutate({
                  activityId: newPromo.activityId,
                  activityTitle: newPromo.activityTitle,
                  dailyBudget: newPromo.dailyBudget,
                  startDate: newPromo.startDate,
                  endDate: newPromo.endDate,
                  status: "active",
                });
              }}
            >
              Create Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
