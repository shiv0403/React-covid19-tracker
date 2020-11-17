import React from "react";
import "./App.css";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Map from "./components/Map";
import { Card, CardContent } from "@material-ui/core";

function App() {
  return (
    <div className="app">
      <div className="app_left">
        <Header />
        <Stats />
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h2>Live corona cases</h2>
          <h3>worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
