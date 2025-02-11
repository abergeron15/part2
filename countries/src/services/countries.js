import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

console.log(import.meta.env);

const openWeatherAPIkey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const openWeatherURL = `https://api.openweathermap.org/data/3.0/onecall?&appid=${openWeatherAPIkey}`;

const getAll = () => {
  const request = axios.get(baseUrl + "all");
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const weather = (country) => {
  console.log(country);
  let [lat, lon] = country.latlng;

  if (Object.keys(country.capitalInfo).length) {
    console.log(country.capitalInfo);
    [lat, lon] = country.capitalInfo.latlng;
  }

  console.log([lat, lon]);
  console.log("lat: " + lat + ", lon: " + lon);
  const request = axios.get(openWeatherURL, {
    params: {
      lat,
      lon,
    },
  });
  return request.then((response) => response.data);
};

export default { getAll, create, update, del, weather };
