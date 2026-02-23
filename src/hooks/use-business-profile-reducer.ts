import type { BusinessPageState, BusinessPageAction } from "@/types/business-profile";

export const initialState: BusinessPageState = {
  editSection: null,
  photoManagerOpen: false,
  managedPhotos: null,
  logoPreview: null,
  dragIdx: null,
  dragOverIdx: null,
  editingName: false,
  editingTagline: false,
  editingAbout: false,
  nameValue: "",
  taglineValue: "",
  aboutValue: "",
  categories: null,
  categoryInputOpen: false,
  galleryOpen: false,
  galleryIndex: 0,
  activeCategory: "all",
  instructors: null,
  instructorDialogOpen: false,
  editingInstructor: null,
  instructorForm: { name: "", specialty: "", avatar: "", email: "", createAccount: false },
  deleteInstructorId: null,
  dialogStep: "email",
  lookupEmail: "",
  lookupResult: null,
  lookupLoading: false,
  locations: null,
  locationDialogOpen: false,
  editingLocation: null,
  locationForm: { name: "", address: "" },
  locationCoords: { lat: 50.0547, lng: 19.9421 },
  activeLocationId: null,
  deleteLocationId: null,
  editingHours: null,
  accountToast: null,
};

export function businessProfileReducer(state: BusinessPageState, action: BusinessPageAction): BusinessPageState {
  switch (action.type) {
    case "SET_EDIT_SECTION":
      return { ...state, editSection: action.payload };
    case "SET_PHOTO_MANAGER_OPEN":
      return { ...state, photoManagerOpen: action.payload };
    case "SET_MANAGED_PHOTOS":
      return { ...state, managedPhotos: action.payload };
    case "SET_LOGO_PREVIEW":
      return { ...state, logoPreview: action.payload };
    case "SET_DRAG":
      return { ...state, dragIdx: action.payload.dragIdx, dragOverIdx: action.payload.dragOverIdx };
    case "SET_EDITING_NAME":
      return { ...state, editingName: action.payload };
    case "SET_EDITING_TAGLINE":
      return { ...state, editingTagline: action.payload };
    case "SET_EDITING_ABOUT":
      return { ...state, editingAbout: action.payload };
    case "SET_NAME_VALUE":
      return { ...state, nameValue: action.payload };
    case "SET_TAGLINE_VALUE":
      return { ...state, taglineValue: action.payload };
    case "SET_ABOUT_VALUE":
      return { ...state, aboutValue: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_CATEGORY_INPUT_OPEN":
      return { ...state, categoryInputOpen: action.payload };
    case "OPEN_GALLERY":
      return { ...state, galleryOpen: true, galleryIndex: action.payload };
    case "SET_GALLERY_OPEN":
      return { ...state, galleryOpen: action.payload };
    case "SET_GALLERY_INDEX":
      return { ...state, galleryIndex: action.payload };
    case "SET_ACTIVE_CATEGORY":
      return { ...state, activeCategory: action.payload };
    case "SET_INSTRUCTORS":
      return { ...state, instructors: action.payload };
    case "SET_INSTRUCTOR_DIALOG_OPEN":
      return { ...state, instructorDialogOpen: action.payload };
    case "SET_EDITING_INSTRUCTOR":
      return { ...state, editingInstructor: action.payload };
    case "SET_INSTRUCTOR_FORM":
      return { ...state, instructorForm: action.payload };
    case "UPDATE_INSTRUCTOR_FORM":
      return { ...state, instructorForm: { ...state.instructorForm, ...action.payload } };
    case "SET_DELETE_INSTRUCTOR_ID":
      return { ...state, deleteInstructorId: action.payload };
    case "SET_DIALOG_STEP":
      return { ...state, dialogStep: action.payload };
    case "SET_LOOKUP_EMAIL":
      return { ...state, lookupEmail: action.payload };
    case "SET_LOOKUP_RESULT":
      return { ...state, lookupResult: action.payload };
    case "SET_LOOKUP_LOADING":
      return { ...state, lookupLoading: action.payload };
    case "SET_LOCATIONS":
      return { ...state, locations: action.payload };
    case "SET_LOCATION_DIALOG_OPEN":
      return { ...state, locationDialogOpen: action.payload };
    case "SET_EDITING_LOCATION":
      return { ...state, editingLocation: action.payload };
    case "SET_LOCATION_FORM":
      return { ...state, locationForm: action.payload };
    case "UPDATE_LOCATION_FORM":
      return { ...state, locationForm: { ...state.locationForm, ...action.payload } };
    case "SET_LOCATION_COORDS":
      return { ...state, locationCoords: action.payload };
    case "SET_ACTIVE_LOCATION_ID":
      return { ...state, activeLocationId: action.payload };
    case "SET_DELETE_LOCATION_ID":
      return { ...state, deleteLocationId: action.payload };
    case "SET_EDITING_HOURS":
      return { ...state, editingHours: action.payload };
    case "SET_ACCOUNT_TOAST":
      return { ...state, accountToast: action.payload };
    case "OPEN_ADD_INSTRUCTOR":
      return {
        ...state,
        editingInstructor: null,
        instructorForm: { name: "", specialty: "", avatar: "", email: "", createAccount: false },
        dialogStep: "email",
        lookupEmail: "",
        lookupResult: null,
        lookupLoading: false,
        instructorDialogOpen: true,
      };
    case "OPEN_EDIT_INSTRUCTOR":
      return {
        ...state,
        editingInstructor: action.payload,
        instructorForm: {
          name: action.payload.name,
          specialty: action.payload.specialty ?? "",
          avatar: action.payload.avatar,
          email: action.payload.email ?? "",
          createAccount: false,
        },
        dialogStep: "edit",
        instructorDialogOpen: true,
      };
    case "OPEN_ADD_LOCATION":
      return {
        ...state,
        editingLocation: null,
        locationForm: { name: "", address: "" },
        locationCoords: action.payload,
        locationDialogOpen: true,
      };
    case "OPEN_EDIT_LOCATION":
      return {
        ...state,
        editingLocation: action.payload,
        locationForm: { name: action.payload.name, address: action.payload.address },
        locationCoords: action.payload.coordinates,
        locationDialogOpen: true,
      };
    default:
      return state;
  }
}
