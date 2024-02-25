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
const initialState: SearchLocationState = {
  locations: [],
};
const searchHistorySlice = createSlice({
  name: "searchHistoryArray",
  initialState,
  reducers: {
    addSearchLocation(state, action: PayloadAction<SearchLocationType>) {
      state.locations = [...state.locations, action.payload];
    },
    removeSearchLocation(state, action: PayloadAction<string>) {
      state.locations = state.locations.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addSearchLocation, removeSearchLocation } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
