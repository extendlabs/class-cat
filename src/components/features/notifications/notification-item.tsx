"use client";

import {
  CheckCircle,
  XCircle,
  EnvelopeSimple,
  UserPlus,
  CalendarCheck,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/types/chat";

const ICON_MAP: Record<NotificationType, { icon: typeof CheckCircle; color: string }> = {
  enrollment_accepted: { icon: CheckCircle, color: "text-emerald-500 bg-emerald-50" },
  enrollment_rejected: { icon: XCircle, color: "text-red-500 bg-red-50" },
  new_enrollment_request: { icon: UserPlus, color: "text-coral bg-coral/10" },
  new_message: { icon: EnvelopeSimple, color: "text-blue-500 bg-blue-50" },
  cohort_update: { icon: CalendarCheck, color: "text-purple-500 bg-purple-50" },
};

export function NotificationItem({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: () => void;
}) {
  const config = ICON_MAP[notification.type];
  const Icon = config.icon;
  const time = formatRelativeTime(notification.timestamp);

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-gray-50",
        !notification.read && "bg-coral/[0.03]"
      )}
    >
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", config.color)}>
        <Icon size={16} weight="fill" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={cn("text-xs font-semibold truncate", !notification.read ? "text-gray-900" : "text-gray-600")}>
            {notification.title}
          </p>
          {!notification.read && (
            <div className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
          )}
        </div>
        <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
          {notification.body}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">{time}</p>
      </div>
    </button>
  );
}

function formatRelativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
