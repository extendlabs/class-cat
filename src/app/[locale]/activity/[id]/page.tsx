import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getActivityById } from "@/api/activity-detail";
import { JsonLd } from "@/components/json-ld";
import PageContent from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const [t, activity] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getActivityById(id),
  ]);
  if (!activity) {
    return { title: t("activityNotFound"), alternates: getAlternates(`/activity/${id}`) };
  }
  const description = activity.description.slice(0, 160);
  return {
    alternates: getAlternates(`/activity/${id}`),
    title: activity.title,
    description,
    openGraph: {
      title: activity.title,
      description,
      images: [activity.image],
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getActivityById(id);

  const eventJsonLd = activity
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: activity.title,
        description: activity.description,
        image: activity.image,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        startDate: activity.availableTimes[0]
          ? `${new Date().toISOString().slice(0, 10)}T${activity.availableTimes[0]}:00`
          : undefined,
        location: {
          "@type": "Place",
          name: activity.location,
        },
        organizer: {
          "@type": "Organization",
          name: activity.provider.name,
        },
        offers: {
          "@type": "Offer",
          price: activity.priceAmount ?? 0,
          priceCurrency: "PLN",
          availability: activity.spotsLeft && activity.spotsLeft > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: activity.rating,
          reviewCount: activity.reviewCount,
        },
      }
    : null;

  const breadcrumbJsonLd = activity
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://classcat.pl",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: activity.category,
            item: `https://classcat.pl/${activity.category}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: activity.title,
          },
        ],
      }
    : null;

  return (
    <>
      {eventJsonLd && <JsonLd data={eventJsonLd} />}
      {breadcrumbJsonLd && <JsonLd data={breadcrumbJsonLd} />}
      <PageContent id={id} />
    </>
  );
}
