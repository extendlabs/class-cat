"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { getInstructorById } from "@/api/instructor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import { PageLoadingSkeleton } from "@/components/features/page-loading-skeleton";
import {
  InstructorBreadcrumb,
  InstructorHero,
  InstructorBio,
  InstructorAchievements,
  InstructorClasses,
  InstructorContactSidebar,
  InstructorReviews,
  InstructorCtaBand,
} from "@/components/features/instructor-detail";
import { useState } from "react";

export default function InstructorPage({ id }: { id: string }) {
  const t = useTranslations("metadata");
  const router = useRouter();
  const [bioExpanded, setBioExpanded] = useState(false);
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);
  const [reviewFilter, setReviewFilter] = useState<"all" | number>("all");

  const { data: instructor, isLoading } = useQuery({
    queryKey: ["instructor", id],
    queryFn: () => getInstructorById(id),
  });

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <PageLoadingSkeleton heroHeight="280px" />
        <BottomNav />
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500">{t("instructorNotFound")}</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  const firstName = instructor.name.split(" ").pop();

  return (
    <div className="bg-background min-h-screen font-sans text-gray-900 antialiased selection:bg-coral/20 selection:text-coral-hover">
      <Navbar />

      <InstructorBreadcrumb name={instructor.name} onBack={() => router.back()} />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <InstructorHero instructor={instructor} />
            <InstructorBio
              instructor={instructor}
              bioExpanded={bioExpanded}
              onToggleBio={() => setBioExpanded(!bioExpanded)}
            />
            <InstructorAchievements achievements={instructor.achievements} />
            <InstructorClasses classes={instructor.classes} />
          </div>

          {/* Right Column -- Sticky Sidebar */}
          <div className="lg:col-span-4">
            <InstructorContactSidebar
              firstName={firstName}
              verified={instructor.verified}
              languages={instructor.languages}
            />
          </div>
        </div>
      </main>

      {/* Reviews */}
      <InstructorReviews
        reviews={instructor.reviews}
        rating={instructor.rating}
        reviewCount={instructor.reviewCount}
        ratingDistribution={instructor.ratingDistribution}
        reviewFilter={reviewFilter}
        visibleReviewCount={visibleReviewCount}
        onSetFilter={(filter) => { setReviewFilter(filter); setVisibleReviewCount(3); }}
        onShowMore={() => setVisibleReviewCount((prev) => prev + 3)}
      />

      {/* CTA Band */}
      <InstructorCtaBand instructorName={instructor.name} />

      <Footer className="mt-0" />

      {/* Bottom spacer for mobile nav */}
      <div className="md:hidden h-20" />
      <BottomNav />
    </div>
  );
}
