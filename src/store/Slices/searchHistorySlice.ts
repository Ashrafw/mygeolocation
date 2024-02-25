import { LatLngLiteral } from "@/components/MapView";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchLocationType {
  id: string;
  latLang: LatLngLiteral;
  address: string;
}
interface SearchLocationState {
  locations: SearchLocationType[];
}
const storedValue = localStorage.getItem("locationsGeoHistory");

const initialState: SearchLocationState = {
  locations: JSON.parse(storedValue || "[]") ?? [],
};
const searchHistorySlice = createSlice({
  name: "searchHistoryArray",
  initialState,
  reducers: {
    addSearchLocation(state, action: PayloadAction<SearchLocationType>) {
      state.locations = [...state.locations, action.payload];
      localStorage.setItem("locationsGeoHistory", JSON.stringify(state.locations));
    },
    removeSearchLocation(state, action: PayloadAction<string>) {
      state.locations = state.locations.filter((item) => item.id !== action.payload);
      localStorage.setItem("locationsGeoHistory", JSON.stringify(state.locations));
    },
  },
});

export const { addSearchLocation, removeSearchLocation } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
