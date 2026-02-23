"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import Image from "next/image";
import Link from "next/link";

export function BusinessCtaBand({ businessName }: { businessName: string }) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <AnimateIn delay={100}>
        <section className="relative rounded-[32px] p-10 md:p-14 overflow-hidden bg-secondary">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-coral/[0.12] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-coral/[0.08] rounded-full blur-3xl" />

          {/* Cat mascot */}
          <div className="hidden md:block absolute right-10 lg:right-14 top-1/2 -translate-y-1/2 z-0">
            <div className="relative w-56 h-56 lg:w-64 lg:h-64 drop-shadow-xl">
              <Image
                src="/chess-cat.png"
                alt="ClassCat chess mascot"
                fill
                className="object-contain"
                sizes="256px"
              />
            </div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              Ready to start your journey?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
              Discover classes at {businessName} and find the perfect activity
              for your schedule. Join thousands of learners exploring new passions every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/?tab=all"
                className="bg-coral hover:bg-coral-hover text-white px-10 py-4 rounded-full font-bold shadow-sm shadow-coral/20 transition-all hover:-translate-y-0.5 text-center"
              >
                Explore Classes
              </Link>
              <Link
                href="/business"
                className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-full font-bold shadow-[var(--shadow-soft)] border border-gray-200 transition-all hover:-translate-y-0.5 text-center"
              >
                Teach a Class
              </Link>
            </div>
          </div>
        </section>
      </AnimateIn>
    </div>
  );
}
