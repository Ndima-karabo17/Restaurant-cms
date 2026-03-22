import axios from 'axios';

const BASE_URL = "const BASE_URL = 'https://restaurant-app-fullstact.vercel.app/api'";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Attach token to every request automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cms_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);