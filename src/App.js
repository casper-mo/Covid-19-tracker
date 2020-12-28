import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, Card } from "@material-ui/core";
import axios from "axios";
import Loading from "./Components/Loading/Loading.component";
import InfoBox from "./Components/InfoBox/InfoBox.component";
import Table from "./Components/Table/Table.component";
import Map from "./Components/Map/Map.component";
import LineGraph from "./Components/LineGraph/LineGraph.component";
import { sortTableData } from "./utils";
import Logo from "./Assets/images/image.png";
import "leaflet/dist/leaflet.css";
import "./App.css";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [caseType, setCaseType] = useState("cases");
  const fetchCountriesData = () => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        const countries = response.data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countries);
        const sortedData = sortTableData(response.data);
        setTableData(sortedData);
        setMapCountries(response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const fetchCountryInfo = (url) => {
    axios
      .get(url)
      .then((response) => {
        setCountryInfo(response.data);
        setMapCenter([
          response.data.countryInfo.lat,
          response.data.countryInfo.long,
        ]);
        setMapZoom(4);
      })
      .catch((error) => {});
  };

  const onChangeCountry = (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetchCountryInfo(url);
    setSelectCountry(countryCode);
  };
  useEffect(() => {
    fetchCountriesData();
    fetchCountryInfo("https://disease.sh/v3/covid-19/all");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {}, [countryInfo]);
  useEffect(() => {}, [mapCenter]);
  return !loading ? (
    <div className="app__main">
      <div className="app__content">
        <header className="app__header">
          <img src={Logo} alt="COVID-tracker" />

          <FormControl className="app_dropdown">
            <Select
              value={selectCountry}
              variant="outlined"
              onChange={onChangeCountry}
            >
              <MenuItem value="worldwide">World wide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem value={country.value} key={index}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </header>
        <section className="app_states">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            clickHandle={() => setCaseType("cases")}
            isActive={caseType === "cases"}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            clickHandle={() => setCaseType("recovered")}
            isActive={caseType === "recovered"}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            clickHandle={() => setCaseType("deaths")}
            isActive={caseType === "deaths"}
          />
        </section>
        <Map
          zoom={mapZoom}
          center={mapCenter}
          countries={mapCountries}
          casesType={caseType}
        />
      </div>
      <div className="app_sideBar">
        <Card>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {caseType}</h3>
          <LineGraph casesType={caseType} />
        </Card>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default App;
