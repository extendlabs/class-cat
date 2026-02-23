import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutClient } from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    alternates: getAlternates("/about"),
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    openGraph: {
      title: t("aboutTitle"),
      description: t("aboutDescription"),
      images: ["/logo-cat.png"],
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
