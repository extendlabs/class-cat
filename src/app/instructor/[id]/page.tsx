import type { Metadata } from "next";
import { getInstructorById } from "@/api/instructor";
import { JsonLd } from "@/components/json-ld";
import PageContent from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const instructor = await getInstructorById(id);
  if (!instructor) {
    return { title: "Nie znaleziono instruktora" };
  }
  const description = instructor.bio.slice(0, 160);
  return {
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

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <PageContent id={id} />
    </>
  );
}
