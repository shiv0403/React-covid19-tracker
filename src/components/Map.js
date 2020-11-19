import React, { useState, useEffect } from "react";
import ReactMapGl, { Popup } from "react-map-gl";
import { Circle } from "leaflet";
import { showDataOnMap } from "./util";

function Map({ lati, longi, countries }) {
  const [viewport, setviewport] = useState({
    latitude: lati,
    longitude: longi,
    zoom: 5,
    height: "500px",
    width: "1100px",
  });

  useEffect(() => {
    setviewport({
      latitude: lati,
      longitude: longi,
      zoom: 4,
      height: "500px",
      width: "1100px",
    });
  }, [lati, longi]);

  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoic2dpZ2l0d3ciLCJhIjoiY2tob2doYXo4MDBvaDMxbWdwcWEyaXlkZCJ9.7d9qXA-yPCOo9iqealIpfg"
        mapStyle="mapbox://styles/sgigitww/ckhogzgi0083619niyeh07psh"
        onViewportChange={(viewport) => {
          setviewport(viewport);
        }}
      >
        {/* markers */}
        {showDataOnMap(countries)}
      </ReactMapGl>
    </div>
  );
}

export default Map;
