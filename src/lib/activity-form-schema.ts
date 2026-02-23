import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import type { BusinessActivity } from "@/types/business-portal";
import type { Category, TimeSlot } from "@/types/activity";

export const CATEGORIES: Category[] = [
  "wellness",
  "sports",
  "arts",
  "music",
  "education",
  "cooking",
  "dance",
  "fitness",
  "outdoor",
  "tech",
];

export const TIME_SLOTS: TimeSlot[] = ["morning", "afternoon", "evening", "weekend"];

export const CLASS_TYPES = ["Group Classes", "Private 1-on-1", "Semi-Private", "Workshop"];

export const activitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  priceAmount: z.number().min(0, "Price must be >= 0"),
  maxStudents: z.number().min(1, "At least 1 student"),
  duration: z.string().min(1, "Duration is required"),
  ageRange: z.string().min(1, "Age range is required"),
  skillLevel: z.string().min(1, "Skill level is required"),
  classType: z.string().min(1, "Class type is required"),
  materialsIncluded: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  timeSlots: z.string().min(1, "Select a time slot"),
  availableTimes: z.array(z.object({ value: z.string().min(1, "Required") })).optional(),
  nextDate: z.string().optional(),
  image: z.string(),
  gallery: z.array(z.object({ url: z.string().min(1) })).optional(),
  whatYouLearn: z.array(z.object({ value: z.string().min(1, "Required") })).optional(),
  curriculum: z
    .array(
      z.object({
        title: z.string().min(1, "Title required"),
        description: z.string().min(1, "Description required"),
      })
    )
    .optional(),
});

export type FormValues = z.infer<typeof activitySchema>;

export interface ActivityFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<BusinessActivity>) => void;
  mode: "create" | "edit";
  activity?: BusinessActivity;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormInstance = ReturnType<typeof useForm<FormValues>>;

export interface TabFieldsProps {
  form: FormInstance;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldArrayInstance = ReturnType<typeof useFieldArray<any, any>>;

export interface ContentTabFieldsProps extends TabFieldsProps {
  galleryArray: FieldArrayInstance;
  learnArray: FieldArrayInstance;
  curriculumArray: FieldArrayInstance;
}

export interface ScheduleTabFieldsProps extends TabFieldsProps {
  timesArray: FieldArrayInstance;
}

export function getDefaults(activity?: BusinessActivity): FormValues {
  return {
    title: activity?.title ?? "",
    description: activity?.description ?? "",
    category: activity?.category ?? "fitness",
    status: activity?.status ?? "draft",
    priceAmount: activity?.priceAmount ?? 0,
    maxStudents: activity?.maxStudents ?? 20,
    duration: activity?.duration ?? "60 min",
    ageRange: activity?.ageRange ?? "All ages",
    skillLevel: activity?.skillLevel ?? "All levels",
    classType: activity?.classType ?? "Group Classes",
    materialsIncluded: activity?.materialsIncluded ?? "",
    location: activity?.location ?? "",
    timeSlots: activity?.timeSlots?.[0] ?? "morning",
    availableTimes: activity?.availableTimes?.map((v) => ({ value: v })) ?? [],
    nextDate: activity?.nextDate ?? "",
    image: activity?.image ?? "",
    gallery: activity?.gallery?.map((g) => ({ url: g.src })) ?? [],
    whatYouLearn: activity?.whatYouLearn?.map((v) => ({ value: v })) ?? [],
    curriculum:
      activity?.curriculum?.map((c) => ({
        title: c.title,
        description: c.description,
      })) ?? [],
  };
}
