"use client";

import { CaretDown, Sparkle, ShieldCheck } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import type { InstructorDetail } from "@/types/instructor";

export function InstructorBio({
  instructor,
  bioExpanded,
  onToggleBio,
}: {
  instructor: InstructorDetail;
  bioExpanded: boolean;
  onToggleBio: () => void;
}) {
  const bioPreview = instructor.bio.slice(0, 200);
  const showReadMore = instructor.bio.length > 200;
  const firstName = instructor.name.split(" ").pop();

  return (
    <AnimateIn delay={100} className="mt-16">
      <div>
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          Overview
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          About {firstName}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-2">
          {bioExpanded ? instructor.bio : bioPreview}
          {showReadMore && !bioExpanded && "..."}
        </p>
        {showReadMore && (
          <button
            onClick={onToggleBio}
            className="text-sm font-bold text-coral hover:text-coral-hover transition-colors flex items-center gap-1"
          >
            {bioExpanded ? "Show less" : "Read more"}
            <CaretDown
              size={14}
              className={`transition-transform ${bioExpanded ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {/* Specialties & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] flex gap-4 hover:shadow-[var(--shadow-hover)] transition-shadow">
            <div className="w-10 h-10 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkle size={20} weight="fill" className="text-coral" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">Specialties</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {instructor.specialties.join(", ")}
              </p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] flex gap-4 hover:shadow-[var(--shadow-hover)] transition-shadow">
            <div className="w-10 h-10 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={20} className="text-coral" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">Certifications</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {instructor.certifications.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
