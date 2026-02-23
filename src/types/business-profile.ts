import type { Instructor } from "@/types/activity";
import type { BusinessLocation } from "@/types/business";
import type { UserProfile } from "@/types/user";

export type EditSection = "hours" | "contact" | null;

export interface ManagedPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface InstructorFormData {
  name: string;
  specialty: string;
  avatar: string;
  email: string;
  createAccount: boolean;
}

export interface LocationFormData {
  name: string;
  address: string;
}

export interface BusinessPageState {
  editSection: EditSection;
  photoManagerOpen: boolean;
  managedPhotos: ManagedPhoto[] | null;
  logoPreview: string | null;
  dragIdx: number | null;
  dragOverIdx: number | null;
  editingName: boolean;
  editingTagline: boolean;
  editingAbout: boolean;
  nameValue: string;
  taglineValue: string;
  aboutValue: string;
  categories: string[] | null;
  categoryInputOpen: boolean;
  galleryOpen: boolean;
  galleryIndex: number;
  activeCategory: string;
  instructors: Instructor[] | null;
  instructorDialogOpen: boolean;
  editingInstructor: Instructor | null;
  instructorForm: InstructorFormData;
  deleteInstructorId: string | null;
  dialogStep: "email" | "found" | "not-found" | "edit";
  lookupEmail: string;
  lookupResult: UserProfile | null;
  lookupLoading: boolean;
  locations: BusinessLocation[] | null;
  locationDialogOpen: boolean;
  editingLocation: BusinessLocation | null;
  locationForm: LocationFormData;
  locationCoords: { lat: number; lng: number };
  activeLocationId: string | null;
  deleteLocationId: string | null;
  editingHours: { day: string; open: string; close: string; closed?: boolean }[] | null;
  accountToast: string | null;
}

export type BusinessPageAction =
  | { type: "SET_EDIT_SECTION"; payload: EditSection }
  | { type: "SET_PHOTO_MANAGER_OPEN"; payload: boolean }
  | { type: "SET_MANAGED_PHOTOS"; payload: ManagedPhoto[] | null }
  | { type: "SET_LOGO_PREVIEW"; payload: string | null }
  | { type: "SET_DRAG"; payload: { dragIdx: number | null; dragOverIdx: number | null } }
  | { type: "SET_EDITING_NAME"; payload: boolean }
  | { type: "SET_EDITING_TAGLINE"; payload: boolean }
  | { type: "SET_EDITING_ABOUT"; payload: boolean }
  | { type: "SET_NAME_VALUE"; payload: string }
  | { type: "SET_TAGLINE_VALUE"; payload: string }
  | { type: "SET_ABOUT_VALUE"; payload: string }
  | { type: "SET_CATEGORIES"; payload: string[] | null }
  | { type: "SET_CATEGORY_INPUT_OPEN"; payload: boolean }
  | { type: "OPEN_GALLERY"; payload: number }
  | { type: "SET_GALLERY_OPEN"; payload: boolean }
  | { type: "SET_GALLERY_INDEX"; payload: number }
  | { type: "SET_ACTIVE_CATEGORY"; payload: string }
  | { type: "SET_INSTRUCTORS"; payload: Instructor[] | null }
  | { type: "SET_INSTRUCTOR_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_EDITING_INSTRUCTOR"; payload: Instructor | null }
  | { type: "SET_INSTRUCTOR_FORM"; payload: InstructorFormData }
  | { type: "UPDATE_INSTRUCTOR_FORM"; payload: Partial<InstructorFormData> }
  | { type: "SET_DELETE_INSTRUCTOR_ID"; payload: string | null }
  | { type: "SET_DIALOG_STEP"; payload: "email" | "found" | "not-found" | "edit" }
  | { type: "SET_LOOKUP_EMAIL"; payload: string }
  | { type: "SET_LOOKUP_RESULT"; payload: UserProfile | null }
  | { type: "SET_LOOKUP_LOADING"; payload: boolean }
  | { type: "SET_LOCATIONS"; payload: BusinessLocation[] | null }
  | { type: "SET_LOCATION_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_EDITING_LOCATION"; payload: BusinessLocation | null }
  | { type: "SET_LOCATION_FORM"; payload: LocationFormData }
  | { type: "UPDATE_LOCATION_FORM"; payload: Partial<LocationFormData> }
  | { type: "SET_LOCATION_COORDS"; payload: { lat: number; lng: number } }
  | { type: "SET_ACTIVE_LOCATION_ID"; payload: string | null }
  | { type: "SET_DELETE_LOCATION_ID"; payload: string | null }
  | { type: "SET_EDITING_HOURS"; payload: { day: string; open: string; close: string; closed?: boolean }[] | null }
  | { type: "SET_ACCOUNT_TOAST"; payload: string | null }
  | { type: "OPEN_ADD_INSTRUCTOR" }
  | { type: "OPEN_EDIT_INSTRUCTOR"; payload: Instructor }
  | { type: "OPEN_ADD_LOCATION"; payload: { lat: number; lng: number } }
  | { type: "OPEN_EDIT_LOCATION"; payload: BusinessLocation };

export const AVAILABLE_CATEGORIES = [
  "Wellness & Fitness",
  "Sports",
  "Arts & Crafts",
  "Music",
  "Education",
  "Cooking",
  "Dance",
  "Fitness",
  "Outdoor",
  "Tech",
  "Yoga",
  "Meditation",
  "Pilates",
  "Martial Arts",
  "Photography",
];

export type BusinessData = NonNullable<
  Awaited<ReturnType<typeof import("@/api/business").getBusinessById>>
>;
