"use client";

import { useState } from "react";
import {
  Bell,
  CalendarBlank,
  Star,
  Info,
  Megaphone,
  CheckCircle,
} from "@phosphor-icons/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  fetchBusinessNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/api/business-portal";
import type { BusinessNotification } from "@/types/business-portal";

const ICON_MAP: Record<BusinessNotification["type"], typeof Bell> = {
  booking: CalendarBlank,
  review: Star,
  system: Info,
  promotion: Megaphone,
};

const ICON_COLOR: Record<BusinessNotification["type"], string> = {
  booking: "text-blue-500 bg-blue-50",
  review: "text-amber-500 bg-amber-50",
  system: "text-gray-500 bg-gray-100",
  promotion: "text-coral bg-coral/10",
};

function relativeTime(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function NotificationSidebar({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<BusinessNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);


  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = async (id: string) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (open) {
        fetchBusinessNotifications().then(setNotifications);
      }
    }}>
      <SheetTrigger asChild>
        <span className="relative">
          {children}
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none pointer-events-none">
              {unreadCount}
            </span>
          )}
        </span>
      </SheetTrigger>
      <SheetContent
        side="right"
        overlayClassName="bg-transparent"
        className="rounded-l-2xl border-l-0 shadow-[-8px_0_12px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col p-0"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <SheetTitle>Notifications</SheetTitle>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs font-medium text-coral hover:text-coral-hover transition-colors flex items-center gap-1"
                >
                  <CheckCircle size={14} />
                  Mark all read
                </button>
              )}
            </div>
            <SheetDescription>
              {unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up!"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Bell size={24} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  No notifications yet
                </p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = ICON_MAP[notification.type];
                const iconColor = ICON_COLOR[notification.type];
                return (
                  <button
                    key={notification.id}
                    onClick={() => !notification.read && handleMarkRead(notification.id)}
                    className={cn(
                      "flex items-start gap-3 w-full text-left rounded-2xl border p-3 transition-all",
                      notification.read
                        ? "bg-white border-gray-100 opacity-70"
                        : "bg-white border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:border-coral/20"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                        iconColor
                      )}
                    >
                      <Icon size={16} weight="fill" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {notification.title}
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-coral" />
                          )}
                          <span className="text-[10px] text-gray-400">
                            {relativeTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {notification.body}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
