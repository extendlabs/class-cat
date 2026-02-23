"use client";

import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Phone,
  Envelope,
  Globe,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import { SidebarMap } from "@/components/features/sidebar-map";
import type { Business } from "@/types/business";

export function BusinessInfoSidebar({ business }: { business: Business }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = business.hours.find((h) => h.day === today);

  return (
    <div className="sticky top-20 space-y-6">
      {/* Business Info Card */}
      <div className="bg-white rounded-3xl shadow-[var(--shadow-float)] border border-gray-100 p-8">
        {/* Map */}
        <div className="mb-6">
          <SidebarMap
            lat={business.coordinates.lat}
            lng={business.coordinates.lng}
            address={business.address}
          />
        </div>

        {/* Hours */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-coral" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Operating Hours
            </span>
            {todayHours && !todayHours.closed && (
              <Badge className="ml-auto bg-green-50 text-green-600 border-green-200 text-[10px] font-bold">
                Open
              </Badge>
            )}
          </div>
          <div className="space-y-1.5">
            {business.hours.map((h) => (
              <div
                key={h.day}
                className={`flex items-center justify-between text-xs ${
                  h.day === today
                    ? "font-bold text-gray-900"
                    : "text-gray-500"
                }`}
              >
                <span>{h.day}</span>
                <span>
                  {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 space-y-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
            Contact
          </span>
          <a
            href={`tel:${business.contact.phone}`}
            className="flex items-center gap-3 text-sm text-gray-600 hover:text-coral transition-colors"
          >
            <Phone size={16} className="text-coral" />
            {business.contact.phone}
          </a>
          <a
            href={`mailto:${business.contact.email}`}
            className="flex items-center gap-3 text-sm text-gray-600 hover:text-coral transition-colors"
          >
            <Envelope size={16} className="text-coral" />
            {business.contact.email}
          </a>
          <a
            href={`https://${business.contact.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-gray-600 hover:text-coral transition-colors"
          >
            <Globe size={16} className="text-coral" />
            {business.contact.website}
          </a>
        </div>

        {/* Social */}
        {(business.social.instagram || business.social.facebook) && (
          <div className="border-t border-gray-100 pt-5 mt-5 flex items-center gap-4">
            {business.social.instagram && (
              <a
                href={`https://instagram.com/${business.social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-coral transition-colors"
              >
                <InstagramLogo size={18} />
                {business.social.instagram}
              </a>
            )}
            {business.social.facebook && (
              <a
                href={`https://facebook.com/${business.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-coral transition-colors"
              >
                <FacebookLogo size={18} />
                {business.social.facebook}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Verified Badge */}
    </div>
  );
}
