import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const LineGraph = ({ casesType }) => {
  const [data, setData] = useState({});
  const [bgColor, setBgColor] = useState("#CC1034");
  const lineOptions = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastPoint;
    for (let date in data.cases) {
      if (lastPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastPoint,
        };
        chartData.push(newDataPoint);
      }
      lastPoint = data[casesType][date];
    }
    return chartData;
  };
  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => {
        const chartData = buildChartData(response.data, casesType);
        setData(chartData);
      })
      .catch();
    casesType === "recovered" ? setBgColor("#7dd71d") : setBgColor("#CC1034");
  }, [casesType]);
  return (
    <div>
      {data.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: bgColor,
                data: data,
                borderColor: bgColor,
              },
            ],
          }}
          options={lineOptions}
        />
      )}
    </div>
  );
};

export default LineGraph;
