"use client";

import { Plus, Trash } from "@phosphor-icons/react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ScheduleTabFieldsProps } from "@/lib/activity-form-schema";

export function ActivityScheduleFields({ form, timesArray }: ScheduleTabFieldsProps) {
  return (
    <div className="space-y-5">
      <FormField
        control={form.control}
        name="nextDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Next Session Date</FormLabel>
            <FormControl>
              <Input className="bg-white" type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        <div className="flex items-center justify-between mb-2">
          <FormLabel>Available Times</FormLabel>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-coral hover:text-coral-hover"
            onClick={() => timesArray.append({ value: "" })}
          >
            <Plus size={12} className="mr-1" /> Add Time
          </Button>
        </div>
        {timesArray.fields.length === 0 && (
          <p className="text-xs text-gray-400 py-2">
            No times added yet. Click &quot;Add Time&quot; to add available time
            slots.
          </p>
        )}
        <div className="space-y-2">
          {timesArray.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`availableTimes.${index}.value`}
                render={({ field: f }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input className="bg-white" type="time" {...f} />
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
                onClick={() => timesArray.remove(index)}
              >
                <Trash size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
