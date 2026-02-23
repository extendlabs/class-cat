"use client";

import Image from "next/image";
import {
  Star,
  PencilSimple,
  MapPin,
  Buildings,
  ShieldCheck,
  Users,
  GraduationCap,
  Plus,
  X,
} from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { BusinessPageAction, BusinessData } from "@/types/business-profile";

export function EditButton({
  onClick,
  className = "",
  size = "md",
}: {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        size === "sm" ? "w-7 h-7" : "w-8 h-8"
      } bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-coral hover:text-white transition-all duration-200 border border-gray-100 hover:border-coral text-gray-400 hover:scale-110 active:scale-95 ${className}`}
    >
      <PencilSimple size={size === "sm" ? 12 : 14} weight="bold" />
    </button>
  );
}

export function BusinessInfoSection({
  business,
  displayName,
  displayTagline,
  displayAbout,
  editingName,
  editingTagline,
  editingAbout,
  nameValue,
  taglineValue,
  aboutValue,
  logoPreview,
  currentCategories,
  categoryInputOpen,
  unusedCategories,
  instructorCount,
  dispatch,
  logoInputRef,
}: {
  business: BusinessData;
  displayName: string;
  displayTagline: string;
  displayAbout: string;
  editingName: boolean;
  editingTagline: boolean;
  editingAbout: boolean;
  nameValue: string;
  taglineValue: string;
  aboutValue: string;
  logoPreview: string | null;
  currentCategories: string[];
  categoryInputOpen: boolean;
  unusedCategories: string[];
  instructorCount: number;
  dispatch: React.Dispatch<BusinessPageAction>;
  logoInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const startEditName = () => {
    dispatch({ type: "SET_NAME_VALUE", payload: business.name });
    dispatch({ type: "SET_EDITING_NAME", payload: true });
  };

  const startEditTagline = () => {
    dispatch({ type: "SET_TAGLINE_VALUE", payload: business.tagline });
    dispatch({ type: "SET_EDITING_TAGLINE", payload: true });
  };

  const startEditAbout = () => {
    dispatch({ type: "SET_ABOUT_VALUE", payload: business.description });
    dispatch({ type: "SET_EDITING_ABOUT", payload: true });
  };

  const addCategory = (cat: string) => {
    if (currentCategories.includes(cat)) return;
    dispatch({ type: "SET_CATEGORIES", payload: [...currentCategories, cat] });
    dispatch({ type: "SET_CATEGORY_INPUT_OPEN", payload: false });
  };

  const removeCategory = (cat: string) => {
    const next = currentCategories.filter((c) => c !== cat);
    if (next.length === 0) return;
    dispatch({ type: "SET_CATEGORIES", payload: next });
  };

  return (
    <div>
      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {currentCategories.map((cat) => (
          <Badge
            key={cat}
            variant="secondary"
            className="bg-coral/10 text-coral border-coral/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 group/badge"
          >
            <Buildings size={14} weight="bold" />
            {cat}
            {currentCategories.length > 1 && (
              <button
                onClick={() => removeCategory(cat)}
                className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover/badge:opacity-100 transition-opacity hover:bg-coral/20"
              >
                <X size={10} weight="bold" />
              </button>
            )}
          </Badge>
        ))}
        {categoryInputOpen ? (
          <div className="relative">
            <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-[var(--shadow-float)] border border-gray-100 py-2 z-20 w-48 max-h-48 overflow-y-auto">
              {unusedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => addCategory(cat)}
                  className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-coral/5 hover:text-coral transition-colors"
                >
                  {cat}
                </button>
              ))}
              {unusedCategories.length === 0 && (
                <p className="px-3 py-1.5 text-xs text-gray-400">No more categories</p>
              )}
            </div>
            <button
              onClick={() => dispatch({ type: "SET_CATEGORY_INPUT_OPEN", payload: false })}
              className="px-3 py-1 rounded-full text-xs font-bold border-2 border-dashed border-coral/30 text-coral hover:bg-coral/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch({ type: "SET_CATEGORY_INPUT_OPEN", payload: true })}
            className="px-3 py-1 rounded-full text-xs font-bold border-2 border-dashed border-gray-200 text-gray-400 hover:border-coral/30 hover:text-coral hover:bg-coral/5 transition-all flex items-center gap-1"
          >
            <Plus size={12} weight="bold" /> Add
          </button>
        )}

        {business.verified && (
          <>
            <span className="text-gray-200">|</span>
            <Badge
              variant="secondary"
              className="bg-green-50 text-green-600 border-green-200 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            >
              <ShieldCheck size={14} weight="fill" className="mr-1" />
              Verified
            </Badge>
          </>
        )}
        <span className="text-gray-200">|</span>
        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
          <MapPin size={14} className="text-coral" /> {business.address}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
        {/* Logo with upload */}
        <div className="relative group/logo">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-[var(--shadow-soft)] bg-white flex-shrink-0">
            <Image
              src={logoPreview ?? business.logo}
              alt={`${business.name} logo`}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => logoInputRef.current?.click()}
            className="absolute inset-0 rounded-2xl bg-black/0 group-hover/logo:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover/logo:opacity-100"
          >
            <Camera size={20} className="text-white drop-shadow-md" />
          </button>
        </div>

        <div className="flex-1">
          {/* Name */}
          {editingName ? (
            <input
              value={nameValue}
              onChange={(e) => dispatch({ type: "SET_NAME_VALUE", payload: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") dispatch({ type: "SET_EDITING_NAME", payload: false });
                if (e.key === "Escape") { dispatch({ type: "SET_NAME_VALUE", payload: business.name }); dispatch({ type: "SET_EDITING_NAME", payload: false }); }
              }}
              onBlur={() => dispatch({ type: "SET_EDITING_NAME", payload: false })}
              className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight bg-transparent border-b-2 border-coral outline-none w-full"
            />
          ) : (
            <div className="flex items-center gap-3 group/name">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                {displayName}
              </h1>
              <EditButton onClick={startEditName} size="sm" className="opacity-0 group-hover/name:opacity-100" />
            </div>
          )}

          {/* Tagline */}
          {editingTagline ? (
            <input
              value={taglineValue}
              onChange={(e) => dispatch({ type: "SET_TAGLINE_VALUE", payload: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") dispatch({ type: "SET_EDITING_TAGLINE", payload: false });
                if (e.key === "Escape") { dispatch({ type: "SET_TAGLINE_VALUE", payload: business.tagline }); dispatch({ type: "SET_EDITING_TAGLINE", payload: false }); }
              }}
              onBlur={() => dispatch({ type: "SET_EDITING_TAGLINE", payload: false })}
              className="mt-2 text-gray-500 text-base bg-transparent border-b-2 border-coral outline-none w-full"
            />
          ) : (
            <div className="flex items-center gap-3 mt-2 group/tagline">
              <p className="text-gray-500 text-base">{displayTagline}</p>
              <EditButton onClick={startEditTagline} size="sm" className="opacity-0 group-hover/tagline:opacity-100" />
            </div>
          )}
        </div>
      </div>

      {/* Rating pills */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm">
          <Star size={14} weight="fill" className="text-coral" />
          <span className="font-bold text-gray-900">{business.rating}</span>
          <span className="text-gray-400">({business.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm">
          <Users size={14} className="text-gray-400" />
          <span className="font-medium text-gray-700">{business.activities.length} Classes</span>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm">
          <GraduationCap size={14} className="text-gray-400" />
          <span className="font-medium text-gray-700">{instructorCount} Instructors</span>
        </div>
      </div>

      {/* About */}
      <AnimateIn delay={100} className="mt-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="uppercase tracking-widest text-coral font-bold text-xs">
              Overview
            </span>
            {!editingAbout && <EditButton onClick={startEditAbout} size="sm" />}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            About {displayName}
          </h3>
          {editingAbout ? (
            <div className="space-y-3">
              <Textarea
                value={aboutValue}
                onChange={(e) => dispatch({ type: "SET_ABOUT_VALUE", payload: e.target.value })}
                rows={6}
                className="resize-none text-gray-600 leading-relaxed"
              />
              <div className="flex gap-2">
                <Button size="sm" className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={() => dispatch({ type: "SET_EDITING_ABOUT", payload: false })}>
                  Save
                </Button>
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => { dispatch({ type: "SET_ABOUT_VALUE", payload: business.description }); dispatch({ type: "SET_EDITING_ABOUT", payload: false }); }}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 leading-relaxed">{displayAbout}</p>
          )}
        </div>
      </AnimateIn>
    </div>
  );
}

// Camera icon is used inline in the logo upload button
import { Camera } from "@phosphor-icons/react";
