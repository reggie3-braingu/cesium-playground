import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  emitterLabelsVisible: boolean;
  assetLabelsVisible: boolean;
}

const initialUiState = {
  emitterLabelsVisible: false,
  assetLabelsVisible: false,
};

const UiStateSlice = createSlice({
  name: "UiState",
  initialState: initialUiState,
  reducers: {
    toggleEmitterLabelsVisible: (state: UiState) => {
      state.emitterLabelsVisible = !state.emitterLabelsVisible;
    },
    toggleAssetLabelsVisible: (state: UiState) => {
      state.assetLabelsVisible = !state.assetLabelsVisible;
    },
  },
});

export const { toggleEmitterLabelsVisible, toggleAssetLabelsVisible } =
  UiStateSlice.actions;
const uiStateReducer = UiStateSlice.reducer;
export default uiStateReducer;
