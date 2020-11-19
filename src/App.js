import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import Infobox from "./components/Infobox";
import Table from "./components/Table";
import { sortData, prettyStat } from "./components/util";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import "./components/Map.css";

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [mapData, setmapData] = useState([]);
  const [mapCenter, setmapCenter] = useState({
    lati: 20,
    longi: 77,
  });

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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

          const sortedData = sortData(data);

          setcountries(countries);
          settableData(sortedData);
          setmapData(data);
        });
    };

    getCountries();
  }, []);

  const changeCountry = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "World Wide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
        setmapCenter({
          lati: data.countryInfo.lat,
          longi: data.countryInfo.long,
        });
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="header">
          <h1>COVID 19 Tracker</h1>
          <FormControl className="app_dropDown">
            <Select variant="outlined" value={country} onChange={changeCountry}>
              {/* loop through all the countries  and display them as options */}
              {countries.map((country) => {
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="stats">
          <Infobox
            title="Coronavirus Cases"
            total={prettyStat(countryInfo.cases)}
            cases={prettyStat(countryInfo.todayCases)}
          />
          <Infobox
            title="Reacovered"
            total={prettyStat(countryInfo.recovered)}
            cases={prettyStat(countryInfo.todayRecovered)}
          />
          <Infobox
            title="Deaths"
            total={prettyStat(countryInfo.deaths)}
            cases={prettyStat(countryInfo.todayDeaths)}
          />
        </div>

        <div style={{ height: "500px", width: "1100px" }} className="map">
          <Map
            lati={mapCenter.lati}
            longi={mapCenter.longi}
            countries={mapData}
          />
        </div>
      </div>

      <Card className="app_right">
        <CardContent>
          <h2 className="app_right_h2">Live corona cases</h2>
          <Table countries={tableData} />
          <h2 className="app_right_h2">Worldwide New Cases</h2>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
