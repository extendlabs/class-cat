"use client";

import { useQuery } from "@tanstack/react-query";
import { getActivityById } from "@/api/activity-detail";
import { CaretRight } from "@phosphor-icons/react";
import { Navbar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { useReducer } from "react";
import { toast } from "sonner";
import { PhotoCarouselModal } from "@/components/features/photo-carousel-modal";
import { useLikedActivities } from "@/hooks/use-liked-activities";
import { PageLoadingSkeleton } from "@/components/features/page-loading-skeleton";
import { activityPageReducer, initialState } from "@/hooks/use-activity-page-reducer";
import {
  ActivityHeroGallery,
  ActivityHeader,
  AboutSection,
  WhatYouLearnSection,
  CurriculumSection,
  InstructorCard,
  BookingSidebar,
  ReviewSection,
  CtaBand,
  MobileBottomCta,
} from "@/components/features/activity-detail";

// --- Main component ---

export default function ActivityDetailPage({ id }: { id: string }) {
  const [state, dispatch] = useReducer(activityPageReducer, initialState);
  const { toggleLike, isLiked } = useLikedActivities();

  const { data: activity, isLoading } = useQuery({
    queryKey: ["activity", id],
    queryFn: () => getActivityById(id),
  });

  if (isLoading) return <PageLoadingSkeleton />;
  if (!activity) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Activity not found.</p>
      </div>
    );
  }

  // Combine hero + gallery images for carousel
  const allImages = [
    { src: activity.image, alt: activity.title, caption: activity.title },
    ...activity.gallery,
  ];

  return (
    <div className="bg-background min-h-screen font-sans text-gray-900 antialiased selection:bg-coral/20 selection:text-coral-hover">
      <Navbar />

      {/* Breadcrumb / Back */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-coral transition-colors"
          >
            Home
          </Link>
          <CaretRight size={14} />
          <span className="text-gray-900 font-medium line-clamp-1">
            {activity.title}
          </span>
        </nav>
      </div>

      {/* Hero Image Gallery */}
      <ActivityHeroGallery
        activity={activity}
        onOpenGallery={(index) => dispatch({ type: "OPEN_GALLERY", index })}
        onShare={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard");
        }}
        onToggleLike={() => toggleLike({ id: activity.id, title: activity.title, image: activity.image })}
        liked={isLiked(activity.id)}
      />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <ActivityHeader activity={activity} />
            <AboutSection activity={activity} />
            <WhatYouLearnSection items={activity.whatYouLearn} />
            <CurriculumSection curriculum={activity.curriculum} />
            <InstructorCard
              instructor={activity.instructor}
              instructorId={activity.instructorId}
              businessId={activity.businessId}
            />
          </div>

          {/* Right Column -- Sticky Sidebar */}
          <div className="lg:col-span-4">
            <BookingSidebar
              activity={activity}
              selectedTime={state.selectedTime}
              onSelectTime={(index) => dispatch({ type: "SELECT_TIME", index })}
            />
          </div>
        </div>
      </main>

      {/* Reviews */}
      <ReviewSection
        reviews={activity.reviews}
        rating={activity.rating}
        reviewCount={activity.reviewCount}
        ratingDistribution={activity.ratingDistribution}
        reviewFilter={state.reviewFilter}
        visibleReviewCount={state.visibleReviewCount}
        onSetFilter={(filter) => dispatch({ type: "SET_REVIEW_FILTER", filter })}
        onShowMore={() => dispatch({ type: "SHOW_MORE_REVIEWS" })}
      />

      {/* CTA Band */}
      <CtaBand />

      {/* Sticky Bottom CTA (mobile only) */}
      <MobileBottomCta priceAmount={activity.priceAmount} />

      {/* Footer */}
      <Footer className="mt-0" />

      <BottomNav />

      {/* Photo Carousel Modal */}
      <PhotoCarouselModal
        images={allImages}
        open={state.galleryOpen}
        onOpenChange={(open) => {
          if (!open) dispatch({ type: "CLOSE_GALLERY" });
        }}
        currentIndex={state.galleryIndex}
        onIndexChange={(index) => dispatch({ type: "SET_GALLERY_INDEX", index })}
      />
    </div>
  );
}
