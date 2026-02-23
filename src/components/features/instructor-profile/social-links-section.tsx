"use client";

import {
  Globe,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton } from "@/components/features/edit-button";
import type { ProfileState, ProfileAction, InstructorData } from "@/types/instructor-profile";

export function SocialLinksSection({
  instructor,
  state,
  dispatch,
}: {
  instructor: InstructorData;
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)] p-6 group/social">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider px-1">
          Social & Links
        </h3>
        <EditButton onClick={() => dispatch({ type: "SET_EDITING_SOCIAL", editing: !state.editingSocial, values: { instagram: instructor.social.instagram ?? "", youtube: instructor.social.youtube ?? "", website: instructor.social.website ?? "" } })} className="opacity-0 group-hover/social:opacity-100" />
      </div>

      {state.editingSocial ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <InstagramLogo size={16} className="text-gray-400 flex-shrink-0" />
            <Input value={state.socialValues.instagram} onChange={(e) => dispatch({ type: "SET_SOCIAL_VALUES", values: { ...state.socialValues, instagram: e.target.value } })} placeholder="Instagram URL" className="h-9 text-sm rounded-xl" />
          </div>
          <div className="flex items-center gap-3">
            <YoutubeLogo size={16} className="text-gray-400 flex-shrink-0" />
            <Input value={state.socialValues.youtube} onChange={(e) => dispatch({ type: "SET_SOCIAL_VALUES", values: { ...state.socialValues, youtube: e.target.value } })} placeholder="YouTube URL" className="h-9 text-sm rounded-xl" />
          </div>
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-gray-400 flex-shrink-0" />
            <Input value={state.socialValues.website} onChange={(e) => dispatch({ type: "SET_SOCIAL_VALUES", values: { ...state.socialValues, website: e.target.value } })} placeholder="Website URL" className="h-9 text-sm rounded-xl" />
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm" className="rounded-full bg-coral hover:bg-coral-hover text-white" onClick={() => dispatch({ type: "SET_EDITING_SOCIAL", editing: false })}>Save</Button>
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => dispatch({ type: "SET_EDITING_SOCIAL", editing: false })}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {instructor.social.instagram && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary text-sm text-gray-600">
              <InstagramLogo size={16} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{instructor.social.instagram}</span>
            </div>
          )}
          {instructor.social.youtube && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary text-sm text-gray-600">
              <YoutubeLogo size={16} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{instructor.social.youtube}</span>
            </div>
          )}
          {instructor.social.website && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary text-sm text-gray-600">
              <Globe size={16} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{instructor.social.website}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
