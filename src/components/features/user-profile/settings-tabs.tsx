"use client";

import { useTranslations } from "next-intl";
import {
  Bell,
  Globe,
  ShieldCheck,
  Key,
  SignOut,
  Trash,
} from "@phosphor-icons/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { AnimateIn } from "@/components/ui/animate-in";
import type { UserSettings } from "@/types/user";

export function SettingsNotifications({ settings }: { settings: UserSettings }) {
  const t = useTranslations("profile.notifications");
  return (
    <AnimateIn>
      <section className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
            <Bell size={16} className="text-coral" />
          </div>
          <h3 className="font-bold text-gray-900">
            {t("title")}
          </h3>
        </div>
        <div className="space-y-4">
          {[
            {
              key: "bookingUpdates" as const,
              label: t("bookingUpdates"),
              desc: t("bookingUpdatesDesc"),
            },
            {
              key: "newClasses" as const,
              label: t("newClassesNearby"),
              desc: t("newClassesNearbyDesc"),
            },
            {
              key: "promotions" as const,
              label: t("promotions"),
              desc: t("promotionsDesc"),
            },
            {
              key: "reminders" as const,
              label: t("classReminders"),
              desc: t("classRemindersDesc"),
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <Label className="text-sm font-medium text-gray-900">
                  {item.label}
                </Label>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.desc}
                </p>
              </div>
              <Switch
                defaultChecked={settings.notifications[item.key]}
              />
            </div>
          ))}
        </div>
      </section>
    </AnimateIn>
  );
}

export function SettingsPreferences({ settings }: { settings: UserSettings }) {
  const t = useTranslations("profile.preferences");
  return (
    <AnimateIn delay={100}>
      <section className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
            <Globe size={16} className="text-coral" />
          </div>
          <h3 className="font-bold text-gray-900">{t("title")}</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-900">
                {t("searchRadius")}
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                {t("searchRadiusDesc")}
              </p>
            </div>
            <Select defaultValue={settings.defaultRadius}>
              <SelectTrigger className="w-24 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1km">1 km</SelectItem>
                <SelectItem value="5km">5 km</SelectItem>
                <SelectItem value="10km">10 km</SelectItem>
                <SelectItem value="25km">25 km</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-900">
                {t("language")}
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                {t("languageDesc")}
              </p>
            </div>
            <Select defaultValue={settings.language}>
              <SelectTrigger className="w-36 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Polski">Polski</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Deutsch">Deutsch</SelectItem>
                <SelectItem value="Français">Français</SelectItem>
                <SelectItem value="Español">Español</SelectItem>
                <SelectItem value="Italiano">Italiano</SelectItem>
                <SelectItem value="Čeština">Čeština</SelectItem>
                <SelectItem value="Українська">Українська</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </AnimateIn>
  );
}

export function SettingsPrivacy({ settings }: { settings: UserSettings }) {
  const t = useTranslations("profile.privacy");
  return (
    <AnimateIn delay={200}>
      <section className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
            <ShieldCheck size={16} className="text-coral" />
          </div>
          <h3 className="font-bold text-gray-900">{t("title")}</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-900">
                {t("publicProfile")}
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                {t("publicProfileDesc")}
              </p>
            </div>
            <Switch
              defaultChecked={settings.privacyProfilePublic}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-900">
                {t("showBookingHistory")}
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                {t("showBookingHistoryDesc")}
              </p>
            </div>
            <Switch
              defaultChecked={settings.privacyShowBookings}
            />
          </div>
        </div>
      </section>
    </AnimateIn>
  );
}

export function SettingsAccount({ onLogout }: { onLogout: () => void }) {
  const t = useTranslations("profile.account");
  const tCommon = useTranslations("common");
  return (
    <AnimateIn delay={300}>
      <section className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
        <h3 className="font-bold text-gray-900 mb-4">{t("title")}</h3>
        <div className="space-y-2.5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-coral/20 hover:bg-coral/5 text-sm font-medium text-gray-700 hover:text-coral transition-all">
            <Key size={18} className="text-gray-400" />
            {t("changePassword")}
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-coral/20 hover:bg-coral/5 text-sm font-medium text-gray-700 hover:text-coral transition-all"
          >
            <SignOut size={18} className="text-gray-400" />
            {t("signOut")}
          </button>

          <div className="pt-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-100 bg-red-50/50 hover:border-red-200 hover:bg-red-50 text-sm font-medium text-red-500 hover:text-red-600 transition-all">
                  <Trash size={18} className="text-red-400" />
                  {t("deleteAccount")}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t("deleteAccountTitle")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("deleteAccountDescription")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">
                    {tCommon("cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction variant="destructive" className="rounded-full">
                    {t("deleteAccount")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>
    </AnimateIn>
  );
}
