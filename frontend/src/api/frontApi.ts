import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const frontApi = axios.create({
  baseURL: VITE_API_URL,
});

frontApi.interceptors.request.use((config) => {
  
  config.headers.set("Content-Type", "application/json");

  return config;
});

export default frontApi;
