import "../styles/WeatherApp.scss";
import React, { useState, useCallback, useEffect } from "react";
import WeatherList from "./WeatherList";
import { v4 as uuid } from "uuid";

export default function WeatherApp() {
  const [searchStatus, setSearchStatus] = useState("");

  const [formData, setFormData] = useState({ city: "skudai", country: "my" });
  const [weatherListData, setWeatherListData] = useState([]);
  const [todayWeather, setTodayWeather] = useState([]);

  const handleChange = (e) => {
    setFormData((currData) => {
      return {
        ...currData,
        [e.target.name]: e.target.value,
      };
    });
  };

  let nums = [3, 1, 2, 10, 1];
  [3, 4, 5, 13, 4];

  const getWeather = (searchCountry, searchCity) => {
    console.log("sec times");
    if (searchCountry.length == 2 && searchCity.length !== 0) {
      const apiKey = "a4fdf1bea8e02c95bac21779af89649f";

      // Make a request to OpenWeatherMap API
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity},${searchCountry}&units=metric&appid=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setSearchStatus("pass");
            // console.log(response, "res result");
            // to store the list of data
            setWeatherListData((prevData) => [
              { id: uuid(), data: data },
              ...prevData,
            ]);
            setTodayWeather([data]);
            setFormData({ city: "", country: "" });
            console.log(todayWeather, "today weather");
            // console.log(weatherListData);
          } else {
            setSearchStatus("fail");
          }
        })
        .catch((error) => {
          console.log(error);
          setSearchStatus("fail");
        });
    } else {
      setSearchStatus("fail");
    }
  };

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          value={formData.country}
          onChange={(e) => handleChange(e)}
          placeholder="Country Code"
          name="country"
        />
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleChange(e)}
          placeholder="City"
          name="city"
        />
        <div
          className="searchIcon"
          onClick={() => getWeather(formData.country, formData.city)}
        ></div>
        {searchStatus === "fail" && <h1 className="errorMsg">Not Found</h1>}
      </div>

      {weatherListData.length > 0 && (
        <WeatherList
          weatherListData={weatherListData}
          setWeatherListData={setWeatherListData}
          todayWeather={todayWeather}
          getWeather={getWeather}
        />
      )}
    </>
  );
}
