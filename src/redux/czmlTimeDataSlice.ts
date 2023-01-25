import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CzmlTimeData {
  earliestEpochDateTime: string | null;
  availabilityDateTimeRange: [string, string] | null;
}

const initialCzmlTimeData = {
  earliestEpochDateTime: null,
  availabilityDateTimeRange: null,
};

const CzmlTimeDataSlice = createSlice({
  name: "CzmlTimeData",
  initialState: initialCzmlTimeData,
  reducers: {
    setEarliestEpochDateTime: (
      state: CzmlTimeData,
      action: PayloadAction<string>
    ) => {
      state.earliestEpochDateTime = action.payload;
    },
    setAvailabilityDateTimeRange: (
      state: CzmlTimeData,
      action: PayloadAction<[string, string]>
    ) => {
      state.availabilityDateTimeRange = action.payload;
    },
  },
});

export const { setEarliestEpochDateTime, setAvailabilityDateTimeRange } =
  CzmlTimeDataSlice.actions;
const uiStateReducer = CzmlTimeDataSlice.reducer;
export default uiStateReducer;
