import { Globe, ChatCircle, MapPin } from "@phosphor-icons/react";

export function InstructorQuickInfo({ languages }: { languages: string[] }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)] p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider px-1">
        Quick Info
      </h3>
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary">
        <div className="w-9 h-9 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
          <Globe size={16} className="text-coral" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Languages</p>
          <p className="text-sm font-medium text-gray-900">
            {languages.join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary">
        <div className="w-9 h-9 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
          <ChatCircle size={16} className="text-coral" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Response Time</p>
          <p className="text-sm font-medium text-gray-900">
            Within 2 hours
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary">
        <div className="w-9 h-9 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
          <MapPin size={16} className="text-coral" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
          <p className="text-sm font-medium text-gray-900">
            Krakow, Polska
          </p>
        </div>
      </div>
    </div>
  );
}
