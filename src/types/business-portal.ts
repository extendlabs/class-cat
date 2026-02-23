import type { Activity, Category, CurriculumItem, GalleryImage, TimeSlot } from "./activity";

export type BusinessCategory =
  | "wellness"
  | "sports"
  | "arts"
  | "music"
  | "education"
  | "cooking"
  | "dance"
  | "fitness"
  | "outdoor"
  | "tech";

export type BusinessActivityStatus = "active" | "draft" | "paused";

export interface BusinessOnboardingData {
  category: BusinessCategory;
  companyName: string;
  ownerFirstName: string;
  ownerLastName: string;
  phone: string;
  acceptedPrivacy: boolean;
  address: string;
  coordinates: { lat: number; lng: number };
  hours: {
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }[];
  employees: {
    name: string;
    specialty: string;
    avatarUrl: string;
  }[];
}

export interface BusinessNotification {
  id: string;
  type: "booking" | "review" | "system" | "promotion";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export interface BusinessStats {
  totalStudents: number;
  totalBookings: number;
  avgRating: number;
  monthlyRevenue: number;
  activitiesCount: number;
  upcomingClasses: number;
}

export interface BusinessActivity extends Activity {
  status: BusinessActivityStatus;
  enrolledCount: number;
  maxCapacity: number;
  nextSessionDate: string;
  createdAt: string;
  duration: string;
  ageRange: string;
  skillLevel: string;
  maxStudents: number;
  classType?: string;
  materialsIncluded?: string;
  whatYouLearn?: string[];
  curriculum?: CurriculumItem[];
  availableTimes?: string[];
  nextDate?: string;
  gallery?: GalleryImage[];
  badges?: string[];
}

export interface BusinessSettings {
  notifications: {
    newBookings: boolean;
    cancellations: boolean;
    reviews: boolean;
    promotions: boolean;
    weeklyReport: boolean;
  };
  businessInfo: {
    name: string;
    tagline: string;
    description: string;
    category: BusinessCategory;
  };
  social: {
    instagram: string;
    facebook: string;
    website: string;
  };
  privacy: {
    profilePublic: boolean;
    showRevenue: boolean;
    showStudentCount: boolean;
  };
}

export interface BusinessPromotion {
  id: string;
  activityId: string;
  activityTitle: string;
  dailyBudget: number;
  startDate: string;
  endDate: string;
  status: "active" | "paused" | "ended";
  impressions: number;
  clicks: number;
}

export interface WeeklyBookingsData {
  week: string;
  bookings: number;
}

interface BusinessAnalytics {
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  weeklyViews: {
    activity: string;
    views: number[];
  }[];
}
