import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, ShieldCheck, Buildings } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import type { InstructorDetail } from "@/types/instructor";
import { InstructorStats } from "./instructor-stats";

export function InstructorHero({ instructor }: { instructor: InstructorDetail }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6">
      <div className="relative shrink-0">
        <Avatar className="w-28 h-28 ring-4 ring-coral/10 shadow-lg border-4 border-white">
          <AvatarImage src={instructor.avatar} alt={instructor.name} />
          <AvatarFallback className="text-2xl bg-coral/10 text-coral font-bold">
            {instructor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        {instructor.verified && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
            <ShieldCheck size={18} weight="fill" className="text-green-500" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 pt-2">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {instructor.verified && (
            <Badge
              variant="secondary"
              className="bg-coral/10 text-coral border-coral/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            >
              <ShieldCheck size={14} weight="bold" className="mr-1" />
              Verified Instructor
            </Badge>
          )}
          <span className="text-coral text-sm">&bull;</span>
          <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
            <MapPin size={14} className="text-coral" /> Krakow, Polska
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
          {instructor.name}
        </h1>
        <p className="text-gray-500 font-medium mb-2">{instructor.title}</p>
        {instructor.businessName && (
          <Link
            href={`/business/${instructor.businessId}`}
            className="inline-flex items-center gap-1.5 text-sm text-coral hover:text-coral-hover font-medium transition-colors mb-5"
          >
            <Buildings size={16} weight="fill" />
            Works at {instructor.businessName}
          </Link>
        )}
        {!instructor.businessName && <div className="mb-3" />}

        <InstructorStats instructor={instructor} />
      </div>
    </div>
  );
}
