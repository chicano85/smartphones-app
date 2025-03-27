// Servicio para interactuar con la API de teléfonos
import { Phone, PhoneDetail } from '@/types/phone';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prueba-tecnica-api-tienda-moviles.onrender.com';

// Opciones para las solicitudes fetch con la API key requerida
const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '87909682e6cd74208f41a6ef39fe4191'
  }
};

export const phoneService = {
  // Obtener todos los teléfonos (para la vista de catálogo)
  async getPhones(search?: string): Promise<Phone[]> {
    try {
      const queryParams = search ? `?search=${encodeURIComponent(search)}` : '';
      const response = await fetch(`${API_URL}/products${queryParams}`, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`Error fetching phones: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching phones:', error);
      throw error;
    }
  },
  
  // Obtener un teléfono por su ID (para la vista de detalle)
  async getPhoneById(id: string): Promise<PhoneDetail> {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`Error fetching phone details: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching phone with ID ${id}:`, error);
      throw error;
    }
  }
}; 