"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBusinessById } from "@/api/business";
import { PhotoCarouselModal } from "@/components/features/photo-carousel-modal";
import { Navbar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, CaretRight } from "@phosphor-icons/react";
import {
  BusinessHeroGallery,
  BusinessHeader,
  BusinessAbout,
  BusinessActivities,
  BusinessInstructors,
  BusinessInfoSidebar,
  BusinessReviews,
  BusinessCtaBand,
} from "@/components/features/business-detail";
import { PageLoadingSkeleton } from "@/components/features/page-loading-skeleton";
import { businessPageReducer, initialState } from "@/hooks/use-business-page-reducer";
import { useReducer } from "react";
import { toast } from "sonner";

export default function BusinessPage({ id }: { id: string }) {
  const t = useTranslations("metadata");
  const tActivity = useTranslations("activity");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const [state, dispatch] = useReducer(businessPageReducer, initialState);

  const { data: business, isLoading } = useQuery({
    queryKey: ["business", id],
    queryFn: () => getBusinessById(id),
  });

  if (isLoading) return (
    <>
      <Navbar />
      <PageLoadingSkeleton heroHeight="360px" />
      <BottomNav />
    </>
  );
  if (!business) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500">{t("businessNotFound")}</p>
        </div>
        <BottomNav />
      </>
    );
  }

  // Combine cover + gallery images for carousel
  const allImages = [
    { src: business.coverImage, alt: `${business.name} cover`, caption: business.name },
    ...business.gallery,
  ];

  return (
    <div className="bg-background min-h-screen font-sans text-gray-900 antialiased selection:bg-coral/20 selection:text-coral-hover">
      <Navbar />

      {/* Breadcrumb / Back */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => router.back()}
            className="hover:text-coral transition-colors flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            {tCommon("back")}
          </button>
          <CaretRight size={14} />
          <span className="text-gray-900 font-medium line-clamp-1">
            {business.name}
          </span>
        </nav>
      </div>

      {/* Hero Image Gallery */}
      <BusinessHeroGallery
        business={business}
        onOpenGallery={(index) => dispatch({ type: "OPEN_GALLERY", index })}
        onShare={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success(tActivity("linkCopied"));
        }}
      />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <BusinessHeader business={business} />
            <BusinessAbout business={business} />
            <BusinessActivities
              activities={business.activities}
              activeCategory={state.activeCategory}
              onSetCategory={(category) => dispatch({ type: "SET_CATEGORY", category })}
            />
            <BusinessInstructors instructors={business.instructors} />
          </div>

          {/* Right Column -- Sticky Sidebar */}
          <div className="lg:col-span-4">
            <BusinessInfoSidebar business={business} />
          </div>
        </div>
      </main>

      {/* Reviews */}
      <BusinessReviews
        reviews={business.reviews}
        rating={business.rating}
        reviewCount={business.reviewCount}
        ratingDistribution={business.ratingDistribution}
        reviewFilter={state.reviewFilter}
        visibleReviewCount={state.visibleReviewCount}
        onSetFilter={(filter) => dispatch({ type: "SET_REVIEW_FILTER", filter })}
        onShowMore={() => dispatch({ type: "SHOW_MORE_REVIEWS" })}
      />

      {/* CTA Band */}
      <BusinessCtaBand businessName={business.name} />

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
