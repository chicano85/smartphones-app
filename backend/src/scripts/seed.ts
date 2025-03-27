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
      "Space Black": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896",
      "Silver": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-silver?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896",
      "Gold": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-gold?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896",
      "Deep Purple": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896"
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
    name: "Galaxy S23 Ultra",
    brand: "Samsung",
    basePrice: 1199,
    colors: ["Phantom Black", "Cream", "Green", "Lavender"],
    storage: [
      { capacity: 256, price: 0 },
      { capacity: 512, price: 180 },
      { capacity: 1024, price: 380 }
    ],
    images: {
      "Phantom Black": "https://images.samsung.com/is/image/samsung/p6pim/es/2302/gallery/es-galaxy-s23-ultra-s918-sm-s918bzkceas-534863461?$650_519_PNG$",
      "Cream": "https://images.samsung.com/is/image/samsung/p6pim/es/2302/gallery/es-galaxy-s23-ultra-s918-sm-s918bzwceub-534863476?$650_519_PNG$",
      "Green": "https://images.samsung.com/is/image/samsung/p6pim/es/2302/gallery/es-galaxy-s23-ultra-s918-sm-s918bzgceub-534863446?$650_519_PNG$",
      "Lavender": "https://images.samsung.com/is/image/samsung/p6pim/es/2302/gallery/es-galaxy-s23-ultra-s918-sm-s918blvceub-534863431?$650_519_PNG$"
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