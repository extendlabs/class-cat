import { AnimateIn } from "@/components/ui/animate-in";
import { BookingItem } from "./booking-item";
import type { Booking } from "@/types/user";

export function PastBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <AnimateIn delay={100}>
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Past</h3>
        {bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} variant="past" />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-[var(--shadow-soft)]">
            <p className="text-sm text-gray-500">No past bookings</p>
          </div>
        )}
      </section>
    </AnimateIn>
  );
}
