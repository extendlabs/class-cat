"use client";

import { useTranslations } from "next-intl";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { Bell } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/api/notifications";
import { useChatSidebar } from "@/components/features/chat-sidebar-context";
import { NotificationItem } from "./notification-item";
import type { Notification } from "@/types/chat";

export function NotificationBell() {
  const t = useTranslations("notifications");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openToConversation } = useChatSidebar();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const handleClick = (notification: Notification) => {
    if (!notification.read) {
      markReadMutation.mutate(notification.id);
    }
    if (notification.linkTo) {
      const msgMatch = notification.linkTo.match(/\/profile\/messages\/(.+)/);
      if (msgMatch) {
        openToConversation(msgMatch[1]);
      } else {
        router.push(notification.linkTo as "/");
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label={t("title")}
          className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-all"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">{t("title")}</h3>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllReadMutation.mutate()}
              className="text-[11px] font-medium text-coral hover:text-coral-hover transition-colors"
            >
              {t("markAllRead")}
            </button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell size={24} className="text-gray-200 mb-2" />
              <p className="text-xs text-gray-400">{t("empty")}</p>
            </div>
          ) : (
            <div className="py-1">
              {notifications.map((notification: Notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleClick(notification)}
                />
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
