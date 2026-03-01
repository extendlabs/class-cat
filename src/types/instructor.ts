import type { Activity, Instructor, Review, RatingDistribution } from "./activity";
import type { InstructorAffiliation } from "./affiliation";

export interface InstructorSocial {
  instagram?: string;
  youtube?: string;
  website?: string;
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
}

export interface InstructorDetail extends Instructor {
  rating: number;
  coverImage: string;
  reviewCount: number;
  totalStudents: number;
  yearsExperience: number;
  totalClasses: number;
  specialties: string[];
  certifications: string[];
  languages: string[];
  achievements: Achievement[];
  social: InstructorSocial;
  classes: Activity[];
  reviews: Review[];
  ratingDistribution: RatingDistribution[];
  businessId: string;
  businessName?: string;
  affiliations?: InstructorAffiliation[];
  isFreelance?: boolean;
}

export interface InstructorStats {
  totalStudents: number;
  activeClasses: number;
  avgRating: number;
  totalReviews: number;
  upcomingClasses: number;
  freelanceClasses?: number;
  affiliatedBusinesses?: number;
  monthlyEarnings?: number;
  freelanceEarnings?: number;
  businessEarnings?: number;
}

export interface InstructorScheduleSlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  activityId?: string;
  activityTitle?: string;
  recurring: boolean;
  businessId?: string;
  businessName?: string;
  source?: "freelance" | "business";
}

export interface InstructorSettings {
  notifications: {
    newBookings: boolean;
    reviews: boolean;
    scheduleChanges: boolean;
    reminders: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showStats: boolean;
  };
}
