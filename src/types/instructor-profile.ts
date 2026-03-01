import type { Achievement } from "@/types/instructor";
import type { InstructorAffiliation } from "@/types/affiliation";

export interface ProfileState {
  editingName: boolean;
  editingTitle: boolean;
  editingBio: boolean;
  nameValue: string;
  titleValue: string;
  bioValue: string;
  bioExpanded: boolean;
  editingSpecialties: boolean;
  specialties: string[] | null;
  newSpecialty: string;
  editingCerts: boolean;
  certifications: string[] | null;
  newCert: string;
  editingLangs: boolean;
  languages: string[] | null;
  newLang: string;
  editingSocial: boolean;
  socialValues: { instagram: string; youtube: string; website: string };
  achievements: Achievement[] | null;
  achievementDialogOpen: boolean;
  editingAchievementIdx: number | null;
  achievementForm: { icon: string; title: string; description: string };
  editingResponseTime: boolean;
  responseTime: string;
  editingLocation: boolean;
  locationValue: string;
  avatarPreview: string | null;
}

export type ProfileAction =
  | { type: "SET_EDITING_NAME"; editing: boolean; value?: string }
  | { type: "SET_NAME_VALUE"; value: string }
  | { type: "SET_EDITING_TITLE"; editing: boolean; value?: string }
  | { type: "SET_TITLE_VALUE"; value: string }
  | { type: "SET_EDITING_BIO"; editing: boolean; value?: string }
  | { type: "SET_BIO_VALUE"; value: string }
  | { type: "TOGGLE_BIO_EXPANDED" }
  | { type: "SET_EDITING_SPECIALTIES"; editing: boolean; specialties?: string[] }
  | { type: "SET_SPECIALTIES"; specialties: string[] }
  | { type: "SET_NEW_SPECIALTY"; value: string }
  | { type: "SET_EDITING_CERTS"; editing: boolean; certifications?: string[] }
  | { type: "SET_CERTIFICATIONS"; certifications: string[] }
  | { type: "SET_NEW_CERT"; value: string }
  | { type: "SET_EDITING_LANGS"; editing: boolean; languages?: string[] }
  | { type: "SET_LANGUAGES"; languages: string[] }
  | { type: "SET_NEW_LANG"; value: string }
  | { type: "SET_EDITING_SOCIAL"; editing: boolean; values?: { instagram: string; youtube: string; website: string } }
  | { type: "SET_SOCIAL_VALUES"; values: { instagram: string; youtube: string; website: string } }
  | { type: "SET_ACHIEVEMENTS"; achievements: Achievement[] }
  | { type: "OPEN_ACHIEVEMENT_DIALOG"; idx: number | null; form: { icon: string; title: string; description: string } }
  | { type: "CLOSE_ACHIEVEMENT_DIALOG" }
  | { type: "SET_ACHIEVEMENT_FORM"; form: { icon: string; title: string; description: string } }
  | { type: "SET_EDITING_RESPONSE_TIME"; editing: boolean }
  | { type: "SET_RESPONSE_TIME"; value: string }
  | { type: "SET_EDITING_LOCATION"; editing: boolean }
  | { type: "SET_LOCATION_VALUE"; value: string }
  | { type: "SET_AVATAR_PREVIEW"; url: string | null };

export interface InstructorData {
  name: string;
  avatar: string;
  verified: boolean;
  title: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  totalStudents: number;
  totalClasses: number;
  bio: string;
  specialties: string[];
  certifications: string[];
  languages: string[];
  achievements: Achievement[];
  social: { instagram?: string; youtube?: string; website?: string };
  affiliations?: InstructorAffiliation[];
}

import { Trophy, Users, Medal, BookOpen } from "@phosphor-icons/react";

export const ICON_OPTIONS = [
  { value: "trophy", label: "Trophy", Icon: Trophy },
  { value: "users", label: "Users", Icon: Users },
  { value: "medal", label: "Medal", Icon: Medal },
  { value: "book", label: "Book", Icon: BookOpen },
];
