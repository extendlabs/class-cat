"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "@phosphor-icons/react";

export default function BecomeInstructorPage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const t = useTranslations("onboarding");
  const [form, setForm] = useState({
    specialty: "",
    bio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user?.instructorId) {
    router.push("/profile/instructor");
    return null;
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newInstructorId = `inst-${Date.now()}`;
    updateUser({ instructorId: newInstructorId });

    router.push("/profile/instructor");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-[var(--shadow-float)] border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-coral" weight="fill" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t("becomeInstructorTitle")}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {t("becomeInstructorSubtitle")}
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label>{t("name")}</Label>
              <Input
                value={user?.name ?? ""}
                disabled
                className="rounded-xl bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("specialty")}</Label>
              <Input
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                placeholder={t("specialtyPlaceholder")}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("bio")}</Label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder={t("bioPlaceholder")}
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 resize-none"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!form.specialty || isSubmitting}
              className="w-full rounded-full bg-coral hover:bg-coral-hover text-white h-11 text-sm font-bold"
            >
              {isSubmitting ? t("creatingProfile") : t("createProfile")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
