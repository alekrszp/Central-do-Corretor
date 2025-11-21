import axios from "axios";

export const api = axios.create({
    baseURL: "https://civic-sarajane-pedroscheurer-fd914fc3.koyeb.app/ws",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});