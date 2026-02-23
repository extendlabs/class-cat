"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Star, Users, MapPin } from "@phosphor-icons/react";
import { fetchInstructorProfile } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { AnimateIn } from "@/components/ui/animate-in";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_OPTIONS = ["all", "active", "upcoming", "completed"] as const;

export default function InstructorClassesPage() {
  const { user } = useAuth();
  const instructorId = user?.instructorId ?? "inst-6";
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: instructor, isLoading } = useQuery({
    queryKey: ["instructor-profile", instructorId],
    queryFn: () => fetchInstructorProfile(instructorId),
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const classes = instructor?.classes ?? [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Classes</h1>
        <p className="text-sm text-gray-500 mt-1">Activities assigned to you by your business.</p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all ${
              statusFilter === status
                ? "bg-coral text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-coral/30"
            }`}
          >
            {status === "all" ? `All (${classes.length})` : status}
          </button>
        ))}
      </div>

      {/* Classes grid */}
      <AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((activity) => (
            <div
              key={activity.id}
              className="rounded-2xl bg-white shadow-[var(--shadow-soft)] border border-gray-100/60 overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all group"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <Badge className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 border-0 text-[10px] font-bold uppercase tracking-wider">
                  {activity.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm truncate">{activity.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{activity.description}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star size={12} weight="fill" className="text-amber-400" />
                      {activity.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {activity.reviewCount} reviews
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} />
                    {activity.location}
                  </span>
                </div>
                {activity.spotsLeft !== undefined && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-[10px] bg-coral/10 text-coral border-0">
                      {activity.spotsLeft} spots left
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </AnimateIn>

      {classes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">No classes assigned yet.</p>
        </div>
      )}
    </div>
  );
}
