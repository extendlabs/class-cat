"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EnvelopeSimple, ArrowRight } from "@phosphor-icons/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { EnrollmentRequest } from "@/types/enrollment";

interface PendingRequestsCardProps {
  requests: EnrollmentRequest[];
}

export function PendingRequestsCard({ requests }: PendingRequestsCardProps) {
  const t = useTranslations("enrollmentRequests");

  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-[var(--shadow-soft)] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
            <EnvelopeSimple size={18} className="text-amber-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">
            {t("pending")} ({requests.length})
          </h3>
        </div>
        <Link
          href="/profile/business/requests"
          className="flex items-center gap-1 text-xs font-medium text-coral hover:text-coral-hover transition-colors"
        >
          {t("viewAll")}
          <ArrowRight size={12} />
        </Link>
      </div>
      <div className="space-y-2.5">
        {requests.slice(0, 3).map((request) => (
          <div key={request.id} className="flex items-center gap-3">
            <Avatar className="w-7 h-7 flex-shrink-0">
              <AvatarImage src={request.userAvatar} alt={request.userName} />
              <AvatarFallback className="text-[10px] bg-coral/10 text-coral">
                {request.userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 truncate">
                <span className="font-medium">{request.userName}</span>
                {" · "}
                {request.activityTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
