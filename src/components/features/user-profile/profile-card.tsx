import Image from "next/image";
import {
  Envelope,
  Phone,
  MapPin,
  Clock,
  PencilSimple,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import type { UserProfile } from "@/types/user";

export function ProfileCard({
  profile,
  onEditProfile,
}: {
  profile: UserProfile;
  onEditProfile: () => void;
}) {
  return (
    <div className="space-y-5">
      <AnimateIn>
        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-coral/10 shrink-0">
              <Image
                src={profile.avatar ?? ""}
                alt={profile.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900">
                {profile.name}
              </h2>

              <div className="mt-3 space-y-1.5 text-sm text-gray-500">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Envelope size={14} className="text-gray-400" />
                  {profile.email}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Phone size={14} className="text-gray-400" />
                  {profile.phone}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <MapPin size={14} className="text-gray-400" />
                  {profile.location}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="mt-4 gap-1.5 rounded-full border-gray-200 hover:border-coral/30 hover:bg-coral/5 hover:text-coral transition-all"
                onClick={onEditProfile}
              >
                <PencilSimple size={14} />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Stats */}
      <AnimateIn delay={100}>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-5 text-center shadow-[var(--shadow-soft)] border border-gray-100/60">
            <p className="text-2xl font-bold text-coral">
              {profile.totalBookings}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Total Bookings
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-[var(--shadow-soft)] border border-gray-100/60">
            <div className="flex items-center justify-center gap-1.5 text-gray-400">
              <Clock size={16} />
            </div>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {new Date(profile.memberSince).toLocaleDateString(
                "en-US",
                { month: "short", year: "numeric" }
              )}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Member Since
            </p>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
