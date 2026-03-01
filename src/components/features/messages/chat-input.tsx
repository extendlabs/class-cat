"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PaperPlaneTilt } from "@phosphor-icons/react";

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("messages");
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="px-4 py-3 border-t border-gray-100 bg-white">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={t("sendPlaceholder")}
          disabled={disabled}
          className="flex-1 text-sm bg-white border border-gray-200 rounded-full px-4 py-2.5 outline-none focus:border-coral/30 focus:ring-2 focus:ring-coral/10 transition-all placeholder:text-gray-400 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="w-9 h-9 bg-coral hover:bg-coral-hover text-white rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-sm shadow-coral/20"
        >
          <PaperPlaneTilt size={16} weight="fill" />
        </button>
      </div>
    </div>
  );
}
