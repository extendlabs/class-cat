import type { CourtsPageState, CourtsPageAction } from "@/types/courts-page";

function getMonday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return monday.toISOString().split("T")[0];
}

export const courtsInitialState: CourtsPageState = {
  selectedCourtId: null,
  selectedDate: getMonday(),
  selectedSlots: [],
  showReservationSummary: false,
  weekOffset: 0,
  selectedCourtIndex: null,
};

export function courtsPageReducer(
  state: CourtsPageState,
  action: CourtsPageAction
): CourtsPageState {
  switch (action.type) {
    case "SELECT_COURT":
      return {
        ...state,
        selectedCourtId: action.courtId,
        selectedSlots: [],
        showReservationSummary: false,
        selectedCourtIndex: null,
      };

    case "SET_DATE":
      return { ...state, selectedDate: action.date };

    case "TOGGLE_SLOT": {
      const slot = { date: action.date, hour: action.hour };
      const existing = state.selectedSlots;

      // If clicking an already-selected slot, deselect it
      const alreadySelected = existing.find(
        (s) => s.date === slot.date && s.hour === slot.hour
      );
      if (alreadySelected) {
        return {
          ...state,
          selectedSlots: existing.filter(
            (s) => !(s.date === slot.date && s.hour === slot.hour)
          ),
          showReservationSummary: false,
        };
      }

      // Must be on the same date as existing selections
      if (existing.length > 0 && existing[0].date !== slot.date) {
        return {
          ...state,
          selectedSlots: [slot],
          showReservationSummary: false,
        };
      }

      // Must be consecutive and max 3
      const hours = [...existing.map((s) => s.hour), slot.hour].sort(
        (a, b) => a - b
      );
      const isConsecutive = hours.every(
        (h, i) => i === 0 || h === hours[i - 1] + 1
      );

      if (!isConsecutive || hours.length > 3) {
        // Reset to just this slot
        return {
          ...state,
          selectedSlots: [slot],
          showReservationSummary: false,
        };
      }

      return {
        ...state,
        selectedSlots: [...existing, slot],
        showReservationSummary: false,
      };
    }

    case "CLEAR_SLOTS":
      return { ...state, selectedSlots: [], showReservationSummary: false, selectedCourtIndex: null };

    case "SHOW_RESERVATION_SUMMARY":
      return { ...state, showReservationSummary: action.show };

    case "SET_WEEK_OFFSET": {
      const monday = new Date(getMonday());
      monday.setDate(monday.getDate() + action.offset * 7);
      return {
        ...state,
        weekOffset: action.offset,
        selectedDate: monday.toISOString().split("T")[0],
        selectedSlots: [],
        showReservationSummary: false,
      };
    }

    case "SET_COURT_INDEX":
      return { ...state, selectedCourtIndex: action.courtIndex };

    default:
      return state;
  }
}
