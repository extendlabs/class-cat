"use client";

import { Star, Users, GraduationCap } from "@phosphor-icons/react";
import type { Business } from "@/types/business";

export function BusinessStats({ business }: { business: Business }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm">
        <Star size={14} weight="fill" className="text-coral" />
        <span className="font-bold text-gray-900">
          {business.rating}
        </span>
        <span className="text-gray-400">
          ({business.reviewCount})
        </span>
      </div>
      <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm">
        <Users size={14} className="text-gray-400" />
        <span className="font-medium text-gray-700">{business.activities.length} Classes</span>
      </div>
      <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm">
        <GraduationCap size={14} className="text-gray-400" />
        <span className="font-medium text-gray-700">{business.instructors.length} Instructors</span>
      </div>
    </div>
  );
}
