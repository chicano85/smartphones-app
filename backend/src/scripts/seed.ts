import { connectDB } from '../config/database';
import { Phone } from '../models/Phone';

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
      "Space Black": "url_imagen_black",
      "Silver": "url_imagen_silver",
      "Gold": "url_imagen_gold",
      "Deep Purple": "url_imagen_purple"
    },
    specifications: {
      screen: "6.1-inch Super Retina XDR",
      processor: "A16 Bionic",
      ram: "6GB",
      camera: "48MP + 12MP + 12MP",
      battery: "3200mAh",
      os: "iOS 16"
    }
  }
  // Añade más teléfonos aquí
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Phone.deleteMany({});
    await Phone.insertMany(phones);
    console.log('Base de datos poblada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase(); 