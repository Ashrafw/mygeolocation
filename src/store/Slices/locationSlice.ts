import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LatLngLiteral } from "../../components/MapView";

// type DirectionsResult = google.maps.DirectionsResult;
// type MapOptions = google.maps.MapOptions;

export interface LocationType {
  id: string;
  latLang: LatLngLiteral;
}
interface LocationState {
  locations: LocationType[];
}
const initialState: LocationState = {
  locations: [],
};
const locationSlice = createSlice({
  name: "locationArray",
  initialState,
  reducers: {
    addLocation(state, action: PayloadAction<LocationType>) {
      state.locations = [...state.locations, action.payload];
    },
    removeLocation(state, action: PayloadAction<string>) {
      state.locations = state.locations.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addLocation, removeLocation } = locationSlice.actions;
export default locationSlice.reducer;
