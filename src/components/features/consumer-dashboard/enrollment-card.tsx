"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  CalendarBlank,
  ChatCircle,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/components/features/chat-sidebar-context";
import { ENROLLMENT_STATUS_STYLES } from "@/lib/status-styles";
import type { EnrollmentRequest } from "@/types/enrollment";

export function EnrollmentCard({
  enrollment,
  variant,
}: {
  enrollment: EnrollmentRequest;
  variant: "upcoming" | "pending" | "past";
}) {
  const t = useTranslations("profile.myClasses");
  const { openToConversation } = useChatSidebar();

  const isPast = variant === "past";

  const formatDateRange = () => {
    if (!enrollment.cohortStartDate || !enrollment.cohortEndDate) return null;
    const start = new Date(enrollment.cohortStartDate).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "short",
    });
    const end = new Date(enrollment.cohortEndDate).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return `${start} – ${end}`;
  };

  return (
    <div
      className={`rounded-2xl bg-white overflow-hidden shadow-[var(--shadow-soft)] border border-gray-100/60 ${
        isPast
          ? "opacity-75"
          : "hover:shadow-[var(--shadow-hover)] hover:border-coral/10 transition-all"
      }`}
    >
      <div className="flex gap-4 p-4">
        {enrollment.activityImage && (
          <Image
            src={enrollment.activityImage}
            alt={enrollment.activityTitle}
            width={80}
            height={80}
            className={`rounded-xl object-cover shrink-0 ${isPast ? "grayscale-[30%]" : ""}`}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-gray-900 text-sm truncate">
              {enrollment.activityTitle}
            </h4>
            <Badge
              className={`text-[10px] shrink-0 capitalize border ${ENROLLMENT_STATUS_STYLES[enrollment.status]}`}
            >
              {enrollment.status}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">{enrollment.cohortName}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {formatDateRange() && (
              <span className="flex items-center gap-1">
                <CalendarBlank size={12} />
                {formatDateRange()}
              </span>
            )}
          </div>
          {!isPast && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-xs text-coral hover:text-coral hover:bg-coral/5 rounded-full gap-1"
                onClick={() => openToConversation(enrollment.conversationId)}
              >
                <ChatCircle size={14} />
                {t("openChat")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
