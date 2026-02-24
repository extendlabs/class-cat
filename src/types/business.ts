import type { Activity, Instructor, Review, RatingDistribution, GalleryImage } from "./activity";
import type { Court } from "./court";

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface BusinessContact {
  phone: string;
  email: string;
  website: string;
}

export interface BusinessSocial {
  instagram?: string;
  facebook?: string;
}

export interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
}

export interface Business {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  coverImage: string;
  logo: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  address: string;
  coordinates: { lat: number; lng: number };
  hours: BusinessHours[];
  contact: BusinessContact;
  social: BusinessSocial;
  activities: Activity[];
  instructors: Instructor[];
  reviews: Review[];
  ratingDistribution: RatingDistribution[];
  gallery: GalleryImage[];
  locations?: BusinessLocation[];
  courts?: Court[];
}
