"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  ChartLineUp,
  User,
  CalendarBlank,
  Star,
  Clock,
  GearSix,
  Handshake,
  Envelope,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: Icon;
  key: "dashboard" | "profile" | "myClasses" | "reviews" | "schedule" | "affiliations" | "proposals" | "settings";
}

const NAV_ITEMS: NavItem[] = [
  { href: "/profile/instructor/dashboard", icon: ChartLineUp, key: "dashboard" },
  { href: "/profile/instructor", icon: User, key: "profile" },
  { href: "/profile/instructor/classes", icon: CalendarBlank, key: "myClasses" },
  { href: "/profile/instructor/reviews", icon: Star, key: "reviews" },
  { href: "/profile/instructor/schedule", icon: Clock, key: "schedule" },
  { href: "/profile/instructor/affiliations", icon: Handshake, key: "affiliations" },
  { href: "/profile/instructor/proposals", icon: Envelope, key: "proposals" },
  { href: "/profile/instructor/settings", icon: GearSix, key: "settings" },
];

interface InstructorSidebarProps {
  collapsed: boolean;
}

export function InstructorSidebar({ collapsed }: InstructorSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("instructorSidebar");

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-background border-r border-gray-100 pt-4 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <nav className="flex-1 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/profile/instructor"
              ? pathname === "/profile/instructor"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-coral/10 text-coral"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                size={20}
                weight={isActive ? "fill" : "regular"}
                className="flex-shrink-0"
              />
              {!collapsed && <span>{t(item.key)}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function InstructorSidebarMobile({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations("instructorSidebar");

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/10 md:hidden"
        role="presentation"
        onClick={onClose}
      />
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-xl rounded-r-2xl md:hidden animate-slide-in-right">
        <div className="pt-20 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/profile/instructor"
                ? pathname === "/profile/instructor"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-coral/10 text-coral"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon
                  size={20}
                  weight={isActive ? "fill" : "regular"}
                  className="flex-shrink-0"
                />
                <span>{t(item.key)}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
