"use client";

import NextImage from "next/image";
import {
  Star,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Lightbulb,
  Package,
  Sparkle,
  ArrowLeft,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND_ACCENT } from "@/lib/constants";
import type { FormValues } from "@/lib/activity-form-schema";

export function ActivityPreview({
  values,
  onBack,
}: {
  values: FormValues;
  onBack: () => void;
}) {
  const hasImage = values.image && (values.image.startsWith("http") || values.image.startsWith("blob:"));
  const learnItems = values.whatYouLearn?.map((w) => w.value).filter(Boolean) ?? [];
  const curriculumItems = values.curriculum?.filter((c) => c.title) ?? [];
  const times = values.availableTimes?.map((t) => t.value).filter(Boolean) ?? [];

  return (
    <div className="absolute inset-0 z-50 bg-white rounded-2xl overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-3 flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5 text-gray-600"
          onClick={onBack}
        >
          <ArrowLeft size={16} /> Back to editor
        </Button>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Preview
        </span>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Hero image */}
        {hasImage && (
          <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-100">
            <NextImage
              src={values.image}
              alt={values.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-coral/10 text-coral border-coral/20 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full capitalize">
              {values.category}
            </Badge>
            <span className="text-coral text-sm">&bull;</span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin size={14} className="text-coral" /> {values.location || "No location set"}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
            {values.title || "Untitled Activity"}
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-sm">
              <Star size={14} weight="fill" style={{ color: BRAND_ACCENT }} />
              <span className="font-bold text-gray-900">New</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-sm text-gray-700">
              <Users size={14} />
              <span className="font-medium">{values.ageRange}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-sm text-gray-700">
              <Clock size={14} />
              <span className="font-medium">{values.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-sm text-gray-700">
              <Users size={14} />
              <span className="font-medium">{values.classType}</span>
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <span className="uppercase tracking-widest text-coral font-bold text-xs mb-1.5 block">
            Overview
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
            About this class
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            {values.description || "No description provided."}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] flex gap-3">
              <div className="w-8 h-8 bg-coral/8 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb size={16} className="text-coral" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-900">Skill Level</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{values.skillLevel}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] flex gap-3">
              <div className="w-8 h-8 bg-coral/8 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package size={16} className="text-coral" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-900">Materials Included</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {values.materialsIncluded || "\u2014"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        {learnItems.length > 0 && (
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-coral to-coral-hover rounded-lg flex items-center justify-center text-white">
                <Sparkle size={14} weight="fill" />
              </div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                What you&apos;ll learn
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {learnItems.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} weight="fill" className="text-green-500" />
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Curriculum */}
        {curriculumItems.length > 0 && (
          <div>
            <span className="uppercase tracking-widest text-coral font-bold text-xs mb-1.5 block">
              Program
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-5 tracking-tight">
              Curriculum
            </h3>
            <div className="space-y-0">
              {curriculumItems.map((item, i) => {
                const isLast = i === curriculumItems.length - 1;
                return (
                  <div key={item.title} className={`relative pl-12 ${isLast ? "" : "pb-8"}`}>
                    {!isLast && (
                      <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-coral/20 to-gray-100" />
                    )}
                    <div
                      className={`absolute left-0 top-0.5 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] z-10 ${
                        i === 0
                          ? "bg-gradient-to-br from-coral to-coral-hover text-white"
                          : "bg-white border border-gray-200 text-gray-400"
                      }`}
                    >
                      W{i + 1}
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Booking sidebar preview */}
        <div className="bg-white rounded-2xl shadow-[var(--shadow-soft)] border border-gray-100 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${values.priceAmount}
              </span>
              <span className="text-gray-400 text-sm"> / session</span>
            </div>
          </div>

          {values.nextDate && (
            <div className="mb-3">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Next Session
              </span>
              <p className="text-sm font-medium text-gray-700">{values.nextDate}</p>
            </div>
          )}

          {times.length > 0 && (
            <div className="mb-4">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Available Times
              </span>
              <div className="flex flex-wrap gap-2">
                {times.map((time, i) => (
                  <span
                    key={time}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-medium ${
                      i === 0
                        ? "border-coral bg-coral/5 text-coral"
                        : "border-gray-100 text-gray-600"
                    }`}
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Users size={14} />
            <span>Max {values.maxStudents} students</span>
          </div>

          <button className="w-full text-white py-3 rounded-xl font-bold text-sm bg-coral">
            Send Inquiry
          </button>
        </div>

        {/* Gallery thumbnails */}
        {values.gallery && values.gallery.length > 0 && values.gallery.some((g) => g.url) && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
              Gallery
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {values.gallery
                .filter((g) => g.url)
                .map((g, i) => (
                  <div key={g.url} className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                    <NextImage
                      src={g.url}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
