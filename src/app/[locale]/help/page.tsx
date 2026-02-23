import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HelpClient } from "./_client";
import { JsonLd } from "@/components/json-ld";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    alternates: getAlternates("/help"),
    title: t("helpTitle"),
    description: t("helpDescription"),
    openGraph: {
      title: t("helpTitle"),
      description: t("helpDescription"),
      images: ["/logo-cat.png"],
    },
  };
}

const FAQ_KEYS = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
  { q: "q4", a: "a4" },
  { q: "q5", a: "a5" },
  { q: "q6", a: "a6" },
  { q: "q7", a: "a7" },
  { q: "q8", a: "a8" },
];

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "help" });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KEYS.map(({ q, a }) => ({
      "@type": "Question",
      name: t(q as never),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(a as never),
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <HelpClient />
    </>
  );
}
