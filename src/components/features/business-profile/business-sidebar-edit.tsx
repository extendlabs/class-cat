"use client";

import {
  PencilSimple,
  MapPin,
  Phone,
  Envelope,
  Globe,
  InstagramLogo,
  FacebookLogo,
  Clock,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { SidebarMap } from "@/components/features/sidebar-map";
import type { BusinessLocation } from "@/types/business";
import type { BusinessPageAction, BusinessData } from "@/types/business-profile";

function EditButton({
  onClick,
  className = "",
  size = "md",
}: {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        size === "sm" ? "w-7 h-7" : "w-8 h-8"
      } bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-coral hover:text-white transition-all duration-200 border border-gray-100 hover:border-coral text-gray-400 hover:scale-110 active:scale-95 ${className}`}
    >
      <PencilSimple size={size === "sm" ? 12 : 14} weight="bold" />
    </button>
  );
}

function BusinessHoursTable({
  business,
  today,
  onEditHours,
}: {
  business: BusinessData;
  today: string;
  onEditHours: () => void;
}) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-coral" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Operating Hours
          </span>
        </div>
        <EditButton onClick={onEditHours} size="sm" />
      </div>
      <div className="space-y-1.5">
        {business.hours.map((h) => (
          <div
            key={h.day}
            className={`flex items-center justify-between text-xs ${
              h.day === today ? "font-bold text-gray-900" : "text-gray-500"
            }`}
          >
            <span>{h.day}</span>
            <span>{h.closed ? "Closed" : `${h.open} – ${h.close}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessContactSection({
  business,
  onEditContact,
}: {
  business: BusinessData;
  onEditContact: () => void;
}) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Contact
        </span>
        <EditButton onClick={onEditContact} size="sm" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone size={16} className="text-coral flex-shrink-0" />
          <span>{business.contact.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Envelope size={16} className="text-coral flex-shrink-0" />
          <span>{business.contact.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Globe size={16} className="text-coral flex-shrink-0" />
          <span>{business.contact.website}</span>
        </div>
      </div>
      {(business.social.instagram || business.social.facebook) && (
        <div className="flex flex-col gap-2.5 mt-4 pt-4 border-t border-gray-100">
          {business.social.instagram && (
            <span className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
              <InstagramLogo size={16} className="flex-shrink-0" />
              <span className="truncate">{business.social.instagram}</span>
            </span>
          )}
          {business.social.facebook && (
            <span className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
              <FacebookLogo size={16} className="flex-shrink-0" />
              <span className="truncate">{business.social.facebook}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function BusinessSidebar({
  business,
  currentLocations,
  activeLocationId,
  mapLat,
  mapLng,
  mapAddress,
  today,
  dispatch,
}: {
  business: BusinessData;
  currentLocations: BusinessLocation[];
  activeLocationId: string | null;
  mapLat: number;
  mapLng: number;
  mapAddress: string;
  today: string;
  dispatch: React.Dispatch<BusinessPageAction>;
}) {
  return (
    <div className="sticky top-4 space-y-6">
      <div className="bg-white rounded-3xl shadow-[var(--shadow-float)] border border-gray-100 p-6">
        {/* Location tabs */}
        {currentLocations.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Locations
              </span>
              <button
                onClick={() => dispatch({ type: "OPEN_ADD_LOCATION", payload: business.coordinates })}
                className="text-xs font-bold text-coral hover:text-coral-hover transition-colors flex items-center gap-1"
              >
                <Plus size={12} weight="bold" /> Add
              </button>
            </div>
            <div className="space-y-1.5">
              {currentLocations.map((loc) => (
                <div
                  key={loc.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm cursor-pointer transition-all group/loc ${
                    (activeLocationId ?? currentLocations[0]?.id) === loc.id
                      ? "bg-coral/10 text-coral font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() => dispatch({ type: "SET_ACTIVE_LOCATION_ID", payload: loc.id })}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dispatch({ type: "SET_ACTIVE_LOCATION_ID", payload: loc.id }); } }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin size={14} className="flex-shrink-0" />
                    <span className="truncate">{loc.name}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover/loc:opacity-100 transition-all duration-200">
                    <button
                      onClick={(e) => { e.stopPropagation(); dispatch({ type: "OPEN_EDIT_LOCATION", payload: loc }); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-coral/10 hover:text-coral transition-all duration-200 hover:scale-110"
                    >
                      <PencilSimple size={11} weight="bold" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); dispatch({ type: "SET_DELETE_LOCATION_ID", payload: loc.id }); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 hover:scale-110"
                    >
                      <Trash size={11} weight="bold" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <SidebarMap lat={mapLat} lng={mapLng} address={mapAddress} />

        {/* Hours */}
        <BusinessHoursTable
          business={business}
          today={today}
          onEditHours={() => {
            dispatch({ type: "SET_EDITING_HOURS", payload: business.hours.map((h) => ({ ...h })) });
            dispatch({ type: "SET_EDIT_SECTION", payload: "hours" });
          }}
        />

        {/* Contact & Social */}
        <BusinessContactSection
          business={business}
          onEditContact={() => dispatch({ type: "SET_EDIT_SECTION", payload: "contact" })}
        />
      </div>
    </div>
  );
}
