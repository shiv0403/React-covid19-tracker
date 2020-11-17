import React, { useState, useEffect } from "react";
import "./Header.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";

// https//disease.sh/v3/covid-19/countries

function Header() {
  const [countries, setcountries] = useState([]);
  const [country, setCountry] = useState("World Wide");

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            // map returs an array and forEach does not it only iterates
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            };
          });
          setcountries(countries);
        });
    };

    getCountries();
  }, []);

  const changeCountry = async (e) => {
    const countryCode = e.target.value;

    setCountry(countryCode);
  };

  return (
    <div className="header">
      <h1>COVID 19 Tracker</h1>
      <FormControl className="app_dropDown">
        <Select variant="outlined" value={country} onChange={changeCountry}>
          {/* loop through all the countries  and display them as options */}
          {countries.map((country) => {
            return <MenuItem value={country.value}>{country.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
