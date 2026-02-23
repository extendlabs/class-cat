"use client";

import { CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditButton } from "@/components/features/edit-button";
import type { ProfileState, ProfileAction, InstructorData } from "@/types/instructor-profile";

export function InstructorBioSection({
  instructor,
  state,
  dispatch,
}: {
  instructor: InstructorData;
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}) {
  const firstName = instructor.name.split(" ").pop();
  const bioPreview = instructor.bio.slice(0, 200);
  const showReadMore = instructor.bio.length > 200;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="uppercase tracking-widest text-coral font-bold text-xs">Overview</span>
        {!state.editingBio && <EditButton onClick={() => dispatch({ type: "SET_EDITING_BIO", editing: true, value: instructor.bio })} />}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
        About {firstName}
      </h3>

      {state.editingBio ? (
        <div className="space-y-3">
          <Textarea
            value={state.bioValue}
            onChange={(e) => dispatch({ type: "SET_BIO_VALUE", value: e.target.value })}
            rows={6}
            className="resize-none text-gray-600 leading-relaxed"
          />
          <div className="flex gap-2">
            <Button size="sm" className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={() => dispatch({ type: "SET_EDITING_BIO", editing: false })}>Save</Button>
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => dispatch({ type: "SET_EDITING_BIO", editing: false, value: instructor.bio })}>Cancel</Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 leading-relaxed mb-2">
            {state.bioExpanded ? instructor.bio : bioPreview}
            {showReadMore && !state.bioExpanded && "..."}
          </p>
          {showReadMore && (
            <button
              onClick={() => dispatch({ type: "TOGGLE_BIO_EXPANDED" })}
              className="text-sm font-bold text-coral hover:text-coral-hover transition-colors flex items-center gap-1"
            >
              {state.bioExpanded ? "Show less" : "Read more"}
              <CaretDown size={14} className={`transition-transform ${state.bioExpanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
