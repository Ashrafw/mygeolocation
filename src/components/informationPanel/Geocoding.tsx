import React, { useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

import { setCurrentLocation } from "@/store/Slices/currentLocationSlice";
import { addSearchLocation } from "@/store/Slices/searchHistorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { v4 as uuid } from "uuid";
import { LatLngLiteral } from "../MapView";

const Geocoding = ({ address }: { address: string }) => {
  const dispatch = useAppDispatch();
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const searchHistory = useAppSelector((state) => state.searchHistory);
  const currentLocation = useAppSelector((state) => state.currentLocation);

  const [geocodingService, setGeocodingService] = useState<google.maps.Geocoder>();
  const [geocodingResult, setGeocodingResult] = useState<google.maps.GeocoderResult>();
  const [geocodingLatLang, setGeocodingLatLang] = useState<LatLngLiteral>();

  useEffect(() => {
    if (!geocodingApiLoaded) return;
    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingApiLoaded]);

  useEffect(() => {
    if (!geocodingService || !address) return;
    geocodingService.geocode({ address }, (results, status) => {
      if (results && status === "OK") {
        console.log("results", results);
        setGeocodingResult(results[0]);
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        let LatLang = { lat, lng };
        dispatch(setCurrentLocation(LatLang));
        setGeocodingLatLang(LatLang);
        if (!searchHistory.locations.some((item) => item.latLang === LatLang)) {
          dispatch(
            addSearchLocation({
              id: uuid(),
              latLang: { lat, lng },
              address,
            })
          );
        }
      }
    });
  }, [geocodingService, address]);
  if (!geocodingService) return <div>Loading... </div>;
  if (!geocodingResult) return <div className="mt-4">No results found </div>;

  return (
    <div className="mt-4">
      {currentLocation.value === geocodingLatLang ? (
        <>
          <h2 className="text-lg font-semibold">{geocodingResult.formatted_address}</h2>
          <div className=" flex flex-col items-start text-base w-full gap-2">
            <div className="flex flex-col w-full">
              <p>
                <span className=" font-semibold mr-4">Latitude</span>{" "}
                {geocodingResult.geometry.location.lat()}
              </p>
              <p>
                <span className=" font-semibold mr-1">Longitude</span>{" "}
                {geocodingResult.geometry.location.lng()}
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default React.memo(Geocoding);
