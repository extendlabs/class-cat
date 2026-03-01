import type { Activity } from "./activity";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  memberSince: string;
  totalBookings: number;
  businessId?: string;
  instructorId?: string;
  isBusinessInstructor?: boolean;
}

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface Booking {
  id: string;
  activity: Activity;
  date: string;
  time: string;
  status: BookingStatus;
}

export interface UserReview {
  id: string;
  activityTitle: string;
  activityId: string;
  providerName: string;
  rating: number;
  text: string;
  date: string;
}

export interface UserSettings {
  notifications: {
    bookingUpdates: boolean;
    newClasses: boolean;
    promotions: boolean;
    reminders: boolean;
  };
  defaultRadius: string;
  language: string;
  privacyProfilePublic: boolean;
  privacyShowBookings: boolean;
}
