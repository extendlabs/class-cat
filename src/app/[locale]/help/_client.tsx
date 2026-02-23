"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimateIn } from "@/components/ui/animate-in";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";

interface FaqItem {
  questionKey: string;
  answerKey: string;
}

const generalFaqs: FaqItem[] = [
  { questionKey: "q1", answerKey: "a1" },
  { questionKey: "q2", answerKey: "a2" },
  { questionKey: "q3", answerKey: "a3" },
];

const bookingFaqs: FaqItem[] = [
  { questionKey: "q4", answerKey: "a4" },
  { questionKey: "q5", answerKey: "a5" },
  { questionKey: "q6", answerKey: "a6" },
];

const businessFaqs: FaqItem[] = [
  { questionKey: "q7", answerKey: "a7" },
  { questionKey: "q8", answerKey: "a8" },
];

export function HelpClient() {
  const t = useTranslations("help");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-24 space-y-16 md:space-y-24">
        {/* Hero */}
        <AnimateIn>
          <section className="relative bg-secondary rounded-[40px] p-8 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-coral/[0.12] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-coral/[0.08] rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <span className="inline-block uppercase tracking-widest text-coral font-bold text-xs mb-4">
                {t("badge")}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 text-wrap-balance">
                {t("heroTitle")}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {t("heroSubtitle")}
              </p>
            </div>
          </section>
        </AnimateIn>

        {/* FAQ Sections */}
        <div className="max-w-3xl mx-auto space-y-12">
          <FaqSection title={t("generalTitle")} items={generalFaqs} t={t} delay={80} />
          <FaqSection title={t("bookingTitle")} items={bookingFaqs} t={t} delay={160} />
          <FaqSection title={t("businessTitle")} items={businessFaqs} t={t} delay={240} />
        </div>

        {/* Contact note */}
        <AnimateIn delay={100}>
          <section className="text-center">
            <p className="text-gray-500">
              {t("contactNote")}{" "}
              <Link href="/contact" className="text-coral hover:text-coral-hover font-medium transition-colors">
                {t("contactLink")}
              </Link>
            </p>
          </section>
        </AnimateIn>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

function FaqSection({
  title,
  items,
  t,
  delay,
}: {
  title: string;
  items: FaqItem[];
  t: ReturnType<typeof useTranslations>;
  delay: number;
}) {
  return (
    <AnimateIn delay={delay}>
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.questionKey} value={item.questionKey}>
              <AccordionTrigger className="text-left text-gray-900 hover:text-coral">
                {t(item.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 leading-relaxed">
                {t(item.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </AnimateIn>
  );
}
