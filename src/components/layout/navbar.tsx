"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import {
  MagnifyingGlass,
  UserCircle,
  Heart,
  SignOut,
  GearSix,
  ChatCircle,
  Buildings,
  Storefront,
  GraduationCap,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { getUnreadCount } from "@/api/conversations";
import { useLikedActivities } from "@/hooks/use-liked-activities";
import { useAuth } from "@/hooks/use-auth";
import { LikedSidebar } from "@/components/features/liked-sidebar";
import { useChatSidebar } from "@/components/features/chat-sidebar-context";
import { NotificationBell } from "@/components/features/notifications";
import { LanguageSwitcher } from "@/components/features/language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

function ChatButton({ label }: { label: string }) {
  const { openToList } = useChatSidebar();
  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
  });
  return (
    <button
      onClick={openToList}
      aria-label={label}
      className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-all"
    >
      <ChatCircle size={20} />
      {unreadCount > 0 && (
        <span className="absolute top-0.5 right-0.5 bg-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none pointer-events-none">
          {unreadCount}
        </span>
      )}
    </button>
  );
}

interface NavbarProps {
  children?: React.ReactNode;
  onSearch?: (query: string) => void;
}

export function Navbar({ children, onSearch }: NavbarProps) {
  const router = useRouter();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [query, setQuery] = useState("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { likedItems } = useLikedActivities();
  const { user, isAuthenticated, logout } = useAuth();

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (onSearch) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => onSearch(value), 300);
    }
  }, [onSearch]);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query);
    } else {
      const params = new URLSearchParams();
      params.set("q", query);
      router.push(`/?${params.toString()}`);
    }
  }, [query, onSearch, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className={cn("sticky top-0 z-50 bg-secondary", !children && "shadow-[var(--shadow-soft)]")}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 h-16">
          {/* Column 1: Logo + Name */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-1.5 group justify-self-start"
          >
            <span className="text-xl text-coral" style={{ fontFamily: 'var(--font-logo)' }}>
              ClassCat
            </span>
          </Link>

          {/* Column 2: Search Input */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center bg-white/80 border border-gray-200/60 rounded-full shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] focus-within:shadow-[var(--shadow-hover)] focus-within:border-coral/20 transition-all duration-200 pl-4 pr-1.5 py-1.5 w-[480px]">
              <input
                type="text"
                name="search"
                autoComplete="off"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("searchPlaceholder")}
                className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none min-w-0"
              />
              <button
                onClick={handleSearch}
                aria-label={tCommon("search")}
                className="ml-2 w-8 h-8 bg-coral hover:bg-coral-hover text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm shadow-coral/20 transition-all duration-200 active:scale-95"
              >
                <MagnifyingGlass size={15} weight="bold" />
              </button>
            </div>
          </div>

          {/* Column 3: User Actions */}
          <div className="flex items-center gap-2 justify-self-end">
            {/* Mobile search button */}
            <button
              onClick={() => router.push("/")}
              aria-label={tCommon("search")}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-all"
            >
              <MagnifyingGlass size={20} />
            </button>

            {/* Liked activities */}
            <LikedSidebar>
              <button
                aria-label={t("savedActivities")}
                className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-all"
              >
                <Heart size={20} />
                {likedItems.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {likedItems.length}
                  </span>
                )}
              </button>
            </LikedSidebar>

            <LanguageSwitcher />

            {/* Auth */}
            {isAuthenticated && user ? (
              <>
                {/* Chat button */}
                <ChatButton label={t("messages")} />

                <NotificationBell />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label={t("openMenu")}
                      className="w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-coral/20 transition-all"
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
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <GearSix size={16} />
                        {t("dashboard")}
                      </Link>
                    </DropdownMenuItem>
                    {user.businessId ? (
                      <DropdownMenuItem asChild>
                        <Link href="/profile/business" className="cursor-pointer">
                          <Buildings size={16} />
                          {t("businessPortal")}
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link href="/onboarding/business" className="cursor-pointer">
                          <Storefront size={16} />
                          {t("listYourBusiness")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {user.instructorId ? (
                      <DropdownMenuItem asChild>
                        <Link href="/profile/instructor" className="cursor-pointer">
                          <GraduationCap size={16} />
                          {user.isBusinessInstructor ? t("influencerPortal") : t("instructorPortal")}
                        </Link>
                      </DropdownMenuItem>
                    ) : !user.businessId ? (
                      <DropdownMenuItem asChild>
                        <Link href="/onboarding/instructor" className="cursor-pointer">
                          <GraduationCap size={16} />
                          {t("becomeInstructor")}
                        </Link>
                      </DropdownMenuItem>
                    ) : null}
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
              </>
            ) : (
              <Link
                href="/login"
                className="h-9 px-4 inline-flex items-center gap-1.5 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral-hover transition-colors shadow-sm shadow-coral/20 active:scale-95"
              >
                <UserCircle size={18} weight="bold" />
                <span className="hidden sm:inline">{t("signIn")}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      {children}
    </nav>
  );
}
