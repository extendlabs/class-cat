import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrivacyClient } from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    alternates: getAlternates("/privacy"),
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    openGraph: {
      title: t("privacyTitle"),
      description: t("privacyDescription"),
      images: ["/logo-cat.png"],
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyClient />;
}
