import { CalendarBlank } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import { BookingItem } from "./booking-item";
import type { Booking } from "@/types/user";

export function UpcomingBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <AnimateIn>
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Upcoming
        </h3>
        {bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} variant="upcoming" />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-[var(--shadow-soft)]">
            <CalendarBlank
              size={32}
              className="mx-auto text-gray-300 mb-2"
            />
            <p className="text-sm text-gray-500">
              No upcoming bookings
            </p>
          </div>
        )}
      </section>
    </AnimateIn>
  );
}
