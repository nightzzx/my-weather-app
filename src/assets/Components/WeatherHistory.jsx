import "../styles/WeatherHistory.scss";

export default function WeatherHistory({
  historyList,
  setWeatherListData,
  getWeather,
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

  function deleteItem(id) {
    setWeatherListData((prevData) => prevData.filter((e) => e.id !== id));
  }

  function searchAgain(id) {
    let newValue = historyList.filter((e) => {
      if (e.id == id) {
        return e.data;
      }
    });

    let newCity = newValue[0].data.name;
    let newCountry = newValue[0].data.sys.country;
    getWeather(newCountry, newCity);
  }

  return (
    <div className="WeatherHistory">
      <div className="wrapper">
        <div className="title">Search History</div>

        {historyList.map((historyData) => (
          <div className="historyItems" key={historyData.id}>
            <div className="col">
              <p className="historyItemsLocation">
                {historyData.data.name},{" "}
                {historyData.data.sys.country.toUpperCase()}
              </p>
              <p className="historyItemsDate">
                {unixToDate(historyData.data.dt * 1000)}
              </p>
            </div>
            <div className="col">
              <div
                className="circle searchIcon"
                onClick={() => searchAgain(historyData.id)}
              ></div>
              <div
                className="circle deleteIcon"
                onClick={() => deleteItem(historyData.id)}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
