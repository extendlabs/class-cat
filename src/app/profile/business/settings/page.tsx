"use client";

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
          Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your business preferences.
        </p>
      </div>

      {/* Business Info */}
      <AnimateIn>
        <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
              <Buildings size={16} className="text-coral" weight="fill" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Business Information</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">
                Business Name
              </Label>
              <Input defaultValue={settings.businessInfo.name} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">
                Tagline
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
            <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { key: "newBookings" as const, label: "New bookings", desc: "Get notified when someone books a class" },
              { key: "cancellations" as const, label: "Cancellations", desc: "Alerts when bookings are cancelled" },
              { key: "reviews" as const, label: "New reviews", desc: "Get notified about new reviews" },
              { key: "promotions" as const, label: "Promotion updates", desc: "Updates on your running promotions" },
              { key: "weeklyReport" as const, label: "Weekly report", desc: "Weekly summary of your business performance" },
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
            <h3 className="text-sm font-bold text-gray-900">Contact & Social</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">Website</Label>
              <Input defaultValue={settings.social.website} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">Instagram</Label>
              <Input defaultValue={settings.social.instagram} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-500">Facebook</Label>
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
            <h3 className="text-sm font-bold text-gray-900">Privacy</h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between gap-4 pb-3.5">
              <div>
                <Label className="text-sm font-medium text-gray-900">
                  Public profile
                </Label>
                <p className="text-xs text-gray-500 mt-0.5">
                  Allow customers to find your business
                </p>
              </div>
              <Switch defaultChecked={settings.privacy.profilePublic} />
            </div>
            <div className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <Label className="text-sm font-medium text-gray-900">
                  Show revenue stats
                </Label>
                <p className="text-xs text-gray-500 mt-0.5">
                  Display revenue metrics on your profile
                </p>
              </div>
              <Switch defaultChecked={settings.privacy.showRevenue} />
            </div>
            <div className="flex items-center justify-between gap-4 pt-3.5">
              <div>
                <Label className="text-sm font-medium text-gray-900">
                  Show student count
                </Label>
                <p className="text-xs text-gray-500 mt-0.5">
                  Display total student numbers
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
            <h3 className="text-sm font-bold text-gray-900">Danger Zone</h3>
          </div>
          <div className="space-y-2.5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-coral/20 hover:bg-coral/5 text-sm font-medium text-gray-700 hover:text-coral transition-all">
              <Key size={18} className="text-gray-400" />
              Change Password
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-coral/20 hover:bg-coral/5 text-sm font-medium text-gray-700 hover:text-coral transition-all">
              <SignOut size={18} className="text-gray-400" />
              Sign Out
            </button>
            <div className="pt-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-100 bg-red-50/50 hover:border-red-200 hover:bg-red-50 text-sm font-medium text-red-500 hover:text-red-600 transition-all">
                    <Trash size={18} className="text-red-400" />
                    Delete Business Account
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete business account?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your business, all
                      activities, and associated data. This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      className="rounded-full"
                    >
                      Delete Account
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
