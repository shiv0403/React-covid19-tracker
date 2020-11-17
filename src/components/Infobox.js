import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function Infobox({ title, cases, total }) {
  return (
    <div className="infobox">
      <Card>
        <CardContent>
          <Typography color="textSecondary" className="infobox_title">
            {title}
          </Typography>

          <h2 className="infobox_cases">{cases}</h2>

          <Typography color="textSecondary" className="infobox_total">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Infobox;
