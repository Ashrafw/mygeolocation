import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LatLngLiteral } from "../../components/MapView";

interface CurrentLocationState {
  value: LatLngLiteral;
}
const initialState: CurrentLocationState = {
  value: { lat: 51.49996196085223, lng: -0.11014382259187716 },
};
const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState,
  reducers: {
    setCurrentLocation(state, action: PayloadAction<LatLngLiteral>) {
      state.value = action.payload;
    },
  },
});

export const { setCurrentLocation } = currentLocationSlice.actions;
export default currentLocationSlice.reducer;
