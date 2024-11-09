"use client";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
type props = {
  location: {
    lat: number;
    lng: number;
  };
  zoom: number;
  containerStyle?: object;
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map({ location, zoom }: props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={zoom}>
      <Marker position={location} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
