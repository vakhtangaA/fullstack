import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [display, setDisplay] = useState();
  const [weather, setWeather] = useState();
  const [displayedCountry, setCountry] = useState([
    { country: "Georgia", capital: "Tbilisi" },
  ]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      // console.log(response);
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(displayedCountry.length);
    const api_key = process.env.REACT_APP_API_KEY;

    var capital = displayedCountry[0].capital;

    console.log("displayed", displayedCountry);
    console.log(capital);
    axios
      .get(`http://api.weatherstack.com/current`, {
        params: {
          access_key: api_key,
          query: capital,
        },
      })
      .then((weatherResponse) => {
        console.log(weather);
        setWeather(weatherResponse);
      });
  }, [countryName]);

  const handleFilter = () => {
    let regex = new RegExp("^" + countryName, "i");
    let filteredCountries = countries.filter((country) => {
      return regex.test(country.name);
    });

    const countryClick = (event) => {
      let index = event.target.getAttribute("detector");
      // console.log(filteredCountries, detectedCountryIndex);
      setCountry([filteredCountries[index]]);
      setDisplay(
        <div>
          <p>Country: {filteredCountries[index].name}</p>
          <p>Capital: {filteredCountries[index].capital}</p>
          <p>Population: {filteredCountries[index].population}</p>
          <div>
            <b>Languages: </b>
            <ul>
              {filteredCountries[index].languages.map((lang, i) => {
                return <li key={i}>{lang.name}</li>;
              })}
            </ul>
            <img src={filteredCountries[index].flag} alt="flag" />
            {displayedCountry.length == 1 && (
              <p>temperature: {weather.data.current.temperature}</p>
            )}
          </div>
        </div>
      );
    };

    if (countryName === "") {
      setDisplay([]);
    } else if (filteredCountries.length > 10) {
      setDisplay(<p>Too many matches, specify another filter</p>);
    } else if (filteredCountries.length === 1) {
      setCountry([filteredCountries[0]]);
      setDisplay(
        <div>
          <p>Country: {filteredCountries[0].name}</p>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Population: {filteredCountries[0].population}</p>
          <div>
            <b>Languages: </b>
            <ul>
              {filteredCountries[0].languages.map((lang, i) => {
                return <li key={i}>{lang.name}</li>;
              })}
            </ul>
            <img src={filteredCountries[0].flag} alt="flag" />
            {displayedCountry.length == 1 && (
              <p>temperature: {weather.data.current.temperature}</p>
            )}
          </div>
        </div>
      );
    } else {
      setDisplay(
        filteredCountries.map((country, index) => {
          return (
            <div key={country.name} className="country">
              <p>{country.name}</p>
              <button
                detector={index}
                onClick={countryClick}
                className="inlineBtn"
              >
                show
              </button>
            </div>
          );
        })
      );
    }
  };

  const handleChange = (event) => {
    setCountryName(event.target.value);
  };
  return (
    <div className="app">
      <h2>Weather API limit reached</h2>
      <span>find countries</span>

      <input
        type="text"
        value={countryName}
        onChange={handleChange}
        onKeyUp={handleFilter}
      />
      <div> {display}</div>
    </div>
  );
}

export default App;
