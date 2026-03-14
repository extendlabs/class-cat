"use client";

import { useReducer, useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "@phosphor-icons/react";
import {
  fetchProviderActivities,
  createProviderActivity,
  updateProviderActivity,
  deleteProviderActivity,
  fetchBusinessInstructors,
} from "@/api/business-portal";
import { fetchMyBusinessProfile } from "@/api/business";
import { useAuth } from "@/hooks/use-auth";
import { ActivityFormDialog } from "@/components/features/activity-form-dialog";
import {
  ActivityFilters,
  EmptyActivityState,
  ActivityListItem,
  DeleteActivityDialog,
  ManageSessionsDialog,
} from "@/components/features/business-activities";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  activitiesListReducer,
  activitiesListInitialState,
} from "@/hooks/use-activities-list-reducer";
import type { BusinessActivity } from "@/types/business-portal";

export default function PageContent() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(activitiesListReducer, activitiesListInitialState);
  const [sessionsTarget, setSessionsTarget] = useState<BusinessActivity | null>(null);

  const { data: businessProfile } = useQuery({
    queryKey: ["my-business-profile"],
    queryFn: fetchMyBusinessProfile,
    enabled: isAuthenticated,
  });
  const providerSlug = businessProfile?.providerSlug ?? null;

  const { data: activities, isLoading } = useQuery({
    queryKey: ["provider-activities", providerSlug],
    queryFn: () => fetchProviderActivities(providerSlug!),
    enabled: !!providerSlug,
  });

  const { data: businessInstructors } = useQuery({
    queryKey: ["business-instructors"],
    queryFn: () => fetchBusinessInstructors(user?.businessId ?? ""),
    enabled: isAuthenticated,
  });

  const activeInstructors = (businessInstructors ?? [])
    .filter((i) => i.affiliation.status === "active")
    .map((i) => ({ contractorId: i.contractorId, name: i.name }));

  const createMutation = useMutation({
    mutationFn: ({ data, imageFile }: { data: Partial<BusinessActivity>; imageFile?: File }) =>
      createProviderActivity(providerSlug!, data, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-activities", providerSlug] });
      dispatch({ type: "CLOSE_FORM" });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to create activity");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data, imageFile }: { id: string; data: Partial<BusinessActivity>; imageFile?: File }) =>
      updateProviderActivity(providerSlug!, id, data, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-activities", providerSlug] });
      dispatch({ type: "CLOSE_FORM" });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update activity");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProviderActivity(providerSlug!, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["provider-activities", providerSlug] }),
  });

  const filtered = (activities ?? []).filter((a) => {
    if (state.search) {
      const q = state.search.toLowerCase();
      if (!a.title.toLowerCase().includes(q) && !a.category.toLowerCase().includes(q))
        return false;
    }
    if (state.categoryFilter !== "all" && a.category !== state.categoryFilter) return false;
    if (state.statusFilter !== "all" && a.status !== state.statusFilter) return false;
    return true;
  });

  const handleFormSubmit = (data: Partial<BusinessActivity>, imageFile?: File) => {
    if (state.formMode === "create") {
      createMutation.mutate({ data, imageFile });
    } else if (state.editingActivity) {
      updateMutation.mutate({ id: state.editingActivity.id, data, imageFile });
    }
  };

  const handleDeleteConfirm = () => {
    if (state.deleteTarget && providerSlug) {
      deleteMutation.mutate(state.deleteTarget.id);
      dispatch({ type: "SET_DELETE_TARGET", payload: null });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Activities
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your classes and activities.
        </p>
      </div>

      <ActivityFilters
        search={state.search}
        categoryFilter={state.categoryFilter}
        statusFilter={state.statusFilter}
        dispatch={dispatch}
      />

      <AnimateIn delay={100}>
        <div className="rounded-2xl bg-white shadow-[var(--shadow-soft)] border border-gray-100/60 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/60 hover:bg-secondary/60 border-b border-gray-200/80">
                <TableHead className="pl-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Title</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Contractor</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Enrolled</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Rating</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Upcoming Sessions</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <EmptyActivityState />
              ) : (
                filtered.map((activity) => (
                  <ActivityListItem
                    key={activity.id}
                    activity={activity}
                    instructors={activeInstructors}
                    onEdit={() => dispatch({ type: "OPEN_EDIT_FORM", payload: activity })}
                    onDelete={() => dispatch({ type: "SET_DELETE_TARGET", payload: activity })}
                    onManageSessions={() => setSessionsTarget(activity)}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </AnimateIn>

      <button
        onClick={() => dispatch({ type: "OPEN_CREATE_FORM" })}
        disabled={!providerSlug}
        className="fixed bottom-6 right-6 w-14 h-14 bg-coral hover:bg-coral-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full shadow-lg shadow-coral/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-40"
      >
        <Plus size={24} weight="bold" />
      </button>

      <ActivityFormDialog
        open={state.formOpen}
        onClose={() => dispatch({ type: "CLOSE_FORM" })}
        onSubmit={handleFormSubmit}
        mode={state.formMode}
        activity={state.editingActivity}
        instructors={activeInstructors}
      />

      <DeleteActivityDialog
        deleteTarget={state.deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => dispatch({ type: "SET_DELETE_TARGET", payload: null })}
      />

      <ManageSessionsDialog
        activity={sessionsTarget}
        providerSlug={providerSlug ?? ""}
        onClose={() => setSessionsTarget(null)}
      />
    </div>
  );
}
