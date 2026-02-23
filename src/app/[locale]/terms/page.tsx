import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TermsClient } from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    alternates: getAlternates("/terms"),
    title: t("termsTitle"),
    description: t("termsDescription"),
    openGraph: {
      title: t("termsTitle"),
      description: t("termsDescription"),
      images: ["/logo-cat.png"],
    },
  };
}

export default function TermsPage() {
  return <TermsClient />;
}
