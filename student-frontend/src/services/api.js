import axios from "axios";
// Using Axios to call your backend API.
const api = axios.create({
  // This is backend URL
  baseURL: import.meta.env.VITE_API_URL + "/api",
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

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
// Now all requests go through this instance.
