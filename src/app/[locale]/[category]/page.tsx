import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isValidCategory, VALID_CATEGORIES, getCategoryLabel } from "@/lib/categories";
import { BrowsePage } from "@/components/features/browse-page";
import { JsonLd } from "@/components/json-ld";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}): Promise<Metadata> {
  const { category, locale } = await params;
  if (!isValidCategory(category)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const label = tCat(category as never);
  return {
    alternates: getAlternates(`/${category}`),
    title: t("categoryTitle", { category: label }),
    description: t("categoryDescription", { category: label }),
  };
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();

  const label = getCategoryLabel(category) ?? category;

  return (
    <>
      <JsonLd
        data={{
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
              name: label,
            },
          ],
        }}
      />
      <Suspense>
        <BrowsePage category={category} />
      </Suspense>
    </>
  );
}
