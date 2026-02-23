import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
} from "@phosphor-icons/react";
import type { ActivityDetail } from "@/types/activity";

export function ActivityHeader({ activity }: { activity: ActivityDetail }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {activity.badges.map((badge) => (
          <Badge
            key={badge}
            variant="secondary"
            className="bg-coral/10 text-coral border-coral/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          >
            {badge.includes("Verified") && (
              <ShieldCheck size={14} weight="bold" className="mr-1" />
            )}
            {badge.includes("Group") && (
              <Users size={14} className="mr-1" />
            )}
            {badge}
          </Badge>
        ))}
        <span className="text-coral text-sm">&bull;</span>
        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
          <MapPin size={14} className="text-coral" /> {activity.location}
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
        {activity.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
          <Star size={16} weight="fill" className="text-coral" />
          <span className="font-bold text-gray-900 text-sm">
            {activity.rating}
          </span>
          <span className="text-gray-400 text-sm">
            ({activity.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm text-gray-700">
          <Users size={14} className="text-gray-700" />
          <span className="font-medium">{activity.ageRange}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm text-gray-700">
          <Clock size={14} className="text-gray-700" />
          <span className="font-medium">{activity.duration}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full text-sm text-gray-700">
          <Users size={14} className="text-gray-700" />
          <span className="font-medium">{activity.classType}</span>
        </div>
      </div>
    </div>
  );
}
