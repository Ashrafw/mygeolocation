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
const storedValue = localStorage.getItem("locationsGeo");

const initialState: LocationState = {
  locations: JSON.parse(storedValue || "[]") ?? [],
};
const locationSlice = createSlice({
  name: "locationArray",
  initialState,
  reducers: {
    addLocation(state, action: PayloadAction<LocationType>) {
      state.locations = [...state.locations, action.payload];
      localStorage.setItem("locationsGeo", JSON.stringify(state.locations));
    },
    removeLocation(state, action: PayloadAction<string>) {
      state.locations = state.locations.filter((item) => item.id !== action.payload);
      localStorage.setItem("locationsGeo", JSON.stringify(state.locations));
    },
  },
});

export const { addLocation, removeLocation } = locationSlice.actions;
export default locationSlice.reducer;
