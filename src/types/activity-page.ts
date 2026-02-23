export type ActivityPageState = {
  selectedTime: number;
  galleryOpen: boolean;
  galleryIndex: number;
  visibleReviewCount: number;
  reviewFilter: "all" | number;
};

export type ActivityPageAction =
  | { type: "SELECT_TIME"; index: number }
  | { type: "OPEN_GALLERY"; index: number }
  | { type: "CLOSE_GALLERY" }
  | { type: "SET_GALLERY_INDEX"; index: number }
  | { type: "SHOW_MORE_REVIEWS" }
  | { type: "SET_REVIEW_FILTER"; filter: "all" | number };
