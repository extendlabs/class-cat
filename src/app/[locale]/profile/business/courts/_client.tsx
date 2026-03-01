"use client";

import { useReducer } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Plus, ListChecks } from "@phosphor-icons/react";
import {
  fetchBusinessCourts,
  createBusinessCourt,
  updateBusinessCourt,
  deleteBusinessCourt,
} from "@/api/business-portal";
import {
  CourtFilters,
  CourtListItem,
  EmptyCourtState,
  DeleteCourtDialog,
  CourtFormDialog,
} from "@/components/features/business-courts";
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
  courtsListReducer,
  courtsListInitialState,
} from "@/hooks/use-courts-list-reducer";
import type { Court } from "@/types/court";

export default function PageContent() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const [state, dispatch] = useReducer(courtsListReducer, courtsListInitialState);

  const { data: courts, isLoading } = useQuery({
    queryKey: ["business-courts"],
    queryFn: fetchBusinessCourts,
  });

  const createMutation = useMutation({
    mutationFn: createBusinessCourt,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["business-courts"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Court> }) =>
      updateBusinessCourt(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["business-courts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBusinessCourt,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["business-courts"] }),
  });

  const filtered = (courts ?? []).filter((c) => {
    if (state.search) {
      const q = state.search.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.sport.toLowerCase().includes(q))
        return false;
    }
    if (state.sportFilter !== "all" && c.sport !== state.sportFilter) return false;
    if (state.statusFilter !== "all" && (c.status ?? "active") !== state.statusFilter) return false;
    return true;
  });

  const handleFormSubmit = (data: Partial<Court>) => {
    if (state.formMode === "create") {
      createMutation.mutate(data);
    } else if (state.editingCourt) {
      updateMutation.mutate({ id: state.editingCourt.id, data });
    }
  };

  const handleDeleteConfirm = () => {
    if (state.deleteTarget) {
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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Courts
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your courts and schedules.
          </p>
        </div>
        <Link
          href="/profile/business/courts/reservations"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:border-coral/30 hover:text-coral hover:bg-coral/5 transition-all"
        >
          <ListChecks size={18} />
          Reservations
        </Link>
      </div>

      <CourtFilters
        search={state.search}
        sportFilter={state.sportFilter}
        statusFilter={state.statusFilter}
        dispatch={dispatch}
      />

      <AnimateIn delay={100}>
        <div className="rounded-2xl bg-white shadow-[var(--shadow-soft)] border border-gray-100/60 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/60 hover:bg-secondary/60 border-b border-gray-200/80">
                <TableHead className="pl-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Name</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Sport</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Indoor</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Courts</TableHead>
                <TableHead className="py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Price/hr</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <EmptyCourtState />
              ) : (
                filtered.map((court) => (
                  <CourtListItem
                    key={court.id}
                    court={court}
                    onEdit={() => dispatch({ type: "OPEN_EDIT_FORM", payload: court })}
                    onDelete={() => dispatch({ type: "SET_DELETE_TARGET", payload: court })}
                    scheduleHref={`${pathname}/${court.id}/schedule`}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </AnimateIn>

      <button
        onClick={() => dispatch({ type: "OPEN_CREATE_FORM" })}
        className="fixed bottom-6 right-6 w-14 h-14 bg-coral hover:bg-coral-hover text-white rounded-full shadow-lg shadow-coral/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-40"
      >
        <Plus size={24} weight="bold" />
      </button>

      <CourtFormDialog
        open={state.formOpen}
        onClose={() => dispatch({ type: "CLOSE_FORM" })}
        onSubmit={handleFormSubmit}
        mode={state.formMode}
        court={state.editingCourt}
      />

      <DeleteCourtDialog
        deleteTarget={state.deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => dispatch({ type: "SET_DELETE_TARGET", payload: null })}
      />
    </div>
  );
}
