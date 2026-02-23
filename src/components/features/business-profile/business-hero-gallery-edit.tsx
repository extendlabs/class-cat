"use client";

import Image from "next/image";
import { GridFour, Images } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import type { ManagedPhoto } from "@/types/business-profile";

export function BusinessHeroGallery({
  coverPhoto,
  galleryPhotos,
  onOpenGallery,
  onOpenPhotoManager,
}: {
  coverPhoto: ManagedPhoto | undefined;
  galleryPhotos: ManagedPhoto[];
  onOpenGallery: (index: number) => void;
  onOpenPhotoManager: () => void;
}) {
  return (
    <AnimateIn direction="none">
      <section className="relative grid grid-cols-4 grid-rows-2 gap-3 h-[220px] sm:h-[280px] lg:h-[360px] rounded-3xl overflow-hidden shadow-[var(--shadow-float)]">
        {/* Cover image */}
        {coverPhoto && (
          <div
            className="col-span-4 sm:col-span-2 row-span-2 relative group overflow-hidden cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => onOpenGallery(0)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenGallery(0); } }}
          >
            <Image
              src={coverPhoto.src}
              alt={coverPhoto.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/10 transition-colors" />
          </div>
        )}

        {/* Gallery thumbs */}
        {galleryPhotos.slice(0, 3).map((img, i) => (
          <div
            key={img.id}
            className="hidden sm:block col-span-1 row-span-1 relative group overflow-hidden cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => onOpenGallery(i + 1)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenGallery(i + 1); } }}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
          </div>
        ))}

        {/* Last cell with show-all */}
        <div className="hidden sm:block col-span-1 row-span-1 relative group overflow-hidden">
          {galleryPhotos[3] && (
            <Image
              src={galleryPhotos[3].src}
              alt={galleryPhotos[3].alt}
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

        {/* Single Edit Photos button */}
        <button
          onClick={(e) => { e.stopPropagation(); onOpenPhotoManager(); }}
          className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 hover:bg-white hover:scale-105 hover:shadow-xl transition-all text-gray-700 hover:text-coral border border-white/50"
        >
          <Images size={16} weight="bold" /> Edit Photos
        </button>
      </section>
    </AnimateIn>
  );
}
