import axios from "axios";

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
  },
});

fetcher.interceptors.request.use((config) => {
  const userJson = localStorage.getItem("currentUser");
  if (!userJson) return config;

  const currentUser = JSON.parse(userJson);
  if (currentUser) {
    config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
  }
  return config;
});

export default fetcher;
