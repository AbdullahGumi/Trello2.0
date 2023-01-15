import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://trelloboardservice.onrender.com"
    : "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
