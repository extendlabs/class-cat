import type { Court } from "@/types/court";

export interface CourtsPageState {
  search: string;
  sportFilter: string;
  statusFilter: string;
  formOpen: boolean;
  formMode: "create" | "edit";
  editingCourt: Court | undefined;
  deleteTarget: Court | null;
}

export type CourtsPageAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SPORT_FILTER"; payload: string }
  | { type: "SET_STATUS_FILTER"; payload: string }
  | { type: "OPEN_CREATE_FORM" }
  | { type: "OPEN_EDIT_FORM"; payload: Court }
  | { type: "CLOSE_FORM" }
  | { type: "SET_DELETE_TARGET"; payload: Court | null };

export const courtsListInitialState: CourtsPageState = {
  search: "",
  sportFilter: "all",
  statusFilter: "all",
  formOpen: false,
  formMode: "create",
  editingCourt: undefined,
  deleteTarget: null,
};

export function courtsListReducer(
  state: CourtsPageState,
  action: CourtsPageAction,
): CourtsPageState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SPORT_FILTER":
      return { ...state, sportFilter: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "OPEN_CREATE_FORM":
      return { ...state, formMode: "create", editingCourt: undefined, formOpen: true };
    case "OPEN_EDIT_FORM":
      return { ...state, formMode: "edit", editingCourt: action.payload, formOpen: true };
    case "CLOSE_FORM":
      return { ...state, formOpen: false };
    case "SET_DELETE_TARGET":
      return { ...state, deleteTarget: action.payload };
    default:
      return state;
  }
}
