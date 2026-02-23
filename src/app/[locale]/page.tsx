import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BrowsePage } from "@/components/features/browse-page";
import { JsonLd } from "@/components/json-ld";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    alternates: getAlternates("/"),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: ["/logo-cat.png"],
    },
  };
}

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ClassCat",
          url: "https://classcat.pl",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://classcat.pl/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Suspense>
        <BrowsePage category={null} />
      </Suspense>
    </>
  );
}
