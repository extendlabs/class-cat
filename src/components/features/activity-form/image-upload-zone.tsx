"use client";

import { useRef, useState, useCallback } from "react";
import NextImage from "next/image";
import { CloudArrowUp } from "@phosphor-icons/react";

export function ImageUploadZone({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onChange(url);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const hasImage = value && (value.startsWith("http") || value.startsWith("blob:"));

  if (hasImage) {
    return (
      <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-100 h-40">
        <NextImage
          src={value}
          alt="Cover"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            type="button"
            className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
            onClick={() => inputRef.current?.click()}
          >
            Replace
          </button>
          <button
            type="button"
            className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 shadow-sm"
            onClick={() => onChange("")}
          >
            Remove
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
        dragOver
          ? "border-coral bg-coral/5"
          : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col items-center justify-center py-8 gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <CloudArrowUp size={20} className="text-gray-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            PNG, JPG or WebP (max 5MB)
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
