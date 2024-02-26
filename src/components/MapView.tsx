import { useCallback, useState } from "react";

import {
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  MapMouseEvent,
  Pin,
} from "@vis.gl/react-google-maps";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { setCurrentLocation } from "../store/Slices/currentLocationSlice";

import { MapCameraProps } from "@vis.gl/react-google-maps";

export type LatLngLiteral = google.maps.LatLngLiteral;

const MapView = () => {
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector((state) => state.currentLocation);
  const allLocations = useAppSelector((state) => state.location);
  const [zoom, _] = useState(12);
  const [cameraProps, setCameraProps] = useState<MapCameraProps>({
    center: currentLocation.value,
    zoom: 12,
  });

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      let x = currentLocation.value.lng;
      let y = currentLocation.value.lat;
      // checking if the pin is in bound of camera view else refocuses
      if (
        y > ev.detail.bounds.north ||
        y < ev.detail.bounds.south ||
        x > ev.detail.bounds.east ||
        x < ev.detail.bounds.west
      ) {
        setCameraProps({
          center: currentLocation.value,
          zoom: zoom,
        });
      } else {
        setCameraProps(ev.detail);
      }
    },
    [currentLocation.value]
  );

  const handleClick = useCallback((ev: MapMouseEvent) => {
    if (ev?.detail?.latLng?.lat) {
      dispatch(setCurrentLocation(ev.detail.latLng));
    }
  }, []);

  return (
    <div className="rounded-lg overflow-hidden w-full h-[100%] border shadow">
      <Map
        {...cameraProps}
        onCameraChanged={handleCameraChange}
        onClick={handleClick}
        streetViewControl={false}
        mapId={"43f8830e23176c62"}
      >
        <AdvancedMarker position={currentLocation.value}>
          <Pin background={"#45d7ff"} glyphColor={"#1E293B"} borderColor={"#1E293B"} />
        </AdvancedMarker>
        {allLocations.locations
          .filter((loc) => loc.latLang !== currentLocation.value)
          .map((loc) => (
            <AdvancedMarker key={loc.id} position={loc.latLang}>
              <span className="text-3xl">📍</span>
            </AdvancedMarker>
          ))}
      </Map>
    </div>
  );
};

export default MapView;
