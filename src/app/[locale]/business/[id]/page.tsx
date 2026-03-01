import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getBusinessById } from "@/api/business";
import { JsonLd } from "@/components/json-ld";
import PageContent from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const [t, business] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getBusinessById(id),
  ]);
  if (!business) {
    return { title: t("businessNotFound"), alternates: getAlternates(`/business/${id}`) };
  }
  const description = `${business.tagline}. ${business.description}`.slice(0, 160);
  return {
    alternates: getAlternates(`/business/${id}`),
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

  const breadcrumbJsonLd = business
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
            name: "Businesses",
            item: "https://classcat.pl/business",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: business.name,
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      {breadcrumbJsonLd && <JsonLd data={breadcrumbJsonLd} />}
      <PageContent id={id} />
    </>
  );
}
