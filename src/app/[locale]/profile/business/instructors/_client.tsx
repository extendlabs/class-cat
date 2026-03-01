"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  fetchBusinessInstructors,
} from "@/api/business-portal";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  Users,
  CalendarBlank,
} from "@phosphor-icons/react";

export default function BusinessInstructorsPage() {
  const { user } = useAuth();
  const t = useTranslations("businessInstructors");
  const businessId = user?.businessId ?? "biz-1";

  const { data: instructors, isLoading } = useQuery({
    queryKey: ["business-instructors", businessId],
    queryFn: () => fetchBusinessInstructors(businessId),
    enabled: !!businessId,
  });

  const statusColor = {
    active: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    ended: "bg-gray-50 text-gray-500 border-gray-200",
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <Skeleton key={`skeleton-${n}`} className="h-24 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      {!instructors?.length ? (
        <div className="text-center py-16 text-gray-400">
          <Users size={48} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">{t("noInstructors")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {instructors.map((inst, i) => (
            <AnimateIn key={inst.instructorId} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[var(--shadow-soft)]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={inst.avatar} alt={inst.name} />
                      <AvatarFallback className="bg-coral/10 text-coral font-bold">
                        {inst.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-gray-900">{inst.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{inst.specialty}</span>
                        <Badge variant="outline" className={statusColor[inst.affiliation.status]}>
                          {t(`status.${inst.affiliation.status}`)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {inst.affiliation.status === "active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full text-xs"
                        asChild
                      >
                        <Link href={`/profile/business/instructors/${inst.instructorId}/schedule`}>
                          <CalendarBlank size={14} className="mr-1" />
                          {t("viewSchedule")}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      )}

    </div>
  );
}
