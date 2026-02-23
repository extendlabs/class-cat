import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactClient } from "./_client";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    alternates: getAlternates("/contact"),
    title: t("contactTitle"),
    description: t("contactDescription"),
    openGraph: {
      title: t("contactTitle"),
      description: t("contactDescription"),
      images: ["/logo-cat.png"],
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
