"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, MagnifyingGlass, UserCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const profileHref = isAuthenticated ? "/profile" : "/login";

  const navItems = [
    { href: "/", label: "Home", icon: House },
    { href: "/?tab=all", label: "Search", icon: MagnifyingGlass },
    {
      href: profileHref,
      label: "Profile",
      icon: UserCircle,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFBF8]/90 backdrop-blur-xl border-t border-coral/[0.06] md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
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
                className="transition-transform duration-300"
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
      </div>
    </nav>
  );
}
