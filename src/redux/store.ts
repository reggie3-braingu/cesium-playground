import { combineReducers, configureStore } from "@reduxjs/toolkit";
import uiStateReducer from "./uiSlice";
import clockStateReducer from "./clockSlice";
import czmlTimeDataStateReducer from "./czmlTimeDataSlice";

export const rootReducer = combineReducers({
  ui: uiStateReducer,
  clock: clockStateReducer,
  czmlTimeData: czmlTimeDataStateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
