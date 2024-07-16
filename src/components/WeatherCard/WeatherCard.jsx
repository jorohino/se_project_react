import sunny from "../../assets/sunny.png";
import "./WeatherCard.css";
import { React, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {currentTemperatureUnit === "F"
          ? `${weatherData.temp.F}° F`
          : `${weatherData.temp.C}° C`}{" "}
      </p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
