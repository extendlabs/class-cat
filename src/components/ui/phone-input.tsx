"use client";

import { useState, useRef, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface CountryCode {
  code: string;
  dialCode: string;
  flag: string;
}

const COUNTRIES: CountryCode[] = [
  { code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { code: "US", dialCode: "+1",  flag: "🇺🇸" },
  { code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { code: "CZ", dialCode: "+420", flag: "🇨🇿" },
  { code: "SK", dialCode: "+421", flag: "🇸🇰" },
  { code: "UA", dialCode: "+380", flag: "🇺🇦" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export function PhoneInput({
  value,
  onChange,
  error,
  placeholder = "000 000 000",
  className,
}: PhoneInputProps) {
  const [selected, setSelected] = useState<CountryCode>(COUNTRIES[0]);
  const [open, setOpen] = useState(false);
  const [localNumber, setLocalNumber] = useState(() => {
    // Strip dial code prefix if already stored
    if (value.startsWith(selected.dialCode)) {
      return value.slice(selected.dialCode.length).trimStart();
    }
    return value;
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleCountrySelect(country: CountryCode) {
    setSelected(country);
    setOpen(false);
    const digits = localNumber.replace(/\D/g, "");
    onChange(digits ? `${country.dialCode}${digits}` : "");
  }

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d\s\-]/g, "");
    setLocalNumber(raw);
    // E.164 for backend: strip all non-digits from local part
    const digits = raw.replace(/\D/g, "");
    onChange(digits ? `${selected.dialCode}${digits}` : "");
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        className={cn(
          "flex items-center rounded-md border bg-white shadow-sm",
          error ? "border-red-300" : "border-input",
          "focus-within:ring-1 focus-within:ring-ring"
        )}
      >
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 px-3 py-2 border-r border-input text-sm shrink-0 hover:bg-gray-50 transition-colors rounded-l-md"
        >
          <span className="text-base leading-none">{selected.flag}</span>
          <span className="text-gray-600 font-medium tabular-nums">{selected.dialCode}</span>
          <CaretDown size={12} className="text-gray-400" />
        </button>

        {/* Number input */}
        <input
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-sm bg-transparent outline-none rounded-r-md placeholder:text-gray-400"
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 left-0 w-52 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleCountrySelect(c)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors text-left",
                selected.code === c.code && "bg-coral/5 text-coral font-medium"
              )}
            >
              <span className="text-base">{c.flag}</span>
              <span className="text-gray-500 tabular-nums w-10">{c.dialCode}</span>
              <span className="text-gray-700">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
