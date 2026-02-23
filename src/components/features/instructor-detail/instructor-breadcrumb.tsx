"use client";

import { ArrowLeft, CaretRight } from "@phosphor-icons/react";

export function InstructorBreadcrumb({
  name,
  onBack,
}: {
  name: string;
  onBack: () => void;
}) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <button
          onClick={onBack}
          className="hover:text-coral transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <CaretRight size={14} />
        <span className="text-gray-900 font-medium line-clamp-1">
          {name}
        </span>
      </nav>
    </div>
  );
}
