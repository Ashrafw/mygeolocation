import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./Slices/locationSlice";
import currentLocationReducer from "./Slices/currentLocationSlice";
import searchHistoryReducer from "./Slices/searchHistorySlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    currentLocation: currentLocationReducer,
    searchHistory: searchHistoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
