"use client";

import {
  Globe,
  ChatCircle,
  MapPin,
  Plus,
  X,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton } from "@/components/features/edit-button";
import type { ProfileState, ProfileAction, InstructorData } from "@/types/instructor-profile";

export function QuickInfoSidebar({
  instructor,
  state,
  dispatch,
}: {
  instructor: InstructorData;
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}) {
  const currentLangs = state.languages ?? instructor.languages;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)] p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider px-1">
        Quick Info
      </h3>

      {/* Languages */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary group/lang">
        <div className="w-9 h-9 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
          <Globe size={16} className="text-coral" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Languages</p>
          {state.editingLangs ? (
            <div className="mt-1 space-y-1.5">
              <div className="flex flex-wrap gap-1">
                {currentLangs.map((l) => (
                  <span key={l} className="text-xs bg-white px-2 py-0.5 rounded-full font-medium text-gray-700 flex items-center gap-1 border border-gray-200">
                    {l}
                    <button onClick={() => dispatch({ type: "SET_LANGUAGES", languages: currentLangs.filter((x) => x !== l) })} className="hover:text-red-500">
                      <X size={8} weight="bold" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Input value={state.newLang} onChange={(e) => dispatch({ type: "SET_NEW_LANG", value: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter" && state.newLang.trim()) { dispatch({ type: "SET_LANGUAGES", languages: [...currentLangs, state.newLang.trim()] }); dispatch({ type: "SET_NEW_LANG", value: "" }); } }} placeholder="Add..." className="h-6 text-[11px] rounded-full flex-1" />
                <Button type="button" size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-full text-coral hover:bg-coral/10" onClick={() => { if (state.newLang.trim()) { dispatch({ type: "SET_LANGUAGES", languages: [...currentLangs, state.newLang.trim()] }); dispatch({ type: "SET_NEW_LANG", value: "" }); } }}>
                  <Plus size={10} weight="bold" />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-gray-900">{currentLangs.join(", ")}</p>
          )}
        </div>
        <EditButton onClick={() => dispatch({ type: "SET_EDITING_LANGS", editing: !state.editingLangs, languages: currentLangs })} className="opacity-0 group-hover/lang:opacity-100" />
      </div>

      {/* Response Time -- editable */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary group/resp">
        <div className="w-9 h-9 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
          <ChatCircle size={16} className="text-coral" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Response Time</p>
          {state.editingResponseTime ? (
            <input
              value={state.responseTime}
              onChange={(e) => dispatch({ type: "SET_RESPONSE_TIME", value: e.target.value })}
              onKeyDown={(e) => { if (e.key === "Enter") dispatch({ type: "SET_EDITING_RESPONSE_TIME", editing: false }); if (e.key === "Escape") dispatch({ type: "SET_EDITING_RESPONSE_TIME", editing: false }); }}
              onBlur={() => dispatch({ type: "SET_EDITING_RESPONSE_TIME", editing: false })}
              className="text-sm font-medium text-gray-900 bg-transparent border-b border-coral outline-none w-full mt-0.5"
            />
          ) : (
            <p className="text-sm font-medium text-gray-900">{state.responseTime}</p>
          )}
        </div>
        <EditButton onClick={() => dispatch({ type: "SET_EDITING_RESPONSE_TIME", editing: true })} className="opacity-0 group-hover/resp:opacity-100" />
      </div>

      {/* Location -- editable */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary group/loc">
        <div className="w-9 h-9 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
          <MapPin size={16} className="text-coral" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
          {state.editingLocation ? (
            <input
              value={state.locationValue}
              onChange={(e) => dispatch({ type: "SET_LOCATION_VALUE", value: e.target.value })}
              onKeyDown={(e) => { if (e.key === "Enter") dispatch({ type: "SET_EDITING_LOCATION", editing: false }); if (e.key === "Escape") dispatch({ type: "SET_EDITING_LOCATION", editing: false }); }}
              onBlur={() => dispatch({ type: "SET_EDITING_LOCATION", editing: false })}
              className="text-sm font-medium text-gray-900 bg-transparent border-b border-coral outline-none w-full mt-0.5"
            />
          ) : (
            <p className="text-sm font-medium text-gray-900">{state.locationValue}</p>
          )}
        </div>
        <EditButton onClick={() => dispatch({ type: "SET_EDITING_LOCATION", editing: true })} className="opacity-0 group-hover/loc:opacity-100" />
      </div>
    </div>
  );
}
