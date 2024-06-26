import { checkResponse } from "./utils";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    return checkResponse(res);
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.location = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);
  return result;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
