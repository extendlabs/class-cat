"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  CalendarBlank,
  GearSix,
  Star,
} from "@phosphor-icons/react";
import { Navbar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  fetchUserProfile,
  fetchUserBookings,
  fetchUserReviews,
  fetchUserSettings,
} from "@/api/user";
import {
  ProfileCard,
  EditProfileDialog,
  UpcomingBookings,
  PastBookings,
  ReviewsList,
  SettingsNotifications,
  SettingsPreferences,
  SettingsPrivacy,
  SettingsAccount,
} from "@/components/features/user-profile";

export default function PageContent() {
  const router = useRouter();
  const t = useTranslations("profile");
  const { user, logout } = useAuth();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [deletedReviewIds, setDeletedReviewIds] = useState<Set<string>>(new Set());

  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: () => fetchUserProfile(user?.id),
    enabled: !!user,
  });

  const { data: bookings } = useQuery({
    queryKey: ["user-bookings", user?.id],
    queryFn: () => fetchUserBookings(user?.id),
    enabled: !!user,
  });

  const { data: reviews } = useQuery({
    queryKey: ["user-reviews", user?.id],
    queryFn: () => fetchUserReviews(user?.id),
    enabled: !!user,
  });

  const { data: settings } = useQuery({
    queryKey: ["user-settings", user?.id],
    queryFn: () => fetchUserSettings(user?.id),
    enabled: !!user,
  });

  const visibleReviews = reviews?.filter((r) => !deletedReviewIds.has(r.id));

  const upcomingBookings = bookings?.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  );
  const pastBookings = bookings?.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleDeleteReview = (id: string) => {
    setDeletedReviewIds((prev) => new Set([...prev, id]));
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />

      <main className="pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Tabs defaultValue="profile">
            <TabsList className="w-full grid grid-cols-4 bg-secondary rounded-full p-1 shadow-[var(--shadow-soft)] border border-gray-200/40 group-data-[orientation=horizontal]/tabs:h-11">
              <TabsTrigger
                value="profile"
                className="gap-1.5 rounded-full text-xs sm:text-sm py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-[var(--shadow-soft)] data-[state=active]:text-coral"
              >
                <User size={15} />
                <span className="hidden sm:inline">{t("tabs.profile")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="activities"
                className="gap-1.5 rounded-full text-xs sm:text-sm py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-[var(--shadow-soft)] data-[state=active]:text-coral"
              >
                <CalendarBlank size={15} />
                <span className="hidden sm:inline">{t("tabs.activities")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="gap-1.5 rounded-full text-xs sm:text-sm py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-[var(--shadow-soft)] data-[state=active]:text-coral"
              >
                <Star size={15} />
                <span className="hidden sm:inline">{t("tabs.reviews")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="gap-1.5 rounded-full text-xs sm:text-sm py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-[var(--shadow-soft)] data-[state=active]:text-coral"
              >
                <GearSix size={15} />
                <span className="hidden sm:inline">{t("tabs.settings")}</span>
              </TabsTrigger>
            </TabsList>

            {/* -- Profile Tab -- */}
            <TabsContent value="profile" className="mt-6">
              {profile && (
                <ProfileCard
                  profile={profile}
                  onEditProfile={() => setEditProfileOpen(true)}
                />
              )}

              <EditProfileDialog
                open={editProfileOpen}
                onOpenChange={setEditProfileOpen}
                profile={profile}
              />
            </TabsContent>

            {/* -- Activities Tab -- */}
            <TabsContent value="activities" className="mt-6 space-y-8">
              <UpcomingBookings bookings={upcomingBookings ?? []} />
              <PastBookings bookings={pastBookings ?? []} />
            </TabsContent>

            {/* -- Reviews Tab -- */}
            <TabsContent value="reviews" className="mt-6">
              <ReviewsList
                reviews={visibleReviews ?? []}
                onDeleteReview={handleDeleteReview}
              />
            </TabsContent>

            {/* -- Settings Tab -- */}
            <TabsContent value="settings" className="mt-6 space-y-5">
              {settings && (
                <>
                  <SettingsNotifications settings={settings} />
                  <SettingsPreferences settings={settings} />
                  <SettingsPrivacy settings={settings} />
                  <SettingsAccount onLogout={handleLogout} />
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
