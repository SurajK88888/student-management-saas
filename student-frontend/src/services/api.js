import axios from "axios";

const api = axios.create({
  // This is backend URL
  baseURL: "http://localhost:5000/api",
});

// Interceptors in Axios (or similar libraries) allow you to automatically attach a token (like a JWT)
// to every outgoing request without manually adding it each time. They act like middleware for HTTP
// requests and responses.

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
// Now all requests go through this instance.
