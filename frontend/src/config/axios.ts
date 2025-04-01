import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://prueba-tecnica-api-tienda-moviles.onrender.com';

// Configuración de Axios con la API key requerida
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  },
});

// Interceptor para logs
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      'API Response Error:',
      error.response?.status,
      error.config?.url,
    );
    return Promise.reject(error);
  },
);
