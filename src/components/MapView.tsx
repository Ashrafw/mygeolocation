import { useCallback, useEffect, useState } from "react";

import {
  Map,
  MapCameraChangedEvent,
  MapMouseEvent,
  Marker,
} from "@vis.gl/react-google-maps";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { setCurrentLocation } from "../store/Slices/currentLocationSlice";

import { MapCameraProps } from "@vis.gl/react-google-maps";

export type LatLngLiteral = google.maps.LatLngLiteral;

const MapView = () => {
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector((state) => state.currentLocation);
  const [zoom, setZoom] = useState(12);
  const [cameraProps, setCameraProps] = useState<MapCameraProps>({
    center: currentLocation.value,
    zoom: 12,
  });

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      setCameraProps(ev.detail);
      setZoom(ev.detail.zoom);
    },
    [currentLocation.value]
  );

  const handleClick = useCallback((ev: MapMouseEvent) => {
    if (ev?.detail?.latLng?.lat) {
      dispatch(setCurrentLocation(ev.detail.latLng));
    }
  }, []);

  useEffect(() => {
    setCameraProps({
      center: currentLocation.value,
      zoom: zoom,
    });
  }, [currentLocation.value]);

  return (
    <div className="rounded-lg overflow-hidden w-full h-[100%] border shadow">
      <Map
        {...cameraProps}
        onCameraChanged={handleCameraChange}
        onClick={handleClick}
        streetViewControl={false}
      >
        <Marker position={currentLocation.value} />
      </Map>
    </div>
  );
};

export default MapView;
