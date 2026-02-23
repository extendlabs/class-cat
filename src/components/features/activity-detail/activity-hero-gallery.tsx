"use client";

import { ShareNetwork, Heart, GridFour } from "@phosphor-icons/react";
import type { ActivityDetail } from "@/types/activity";
import { AnimateIn } from "@/components/ui/animate-in";
import Image from "next/image";

export function ActivityHeroGallery({
  activity,
  onOpenGallery,
  onShare,
  onToggleLike,
  liked,
}: {
  activity: ActivityDetail;
  onOpenGallery: (index: number) => void;
  onShare: () => void;
  onToggleLike: () => void;
  liked: boolean;
}) {
  return (
    <AnimateIn direction="none" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <section className="grid grid-cols-4 grid-rows-2 gap-3 h-[220px] sm:h-[280px] lg:h-[360px] rounded-3xl overflow-hidden shadow-[var(--shadow-float)]">
        <div
          className="col-span-4 sm:col-span-2 row-span-2 relative group overflow-hidden cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => onOpenGallery(0)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenGallery(0); } }}
        >
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/10 transition-colors" />
          {/* Top bar */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-sm"
            >
              <ShareNetwork size={18} className="text-gray-700" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike();
              }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-sm"
            >
              <Heart
                size={18}
                weight={liked ? "fill" : "regular"}
                className={liked ? "text-coral" : "text-gray-700"}
              />
            </button>
          </div>
        </div>
        {activity.gallery.slice(0, 3).map((img, i) => (
          <button
            type="button"
            key={img.src}
            className="hidden sm:block col-span-1 row-span-1 relative group overflow-hidden cursor-pointer text-left"
            onClick={() => onOpenGallery(i + 1)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="25vw"
            />
          </button>
        ))}
        <div className="hidden sm:block col-span-1 row-span-1 relative group overflow-hidden">
          {activity.gallery[3] && (
            <Image
              src={activity.gallery[3].src}
              alt={activity.gallery[3].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
              sizes="25vw"
              onClick={() => onOpenGallery(4)}
            />
          )}
          <button
            onClick={() => onOpenGallery(0)}
            className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2 hover:bg-gray-50 hover:scale-105 transition-all"
          >
            <GridFour size={16} /> Show all photos
          </button>
        </div>
      </section>
    </AnimateIn>
  );
}
