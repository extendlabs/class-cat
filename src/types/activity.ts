export type Category =
  | "sports"
  | "arts"
  | "music"
  | "cooking"
  | "fitness"
  | "dance"
  | "education"
  | "outdoor"
  | "wellness"
  | "tech";

export type PriceRange = "free" | "$" | "$$" | "$$$";

export type TimeSlot = "morning" | "afternoon" | "evening" | "weekend";

export type Distance = "1km" | "5km" | "10km" | "25km";

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: Category;
  provider: {
    name: string;
    avatar?: string;
  };
  image: string;
  rating: number;
  reviewCount: number;
  price: PriceRange;
  priceAmount?: number;
  distance: number; // in km
  location: string;
  timeSlots: TimeSlot[];
  spotsLeft?: number;
  lat?: number;
  lng?: number;
  businessId?: string;
  instructorId?: string;
  currency?: string;
}

interface SearchFilters {
  query: string;
  category?: Category;
  distance?: Distance;
  price?: PriceRange;
  time?: TimeSlot;
}

interface SearchResult {
  activities: Activity[];
  total: number;
}

// Detail page types

export interface Review {
  id: string;
  authorName: string;
  authorInitials: string;
  date: string;
  rating: number;
  text: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  experience: string;
  bio: string;
  verified: boolean;
  specialty?: string;
  rating?: number;
  email?: string;
  hasAccount?: boolean;
  invited?: boolean;
}

export interface CurriculumItem {
  week: number;
  title: string;
  description: string;
}

export interface RatingDistribution {
  stars: number;
  percentage: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ActivityDetail extends Activity {
  badges: string[];
  ageRange: string;
  duration: string;
  classType: string;
  maxStudents: number;
  skillLevel: string;
  materialsIncluded: string;
  instructorId: string;
  instructor: Instructor;
  businessId: string;
  curriculum: CurriculumItem[];
  whatYouLearn: string[];
  reviews: Review[];
  ratingDistribution: RatingDistribution[];
  gallery: GalleryImage[];
  relatedActivities: Activity[];
  slotsRemaining: number;
  totalSlots: number;
  availableTimes: string[];
  nextDate: string;
}
