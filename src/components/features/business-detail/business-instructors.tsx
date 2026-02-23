"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import { InstructorCard } from "@/components/features/instructor-card";
import type { Instructor } from "@/types/activity";

export function BusinessInstructors({ instructors }: { instructors: Instructor[] }) {
  return (
    <AnimateIn delay={300} className="mt-16">
      <div>
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          Team
        </span>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            Our Instructors
          </h3>
          <span className="text-sm text-gray-400">
            {instructors.length} instructors
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {instructors.map((instructor) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
            />
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
