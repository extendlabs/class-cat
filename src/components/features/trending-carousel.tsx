"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";
import type { TrendingClass } from "@/api/mock-data";

interface TrendingCarouselProps {
  classes: TrendingClass[];
}

export function TrendingCarousel({ classes }: TrendingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Trending Classes
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Popular classes your community is loving right now
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-coral transition-colors"
          >
            <CaretLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-coral transition-colors"
          >
            <CaretRight size={18} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto pb-6 -mx-4 px-4 no-scrollbar" ref={scrollRef}>
        <div className="flex gap-5 w-max">
          {classes.map((item) => (
            <Link
              key={item.id}
              href={`/activity/${item.id}`}
              className="w-[260px] bg-white rounded-[20px] overflow-hidden shadow-[var(--shadow-soft)] border border-gray-100 group hover:shadow-[var(--shadow-hover)] transition-all duration-300 block"
            >
              <div className="h-40 relative overflow-hidden">

                <Image
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 80vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  src={item.image}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star size={12} weight="fill" className="text-coral" />
                    <span className="text-xs font-bold text-gray-900">
                      {item.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-block px-2 py-0.5 bg-coral/10 rounded text-xs font-bold text-coral">
                    {item.ageRange}
                  </span>
                  <span className="font-bold text-gray-900">
                    ${item.price}
                    <span className="text-xs font-normal text-gray-400">/class</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
