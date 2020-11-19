import React, { useState, useEffect } from "react";
import ReactMapGl, { Popup, Marker } from "react-map-gl";
import "./Map.css";
import numeral from "numeral";

function Map({ lati, longi, countries }) {
  const [selectedCountry, setselectedCountry] = useState(null);

  const [viewport, setviewport] = useState({
    latitude: lati,
    longitude: longi,
    zoom: 4,
    height: "500px",
    width: "1100px",
  });

  useEffect(() => {
    setviewport({
      latitude: lati,
      longitude: longi,
      zoom: 5,
      height: "500px",
      width: "1100px",
    });
  }, [lati, longi]);

  return (
    <div className="map">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoic2dpZ2l0d3ciLCJhIjoiY2tob2doYXo4MDBvaDMxbWdwcWEyaXlkZCJ9.7d9qXA-yPCOo9iqealIpfg"
        mapStyle="mapbox://styles/sgigitww/ckhogzgi0083619niyeh07psh"
        onViewportChange={(viewport) => {
          setviewport(viewport);
        }}
      >
        {countries.map((country) => (
          <Marker
            latitude={country.countryInfo.lat}
            longitude={country.countryInfo.long}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setselectedCountry(country);
              }}
            >
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/2950/2950022.svg"
                alt="corona-cases"
              />
            </button>
          </Marker>
        ))}

        {selectedCountry ? (
          <Popup
            latitude={selectedCountry.countryInfo.lat}
            longitude={selectedCountry.countryInfo.long}
            onClose={() => {
              setselectedCountry(null);
            }}
            className="popup"
          >
            <div
              style={{
                backgroundImage: `url(${selectedCountry.countryInfo.flag})`,
              }}
              className="popup_flag"
            />
            <div className="popup_country">{selectedCountry.country}</div>
            <div className="popup_info">
              <h2>
                <span className="popup_span">Cases:</span>{" "}
                {numeral(selectedCountry.cases).format("0,0")}
              </h2>
            </div>
            <div className="popup_info">
              <h2>
                <span className="popup_span">Recovered:</span>{" "}
                {numeral(selectedCountry.recovered).format("0,0")}
              </h2>
            </div>
            <div className="popup_info">
              <h2>
                <span className="popup_span">Death:</span>{" "}
                {numeral(selectedCountry.deaths).format("0,0")}
              </h2>
            </div>
          </Popup>
        ) : null}
      </ReactMapGl>
    </div>
  );
}

export default Map;
