"use client";

import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { InstructorCard } from "@/components/features/instructor-card";
import { AnimateIn } from "@/components/ui/animate-in";
import { Button } from "@/components/ui/button";
import type { Instructor } from "@/types/activity";
import type { BusinessPageAction } from "@/types/business-profile";

export function BusinessInstructorsBlock({
  currentInstructors,
  dispatch,
}: {
  currentInstructors: Instructor[];
  dispatch: React.Dispatch<BusinessPageAction>;
}) {
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
          <Button size="sm" className="rounded-full bg-coral hover:bg-coral-hover text-white gap-1.5" onClick={() => dispatch({ type: "OPEN_ADD_INSTRUCTOR" })}>
            <Plus size={14} weight="bold" />
            Add Instructor
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {currentInstructors.map((instructor) => (
            <div key={instructor.id} className="relative group/inst flex-shrink-0">
              <InstructorCard instructor={instructor} />
              {instructor.invited ? (
                <span className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Invited
                </span>
              ) : instructor.hasAccount ? (
                <span className="absolute top-2 left-2 z-10 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Has Account
                </span>
              ) : null}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/inst:opacity-100 transition-all duration-200 z-10">
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch({ type: "OPEN_EDIT_INSTRUCTOR", payload: instructor }); }}
                  className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-coral hover:text-white transition-all duration-200 text-gray-500 hover:scale-110 active:scale-95"
                >
                  <PencilSimple size={12} weight="bold" />
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch({ type: "SET_DELETE_INSTRUCTOR_ID", payload: instructor.id }); }}
                  className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all duration-200 text-gray-500 hover:scale-110 active:scale-95"
                >
                  <Trash size={12} weight="bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
