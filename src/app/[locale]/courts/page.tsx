import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CourtsPage } from "@/components/features/courts-page";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courts" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: getAlternates("/courts"),
  };
}

export default function Page() {
  return <CourtsPage />;
}
