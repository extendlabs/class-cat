"use client";

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
  return (
    <AnimateIn>
      <section className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
            <Bell size={16} className="text-coral" />
          </div>
          <h3 className="font-bold text-gray-900">
            Notifications
          </h3>
        </div>
        <div className="space-y-4">
          {[
            {
              key: "bookingUpdates" as const,
              label: "Booking updates",
              desc: "Get notified about booking confirmations and changes",
            },
            {
              key: "newClasses" as const,
              label: "New classes nearby",
              desc: "Be the first to know about new activities",
            },
            {
              key: "promotions" as const,
              label: "Promotions & deals",
              desc: "Special offers and discounts",
            },
            {
              key: "reminders" as const,
              label: "Class reminders",
              desc: "Reminders before your scheduled classes",
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
  return (
    <AnimateIn delay={100}>
      <section className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
            <Globe size={16} className="text-coral" />
          </div>
          <h3 className="font-bold text-gray-900">Preferences</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-900">
                Default search radius
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                Maximum distance for search results
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
                Language
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                Display language for the app
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
  return (
    <AnimateIn delay={200}>
      <section className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
            <ShieldCheck size={16} className="text-coral" />
          </div>
          <h3 className="font-bold text-gray-900">Privacy</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-900">
                Public profile
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                Allow others to see your profile
              </p>
            </div>
            <Switch
              defaultChecked={settings.privacyProfilePublic}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-900">
                Show booking history
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                Display your past activities on your profile
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
  return (
    <AnimateIn delay={300}>
      <section className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
        <h3 className="font-bold text-gray-900 mb-4">Account</h3>
        <div className="space-y-2.5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-coral/20 hover:bg-coral/5 text-sm font-medium text-gray-700 hover:text-coral transition-all">
            <Key size={18} className="text-gray-400" />
            Change Password
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-coral/20 hover:bg-coral/5 text-sm font-medium text-gray-700 hover:text-coral transition-all"
          >
            <SignOut size={18} className="text-gray-400" />
            Sign Out
          </button>

          <div className="pt-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-100 bg-red-50/50 hover:border-red-200 hover:bg-red-50 text-sm font-medium text-red-500 hover:text-red-600 transition-all">
                  <Trash size={18} className="text-red-400" />
                  Delete Account
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your account,
                    bookings and all associated data. This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction variant="destructive" className="rounded-full">
                    Delete Account
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
