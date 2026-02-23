"use client";

import { Badge } from "@/components/ui/badge";
import { Buildings, MapPin, ShieldCheck } from "@phosphor-icons/react";
import { BusinessStats } from "./business-stats";
import type { Business } from "@/types/business";
import Image from "next/image";

export function BusinessHeader({ business }: { business: Business }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge
          variant="secondary"
          className="bg-coral/10 text-coral border-coral/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
        >
          <Buildings size={14} weight="bold" className="mr-1" />
          {business.category}
        </Badge>
        {business.verified && (
          <Badge
            variant="secondary"
            className="bg-green-50 text-green-600 border-green-200 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          >
            <ShieldCheck size={14} weight="fill" className="mr-1" />
            Verified
          </Badge>
        )}
        <span className="text-coral text-sm">&bull;</span>
        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
          <MapPin size={14} className="text-coral" /> {business.address}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
        {/* Logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-[var(--shadow-soft)] bg-white flex-shrink-0">
          <Image
            src={business.logo}
            alt={`${business.name} logo`}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">
            {business.name}
          </h1>
          <p className="text-gray-500 text-base">{business.tagline}</p>
        </div>
      </div>

      <BusinessStats business={business} />
    </div>
  );
}
