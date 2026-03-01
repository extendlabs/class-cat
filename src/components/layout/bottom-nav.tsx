"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { House, MagnifyingGlass, ChatCircle, UserCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "@/api/conversations";
import { useChatSidebar } from "@/components/features/chat-sidebar-context";

export function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const t = useTranslations("bottomNav");
  const { openToList } = useChatSidebar();

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
    enabled: isAuthenticated,
  });

  const profileHref = isAuthenticated ? "/profile" : "/login";

  const linkItems = [
    { href: "/" as const, label: t("home"), icon: House, badge: 0 },
    { href: "/?tab=all" as const, label: t("search"), icon: MagnifyingGlass, badge: 0 },
  ];

  const profileItem = {
    href: profileHref as "/" | "/profile" | "/login",
    label: t("profile"),
    icon: UserCircle,
    badge: 0,
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFBF8]/90 backdrop-blur-xl border-t border-coral/[0.06] md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex items-center justify-around h-16 px-2">
        {linkItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95",
                isActive
                  ? "text-coral"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <div
                className="relative transition-transform duration-300"
                style={{
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
              >
                <Icon
                  size={24}
                  weight={isActive ? "fill" : "regular"}
                />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Messages — opens sidebar */}
        <button
          onClick={openToList}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95 text-gray-400 hover:text-gray-600"
        >
          <div className="relative">
            <ChatCircle size={24} />
            {isAuthenticated && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-coral text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">{t("messages")}</span>
        </button>

        {/* Profile */}
        {(() => {
          const isActive = pathname === profileItem.href;
          const Icon = profileItem.icon;
          return (
            <Link
              href={profileItem.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95",
                isActive
                  ? "text-coral"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <div
                className="relative transition-transform duration-300"
                style={{
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
              >
                <Icon
                  size={24}
                  weight={isActive ? "fill" : "regular"}
                />
              </div>
              <span className="text-[10px] font-medium">{profileItem.label}</span>
            </Link>
          );
        })()}
      </div>
    </nav>
  );
}
