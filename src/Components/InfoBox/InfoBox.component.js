import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from "react-countup";

import "./infoBox.styles.css";
const InfoBox = ({ title, cases, total, clickHandle, isActive }) => {
  return (
    <Card
      className={`infoBox ${isActive && "infoBox--selected"} ${
        title === "Recovered" && "infoBox--green"
      }`}
      onClick={clickHandle}
    >
      <CardContent>
        <Typography color="textSecondary" className="infoBox__title">
          {title}
        </Typography>
        <h2 className="infoBox__cases">
          <CountUp end={cases} duration={3} />{" "}
        </h2>
        <Typography color="textSecondary" className="infoBox__total">
          <CountUp end={total} duration={3} /> Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
