"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Heart, X, Trash } from "@phosphor-icons/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useLikedActivities } from "@/hooks/use-liked-activities";

export function LikedSidebar({ children }: { children: React.ReactNode }) {
  const t = useTranslations("liked");
  const { likedItems, removeLike, clearAll } = useLikedActivities();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        overlayClassName="bg-transparent"
        className="rounded-l-2xl border-l-0 shadow-[-8px_0_12px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>
            {t("countLabel", { count: likedItems.length })}
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-4 flex flex-col gap-3 flex-1 overflow-y-auto">
          {likedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                {t("empty")}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {t("emptyDescription")}
              </p>
            </div>
          ) : (
            likedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:border-coral/20 transition-all group"
              >
                <Link
                  href={`/activity/${item.id}`}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="48px"
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-coral transition-colors">
                    {item.title}
                  </span>
                </Link>
                <button
                  onClick={() => removeLike(item.id)}
                  className="p-1.5 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 rounded-full hover:bg-red-50"
                  aria-label={`Remove ${item.title}`}
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
            ))
          )}
        </div>

        {likedItems.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <button
              onClick={clearAll}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-coral hover:bg-coral-hover text-white text-sm font-medium transition-all active:scale-[0.98] shadow-sm shadow-coral/20"
            >
              <Trash size={16} weight="bold" />
              {t("clearAll")}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
