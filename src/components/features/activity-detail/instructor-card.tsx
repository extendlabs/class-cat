import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CaretRight,
  ShieldCheck,
  GraduationCap,
} from "@phosphor-icons/react";
import type { Instructor as InstructorType } from "@/types/activity";
import { AnimateIn } from "@/components/ui/animate-in";
import Link from "next/link";

export function InstructorCard({
  instructor,
  instructorId,
  businessId,
}: {
  instructor: InstructorType;
  instructorId: string;
  businessId: string;
}) {
  return (
    <AnimateIn delay={400} className="mt-16">
      <div className="relative rounded-3xl border border-gray-100 bg-white shadow-[var(--shadow-soft)] overflow-hidden">
        {/* Decorative top bar */}
        <div className="h-1.5 bg-gradient-to-r from-coral via-coral-hover to-coral-light" />
        <div className="p-8 md:p-10">
          <span className="uppercase tracking-widest text-coral font-bold text-xs mb-6 block">
            Your Instructor
          </span>
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20 ring-4 ring-coral/10 shadow-md">
              <AvatarImage
                src={instructor.avatar}
                alt={instructor.name}
              />
              <AvatarFallback className="text-lg bg-coral/10 text-coral font-bold">
                {instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {instructor.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {instructor.title}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full">
                  <GraduationCap size={14} weight="fill" className="text-coral" /> {instructor.experience}
                </span>
                {instructor.verified && (
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full">
                    <ShieldCheck size={14} weight="fill" /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="mt-6 text-gray-600 text-sm leading-relaxed">
            {instructor.bio}
          </p>
          <div className="mt-6 flex items-center gap-6">
            <Link
              href={`/instructor/${instructorId}`}
              className="text-sm font-bold text-coral hover:text-coral-hover transition-colors flex items-center gap-1"
            >
              View Full Profile <CaretRight size={16} />
            </Link>
            <Link
              href={`/business/${businessId}`}
              className="text-sm font-bold transition-colors flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              Visit Studio <CaretRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
