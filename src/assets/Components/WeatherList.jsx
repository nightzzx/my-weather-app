import "../styles/WeatherList.scss";
import WeatherHistory from "./WeatherHistory";
import sunPng from "../images/sun.png";
import cloudPng from "../images/cloud.png";
export default function WeatherList({
  weatherListData,
  setWeatherListData,
  todayWeather,
  getWeather,
  setTodayWeather,
}) {
  const unixToDate = (unixTimeData) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(unixTimeData);
  };

  return (
    <>
      <div className="weatherList">
        <div className="wrapper">
          <div className="grid-container">
            <div className="col">
              <p className="title">Today’s Weather</p>
              <p className="temp">{todayWeather[0].main.temp.toFixed()}°</p>
              <p className="tempDetail">
                H:{todayWeather[0].main.temp_max}° L:
                {todayWeather[0].main.temp_min}°
              </p>
              <p className="location grey">
                {todayWeather[0].name} ,{todayWeather[0].sys.country}
              </p>
            </div>
            <div className="col grey">
              <div>
                {todayWeather[0].main === "Clouds" ||
                todayWeather[0].main === "Rain" ||
                todayWeather[0].main === "Drizzle" ||
                todayWeather[0].main === "Thunderstorm" ? (
                  <img src={cloudPng} />
                ) : (
                  <img src={sunPng} />
                )}
              </div>
              <p className="weatherStatus">{todayWeather[0].weather[0].main}</p>
              <p className="humidity">
                Humidity: {todayWeather[0].main.humidity}%
              </p>
              <p className="date">{unixToDate(todayWeather[0].dt * 1000)}</p>
            </div>
          </div>
          <WeatherHistory
            historyList={weatherListData}
            setWeatherListData={setWeatherListData}
            getWeather={getWeather}
            setTodayWeather={setTodayWeather}
          />
        </div>
      </div>
    </>
  );
}
