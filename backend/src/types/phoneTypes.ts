import mongoose, { Document } from 'mongoose';

// Interfaces para TypeScript
interface IStorage {
  capacity: number;  // en GB
  price: number;     // precio adicional sobre el precio base
}

interface ISpecifications {
  screen: string;
  processor: string;
  ram: string;
  camera: string;
  battery: string;
  os: string;
}

interface IPhone extends Document {
  name: string;
  brand: string;
  basePrice: number;
  colors: string[];
  storage: IStorage[];
  images: Map<string, string>;  // color -> URL de imagen
  specifications: ISpecifications;
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const phoneSchema = new mongoose.Schema<IPhone>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  colors: [{
    type: String,
    required: true
  }],
  storage: [{
    capacity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  images: {
    type: Map,
    of: String,
    required: true
  },
  specifications: {
    screen: {
      type: String,
      required: true
    },
    processor: {
      type: String,
      required: true
    },
    ram: {
      type: String,
      required: true
    },
    camera: {
      type: String,
      required: true
    },
    battery: {
      type: String,
      required: true
    },
    os: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

// Índices para búsqueda
phoneSchema.index({ name: 'text', brand: 'text' });

export const Phone = mongoose.model<IPhone>('Phone', phoneSchema);