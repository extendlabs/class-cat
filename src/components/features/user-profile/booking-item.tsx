"use client";

import Image from "next/image";
import {
  CalendarBlank,
  MapPin,
  Clock,
  Trash,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Booking } from "@/types/user";
import { BOOKING_STATUS_STYLES as STATUS_STYLES } from "@/lib/status-styles";

export function BookingItem({
  booking,
  variant,
}: {
  booking: Booking;
  variant: "upcoming" | "past";
}) {
  if (variant === "past") {
    return (
      <div className="rounded-2xl bg-white overflow-hidden shadow-[var(--shadow-soft)] border border-gray-100/60 opacity-75">
        <div className="flex gap-4 p-4">
          <Image
            src={booking.activity.image}
            alt={booking.activity.title}
            width={80}
            height={80}
            className="rounded-xl object-cover shrink-0 grayscale-[30%]"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-gray-900 text-sm truncate">
                {booking.activity.title}
              </h4>
              <Badge
                className={`text-[10px] shrink-0 capitalize border ${STATUS_STYLES[booking.status]}`}
              >
                {booking.status}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {booking.activity.provider.name}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CalendarBlank size={12} />
                {new Date(booking.date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {booking.activity.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[var(--shadow-soft)] border border-gray-100/60 hover:shadow-[var(--shadow-hover)] hover:border-coral/10 transition-all">
      <div className="flex items-center gap-4 p-4">
        <Image
          src={booking.activity.image}
          alt={booking.activity.title}
          width={80}
          height={80}
          className="rounded-xl object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-gray-900 text-sm truncate">
              {booking.activity.title}
            </h4>
            <Badge
              className={`text-[10px] shrink-0 capitalize border ${STATUS_STYLES[booking.status]}`}
            >
              {booking.status}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {booking.activity.provider.name}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarBlank size={12} />
              {new Date(booking.date).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric" }
              )}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {booking.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {booking.activity.location}
            </span>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Cancel Booking?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel your booking
                for &quot;{booking.activity.title}&quot;?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full">
                Keep Booking
              </AlertDialogCancel>
              <AlertDialogAction variant="destructive" className="rounded-full">
                Yes, Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
