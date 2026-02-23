"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  CalendarCheck,
  BookOpen,
  Megaphone,
  ChartLine,
  Star,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Feature {
  titleKey: string;
  descriptionKey: string;
  icon: Icon;
}

const features: Feature[] = [
  { titleKey: "featureManageTitle", descriptionKey: "featureManageDescription", icon: CalendarCheck },
  { titleKey: "featureBookingsTitle", descriptionKey: "featureBookingsDescription", icon: BookOpen },
  { titleKey: "featureMarketingTitle", descriptionKey: "featureMarketingDescription", icon: Megaphone },
  { titleKey: "featureAnalyticsTitle", descriptionKey: "featureAnalyticsDescription", icon: ChartLine },
];

interface Testimonial {
  quoteKey: string;
  nameKey: string;
  businessKey: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { quoteKey: "testimonial1Quote", nameKey: "testimonial1Name", businessKey: "testimonial1Business", rating: 5 },
  { quoteKey: "testimonial2Quote", nameKey: "testimonial2Name", businessKey: "testimonial2Business", rating: 5 },
  { quoteKey: "testimonial3Quote", nameKey: "testimonial3Name", businessKey: "testimonial3Business", rating: 5 },
  { quoteKey: "testimonial4Quote", nameKey: "testimonial4Name", businessKey: "testimonial4Business", rating: 4 },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ForBusinessClient() {
  const t = useTranslations("forBusiness");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-24 space-y-20 md:space-y-28">
        <HeroSection t={t} />
        <FeaturesGrid t={t} />
        <StatsBar t={t} />
        <HowItWorks t={t} />
        <TestimonialsCarousel t={t} />
        <BottomCTA t={t} />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Hero                                                            */
/* ------------------------------------------------------------------ */

function HeroSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <AnimateIn>
      <section className="relative bg-secondary rounded-[40px] p-8 md:p-16 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-coral/[0.12] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-coral/[0.08] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-coral/[0.03] rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <span className="inline-block uppercase tracking-widest text-coral font-bold text-xs mb-4">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 text-wrap-balance">
              {t("heroTitle")}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/onboarding/business"
                className="bg-coral hover:bg-coral-hover text-white px-10 py-4 rounded-full font-bold shadow-sm shadow-coral/20 transition-all hover:-translate-y-0.5 text-center"
              >
                {t("getStartedFree")}
              </Link>
              <a
                href="#how-it-works"
                className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-full font-bold shadow-[var(--shadow-soft)] border border-gray-200 transition-all hover:-translate-y-0.5 text-center"
              >
                {t("seeHowItWorks")}
              </a>
            </div>
          </div>

          {/* Right — browser mockup */}
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-[var(--shadow-float)] overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/60">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-3 flex-1 h-6 rounded-md bg-gray-100" />
              </div>
              {/* Screenshot placeholder */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-coral/5 to-secondary flex items-center justify-center">
                <Image
                  src="/logo-cat.png"
                  alt={t("mockupAlt")}
                  width={120}
                  height={120}
                  className="opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimateIn>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Stats Bar                                                       */
/* ------------------------------------------------------------------ */

function StatsBar({ t }: { t: ReturnType<typeof useTranslations> }) {
  const stats = [
    { value: t("statStudents"), label: t("statStudentsLabel") },
    { value: t("statBusinesses"), label: t("statBusinessesLabel") },
    { value: t("statRating"), label: t("statRatingLabel") },
    { value: t("statRetention"), label: t("statRetentionLabel") },
  ];

  return (
    <AnimateIn delay={100}>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-bold text-coral">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </section>
    </AnimateIn>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Features Grid                                                   */
/* ------------------------------------------------------------------ */

function FeaturesGrid({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <AnimateIn delay={100}>
      <section>
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
            {t("featuresLabel")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight text-wrap-balance">
            {t("featuresTitle")}
          </h2>
          <p className="text-gray-500 mt-3">{t("featuresSubtitle")}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <AnimateIn key={f.titleKey} delay={i * 80}>
                <div className="rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 p-6">
                  <div className="w-12 h-12 bg-coral/8 rounded-xl flex items-center justify-center text-coral mb-4">
                    <Icon size={24} weight="duotone" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{t(f.titleKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(f.descriptionKey)}</p>
                  {/* Screenshot placeholder */}
                  <div className="mt-5 rounded-xl bg-secondary/60 border border-gray-100 aspect-[16/9]" />
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>
    </AnimateIn>
  );
}

/* ------------------------------------------------------------------ */
/*  4. How It Works                                                    */
/* ------------------------------------------------------------------ */

function HowItWorks({ t }: { t: ReturnType<typeof useTranslations> }) {
  const steps = [
    { num: 1, titleKey: "step1Title", descKey: "step1Description" },
    { num: 2, titleKey: "step2Title", descKey: "step2Description" },
    { num: 3, titleKey: "step3Title", descKey: "step3Description" },
  ];

  return (
    <AnimateIn delay={100}>
      <section
        id="how-it-works"
        className="bg-secondary rounded-[32px] p-8 md:p-16 scroll-mt-24"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-gray-500">{t("howItWorksSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <AnimateIn key={s.num} delay={i * 120}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-coral text-white font-bold text-lg flex items-center justify-center mx-auto mb-5">
                  {s.num}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{t(s.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(s.descKey)}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>
    </AnimateIn>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Testimonials Carousel                                           */
/* ------------------------------------------------------------------ */

function TestimonialsCarousel({ t }: { t: ReturnType<typeof useTranslations> }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <AnimateIn delay={100}>
      <section>
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t("testimonialsTitle")}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{t("testimonialsSubtitle")}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-coral transition-colors"
            >
              <CaretLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-coral transition-colors"
            >
              <CaretRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-6 -mx-4 px-4 no-scrollbar"
        >
          <div className="flex gap-5 w-max">
            {testimonials.map((item) => (
              <div
                key={item.nameKey}
                className="w-[340px] rounded-2xl bg-white border border-gray-100 p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 flex-shrink-0"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      weight="fill"
                      className={i < item.rating ? "text-coral" : "text-gray-200"}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-sm leading-relaxed mb-5">
                  &ldquo;{t(item.quoteKey)}&rdquo;
                </p>

                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold text-sm">
                    {(t(item.nameKey) as string).charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t(item.nameKey)}</div>
                    <div className="text-gray-400 text-xs">{t(item.businessKey)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimateIn>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Bottom CTA                                                      */
/* ------------------------------------------------------------------ */

function BottomCTA({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <AnimateIn delay={100}>
      <section className="relative rounded-[40px] p-10 md:p-16 overflow-hidden bg-secondary">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-coral/[0.12] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-coral/[0.08] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-coral/[0.03] rounded-full blur-3xl" />

        {/* Mascot */}
        <div className="hidden md:block absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-10">
          <div className="relative w-72 h-72 drop-shadow-xl">
            <Image
              src="/cat-mascot.png"
              alt="ClassCat mascot"
              fill
              className="object-contain"
              sizes="288px"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t("ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/onboarding/business"
              className="bg-coral hover:bg-coral-hover text-white px-10 py-4 rounded-full font-bold shadow-sm shadow-coral/20 transition-all hover:-translate-y-0.5 text-center"
            >
              {t("ctaGetStarted")}
            </Link>
            <Link
              href="/"
              className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-full font-bold shadow-[var(--shadow-soft)] border border-gray-200 transition-all hover:-translate-y-0.5 text-center"
            >
              {t("ctaExplore")}
            </Link>
          </div>
        </div>
      </section>
    </AnimateIn>
  );
}
