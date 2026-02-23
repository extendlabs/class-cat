"use client";

import { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoCarouselModalProps {
  images: CarouselImage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startIndex?: number;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function PhotoCarouselModal({
  images,
  open,
  onOpenChange,
  currentIndex,
  onIndexChange,
}: PhotoCarouselModalProps) {
  const count = images.length;

  const goPrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + count) % count);
  }, [currentIndex, count, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % count);
  }, [currentIndex, count, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, goPrev, goNext]);

  if (count === 0) return null;

  const current = images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/90" />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Hidden accessible title */}
          <DialogTitle className="sr-only">Photo gallery</DialogTitle>

          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Index indicator */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-white/80 text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full">
            {currentIndex + 1} / {count}
          </div>

          {/* Prev arrow */}
          <button
            onClick={goPrev}
            className="absolute left-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <CaretLeft size={24} weight="bold" />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-5xl mx-16 aspect-[16/10]">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            className="absolute right-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <CaretRight size={24} weight="bold" />
          </button>

          {/* Caption */}
          {current.caption && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-5 py-2 rounded-full max-w-md text-center">
              {current.caption}
            </div>
          )}
        </div>
      </DialogPortal>
    </Dialog>
  );
}
