"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  Buildings,
  Globe,
  ShieldCheck,
  Trash,
  Key,
  SignOut,
} from "@phosphor-icons/react";
import { fetchBusinessSettings } from "@/api/business-portal";
import { AnimateIn } from "@/components/ui/animate-in";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function BusinessSettingsPage() {
  const t = useTranslations("businessSettings");
  const tCommon = useTranslations("common");

  const { data: settings, isLoading } = useQuery({
    queryKey: ["business-settings"],
    queryFn: fetchBusinessSettings,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("subtitle")}
        </p>
      </div>

      {/* Business Info */}
      <AnimateIn>
        <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
              <Buildings size={16} className="text-coral" weight="fill" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t("businessInfo")}</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">
                {t("businessName")}
              </Label>
              <Input defaultValue={settings.businessInfo.name} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">
                {t("tagline")}
              </Label>
              <Input defaultValue={settings.businessInfo.tagline} className="rounded-xl" />
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Notifications */}
      <AnimateIn delay={100}>
        <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
              <Bell size={16} className="text-coral" weight="fill" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t("notifications.title")}</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { key: "newBookings" as const, label: t("notifications.newBookings"), desc: t("notifications.newBookingsDesc") },
              { key: "cancellations" as const, label: t("notifications.cancellations"), desc: t("notifications.cancellationsDesc") },
              { key: "reviews" as const, label: t("notifications.newReviews"), desc: t("notifications.newReviewsDesc") },
              { key: "promotions" as const, label: t("notifications.promotionUpdates"), desc: t("notifications.promotionUpdatesDesc") },
              { key: "weeklyReport" as const, label: t("notifications.weeklyReport"), desc: t("notifications.weeklyReportDesc") },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div>
                  <Label className="text-sm font-medium text-gray-900">
                    {item.label}
                  </Label>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <Switch
                  defaultChecked={settings.notifications[item.key]}
                />
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Contact & Social */}
      <AnimateIn delay={200}>
        <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
              <Globe size={16} className="text-coral" weight="fill" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t("contact.title")}</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">{t("contact.website")}</Label>
              <Input defaultValue={settings.social.website} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">{t("contact.instagram")}</Label>
              <Input defaultValue={settings.social.instagram} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">{t("contact.facebook")}</Label>
              <Input defaultValue={settings.social.facebook} className="rounded-xl" />
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Privacy */}
      <AnimateIn delay={300}>
        <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
              <ShieldCheck size={16} className="text-coral" weight="fill" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t("privacy.title")}</h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between gap-4 pb-3.5">
              <div>
                <Label className="text-sm font-medium text-gray-900">
                  {t("privacy.publicProfile")}
                </Label>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t("privacy.publicProfileDesc")}
                </p>
              </div>
              <Switch defaultChecked={settings.privacy.profilePublic} />
            </div>
            <div className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <Label className="text-sm font-medium text-gray-900">
                  {t("privacy.showRevenue")}
                </Label>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t("privacy.showRevenueDesc")}
                </p>
              </div>
              <Switch defaultChecked={settings.privacy.showRevenue} />
            </div>
            <div className="flex items-center justify-between gap-4 pt-3.5">
              <div>
                <Label className="text-sm font-medium text-gray-900">
                  {t("privacy.showStudentCount")}
                </Label>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t("privacy.showStudentCountDesc")}
                </p>
              </div>
              <Switch defaultChecked={settings.privacy.showStudentCount} />
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Danger Zone */}
      <AnimateIn delay={400}>
        <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <Trash size={16} className="text-red-500" weight="fill" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t("dangerZone.title")}</h3>
          </div>
          <div className="space-y-2.5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-coral/20 hover:bg-coral/5 text-sm font-medium text-gray-700 hover:text-coral transition-all">
              <Key size={18} className="text-gray-400" />
              {t("dangerZone.changePassword")}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-coral/20 hover:bg-coral/5 text-sm font-medium text-gray-700 hover:text-coral transition-all">
              <SignOut size={18} className="text-gray-400" />
              {t("dangerZone.signOut")}
            </button>
            <div className="pt-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-100 bg-red-50/50 hover:border-red-200 hover:bg-red-50 text-sm font-medium text-red-500 hover:text-red-600 transition-all">
                    <Trash size={18} className="text-red-400" />
                    {t("dangerZone.deleteAccount")}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("dangerZone.deleteTitle")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("dangerZone.deleteDescription")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">
                      {tCommon("cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      className="rounded-full"
                    >
                      {tCommon("delete")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </section>
      </AnimateIn>
    </div>
  );
}
