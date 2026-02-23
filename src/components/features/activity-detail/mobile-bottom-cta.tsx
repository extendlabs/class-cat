"use client";

import { BRAND_ACCENT } from "@/lib/constants";

const ACCENT = BRAND_ACCENT;

export function MobileBottomCta({ priceAmount }: { priceAmount?: number }) {
  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/60 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${priceAmount}
            </span>
            <span className="text-gray-400 text-sm"> / session</span>
          </div>
          <button
            className="text-white px-8 py-3 rounded-xl font-bold text-base transition-all active:scale-95 bg-coral hover:bg-coral-hover"
            style={{
              boxShadow: `0 10px 25px -5px ${ACCENT}33`,
            }}
          >
            Book Now
          </button>
        </div>
      </div>
      {/* Bottom spacer for mobile sticky CTA */}
      <div className="lg:hidden h-20" />
    </>
  );
}
