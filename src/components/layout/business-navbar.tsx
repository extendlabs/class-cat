"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { List, Bell, ChatCircle, SignOut, ArrowsLeftRight } from "@phosphor-icons/react";
import { NotificationSidebar } from "@/components/features/notification-sidebar";
import { ChatSidebar } from "@/components/features/chat-sidebar";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface BusinessNavbarProps {
  onToggleSidebar: () => void;
}

export function BusinessNavbar({ onToggleSidebar }: BusinessNavbarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const t = useTranslations("businessNavbar");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-secondary shadow-[var(--shadow-soft)] border-b border-gray-100">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-all"
              aria-label="Toggle sidebar"
            >
              <List size={20} weight="bold" />
            </button>
            <Link href="/profile/business" className="flex items-center gap-2 group">
              <span
                className="text-lg text-coral"
                style={{ fontFamily: "var(--font-logo)" }}
              >
                ClassCat
              </span>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full hidden sm:block">
                {t("business")}
              </span>
            </Link>
          </div>

          {/* Right: notifications, chat, avatar */}
          <div className="flex items-center gap-1">
            <NotificationSidebar>
              <button
                aria-label={tNav("messages")}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-all"
              >
                <Bell size={20} />
              </button>
            </NotificationSidebar>

            <ChatSidebar>
              <button
                aria-label={tNav("messages")}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-all"
              >
                <ChatCircle size={20} />
              </button>
            </ChatSidebar>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label={tNav("openMenu")}
                    className="w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-coral/20 transition-all ml-1"
                  >
                    <Avatar className="size-9">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : null}
                      <AvatarFallback className="text-sm bg-coral/10 text-coral">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <ArrowsLeftRight size={16} />
                      {t("switchToConsumer")}
                    </Link>
                  </DropdownMenuItem>
                  {user.instructorId && (
                    <DropdownMenuItem asChild>
                      <Link href="/profile/instructor" className="cursor-pointer">
                        <ArrowsLeftRight size={16} />
                        {t("switchToInstructor")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <SignOut size={16} />
                    {tCommon("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
