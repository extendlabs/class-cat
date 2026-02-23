import {
  Trophy,
  Users,
  Medal,
  BookOpen,
} from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Achievement } from "@/types/instructor";

const ACHIEVEMENT_ICONS: Record<string, typeof Trophy> = {
  trophy: Trophy,
  users: Users,
  medal: Medal,
  book: BookOpen,
};

export function InstructorAchievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <AnimateIn delay={200} className="mt-10">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)] p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-coral to-coral-hover rounded-xl flex items-center justify-center text-white shadow-sm">
            <Trophy size={18} weight="fill" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Professional Achievements
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {achievements.map((achievement) => {
            const Icon = ACHIEVEMENT_ICONS[achievement.icon] || Trophy;
            return (
              <div key={achievement.title} className="flex items-start gap-3 group">
                <div className="w-6 h-6 bg-coral/8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-coral/15 transition-colors">
                  <Icon size={14} weight="fill" className="text-coral" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{achievement.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimateIn>
  );
}
