export type CourtsPageState = {
  selectedCourtId: string | null;
  selectedDate: string; // ISO date
  selectedSlots: { date: string; hour: number }[];
  showReservationSummary: boolean;
  weekOffset: number;
  selectedCourtIndex: number | null;
};

export type CourtsPageAction =
  | { type: "SELECT_COURT"; courtId: string | null }
  | { type: "SET_DATE"; date: string }
  | { type: "TOGGLE_SLOT"; date: string; hour: number }
  | { type: "CLEAR_SLOTS" }
  | { type: "SHOW_RESERVATION_SUMMARY"; show: boolean }
  | { type: "SET_WEEK_OFFSET"; offset: number }
  | { type: "SET_COURT_INDEX"; courtIndex: number | null };
