import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <Image
          src="/logo-cat.png"
          alt="ClassCat"
          width={120}
          height={120}
          className="mx-auto"
        />

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {t("heading")}
          </h1>
          <p className="text-gray-500 leading-relaxed">
            {t("description")}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-coral text-white font-medium text-sm hover:bg-coral-hover transition-colors shadow-[var(--shadow-soft)]"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
