"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  ShieldCheck,
  Trash,
  Key,
  SignOut,
} from "@phosphor-icons/react";
import { fetchInstructorSettings } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { AnimateIn } from "@/components/ui/animate-in";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

export default function InstructorSettingsPage() {
  const { user } = useAuth();
  const instructorId = user?.instructorId ?? "inst-6";

  const { data: settings, isLoading } = useQuery({
    queryKey: ["instructor-settings", instructorId],
    queryFn: () => fetchInstructorSettings(instructorId),
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your instructor preferences.</p>
      </div>

      {/* Notifications */}
      <AnimateIn>
        <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
              <Bell size={16} className="text-coral" weight="fill" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { key: "newBookings" as const, label: "New bookings", desc: "Get notified when students book your classes" },
              { key: "reviews" as const, label: "New reviews", desc: "Get notified about new student reviews" },
              { key: "scheduleChanges" as const, label: "Schedule changes", desc: "Alerts when your schedule is updated" },
              { key: "reminders" as const, label: "Class reminders", desc: "Reminders before upcoming classes" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div>
                  <Label className="text-sm font-medium text-gray-900">{item.label}</Label>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <Switch defaultChecked={settings.notifications[item.key]} />
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Privacy */}
      <AnimateIn delay={100}>
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
                <Label className="text-sm font-medium text-gray-900">Public profile</Label>
                <p className="text-xs text-gray-500 mt-0.5">Allow students to find your profile</p>
              </div>
              <Switch defaultChecked={settings.privacy.profilePublic} />
            </div>
            <div className="flex items-center justify-between gap-4 pt-3.5">
              <div>
                <Label className="text-sm font-medium text-gray-900">Show statistics</Label>
                <p className="text-xs text-gray-500 mt-0.5">Display student count and class stats on your profile</p>
              </div>
              <Switch defaultChecked={settings.privacy.showStats} />
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Danger Zone */}
      <AnimateIn delay={200}>
        <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <Trash size={16} className="text-red-500" weight="fill" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Account</h3>
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
                    Delete Instructor Account
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete instructor account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your instructor profile and all associated data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" className="rounded-full">Delete Account</AlertDialogAction>
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
