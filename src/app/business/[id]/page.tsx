import type { Metadata } from "next";
import { getBusinessById } from "@/api/business";
import { JsonLd } from "@/components/json-ld";
import PageContent from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const business = await getBusinessById(id);
  if (!business) {
    return { title: "Nie znaleziono firmy" };
  }
  const description = `${business.tagline}. ${business.description}`.slice(0, 160);
  return {
    title: business.name,
    description,
    openGraph: {
      title: business.name,
      description,
      images: [business.coverImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusinessById(id);

  const jsonLd = business
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: business.name,
        description: business.description,
        image: business.coverImage,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.coordinates.lat,
          longitude: business.coordinates.lng,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: business.rating,
          reviewCount: business.reviewCount,
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
