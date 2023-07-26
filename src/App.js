import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/search/search";
import "./App.css";
import CurrentWeather from "./components/search/current-weather/current-weather";
// import HourlyWeather from "./components/search/hourly-weather/hourly-weather";
import {
  WEATHER_API_KEY,
  WEATHER_API_URL,
  WEATHER_HOURLY_API_URL,
} from "./api";
import { useState } from "react";
import Forecast from "./components/search/forecast/forecast";
import Logos from "./components/logos/logos";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  // const [hourlyWeather, setHourlyWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    // const currentHourlyFetch = fetch(
    //   `${WEATHER_HOURLY_API_URL}/forecast/hourly?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    // );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        // const hourlyResponse = await response[1].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        // setHourlyWeather({ city: searchData.label, ...hourlyResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .then((err) => console.log(err));
  };

  console.log(currentWeather);
  // console.log(hourlyWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Logos />
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {/* {hourlyWeather && <HourlyWeather data={hourlyWeather} />} */}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;