import { Star } from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Instructor } from "@/types/activity";
import { Link } from "@/i18n/navigation";

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <Link
      href={`/instructor/${instructor.id}`}
      className="group flex-shrink-0 w-44 bg-white rounded-2xl border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all p-5 text-center"
    >
      <div className="relative mx-auto w-16 h-16 mb-3">
        <Avatar className="w-16 h-16 ring-4 ring-coral/10 shadow-md">
          <AvatarImage src={instructor.avatar} alt={instructor.name} />
          <AvatarFallback className="text-lg bg-coral/10 text-coral font-bold">
            {instructor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <h4 className="font-bold text-sm text-gray-900 group-hover:text-coral transition-colors line-clamp-1">
        {instructor.name}
      </h4>
      <p className="text-xs text-gray-500 mt-0.5">{instructor.specialty}</p>
      <div className="flex items-center justify-center gap-1 mt-2">
        <Star size={12} weight="fill" className="text-coral" />
        <span className="text-xs font-bold text-gray-900">
          {instructor.rating}
        </span>
      </div>
    </Link>
  );
}
