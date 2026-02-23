"use client";

import { Sparkle, Plus, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProfileState, ProfileAction } from "@/types/instructor-profile";

export function SpecialtiesSection({
  currentSpecialties,
  state,
  dispatch,
}: {
  currentSpecialties: string[];
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkle size={20} weight="fill" className="text-coral" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-sm text-gray-900">Specialties</p>
            <button
              onClick={() => dispatch({ type: "SET_EDITING_SPECIALTIES", editing: !state.editingSpecialties, specialties: currentSpecialties })}
              className="text-[11px] font-bold text-coral hover:text-coral-hover transition-colors"
            >
              {state.editingSpecialties ? "Done" : "Edit"}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentSpecialties.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 text-[11px] font-medium bg-coral/8 text-coral px-2.5 py-1 rounded-lg"
              >
                {s}
                {state.editingSpecialties && (
                  <button
                    onClick={() => dispatch({ type: "SET_SPECIALTIES", specialties: currentSpecialties.filter((x) => x !== s) })}
                    className="w-3.5 h-3.5 rounded-full bg-coral/20 hover:bg-coral/40 flex items-center justify-center transition-colors"
                  >
                    <X size={8} weight="bold" />
                  </button>
                )}
              </span>
            ))}
          </div>
          {state.editingSpecialties && (
            <div className="flex items-center gap-2 mt-3">
              <Input
                value={state.newSpecialty}
                onChange={(e) => dispatch({ type: "SET_NEW_SPECIALTY", value: e.target.value })}
                onKeyDown={(e) => { if (e.key === "Enter" && state.newSpecialty.trim()) { dispatch({ type: "SET_SPECIALTIES", specialties: [...currentSpecialties, state.newSpecialty.trim()] }); dispatch({ type: "SET_NEW_SPECIALTY", value: "" }); } }}
                placeholder="New specialty..."
                className="h-8 text-xs rounded-lg flex-1 border-dashed"
              />
              <Button type="button" size="sm" className="h-8 rounded-lg bg-coral hover:bg-coral-hover text-white text-xs px-3 gap-1" onClick={() => { if (state.newSpecialty.trim()) { dispatch({ type: "SET_SPECIALTIES", specialties: [...currentSpecialties, state.newSpecialty.trim()] }); dispatch({ type: "SET_NEW_SPECIALTY", value: "" }); } }}>
                <Plus size={12} weight="bold" /> Add
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
