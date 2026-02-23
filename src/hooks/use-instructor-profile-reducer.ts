import type { ProfileState, ProfileAction } from "@/types/instructor-profile";

export const initialProfileState: ProfileState = {
  editingName: false,
  editingTitle: false,
  editingBio: false,
  nameValue: "",
  titleValue: "",
  bioValue: "",
  bioExpanded: false,
  editingSpecialties: false,
  specialties: null,
  newSpecialty: "",
  editingCerts: false,
  certifications: null,
  newCert: "",
  editingLangs: false,
  languages: null,
  newLang: "",
  editingSocial: false,
  socialValues: { instagram: "", youtube: "", website: "" },
  achievements: null,
  achievementDialogOpen: false,
  editingAchievementIdx: null,
  achievementForm: { icon: "trophy", title: "", description: "" },
  editingResponseTime: false,
  responseTime: "Within 2 hours",
  editingLocation: false,
  locationValue: "Krakow, Polska",
  avatarPreview: null,
};

export function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case "SET_EDITING_NAME":
      return { ...state, editingName: action.editing, ...(action.value !== undefined ? { nameValue: action.value } : {}) };
    case "SET_NAME_VALUE":
      return { ...state, nameValue: action.value };
    case "SET_EDITING_TITLE":
      return { ...state, editingTitle: action.editing, ...(action.value !== undefined ? { titleValue: action.value } : {}) };
    case "SET_TITLE_VALUE":
      return { ...state, titleValue: action.value };
    case "SET_EDITING_BIO":
      return { ...state, editingBio: action.editing, ...(action.value !== undefined ? { bioValue: action.value } : {}) };
    case "SET_BIO_VALUE":
      return { ...state, bioValue: action.value };
    case "TOGGLE_BIO_EXPANDED":
      return { ...state, bioExpanded: !state.bioExpanded };
    case "SET_EDITING_SPECIALTIES":
      return { ...state, editingSpecialties: action.editing, ...(action.specialties !== undefined ? { specialties: action.specialties } : {}) };
    case "SET_SPECIALTIES":
      return { ...state, specialties: action.specialties };
    case "SET_NEW_SPECIALTY":
      return { ...state, newSpecialty: action.value };
    case "SET_EDITING_CERTS":
      return { ...state, editingCerts: action.editing, ...(action.certifications !== undefined ? { certifications: action.certifications } : {}) };
    case "SET_CERTIFICATIONS":
      return { ...state, certifications: action.certifications };
    case "SET_NEW_CERT":
      return { ...state, newCert: action.value };
    case "SET_EDITING_LANGS":
      return { ...state, editingLangs: action.editing, ...(action.languages !== undefined ? { languages: action.languages } : {}) };
    case "SET_LANGUAGES":
      return { ...state, languages: action.languages };
    case "SET_NEW_LANG":
      return { ...state, newLang: action.value };
    case "SET_EDITING_SOCIAL":
      return { ...state, editingSocial: action.editing, ...(action.values !== undefined ? { socialValues: action.values } : {}) };
    case "SET_SOCIAL_VALUES":
      return { ...state, socialValues: action.values };
    case "SET_ACHIEVEMENTS":
      return { ...state, achievements: action.achievements };
    case "OPEN_ACHIEVEMENT_DIALOG":
      return { ...state, achievementDialogOpen: true, editingAchievementIdx: action.idx, achievementForm: action.form };
    case "CLOSE_ACHIEVEMENT_DIALOG":
      return { ...state, achievementDialogOpen: false };
    case "SET_ACHIEVEMENT_FORM":
      return { ...state, achievementForm: action.form };
    case "SET_EDITING_RESPONSE_TIME":
      return { ...state, editingResponseTime: action.editing };
    case "SET_RESPONSE_TIME":
      return { ...state, responseTime: action.value };
    case "SET_EDITING_LOCATION":
      return { ...state, editingLocation: action.editing };
    case "SET_LOCATION_VALUE":
      return { ...state, locationValue: action.value };
    case "SET_AVATAR_PREVIEW":
      return { ...state, avatarPreview: action.url };
    default:
      return state;
  }
}
