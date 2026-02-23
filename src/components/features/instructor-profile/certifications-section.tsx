"use client";

import { ShieldCheck, Plus, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProfileState, ProfileAction } from "@/types/instructor-profile";

export function CertificationsSection({
  currentCerts,
  state,
  dispatch,
}: {
  currentCerts: string[];
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-coral/8 rounded-xl flex items-center justify-center flex-shrink-0">
          <ShieldCheck size={20} className="text-coral" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-sm text-gray-900">Certifications</p>
            <button
              onClick={() => dispatch({ type: "SET_EDITING_CERTS", editing: !state.editingCerts, certifications: currentCerts })}
              className="text-[11px] font-bold text-coral hover:text-coral-hover transition-colors"
            >
              {state.editingCerts ? "Done" : "Edit"}
            </button>
          </div>
          <div className="space-y-1.5">
            {currentCerts.map((c) => (
              <div key={c} className="flex items-center justify-between group/cert-item">
                <span className="text-xs text-gray-600 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-coral flex-shrink-0" />
                  {c}
                </span>
                {state.editingCerts && (
                  <button
                    onClick={() => dispatch({ type: "SET_CERTIFICATIONS", certifications: currentCerts.filter((x) => x !== c) })}
                    className="w-4 h-4 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <X size={10} weight="bold" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {state.editingCerts && (
            <div className="flex items-center gap-2 mt-3">
              <Input
                value={state.newCert}
                onChange={(e) => dispatch({ type: "SET_NEW_CERT", value: e.target.value })}
                onKeyDown={(e) => { if (e.key === "Enter" && state.newCert.trim()) { dispatch({ type: "SET_CERTIFICATIONS", certifications: [...currentCerts, state.newCert.trim()] }); dispatch({ type: "SET_NEW_CERT", value: "" }); } }}
                placeholder="New certification..."
                className="h-8 text-xs rounded-lg flex-1 border-dashed"
              />
              <Button type="button" size="sm" className="h-8 rounded-lg bg-coral hover:bg-coral-hover text-white text-xs px-3 gap-1" onClick={() => { if (state.newCert.trim()) { dispatch({ type: "SET_CERTIFICATIONS", certifications: [...currentCerts, state.newCert.trim()] }); dispatch({ type: "SET_NEW_CERT", value: "" }); } }}>
                <Plus size={12} weight="bold" /> Add
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
