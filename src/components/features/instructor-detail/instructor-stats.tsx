import {
  Star,
  Users,
  BookOpen,
  GraduationCap,
} from "@phosphor-icons/react";
import type { InstructorDetail } from "@/types/instructor";

export function InstructorStats({ instructor }: { instructor: InstructorDetail }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 bg-coral/8 px-3 py-1.5 rounded-full">
        <Star size={16} weight="fill" className="text-coral" />
        <span className="font-bold text-gray-900 text-sm">
          {instructor.rating}
        </span>
        <span className="text-gray-400 text-sm">
          ({instructor.reviewCount})
        </span>
      </div>
      <div className="flex items-center gap-1.5 bg-coral/8 px-3 py-1.5 rounded-full text-sm text-coral">
        <GraduationCap size={14} weight="fill" className="text-coral" />
        <span className="font-medium">{instructor.yearsExperience}+ Years</span>
      </div>
      <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm text-gray-700">
        <Users size={14} className="text-gray-400" />
        <span className="font-medium">{instructor.totalStudents}+ Students</span>
      </div>
      <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm text-gray-700">
        <BookOpen size={14} className="text-gray-400" />
        <span className="font-medium">{instructor.totalClasses} Classes</span>
      </div>
    </div>
  );
}
