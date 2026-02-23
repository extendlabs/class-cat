import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getInstructorById } from "@/api/instructor";
import { JsonLd } from "@/components/json-ld";
import PageContent from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const instructor = await getInstructorById(id);
  if (!instructor) {
    return { title: t("instructorNotFound"), alternates: getAlternates(`/instructor/${id}`) };
  }
  const description = instructor.bio.slice(0, 160);
  return {
    alternates: getAlternates(`/instructor/${id}`),
    title: `${instructor.name} — ${instructor.title}`,
    description,
    openGraph: {
      title: `${instructor.name} — ${instructor.title}`,
      description,
      images: [instructor.coverImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const instructor = await getInstructorById(id);

  const jsonLd = instructor
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: instructor.name,
        jobTitle: instructor.title,
        description: instructor.bio,
        image: instructor.coverImage,
        ...(instructor.businessName && {
          worksFor: {
            "@type": "Organization",
            name: instructor.businessName,
          },
        }),
      }
    : null;

  const breadcrumbJsonLd = instructor
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
            name: "Instructors",
            item: "https://classcat.pl/instructor",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: instructor.name,
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
