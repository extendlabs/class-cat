"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchBusinessCourtReservations,
  fetchBusinessCourts,
  updateReservationStatus,
} from "@/api/court-service";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Check,
  X,
  MagnifyingGlass,
  CalendarBlank,
  Clock,
} from "@phosphor-icons/react";
import type { CourtReservation } from "@/types/court";

type StatusFilter = "all" | CourtReservation["status"];

function StatusBadge({ status }: { status: CourtReservation["status"] }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-500",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] ?? "bg-gray-100 text-gray-500"}`}
    >
      {status}
    </span>
  );
}

export default function PageContent() {
  const t = useTranslations("courtReservations");
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [courtFilter, setCourtFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const { data: reservations, isLoading } = useQuery({
    queryKey: ["business-court-reservations"],
    queryFn: () => fetchBusinessCourtReservations(),
  });

  const { data: courts } = useQuery({
    queryKey: ["business-courts"],
    queryFn: fetchBusinessCourts,
  });

  const statusMutation = useMutation({
    mutationFn: ({
      id,
      status,
      reason,
    }: {
      id: string;
      status: "confirmed" | "rejected" | "cancelled";
      reason?: string;
    }) => updateReservationStatus(id, status, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["business-court-reservations"],
      });
    },
  });

  const filtered = useMemo(() => {
    if (!reservations) return [];
    let result = [...reservations];

    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }
    if (courtFilter !== "all") {
      result = result.filter((r) => r.courtId === courtFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.userName?.toLowerCase().includes(q) ||
          r.courtName.toLowerCase().includes(q)
      );
    }

    // Pending first, then by date descending
    result.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (b.status === "pending" && a.status !== "pending") return 1;
      return b.date.localeCompare(a.date) || b.startHour - a.startHour;
    });

    return result;
  }, [reservations, statusFilter, courtFilter, search]);

  const handleApprove = (id: string) => {
    statusMutation.mutate(
      { id, status: "confirmed" },
      { onSuccess: () => toast.success(t("approved")) }
    );
  };

  const handleReject = (id: string) => {
    statusMutation.mutate(
      { id, status: "rejected", reason: rejectReason || undefined },
      {
        onSuccess: () => {
          toast.success(t("rejected"));
          setRejectId(null);
          setRejectReason("");
        },
      }
    );
  };

  const handleCancel = (id: string) => {
    statusMutation.mutate(
      { id, status: "cancelled" },
      { onSuccess: () => toast.success(t("cancelledToast")) }
    );
  };

  return (
    <AnimateIn>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as StatusFilter)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allStatuses")}</SelectItem>
              <SelectItem value="pending">{t("statusPending")}</SelectItem>
              <SelectItem value="confirmed">{t("statusConfirmed")}</SelectItem>
              <SelectItem value="rejected">{t("statusRejected")}</SelectItem>
              <SelectItem value="cancelled">{t("statusCancelled")}</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={courtFilter}
            onValueChange={(v) => setCourtFilter(v)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allCourts")}</SelectItem>
              {courts?.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <MagnifyingGlass
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
            />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t("noReservations")}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("colCourt")}</TableHead>
                  <TableHead>{t("colDate")}</TableHead>
                  <TableHead>{t("colTime")}</TableHead>
                  <TableHead>{t("colUser")}</TableHead>
                  <TableHead>{t("colPrice")}</TableHead>
                  <TableHead>{t("colStatus")}</TableHead>
                  <TableHead className="text-right">
                    {t("colActions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow
                    key={r.id}
                    className={
                      r.status === "pending" ? "bg-amber-50/50" : undefined
                    }
                  >
                    <TableCell className="font-medium">
                      {r.courtName}
                      {r.courtIndex && (
                        <span className="text-xs text-gray-400 ml-1">
                          #{r.courtIndex}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <CalendarBlank size={14} className="text-gray-400" />
                        {r.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Clock size={14} className="text-gray-400" />
                        {String(r.startHour).padStart(2, "0")}:00–
                        {String(r.startHour + r.durationHours).padStart(2, "0")}
                        :00
                      </div>
                    </TableCell>
                    <TableCell>{r.userName ?? "—"}</TableCell>
                    <TableCell className="font-medium">
                      {r.totalPrice} zł
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {r.status === "pending" && (
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleApprove(r.id)}
                            disabled={statusMutation.isPending}
                            className="p-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                            title={t("approve")}
                          >
                            <Check size={16} weight="bold" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              rejectId === r.id
                                ? handleReject(r.id)
                                : setRejectId(r.id)
                            }
                            disabled={statusMutation.isPending}
                            className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                            title={t("reject")}
                          >
                            <X size={16} weight="bold" />
                          </button>
                        </div>
                      )}
                      {r.status === "confirmed" && (
                        <button
                          type="button"
                          onClick={() => handleCancel(r.id)}
                          disabled={statusMutation.isPending}
                          className="text-xs text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                        >
                          {t("cancel")}
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Reject reason input */}
        {rejectId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4">
              <h3 className="text-lg font-semibold">{t("rejectTitle")}</h3>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder={t("rejectPlaceholder")}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-coral/20"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setRejectId(null);
                    setRejectReason("");
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  {t("cancelAction")}
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(rejectId)}
                  disabled={statusMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-50"
                >
                  {t("confirmReject")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimateIn>
  );
}
