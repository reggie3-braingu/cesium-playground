import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClockState {
  elapsedSeconds: number;
  speedModifier: number;
}

const initialClockState = {
  elapsedSeconds: 0,
  speedModifier: 100,
};

const ClockStateSlice = createSlice({
  name: "ClockState",
  initialState: initialClockState,
  reducers: {
    setElapsedSeconds: (state: ClockState, action: PayloadAction<number>) => {
      state.elapsedSeconds = action.payload;
    },
    incrementElapsedSeconds: (state: ClockState) => {
      state.elapsedSeconds = state.elapsedSeconds + 1 * state.speedModifier;
    },
  },
});

export const { incrementElapsedSeconds, setElapsedSeconds } =
  ClockStateSlice.actions;
const uiStateReducer = ClockStateSlice.reducer;
export default uiStateReducer;
