"use client";

import { useRef, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, X } from "@phosphor-icons/react";
import { getBusinessById } from "@/api/business";
import { Skeleton } from "@/components/ui/skeleton";
import { AVAILABLE_CATEGORIES } from "@/types/business-profile";
import { businessProfileReducer, initialState } from "@/hooks/use-business-profile-reducer";
import { useBusinessProfileHandlers } from "@/hooks/use-business-profile-handlers";
import {
  BusinessHeroGallery,
  BusinessInfoSection,
  BusinessActivitiesBlock,
  BusinessInstructorsBlock,
  BusinessSidebar,
  BusinessDialogs,
} from "@/components/features/business-profile";

export default function BusinessProfilePage() {
  const [state, dispatch] = useReducer(businessProfileReducer, initialState);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoUploadRef = useRef<HTMLInputElement>(null);
  const instructorAvatarInputRef = useRef<HTMLInputElement>(null);

  const { data: business, isLoading } = useQuery({
    queryKey: ["business", "biz-1"],
    queryFn: () => getBusinessById("biz-1"),
  });

  // Derived state
  const currentInstructors = state.instructors ?? business?.instructors ?? [];
  const currentLocations = state.locations ?? business?.locations ?? [];
  const currentCategories = state.categories ?? (business ? [business.category] : []);

  // Build photos list from business data + overrides
  const buildPhotosFromBusiness = () => {
    if (!business) return [];
    return [
      { id: "cover", src: business.coverImage, alt: `${business.name} cover`, caption: business.name },
      ...business.gallery.map((img, i) => ({
        id: `gallery-${i}`,
        src: img.src,
        alt: img.alt,
        caption: img.caption,
      })),
    ];
  };
  const currentPhotos = state.managedPhotos ?? buildPhotosFromBusiness();

  // Handlers from extracted hook
  const {
    saveInstructor,
    handleLookupEmail,
    handleInviteUser,
    confirmDeleteInstructor,
    saveLocation,
    confirmDeleteLocation,
    openPhotoManager,
    handleLogoUpload,
  } = useBusinessProfileHandlers(state, dispatch, currentInstructors, currentLocations, currentPhotos);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[280px] w-full rounded-3xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!business) return null;

  const displayName = state.editingName ? state.nameValue : business.name;
  const displayTagline = state.editingTagline ? state.taglineValue : business.tagline;
  const displayAbout = state.editingAbout ? state.aboutValue : business.description;

  const activityCategories = [
    "all",
    ...Array.from(new Set(business.activities.map((a) => a.category))),
  ];
  const filteredActivities =
    state.activeCategory === "all"
      ? business.activities
      : business.activities.filter((a) => a.category === state.activeCategory);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  // Gallery images for carousel
  const allImages = currentPhotos.map((p) => ({ src: p.src, alt: p.alt, caption: p.caption }));

  // Active location for map
  const activeLocation = state.activeLocationId
    ? currentLocations.find((l) => l.id === state.activeLocationId)
    : currentLocations[0];
  const mapLat = activeLocation?.coordinates.lat ?? business.coordinates.lat;
  const mapLng = activeLocation?.coordinates.lng ?? business.coordinates.lng;
  const mapAddress = activeLocation?.address ?? business.address;

  // Display photos for gallery grid
  const coverPhoto = currentPhotos[0];
  const galleryPhotos = currentPhotos.slice(1);

  // Unused categories for the picker
  const unusedCategories = AVAILABLE_CATEGORIES.filter((c) => !currentCategories.includes(c));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hidden inputs */}
      <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />

      {/* Hero Image Gallery */}
      <BusinessHeroGallery
        coverPhoto={coverPhoto}
        galleryPhotos={galleryPhotos}
        onOpenGallery={(index) => dispatch({ type: "OPEN_GALLERY", payload: index })}
        onOpenPhotoManager={openPhotoManager}
      />

      {/* Business Header + Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column */}
        <div className="lg:col-span-8">
          <BusinessInfoSection
            business={business}
            displayName={displayName}
            displayTagline={displayTagline}
            displayAbout={displayAbout}
            editingName={state.editingName}
            editingTagline={state.editingTagline}
            editingAbout={state.editingAbout}
            nameValue={state.nameValue}
            taglineValue={state.taglineValue}
            aboutValue={state.aboutValue}
            logoPreview={state.logoPreview}
            currentCategories={currentCategories}
            categoryInputOpen={state.categoryInputOpen}
            unusedCategories={unusedCategories}
            instructorCount={currentInstructors.length}
            dispatch={dispatch}
            logoInputRef={logoInputRef}
          />
          <BusinessActivitiesBlock
            activities={business.activities}
            filteredActivities={filteredActivities}
            activityCategories={activityCategories}
            activeCategory={state.activeCategory}
            dispatch={dispatch}
          />
          <BusinessInstructorsBlock
            currentInstructors={currentInstructors}
            dispatch={dispatch}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <BusinessSidebar
            business={business}
            currentLocations={currentLocations}
            activeLocationId={state.activeLocationId}
            mapLat={mapLat}
            mapLng={mapLng}
            mapAddress={mapAddress}
            today={today}
            dispatch={dispatch}
          />
        </div>
      </div>

      <BusinessDialogs
        state={state}
        business={business}
        currentInstructors={currentInstructors}
        allImages={allImages}
        dispatch={dispatch}
        photoUploadRef={photoUploadRef}
        instructorAvatarInputRef={instructorAvatarInputRef}
        onSaveInstructor={saveInstructor}
        onInviteUser={handleInviteUser}
        onLookupEmail={handleLookupEmail}
        onConfirmDeleteInstructor={confirmDeleteInstructor}
        onSaveLocation={saveLocation}
        onConfirmDeleteLocation={confirmDeleteLocation}
      />

      {/* Account creation toast */}
      {state.accountToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-3 animate-fade-in-up max-w-md">
          <ShieldCheck size={18} weight="fill" className="text-green-400 flex-shrink-0" />
          <span>{state.accountToast}</span>
          <button onClick={() => dispatch({ type: "SET_ACCOUNT_TOAST", payload: null })} className="text-white/60 hover:text-white ml-2 flex-shrink-0">
            <X size={14} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
