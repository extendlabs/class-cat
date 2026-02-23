export type BusinessPageState = {
  activeCategory: string;
  galleryOpen: boolean;
  galleryIndex: number;
  visibleReviewCount: number;
  reviewFilter: "all" | number;
};

export type BusinessPageAction =
  | { type: "SET_CATEGORY"; category: string }
  | { type: "OPEN_GALLERY"; index: number }
  | { type: "CLOSE_GALLERY" }
  | { type: "SET_GALLERY_INDEX"; index: number }
  | { type: "SHOW_MORE_REVIEWS" }
  | { type: "SET_REVIEW_FILTER"; filter: "all" | number };
