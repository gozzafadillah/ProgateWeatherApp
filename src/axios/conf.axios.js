import axios from "axios";

const config = {
  baseURL:
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=3e48fd017d9107eb754bceb6ffa0905b",
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(config);

export default axiosInstance;
