import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/database';
import { Phone } from '../models/Phone';

dotenv.config();

const phones = [
  {
    name: "iPhone 14 Pro",
    brand: "Apple",
    basePrice: 999,
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    storage: [
      { capacity: 128, price: 0 },
      { capacity: 256, price: 100 },
      { capacity: 512, price: 300 }
    ],
    images: {
      "Space Black": "https://example.com/iphone-14-black.jpg",
      "Silver": "https://example.com/iphone-14-silver.jpg",
      "Gold": "https://example.com/iphone-14-gold.jpg",
      "Deep Purple": "https://example.com/iphone-14-purple.jpg"
    },
    specifications: {
      screen: "6.1-inch Super Retina XDR",
      processor: "A16 Bionic",
      ram: "6GB",
      camera: "48MP + 12MP + 12MP",
      battery: "3200mAh",
      os: "iOS 16"
    }
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    basePrice: 1199,
    colors: ["Phantom Black", "Cream", "Green", "Lavender"],
    storage: [
      { capacity: 256, price: 0 },
      { capacity: 512, price: 180 },
      { capacity: 1024, price: 380 }
    ],
    images: {
      "Phantom Black": "https://example.com/s23-black.jpg",
      "Cream": "https://example.com/s23-cream.jpg",
      "Green": "https://example.com/s23-green.jpg",
      "Lavender": "https://example.com/s23-lavender.jpg"
    },
    specifications: {
      screen: "6.8-inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      camera: "200MP + 12MP + 10MP + 10MP",
      battery: "5000mAh",
      os: "Android 13"
    }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Limpiar la base de datos
    await Phone.deleteMany({});
    console.log('🗑️ Base de datos limpiada');

    // Insertar nuevos teléfonos
    await Phone.insertMany(phones);
    console.log('📱 Teléfonos de ejemplo insertados');

    // Cerrar conexión
    await mongoose.connection.close();
    console.log('✅ Seeding completado');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
    process.exit(1);
  }
};

seedDatabase(); 