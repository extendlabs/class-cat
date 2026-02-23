"use client";

import { useRef, useState, useCallback } from "react";
import NextImage from "next/image";
import { Plus, Trash, X, CloudArrowUp } from "@phosphor-icons/react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ContentTabFieldsProps } from "@/lib/activity-form-schema";

function GalleryUploadButton({
  onUpload,
}: {
  onUpload: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList) => {
      const urls: string[] = [];
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          urls.push(URL.createObjectURL(file));
        }
      });
      if (urls.length > 0) onUpload(urls);
    },
    [onUpload]
  );

  return (
    <div
      className={`rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
        dragOver
          ? "border-coral bg-coral/5"
          : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-center py-4 gap-2">
        <CloudArrowUp size={16} className="text-gray-400" />
        <p className="text-xs font-medium text-gray-500">
          Upload gallery images
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function ActivityContentFields({ form, galleryArray, learnArray, curriculumArray }: ContentTabFieldsProps) {
  return (
    <div className="space-y-6">
      {/* What You'll Learn */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <FormLabel>What You&apos;ll Learn</FormLabel>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-coral hover:text-coral-hover"
            onClick={() => learnArray.append({ value: "" })}
          >
            <Plus size={12} className="mr-1" /> Add Item
          </Button>
        </div>
        {learnArray.fields.length === 0 && (
          <p className="text-xs text-gray-400 py-2">
            List the key learning outcomes for students.
          </p>
        )}
        <div className="space-y-2">
          {learnArray.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`whatYouLearn.${index}.value`}
                render={({ field: f }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input className="bg-white" placeholder={`Learning outcome ${index + 1}`} {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 hover:text-red-500"
                onClick={() => learnArray.remove(index)}
              >
                <Trash size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Curriculum */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <FormLabel>Curriculum</FormLabel>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-coral hover:text-coral-hover"
            onClick={() =>
              curriculumArray.append({ title: "", description: "" })
            }
          >
            <Plus size={12} className="mr-1" /> Add Week
          </Button>
        </div>
        {curriculumArray.fields.length === 0 && (
          <p className="text-xs text-gray-400 py-2">
            Break down your program into weekly topics.
          </p>
        )}
        <div className="space-y-3">
          {curriculumArray.fields.map((field, index) => (
            <div
              key={field.id}
              className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Week {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                  onClick={() => curriculumArray.remove(index)}
                >
                  <Trash size={12} />
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`curriculum.${index}.title`}
                render={({ field: f }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="bg-white" placeholder="Week title" {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`curriculum.${index}.description`}
                render={({ field: f }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="What will be covered this week..."
                        rows={2}
                        className="resize-none bg-white"
                        {...f}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Gallery */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <FormLabel>Gallery Images</FormLabel>
        </div>
        {galleryArray.fields.length === 0 && (
          <p className="text-xs text-gray-400 py-2">
            Add additional photos to showcase your activity.
          </p>
        )}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {galleryArray.fields.map((field, index) => (
            <div key={field.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <NextImage
                src={form.getValues(`gallery.${index}.url`) ?? ""}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => galleryArray.remove(index)}
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          ))}
        </div>
        <GalleryUploadButton
          onUpload={(urls) => {
            urls.forEach((url) => galleryArray.append({ url }));
          }}
        />
      </div>
    </div>
  );
}
