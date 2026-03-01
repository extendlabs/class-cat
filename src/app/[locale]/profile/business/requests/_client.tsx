"use client";

import { useTranslations } from "next-intl";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatSidebar } from "@/components/features/chat-sidebar-context";
import {
  ChatCircle,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchEnrollmentRequests,
  acceptEnrollment,
  rejectEnrollment,
} from "@/api/enrollments";
import type { EnrollmentRequest } from "@/types/enrollment";

export default function RequestsClient() {
  const t = useTranslations("enrollmentRequests");
  const { openToConversation } = useChatSidebar();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["enrollment-requests"],
    queryFn: () => fetchEnrollmentRequests(),
  });

  const acceptMutation = useMutation({
    mutationFn: acceptEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment-requests"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment-requests"] });
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const pending = requests.filter((r: EnrollmentRequest) => r.status === "pending");
  const resolved = requests.filter((r: EnrollmentRequest) => r.status !== "pending");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
            {t("pending")} ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((request: EnrollmentRequest) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-[var(--shadow-soft)] p-5"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={request.userAvatar} alt={request.userName} />
                    <AvatarFallback className="text-sm bg-coral/10 text-coral">
                      {request.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {request.userName}
                      </h3>
                      <span className="text-[10px] text-gray-400">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {request.activityTitle} · {request.cohortName}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => openToConversation(request.conversationId)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:border-coral/30 hover:text-coral transition-colors"
                      >
                        <ChatCircle size={14} />
                        {t("viewChat")}
                      </button>
                      <button
                        onClick={() => acceptMutation.mutate(request.id)}
                        disabled={acceptMutation.isPending}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <Check size={14} weight="bold" />
                        {t("accept")}
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(request.id)}
                        disabled={rejectMutation.isPending}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <X size={14} weight="bold" />
                        {t("reject")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolved requests */}
      {resolved.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
            {t("resolved")}
          </h2>
          <div className="space-y-2">
            {resolved.map((request: EnrollmentRequest) => (
              <div
                key={request.id}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4"
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={request.userAvatar} alt={request.userName} />
                  <AvatarFallback className="text-xs bg-gray-100 text-gray-500">
                    {request.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{request.userName}</span>
                    {" · "}
                    {request.activityTitle}
                  </p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full",
                  request.status === "accepted"
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-red-500 bg-red-50"
                )}>
                  {request.status === "accepted" ? (
                    <CheckCircle size={14} weight="fill" />
                  ) : (
                    <XCircle size={14} weight="fill" />
                  )}
                  {request.status === "accepted" ? t("accepted") : t("rejected")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {requests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Clock size={24} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">{t("noRequests")}</p>
          <p className="text-xs text-gray-400 mt-1">{t("noRequestsHint")}</p>
        </div>
      )}
    </div>
  );
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
