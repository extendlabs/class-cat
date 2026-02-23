"use client";

import {
  Camera,
  Star,
  MapPin,
  ShieldCheck,
  GraduationCap,
  Users,
  BookOpen,
} from "@phosphor-icons/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EditButton } from "@/components/features/edit-button";
import type { ProfileState, ProfileAction, InstructorData } from "@/types/instructor-profile";

export function InstructorHeroSection({
  instructor,
  state,
  dispatch,
  avatarInputRef,
}: {
  instructor: InstructorData;
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
  avatarInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6">
      {/* Avatar with verified badge + camera overlay */}
      <div className="relative shrink-0 group/avatar">
        <Avatar className="w-28 h-28 ring-4 ring-coral/10 shadow-lg border-4 border-white">
          <AvatarImage src={state.avatarPreview ?? instructor.avatar} alt={instructor.name} />
          <AvatarFallback className="text-2xl bg-coral/10 text-coral font-bold">
            {instructor.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        {instructor.verified && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
            <ShieldCheck size={18} weight="fill" className="text-green-500" />
          </div>
        )}
        <button
          onClick={() => avatarInputRef.current?.click()}
          className="absolute inset-0 rounded-full bg-black/0 group-hover/avatar:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover/avatar:opacity-100"
        >
          <Camera size={22} className="text-white drop-shadow-md" />
        </button>
      </div>

      <div className="flex-1 min-w-0 pt-2">
        {/* Badges row */}
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
            <MapPin size={14} className="text-coral" /> {state.locationValue}
          </span>
        </div>

        {/* Name — inline editable */}
        {state.editingName ? (
          <input
            value={state.nameValue}
            onChange={(e) => dispatch({ type: "SET_NAME_VALUE", value: e.target.value })}
            onKeyDown={(e) => { if (e.key === "Enter") dispatch({ type: "SET_EDITING_NAME", editing: false }); if (e.key === "Escape") { dispatch({ type: "SET_EDITING_NAME", editing: false, value: instructor.name }); } }}
            onBlur={() => dispatch({ type: "SET_EDITING_NAME", editing: false })}
            className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight bg-transparent border-b-2 border-coral outline-none w-full mb-4"
          />
        ) : (
          <div className="flex items-center gap-3 group/name mb-4">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              {instructor.name}
            </h1>
            <EditButton onClick={() => dispatch({ type: "SET_EDITING_NAME", editing: true, value: instructor.name })} className="opacity-0 group-hover/name:opacity-100" />
          </div>
        )}

        {/* Title — inline editable */}
        {state.editingTitle ? (
          <input
            value={state.titleValue}
            onChange={(e) => dispatch({ type: "SET_TITLE_VALUE", value: e.target.value })}
            onKeyDown={(e) => { if (e.key === "Enter") dispatch({ type: "SET_EDITING_TITLE", editing: false }); if (e.key === "Escape") { dispatch({ type: "SET_EDITING_TITLE", editing: false, value: instructor.title }); } }}
            onBlur={() => dispatch({ type: "SET_EDITING_TITLE", editing: false })}
            className="text-gray-500 font-medium text-base bg-transparent border-b-2 border-coral outline-none w-full mb-5"
          />
        ) : (
          <div className="flex items-center gap-3 group/title mb-5">
            <p className="text-gray-500 font-medium">{instructor.title}</p>
            <EditButton onClick={() => dispatch({ type: "SET_EDITING_TITLE", editing: true, value: instructor.title })} className="opacity-0 group-hover/title:opacity-100" />
          </div>
        )}

        {/* Stat pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-coral/8 px-3 py-1.5 rounded-full">
            <Star size={16} weight="fill" className="text-coral" />
            <span className="font-bold text-gray-900 text-sm">{instructor.rating}</span>
            <span className="text-gray-400 text-sm">({instructor.reviewCount})</span>
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
      </div>
    </div>
  );
}
