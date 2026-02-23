import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidCategory, getCategoryLabel } from "@/lib/categories";
import { BrowsePage } from "@/components/features/browse-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const polishLabel = getCategoryLabel(category) ?? category;
  return {
    title: `Zajęcia: ${polishLabel} | ClassCat`,
    description: `Przeglądaj zajęcia z kategorii ${polishLabel} w Twojej okolicy na ClassCat.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();
  return (
    <Suspense>
      <BrowsePage category={category} />
    </Suspense>
  );
}
