"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  SquaresFour,
  SoccerBall,
  MusicNote,
  PaintBrush,
  Code,
  Person,
  PuzzlePiece,
  CookingPot,
  SwimmingPool,
  MaskHappy,
  TennisBall,
  Camera,
  Flask,
  Barbell,
  Bicycle,
  Flower,
  BookOpen,
  Heartbeat,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface CategoryItem {
  id: string | null;
  label: string;
  icon: Icon;
}

const categoryItems: CategoryItem[] = [
  { id: null, label: "All", icon: SquaresFour },
  { id: "football", label: "Football", icon: SoccerBall },
  { id: "music", label: "Music", icon: MusicNote },
  { id: "art", label: "Art", icon: PaintBrush },
  { id: "coding", label: "Coding", icon: Code },
  { id: "yoga", label: "Yoga", icon: Person },
  { id: "chess", label: "Chess", icon: PuzzlePiece },
  { id: "cooking", label: "Cooking", icon: CookingPot },
  { id: "swimming", label: "Swimming", icon: SwimmingPool },
  { id: "drama", label: "Drama", icon: MaskHappy },
  { id: "tennis", label: "Tennis", icon: TennisBall },
  { id: "photo", label: "Photo", icon: Camera },
  { id: "science", label: "Science", icon: Flask },
  { id: "fitness", label: "Fitness", icon: Barbell },
  { id: "cycling", label: "Cycling", icon: Bicycle },
  { id: "gardening", label: "Gardening", icon: Flower },
  { id: "reading", label: "Reading", icon: BookOpen },
  { id: "wellness", label: "Wellness", icon: Heartbeat },
];

interface CategoryBarProps {
  activeCategory: string | null;
  onCategoryChange?: (category: string | null) => void;
  linkMode?: boolean;
  embedded?: boolean;
}

export function CategoryBar({ activeCategory, onCategoryChange, linkMode, embedded }: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className={embedded ? "border-t border-coral/[0.06] shadow-sm" : "bg-secondary border-b border-coral/[0.08] sticky top-16 z-40"}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Left fade + arrow */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center sm:left-2 lg:left-4">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary via-secondary to-transparent pointer-events-none" />
            <button
              onClick={() => scroll("left")}
              className="relative z-10 w-7 h-7 rounded-full bg-white/90 border border-coral/10 shadow-[var(--shadow-soft)] flex items-center justify-center text-gray-400 hover:text-coral hover:border-coral/25 hover:shadow-[var(--shadow-hover)] transition-all duration-200"
            >
              <CaretLeft size={13} weight="bold" />
            </button>
          </div>
        )}

        {/* Right fade + arrow */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center sm:right-2 lg:right-4">
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary via-secondary to-transparent pointer-events-none" />
            <button
              onClick={() => scroll("right")}
              className="relative z-10 w-7 h-7 rounded-full bg-white/90 border border-coral/10 shadow-[var(--shadow-soft)] flex items-center justify-center text-gray-400 hover:text-coral hover:border-coral/25 hover:shadow-[var(--shadow-hover)] transition-all duration-200"
            >
              <CaretRight size={13} weight="bold" />
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-auto no-scrollbar items-stretch pt-0.5 pb-0"
        >
          {categoryItems.map((cat) => {
            const isActive = cat.id === activeCategory;
            const IconComp = cat.icon;

            const content = (
              <div className="relative flex flex-col items-center gap-1 px-4 py-2 group/cat">
                {/* Icon container */}
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200",
                    isActive
                      ? "bg-coral/12 text-coral scale-105"
                      : "text-gray-700 group-hover/cat:text-coral group-hover/cat:bg-coral/[0.06] group-hover/cat:scale-110"
                  )}
                >
                  <IconComp
                    size={20}
                    weight={isActive ? "fill" : "regular"}
                    className="transition-all duration-200"
                  />
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-[11px] leading-tight whitespace-nowrap transition-colors duration-200",
                    isActive
                      ? "font-semibold text-coral"
                      : "font-medium text-gray-700 group-hover/cat:text-coral"
                  )}
                >
                  {cat.label}
                </span>

                {/* Active indicator bar */}
                <div
                  className={cn(
                    "absolute -bottom-px left-3 right-3 h-[2px] rounded-full transition-all duration-200",
                    isActive
                      ? "bg-coral opacity-100 scale-x-100"
                      : "bg-transparent opacity-0 scale-x-50 group-hover/cat:bg-coral/40 group-hover/cat:opacity-100 group-hover/cat:scale-x-100"
                  )}
                />
              </div>
            );

            if (linkMode) {
              return (
                <Link
                  key={cat.id ?? "all"}
                  href={cat.id ? `/${cat.id}` : "/"}
                  className="flex-shrink-0"
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={cat.id ?? "all"}
                onClick={() => onCategoryChange?.(cat.id)}
                className="flex-shrink-0"
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
