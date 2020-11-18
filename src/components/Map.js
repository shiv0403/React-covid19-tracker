import React from "react";
import { GoogleMap } from "react-google-maps";
import "./Map.css";

function Map({ lati, longi }) {
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: lati, lng: longi }} />
  );
}

export default Map;
