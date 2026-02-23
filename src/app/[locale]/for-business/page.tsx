import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ForBusinessClient } from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    alternates: getAlternates("/for-business"),
    title: t("forBusinessTitle"),
    description: t("forBusinessDescription"),
    openGraph: {
      title: t("forBusinessTitle"),
      description: t("forBusinessDescription"),
      images: ["/logo-cat.png"],
    },
  };
}

export default function ForBusinessPage() {
  return <ForBusinessClient />;
}
