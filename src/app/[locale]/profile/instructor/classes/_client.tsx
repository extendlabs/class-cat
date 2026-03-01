"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Star, Users, MapPin, Plus, Trash } from "@phosphor-icons/react";
import { fetchInstructorProfile } from "@/api/instructor";
import { fetchInstructorOwnActivities, createInstructorActivity, deleteInstructorActivity } from "@/api/instructor-activities";
import { useAuth } from "@/hooks/use-auth";
import { AnimateIn } from "@/components/ui/animate-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ActivityFormDialog } from "@/components/features/activity-form-dialog";
import type { Activity, Category, TimeSlot } from "@/types/activity";
import type { BusinessActivity } from "@/types/business-portal";

function ClassCard({ activity, onDelete }: { activity: Activity; onDelete?: () => void }) {
  return (
    <div className="rounded-2xl bg-white shadow-[var(--shadow-soft)] border border-gray-100/60 overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all group">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 border-0 text-[10px] font-bold uppercase tracking-wider">
          {activity.category}
        </Badge>
        {onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash size={12} weight="bold" />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm truncate">{activity.title}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{activity.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Star size={12} weight="fill" className="text-amber-400" />
              {activity.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} />
              {activity.reviewCount} reviews
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={12} />
            {activity.location}
          </span>
        </div>
        {activity.spotsLeft !== undefined && (
          <div className="mt-2">
            <Badge variant="secondary" className="text-[10px] bg-coral/10 text-coral border-0">
              {activity.spotsLeft} spots left
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InstructorClassesPage() {
  const { user } = useAuth();
  const instructorId = user?.instructorId ?? "inst-6";
  const queryClient = useQueryClient();
  const [tabOverride, setActiveTab] = useState<"freelance" | "business" | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data: instructor, isLoading: loadingProfile } = useQuery({
    queryKey: ["instructor-profile", instructorId],
    queryFn: () => fetchInstructorProfile(instructorId),
  });

  const isFreelance = instructor?.isFreelance ?? false;
  const activeTab = tabOverride ?? (isFreelance ? "freelance" : "business");

  const { data: freelanceClasses, isLoading: loadingFreelance } = useQuery({
    queryKey: ["instructor-own-activities", instructorId],
    queryFn: () => fetchInstructorOwnActivities(instructorId),
    enabled: isFreelance,
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Activity>) => createInstructorActivity(instructorId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor-own-activities"] });
      setCreateDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (activityId: string) => deleteInstructorActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor-own-activities"] });
    },
  });

  const isLoading = loadingProfile || loadingFreelance;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const businessClasses = (instructor?.classes ?? []).filter((c) => !!c.businessId);
  const myClasses = freelanceClasses ?? [];

  const handleFormSubmit = (data: Partial<BusinessActivity>) => {
    createMutation.mutate({
      title: data.title,
      description: data.description,
      category: data.category as Category,
      location: data.location,
      priceAmount: data.priceAmount,
      price: data.price,
      image: data.image,
      timeSlots: data.timeSlots as TimeSlot[],
      provider: { name: user?.name ?? "Instructor" },
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Classes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your freelance and business activities.</p>
        </div>
        {isFreelance && activeTab === "freelance" && (
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5"
          >
            <Plus size={14} weight="bold" />
            Create Activity
          </Button>
        )}
      </div>

      {/* Tab navigation — only show tabs if freelance (otherwise only business classes) */}
      {isFreelance && (
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("freelance")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all",
              activeTab === "freelance"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            My Classes ({myClasses.length})
          </button>
          <button
            onClick={() => setActiveTab("business")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all",
              activeTab === "business"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Business Classes ({businessClasses.length})
          </button>
        </div>
      )}

      {/* Classes grid */}
      <AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(isFreelance && activeTab === "freelance" ? myClasses : businessClasses).map((activity) => (
            <ClassCard
              key={activity.id}
              activity={activity}
              onDelete={isFreelance && activeTab === "freelance" ? () => deleteMutation.mutate(activity.id) : undefined}
            />
          ))}
        </div>
      </AnimateIn>

      {(isFreelance && activeTab === "freelance" ? myClasses : businessClasses).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">
            {isFreelance && activeTab === "freelance" ? "No freelance classes yet. Create your first!" : "No business classes assigned."}
          </p>
        </div>
      )}

      {/* Create Activity Dialog — freelance only */}
      {isFreelance && (
        <ActivityFormDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onSubmit={handleFormSubmit}
          mode="create"
        />
      )}
    </div>
  );
}
