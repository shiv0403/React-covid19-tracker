import React from "react";
import "./Stats.css";
import Infobox from "./Infobox";

function Stats() {
  return (
    <div className="stats">
      <Infobox title="Coronavirus Cases" total={2000} cases={12345} />
      <Infobox title="Reacovered" total={3000} cases={200} />
      <Infobox title="Deaths" total={1000} cases={10} />
    </div>
  );
}

export default Stats;
