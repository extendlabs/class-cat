"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as ImageIcon,
  ListBullets,
  CalendarBlank,
  Info,
  Eye,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BusinessActivity } from "@/types/business-portal";
import type { Category, TimeSlot } from "@/types/activity";
import {
  activitySchema,
  getDefaults,
  type FormValues,
  type ActivityFormDialogProps,
} from "@/lib/activity-form-schema";
import {
  ActivityBasicInfoFields,
  ActivityDetailsFields,
  ActivityContentFields,
  ActivityScheduleFields,
  ActivityPreview,
} from "@/components/features/activity-form";

export function ActivityFormDialog({
  open,
  onClose,
  onSubmit,
  mode,
  activity,
  instructors,
}: ActivityFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => {
      if (!v) onClose();
    }}>
      <DialogContent className="rounded-2xl max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0">
        <ActivityFormDialogContent
          onClose={onClose}
          onSubmit={onSubmit}
          mode={mode}
          activity={activity}
          instructors={instructors}
        />
      </DialogContent>
    </Dialog>
  );
}

function ActivityFormDialogContent({
  onClose,
  onSubmit,
  mode,
  activity,
  instructors,
}: Omit<ActivityFormDialogProps, "open">) {
  const [showPreview, setShowPreview] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: getDefaults(activity),
  });

  const galleryArray = useFieldArray({ control: form.control, name: "gallery" });
  const learnArray = useFieldArray({ control: form.control, name: "whatYouLearn" });
  const curriculumArray = useFieldArray({ control: form.control, name: "curriculum" });
  const timesArray = useFieldArray({ control: form.control, name: "availableTimes" });

  const handleSubmit = (values: FormValues) => {
    const priceTag =
      values.priceAmount === 0
        ? ("free" as const)
        : values.priceAmount <= 20
          ? ("$" as const)
          : values.priceAmount <= 50
            ? ("$$" as const)
            : ("$$$" as const);

    onSubmit({
      title: values.title,
      description: values.description,
      category: values.category as Category,
      status: values.status as BusinessActivity["status"],
      priceAmount: values.priceAmount,
      price: priceTag,
      maxStudents: values.maxStudents,
      maxCapacity: values.maxStudents,
      duration: values.duration,
      ageRange: values.ageRange,
      skillLevel: values.skillLevel,
      classType: values.classType,
      materialsIncluded: values.materialsIncluded ?? "",
      location: values.location,
      instructorId: values.instructorId || undefined,
      timeSlots: [values.timeSlots as TimeSlot],
      availableTimes: values.availableTimes?.map((t) => t.value).filter(Boolean) ?? [],
      nextDate: values.nextDate ?? "",
      image:
        values.image ||
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      gallery:
        values.gallery?.map((g, i) => ({
          src: g.url,
          alt: `Gallery image ${i + 1}`,
          caption: "",
        })) ?? [],
      whatYouLearn: values.whatYouLearn?.map((w) => w.value).filter(Boolean) ?? [],
      curriculum:
        values.curriculum?.map((c, i) => ({
          week: i + 1,
          title: c.title,
          description: c.description,
        })) ?? [],
    });
    form.reset();
    onClose();
  };

  return (
    <>
      <DialogHeader className="px-6 pt-6 pb-0">
        <DialogTitle className="text-xl font-bold">
          {mode === "create" ? "New Activity" : "Edit Activity"}
        </DialogTitle>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details that will appear on the activity page.
        </p>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Tabs defaultValue="basic" className="px-6 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="basic" className="flex-1 gap-1.5 text-xs">
                <Info size={14} />
                Basic
              </TabsTrigger>
              <TabsTrigger value="details" className="flex-1 gap-1.5 text-xs">
                <ListBullets size={14} />
                Details
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1 gap-1.5 text-xs">
                <CalendarBlank size={14} />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="content" className="flex-1 gap-1.5 text-xs">
                <ImageIcon size={14} />
                Content
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="pt-4">
              <ActivityBasicInfoFields form={form} instructors={instructors} />
            </TabsContent>

            <TabsContent value="details" className="pt-4">
              <ActivityDetailsFields form={form} />
            </TabsContent>

            <TabsContent value="schedule" className="pt-4">
              <ActivityScheduleFields form={form} timesArray={timesArray} />
            </TabsContent>

            <TabsContent value="content" className="pt-4">
              <ActivityContentFields
                form={form}
                galleryArray={galleryArray}
                learnArray={learnArray}
                curriculumArray={curriculumArray}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="px-6 py-4 border-t border-gray-100 mt-4 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              className="rounded-full gap-1.5"
              onClick={() => setShowPreview(true)}
            >
              <Eye size={14} />
              Preview
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-coral hover:bg-coral-hover text-white"
              >
                {mode === "create" ? "Create Activity" : "Save Changes"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>

      {showPreview && (
        <ActivityPreview
          values={form.getValues()}
          onBack={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
