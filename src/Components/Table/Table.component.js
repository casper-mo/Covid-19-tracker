import React from "react";

import CountUp from "react-countup";

import "./Table.styles.css";
const Table = ({ countries }) => {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map(({ country, cases }, index) => (
            <tr key={index}>
              <td>{country}</td>
              <td className="table__cases">
                <CountUp
                  end={cases}
                  duration={3}
                  separator=","
                  decimals={3}
                  decimal=","
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
