// Servicio para interactuar con la API de teléfonos usando Axios
import { Phone, PhoneDetail } from '@/types/phone';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prueba-tecnica-api-tienda-moviles.onrender.com';

// Configuración de Axios con la API key requerida
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  }
});

// Interceptor para logs
axiosInstance.interceptors.request.use(
  config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API Response Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

export const phoneService = {
  // Obtener todos los teléfonos (para la vista de catálogo)
  async getPhones(search?: string): Promise<Phone[]> {
    try {
      const queryParams = search ? `?search=${encodeURIComponent(search)}` : '';
      const response = await axiosInstance.get('/products' + queryParams);
      return response.data;
    } catch (error) {
      console.error('Error fetching phones:', error);
      throw error;
    }
  },
  
  // Obtener un teléfono por su ID (para la vista de detalle)
  async getPhoneById(id: string): Promise<PhoneDetail> {
    try {
      console.log(`Fetching phone with ID: ${id}`);
      // Añadir un timestamp para evitar caché
      const timestamp = new Date().getTime();
      const url = `/products/${id.split('?')[0]}?_=${timestamp}`;
      console.log('Full URL:', API_URL + url);
      
      const response = await axiosInstance.get(url);
      console.log('Phone details received:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching phone with ID ${id}:`, error);
      throw error;
    }
  }
}; 