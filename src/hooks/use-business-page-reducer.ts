import type { BusinessPageState, BusinessPageAction } from "@/types/business-page";

export function businessPageReducer(
  state: BusinessPageState,
  action: BusinessPageAction
): BusinessPageState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, activeCategory: action.category };
    case "SET_SECTION":
      return { ...state, activeSection: action.section };
    case "OPEN_GALLERY":
      return { ...state, galleryOpen: true, galleryIndex: action.index };
    case "CLOSE_GALLERY":
      return { ...state, galleryOpen: false };
    case "SET_GALLERY_INDEX":
      return { ...state, galleryIndex: action.index };
    case "SHOW_MORE_REVIEWS":
      return { ...state, visibleReviewCount: state.visibleReviewCount + 3 };
    case "SET_REVIEW_FILTER":
      return { ...state, reviewFilter: action.filter, visibleReviewCount: 3 };
    default:
      return state;
  }
}

export const initialState: BusinessPageState = {
  activeCategory: "all",
  activeSection: "activities",
  galleryOpen: false,
  galleryIndex: 0,
  visibleReviewCount: 3,
  reviewFilter: "all",
};

export type { BusinessPageState, BusinessPageAction } from "@/types/business-page";
