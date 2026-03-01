"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { fetchSlotProposals, respondToSlotProposal } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Envelope, CalendarBlank, Clock, Buildings, Check, X } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";

export default function ProposalsClient() {
  const { user } = useAuth();
  const t = useTranslations("instructorProposals");
  const queryClient = useQueryClient();
  const instructorId = user?.instructorId ?? "";

  const { data: proposals, isLoading } = useQuery({
    queryKey: ["slot-proposals", instructorId],
    queryFn: () => fetchSlotProposals(instructorId),
    enabled: !!instructorId,
  });

  const respondMutation = useMutation({
    mutationFn: ({ proposalId, accept }: { proposalId: string; accept: boolean }) =>
      respondToSlotProposal(proposalId, accept),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot-proposals"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-calendar"] });
    },
  });

  const statusColor = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-600 border-red-200",
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={`skeleton-${n}`} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const pending = proposals?.filter((p) => p.status === "pending") ?? [];
  const resolved = proposals?.filter((p) => p.status !== "pending") ?? [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      {!proposals?.length ? (
        <div className="text-center py-16 text-gray-400">
          <Envelope size={48} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">{t("noProposals")}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {pending.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                {t("pendingSection")}
              </h2>
              <div className="space-y-4">
                {pending.map((prop, i) => (
                  <AnimateIn key={prop.id} delay={i * 80}>
                    <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-[var(--shadow-soft)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-gray-900">{prop.activityTitle}</h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Buildings size={14} />
                              {prop.businessName}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarBlank size={14} />
                              {prop.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {prop.startTime} – {prop.endTime}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            onClick={() => respondMutation.mutate({ proposalId: prop.id, accept: true })}
                            disabled={respondMutation.isPending}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check size={16} className="mr-1" />
                            {t("approve")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => respondMutation.mutate({ proposalId: prop.id, accept: false })}
                            disabled={respondMutation.isPending}
                          >
                            <X size={16} className="mr-1" />
                            {t("reject")}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-3">
                        {t("proposedAt")} {new Date(prop.proposedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          )}

          {resolved.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                {t("resolvedSection")}
              </h2>
              <div className="space-y-3">
                {resolved.map((prop, i) => (
                  <AnimateIn key={prop.id} delay={i * 60}>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[var(--shadow-soft)]">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{prop.activityTitle}</h3>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                            <span>{prop.businessName}</span>
                            <span>{prop.date}</span>
                            <span>{prop.startTime} – {prop.endTime}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={statusColor[prop.status]}>
                          {t(`status.${prop.status}`)}
                        </Badge>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
