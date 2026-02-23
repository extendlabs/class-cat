import {
  mockCreateInstructorAccount,
  mockLookupUserByEmail,
  mockInviteAsInstructor,
} from "@/api/auth";
import type { Instructor } from "@/types/activity";
import type { BusinessLocation } from "@/types/business";
import type { BusinessPageState, BusinessPageAction, ManagedPhoto } from "@/types/business-profile";

export function useBusinessProfileHandlers(
  state: BusinessPageState,
  dispatch: React.Dispatch<BusinessPageAction>,
  currentInstructors: Instructor[],
  currentLocations: BusinessLocation[],
  currentPhotos: ManagedPhoto[],
) {
  const saveInstructor = async () => {
    if (!state.instructorForm.name.trim()) return;
    const list = [...currentInstructors];
    const hasAccount = state.instructorForm.createAccount && state.instructorForm.email.trim();

    if (state.editingInstructor) {
      const idx = list.findIndex((i) => i.id === state.editingInstructor!.id);
      if (idx >= 0) {
        list[idx] = {
          ...list[idx],
          name: state.instructorForm.name,
          specialty: state.instructorForm.specialty,
          avatar: state.instructorForm.avatar || list[idx].avatar,
          email: state.instructorForm.email || list[idx].email,
          hasAccount: hasAccount ? true : list[idx].hasAccount,
        };
      }
    } else {
      list.push({
        id: `inst-new-${Date.now()}`,
        name: state.instructorForm.name,
        title: state.instructorForm.specialty,
        avatar: state.instructorForm.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        experience: "",
        bio: "",
        verified: false,
        specialty: state.instructorForm.specialty,
        rating: 5.0,
        email: state.instructorForm.email || undefined,
        hasAccount: !!hasAccount,
      });
    }

    if (hasAccount) {
      await mockCreateInstructorAccount(state.instructorForm.name, state.instructorForm.email, "biz-1");
      dispatch({ type: "SET_ACCOUNT_TOAST", payload: `Konto utworzone. Instruktor moze sie zalogowac jako ${state.instructorForm.email}` });
      setTimeout(() => dispatch({ type: "SET_ACCOUNT_TOAST", payload: null }), 5000);
    }

    dispatch({ type: "SET_INSTRUCTORS", payload: list });
    dispatch({ type: "SET_INSTRUCTOR_DIALOG_OPEN", payload: false });
  };

  const handleLookupEmail = async () => {
    if (!state.lookupEmail.trim()) return;
    dispatch({ type: "SET_LOOKUP_LOADING", payload: true });
    const result = await mockLookupUserByEmail(state.lookupEmail.trim());
    dispatch({ type: "SET_LOOKUP_RESULT", payload: result });
    dispatch({ type: "SET_LOOKUP_LOADING", payload: false });
    dispatch({ type: "SET_DIALOG_STEP", payload: result ? "found" : "not-found" });
    if (!result) {
      dispatch({ type: "UPDATE_INSTRUCTOR_FORM", payload: { email: state.lookupEmail.trim(), createAccount: true } });
    }
  };

  const handleInviteUser = async () => {
    if (!state.lookupResult) return;
    dispatch({ type: "SET_LOOKUP_LOADING", payload: true });
    const invited = await mockInviteAsInstructor(state.lookupResult.id, "biz-1");
    const list = [...currentInstructors];
    list.push({
      id: invited.instructorId ?? `inst-invited-${Date.now()}`,
      name: invited.name,
      title: "",
      avatar: invited.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      experience: "",
      bio: "",
      verified: false,
      email: invited.email,
      hasAccount: true,
      invited: true,
    });
    dispatch({ type: "SET_INSTRUCTORS", payload: list });
    dispatch({ type: "SET_LOOKUP_LOADING", payload: false });
    dispatch({ type: "SET_INSTRUCTOR_DIALOG_OPEN", payload: false });
    dispatch({ type: "SET_ACCOUNT_TOAST", payload: `Zaproszenie wyslane do ${invited.name} (${invited.email})` });
    setTimeout(() => dispatch({ type: "SET_ACCOUNT_TOAST", payload: null }), 5000);
  };

  const confirmDeleteInstructor = () => {
    if (!state.deleteInstructorId) return;
    dispatch({ type: "SET_INSTRUCTORS", payload: currentInstructors.filter((i) => i.id !== state.deleteInstructorId) });
    dispatch({ type: "SET_DELETE_INSTRUCTOR_ID", payload: null });
  };

  const saveLocation = () => {
    if (!state.locationForm.name.trim()) return;
    const list = [...currentLocations];
    if (state.editingLocation) {
      const idx = list.findIndex((l) => l.id === state.editingLocation!.id);
      if (idx >= 0) list[idx] = { ...list[idx], name: state.locationForm.name, address: state.locationForm.address, coordinates: state.locationCoords };
    } else {
      list.push({
        id: `loc-new-${Date.now()}`,
        name: state.locationForm.name,
        address: state.locationForm.address,
        coordinates: state.locationCoords,
      });
    }
    dispatch({ type: "SET_LOCATIONS", payload: list });
    dispatch({ type: "SET_LOCATION_DIALOG_OPEN", payload: false });
  };

  const confirmDeleteLocation = () => {
    if (!state.deleteLocationId) return;
    dispatch({ type: "SET_LOCATIONS", payload: currentLocations.filter((l) => l.id !== state.deleteLocationId) });
    dispatch({ type: "SET_DELETE_LOCATION_ID", payload: null });
  };

  const openPhotoManager = () => {
    dispatch({ type: "SET_MANAGED_PHOTOS", payload: currentPhotos });
    dispatch({ type: "SET_PHOTO_MANAGER_OPEN", payload: true });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    dispatch({ type: "SET_LOGO_PREVIEW", payload: URL.createObjectURL(file) });
  };

  return {
    saveInstructor,
    handleLookupEmail,
    handleInviteUser,
    confirmDeleteInstructor,
    saveLocation,
    confirmDeleteLocation,
    openPhotoManager,
    handleLogoUpload,
  };
}
