import type { BusinessActivity } from "@/types/business-portal";

export interface ActivitiesPageState {
  search: string;
  categoryFilter: string;
  statusFilter: string;
  formOpen: boolean;
  formMode: "create" | "edit";
  editingActivity: BusinessActivity | undefined;
  deleteTarget: BusinessActivity | null;
}

export type ActivitiesPageAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_CATEGORY_FILTER"; payload: string }
  | { type: "SET_STATUS_FILTER"; payload: string }
  | { type: "OPEN_CREATE_FORM" }
  | { type: "OPEN_EDIT_FORM"; payload: BusinessActivity }
  | { type: "CLOSE_FORM" }
  | { type: "SET_DELETE_TARGET"; payload: BusinessActivity | null };

export const activitiesListInitialState: ActivitiesPageState = {
  search: "",
  categoryFilter: "all",
  statusFilter: "all",
  formOpen: false,
  formMode: "create",
  editingActivity: undefined,
  deleteTarget: null,
};

export function activitiesListReducer(
  state: ActivitiesPageState,
  action: ActivitiesPageAction,
): ActivitiesPageState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_CATEGORY_FILTER":
      return { ...state, categoryFilter: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "OPEN_CREATE_FORM":
      return { ...state, formMode: "create", editingActivity: undefined, formOpen: true };
    case "OPEN_EDIT_FORM":
      return { ...state, formMode: "edit", editingActivity: action.payload, formOpen: true };
    case "CLOSE_FORM":
      return { ...state, formOpen: false };
    case "SET_DELETE_TARGET":
      return { ...state, deleteTarget: action.payload };
    default:
      return state;
  }
}
