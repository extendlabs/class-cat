"use client";

import { Envelope, ShieldCheck } from "@phosphor-icons/react";
import { BRAND_ACCENT } from "@/lib/constants";
import { InstructorQuickInfo } from "./instructor-quick-info";

const ACCENT = BRAND_ACCENT;

export function InstructorContactSidebar({
  firstName,
  verified,
  languages,
}: {
  firstName: string | undefined;
  verified: boolean;
  languages: string[];
}) {
  return (
    <div className="sticky top-20 space-y-6">
      {/* Contact Card */}
      <div className="bg-white rounded-3xl shadow-[var(--shadow-float)] border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-coral to-coral-hover rounded-xl flex items-center justify-center text-white shadow-sm">
            <Envelope size={18} weight="fill" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Get in Touch</h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
              <span className="text-[10px] font-bold uppercase text-coral tracking-wide">
                Quick Response
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Reach out to {firstName} about classes, availability, or any
          questions you might have.
        </p>

        <button
          className="w-full text-white py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-4 bg-coral hover:bg-coral-hover"
          style={{
            boxShadow: `0 10px 25px -5px ${ACCENT}33`,
          }}
        >
          <Envelope size={18} weight="bold" className="inline mr-2 -mt-0.5" />
          Message Instructor
        </button>

        <p className="text-center text-[12px] text-gray-400 leading-relaxed italic">
          Typically responds within 2 hours
        </p>
      </div>

      {/* Quick Info */}
      <InstructorQuickInfo languages={languages} />

      {/* Verified Badge */}
      {verified && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[var(--shadow-soft)]">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-coral to-coral-hover rounded-xl flex items-center justify-center shadow-sm">
              <ShieldCheck
                size={20}
                weight="fill"
                className="text-white"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">
                ClassCat Verified
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Identity and credentials verified for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
