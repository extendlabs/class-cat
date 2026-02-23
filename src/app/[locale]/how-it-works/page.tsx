import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HowItWorksClient } from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    alternates: getAlternates("/how-it-works"),
    title: t("howItWorksTitle"),
    description: t("howItWorksDescription"),
    openGraph: {
      title: t("howItWorksTitle"),
      description: t("howItWorksDescription"),
      images: ["/logo-cat.png"],
    },
  };
}

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
