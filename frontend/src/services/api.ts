import axios from 'axios';
import { Phone, PhoneListResponse } from '../types/phone';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
});

// Para depuración
console.log('API URL:', API_URL);

export const phoneService = {
  // Obtener lista de teléfonos con filtros y paginación
  async getPhones(search?: string, page: number = 1, limit: number = 20): Promise<PhoneListResponse> {
    try {
      const params = { search, page, limit };
      console.log('Fetching phones with params:', params);
      const response = await api.get('/phones', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching phones:', error);
      throw error;
    }
  },

  // Obtener un teléfono por ID
  async getPhoneById(id: string): Promise<Phone> {
    try {
      const response = await api.get(`/phones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching phone with ID ${id}:`, error);
      throw error;
    }
  }
}; 