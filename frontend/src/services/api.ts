import axios from "axios";
export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const setHeaderToken = (token: string) =>
  (api.defaults.headers.Authorization = `Bearer ${token}`);
