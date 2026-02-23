import type { Metadata } from "next";
import { getActivityById } from "@/api/activity-detail";
import { JsonLd } from "@/components/json-ld";
import PageContent from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const activity = await getActivityById(id);
  if (!activity) {
    return { title: "Nie znaleziono zajęć" };
  }
  const description = activity.description.slice(0, 160);
  return {
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

  const jsonLd = activity
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: activity.title,
        description: activity.description,
        image: activity.image,
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
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: activity.rating,
          reviewCount: activity.reviewCount,
        },
      }
    : null;

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <PageContent id={id} />
    </>
  );
}
