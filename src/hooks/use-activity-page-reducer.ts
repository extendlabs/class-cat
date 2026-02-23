import type { ActivityPageState, ActivityPageAction } from "@/types/activity-page";

export type { ActivityPageState, ActivityPageAction };

export function activityPageReducer(state: ActivityPageState, action: ActivityPageAction): ActivityPageState {
  switch (action.type) {
    case "SELECT_TIME":
      return { ...state, selectedTime: action.index };
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

export const initialState: ActivityPageState = {
  selectedTime: 0,
  galleryOpen: false,
  galleryIndex: 0,
  visibleReviewCount: 3,
  reviewFilter: "all",
};
