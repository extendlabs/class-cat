"use client";

import {
  PencilSimple,
  Trophy,
  Users,
  Medal,
  BookOpen,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { Achievement } from "@/types/instructor";

export const ACHIEVEMENT_ICONS: Record<string, typeof Trophy> = {
  trophy: Trophy,
  users: Users,
  medal: Medal,
  book: BookOpen,
};

export function AchievementsSection({
  currentAchievements,
  openAddAchievement,
  openEditAchievement,
  deleteAchievement,
}: {
  currentAchievements: Achievement[];
  openAddAchievement: () => void;
  openEditAchievement: (idx: number) => void;
  deleteAchievement: (idx: number) => void;
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)] p-8 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-coral to-coral-hover rounded-xl flex items-center justify-center text-white shadow-sm">
            <Trophy size={18} weight="fill" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Professional Achievements
          </h3>
        </div>
        <Button size="sm" onClick={openAddAchievement} className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5 text-xs">
          <Plus size={12} weight="bold" /> Add
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {currentAchievements.map((achievement, idx) => {
          const Icon = ACHIEVEMENT_ICONS[achievement.icon] || Trophy;
          return (
            <div key={achievement.title} className="flex items-start gap-3 group/ach relative">
              <div className="w-6 h-6 bg-coral/8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/ach:bg-coral/15 transition-colors">
                <Icon size={14} weight="fill" className="text-coral" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-gray-900">{achievement.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{achievement.description}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover/ach:opacity-100 transition-opacity flex-shrink-0 pt-0.5">
                <button
                  onClick={() => openEditAchievement(idx)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-coral/10 hover:text-coral transition-all"
                >
                  <PencilSimple size={11} weight="bold" />
                </button>
                <button
                  onClick={() => deleteAchievement(idx)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <Trash size={11} weight="bold" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {currentAchievements.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">No achievements yet. Add your first one.</p>
      )}
    </div>
  );
}
