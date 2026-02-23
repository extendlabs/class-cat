import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageContent from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    robots: { index: false, follow: false },
    title: t("businessProfileTitle"),
    description: t("businessProfileDescription"),
  };
}

export default function Page() {
  return <PageContent />;
}
