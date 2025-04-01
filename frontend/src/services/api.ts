// Servicio para interactuar con la API de teléfonos usando Axios
import { axiosInstance } from '@/config/axios';
import { Phone, PhoneDetail } from '@/types/phone';

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
      const timestamp = new Date().getTime();
      const url = `/products/${id.split('?')[0]}?_=${timestamp}`
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching phone with ID ${id}:`, error);
      throw error;
    }
  },
};
