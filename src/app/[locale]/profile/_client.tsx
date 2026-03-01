"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  BookOpen,
  TennisBall,
  GearSix,
  Star,
} from "@phosphor-icons/react";
import { Navbar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  fetchUserProfile,
  fetchUserReviews,
  fetchUserSettings,
} from "@/api/user";
import { fetchUserEnrollments } from "@/api/enrollments";
import { fetchUserCourtReservations } from "@/api/court-service";
import {
  ProfileCard,
  EditProfileDialog,
  ReviewsList,
  SettingsNotifications,
  SettingsPreferences,
  SettingsPrivacy,
  SettingsAccount,
} from "@/components/features/user-profile";
import { MyClassesTab, MyCourtsTab } from "@/components/features/consumer-dashboard";

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

  const { data: enrollments } = useQuery({
    queryKey: ["user-enrollments", user?.id],
    queryFn: () => fetchUserEnrollments(user!.id),
    enabled: !!user,
  });

  const { data: courtReservations } = useQuery({
    queryKey: ["user-court-reservations", user?.name],
    queryFn: () => fetchUserCourtReservations(user!.name),
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

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleDeleteReview = (id: string) => {
    setDeletedReviewIds((prev) => new Set([...prev, id]));
  };

  const tabTriggerClass =
    "gap-1.5 rounded-full text-xs sm:text-sm py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-[var(--shadow-soft)] data-[state=active]:text-coral";

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />

      <main className="pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Tabs defaultValue="profile">
            <TabsList className="w-full grid grid-cols-5 bg-secondary rounded-full p-1 shadow-[var(--shadow-soft)] border border-gray-200/40 group-data-[orientation=horizontal]/tabs:h-11">
              <TabsTrigger value="profile" className={tabTriggerClass}>
                <User size={15} />
                <span className="hidden sm:inline">{t("tabs.profile")}</span>
              </TabsTrigger>
              <TabsTrigger value="classes" className={tabTriggerClass}>
                <BookOpen size={15} />
                <span className="hidden sm:inline">{t("tabs.classes")}</span>
              </TabsTrigger>
              <TabsTrigger value="courts" className={tabTriggerClass}>
                <TennisBall size={15} />
                <span className="hidden sm:inline">{t("tabs.courts")}</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className={tabTriggerClass}>
                <Star size={15} />
                <span className="hidden sm:inline">{t("tabs.reviews")}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className={tabTriggerClass}>
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

            {/* -- My Classes Tab -- */}
            <TabsContent value="classes" className="mt-6">
              <MyClassesTab enrollments={enrollments ?? []} />
            </TabsContent>

            {/* -- My Courts Tab -- */}
            <TabsContent value="courts" className="mt-6">
              <MyCourtsTab reservations={courtReservations ?? []} />
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
