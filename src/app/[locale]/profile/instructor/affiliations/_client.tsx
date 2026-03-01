"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { fetchInstructorAffiliations, respondToAffiliation } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, Buildings, CalendarBlank, Check, X } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";

export default function AffiliationsClient() {
  const { user } = useAuth();
  const t = useTranslations("instructorAffiliations");
  const queryClient = useQueryClient();
  const instructorId = user?.instructorId ?? "";

  const { data: affiliations, isLoading } = useQuery({
    queryKey: ["instructor-affiliations", instructorId],
    queryFn: () => fetchInstructorAffiliations(instructorId),
    enabled: !!instructorId,
  });

  const respondMutation = useMutation({
    mutationFn: ({ businessId, accept }: { businessId: string; accept: boolean }) =>
      respondToAffiliation(instructorId, businessId, accept),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor-affiliations"] });
    },
  });

  const statusColor = {
    active: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    ended: "bg-gray-50 text-gray-500 border-gray-200",
  };

  const roleColor = {
    contractor: "bg-blue-50 text-blue-700 border-blue-200",
    employee: "bg-purple-50 text-purple-700 border-purple-200",
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      {!affiliations?.length ? (
        <div className="text-center py-16 text-gray-400">
          <Handshake size={48} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">{t("noAffiliations")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {affiliations.map((aff, i) => (
            <AnimateIn key={`${aff.businessId}-${aff.instructorId}`} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[var(--shadow-soft)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <Buildings size={24} className="text-coral" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{aff.businessName}</h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant="outline" className={statusColor[aff.status]}>
                          {t(`status.${aff.status}`)}
                        </Badge>
                        <Badge variant="outline" className={roleColor[aff.role]}>
                          {t(`role.${aff.role}`)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {aff.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => respondMutation.mutate({ businessId: aff.businessId, accept: true })}
                        disabled={respondMutation.isPending}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check size={16} className="mr-1" />
                        {t("accept")}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => respondMutation.mutate({ businessId: aff.businessId, accept: false })}
                        disabled={respondMutation.isPending}
                      >
                        <X size={16} className="mr-1" />
                        {t("decline")}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <CalendarBlank size={12} />
                    {t("since")} {aff.startDate}
                  </span>
                  {aff.endDate && (
                    <span className="flex items-center gap-1">
                      {t("until")} {aff.endDate}
                    </span>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
