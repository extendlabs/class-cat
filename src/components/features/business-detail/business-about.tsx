"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import type { Business } from "@/types/business";

export function BusinessAbout({ business }: { business: Business }) {
  return (
    <AnimateIn delay={100} className="mt-16">
      <div>
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          Overview
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          About {business.name}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {business.description}
        </p>
      </div>
    </AnimateIn>
  );
}
