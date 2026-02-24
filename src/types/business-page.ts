export type BusinessPageState = {
  activeCategory: string;
  activeSection: "activities" | "courts";
  galleryOpen: boolean;
  galleryIndex: number;
  visibleReviewCount: number;
  reviewFilter: "all" | number;
};

export type BusinessPageAction =
  | { type: "SET_CATEGORY"; category: string }
  | { type: "SET_SECTION"; section: "activities" | "courts" }
  | { type: "OPEN_GALLERY"; index: number }
  | { type: "CLOSE_GALLERY" }
  | { type: "SET_GALLERY_INDEX"; index: number }
  | { type: "SHOW_MORE_REVIEWS" }
  | { type: "SET_REVIEW_FILTER"; filter: "all" | number };
