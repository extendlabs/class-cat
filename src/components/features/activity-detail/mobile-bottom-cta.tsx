"use client";

import { useTranslations } from "next-intl";
import { ChatCircle } from "@phosphor-icons/react";
import { useChatSidebar } from "@/components/features/chat-sidebar-context";
import { BRAND_ACCENT } from "@/lib/constants";

type EnrollmentState = "none" | "pending" | "enrolled";

export function MobileBottomCta({
  priceAmount,
  currency = "zł",
  enrollmentState = "none",
  conversationId,
  onApply,
}: {
  priceAmount?: number;
  currency?: string;
  enrollmentState?: EnrollmentState;
  conversationId?: string;
  onApply?: () => void;
}) {
  const t = useTranslations("activity");
  const tCommon = useTranslations("common");
  const { openToConversation } = useChatSidebar();

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/60 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              {priceAmount} {currency}
            </span>
            <span className="text-gray-400 text-sm"> {tCommon("perSession")}</span>
          </div>
          {enrollmentState === "enrolled" ? (
            <button
              onClick={() => conversationId && openToConversation(conversationId)}
              className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold text-base transition-all active:scale-95 bg-emerald-500 hover:bg-emerald-600"
              style={{ boxShadow: `0 10px 25px -5px rgba(16,185,129,0.3)` }}
            >
              <ChatCircle size={18} weight="fill" />
              {t("enrolledOpenChat")}
            </button>
          ) : enrollmentState === "pending" ? (
            <button
              disabled
              className="text-gray-500 px-6 py-3 rounded-xl font-bold text-base bg-gray-100 cursor-not-allowed"
            >
              {t("applicationPending")}
            </button>
          ) : (
            <button
              onClick={onApply}
              className="text-white px-8 py-3 rounded-xl font-bold text-base transition-all active:scale-95 bg-coral hover:bg-coral-hover"
              style={{ boxShadow: `0 10px 25px -5px ${BRAND_ACCENT}33` }}
            >
              {t("applyNow")}
            </button>
          )}
        </div>
      </div>
      {/* Bottom spacer for mobile sticky CTA */}
      <div className="lg:hidden h-20" />
    </>
  );
}
