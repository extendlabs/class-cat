import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations("cta");
  return (
    <section className="relative rounded-[40px] p-10 md:p-16 overflow-hidden bg-secondary">
      {/* Decorative blurred shapes */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-coral/[0.12] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 bg-coral/[0.08] rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-coral/[0.03] rounded-full blur-3xl" />

      {/* Mascot image — positioned absolutely so text stays centered */}
      <div className="hidden md:block absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-10">
        <div className="relative w-72 h-72 drop-shadow-xl">
          <Image
            src="/cat-mascot.png"
            alt={t("mascotAlt")}
            fill
            className="object-contain"
            sizes="288px"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/?tab=all"
            className="bg-coral hover:bg-coral-hover text-white px-10 py-4 rounded-full font-bold shadow-sm shadow-coral/20 transition-all hover:-translate-y-0.5 text-center"
          >
            {t("exploreClasses")}
          </Link>
          <Link
            href="/for-business"
            className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-full font-bold shadow-[var(--shadow-soft)] border border-gray-200 transition-all hover:-translate-y-1 text-center"
          >
            {t("teachAClass")}
          </Link>
        </div>
      </div>
    </section>
  );
}
