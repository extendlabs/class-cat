"use client";

import { useReducer, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInstructorProfile } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { AnimateIn } from "@/components/ui/animate-in";
import { Skeleton } from "@/components/ui/skeleton";
import { profileReducer, initialProfileState } from "@/hooks/use-instructor-profile-reducer";
import {
  InstructorHeroSection,
  InstructorBioSection,
  SpecialtiesSection,
  CertificationsSection,
  AchievementsSection,
  QuickInfoSidebar,
  SocialLinksSection,
  AchievementDialog,
} from "@/components/features/instructor-profile";

// ── Main Component ──

export default function InstructorProfilePage() {
  const { user } = useAuth();
  const instructorId = user?.instructorId ?? "inst-6";

  const { data: instructor, isLoading } = useQuery({
    queryKey: ["instructor-profile", instructorId],
    queryFn: () => fetchInstructorProfile(instructorId),
  });

  const [state, dispatch] = useReducer(profileReducer, initialProfileState);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-start gap-6">
              <Skeleton className="w-28 h-28 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!instructor) return null;

  const currentSpecialties = state.specialties ?? instructor.specialties;
  const currentCerts = state.certifications ?? instructor.certifications;
  const currentAchievements = state.achievements ?? instructor.achievements;

  // Achievement handlers
  const openAddAchievement = () => {
    dispatch({ type: "OPEN_ACHIEVEMENT_DIALOG", idx: null, form: { icon: "trophy", title: "", description: "" } });
  };

  const openEditAchievement = (idx: number) => {
    const a = currentAchievements[idx];
    dispatch({ type: "OPEN_ACHIEVEMENT_DIALOG", idx, form: { icon: a.icon, title: a.title, description: a.description } });
  };

  const saveAchievement = () => {
    if (!state.achievementForm.title.trim()) return;
    const list = [...currentAchievements];
    if (state.editingAchievementIdx !== null) {
      list[state.editingAchievementIdx] = { ...state.achievementForm };
    } else {
      list.push({ ...state.achievementForm });
    }
    dispatch({ type: "SET_ACHIEVEMENTS", achievements: list });
    dispatch({ type: "CLOSE_ACHIEVEMENT_DIALOG" });
  };

  const deleteAchievement = (idx: number) => {
    dispatch({ type: "SET_ACHIEVEMENTS", achievements: currentAchievements.filter((_, i) => i !== idx) });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hidden file inputs */}
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) dispatch({ type: "SET_AVATAR_PREVIEW", url: URL.createObjectURL(f) }); }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column */}
        <div className="lg:col-span-8">
          <InstructorHeroSection instructor={instructor} state={state} dispatch={dispatch} avatarInputRef={avatarInputRef} />

          <AnimateIn delay={100} className="mt-16">
            <InstructorBioSection instructor={instructor} state={state} dispatch={dispatch} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <SpecialtiesSection currentSpecialties={currentSpecialties} state={state} dispatch={dispatch} />
              <CertificationsSection currentCerts={currentCerts} state={state} dispatch={dispatch} />
            </div>
          </AnimateIn>

          <AnimateIn delay={200} className="mt-10">
            <AchievementsSection
              currentAchievements={currentAchievements}
              openAddAchievement={openAddAchievement}
              openEditAchievement={openEditAchievement}
              deleteAchievement={deleteAchievement}
            />
          </AnimateIn>
        </div>

        {/* Right Column — Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 space-y-6">
            <QuickInfoSidebar instructor={instructor} state={state} dispatch={dispatch} />
            <SocialLinksSection instructor={instructor} state={state} dispatch={dispatch} />
          </div>
        </div>
      </div>

      <AchievementDialog state={state} dispatch={dispatch} saveAchievement={saveAchievement} />
    </div>
  );
}
