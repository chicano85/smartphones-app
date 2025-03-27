export interface Storage {
  capacity: number;
  price: number;
}

export interface Specifications {
  screen: string;
  processor: string;
  ram: string;
  camera: string;
  battery: string;
  os: string;
}

export interface Phone {
  _id: string;
  name: string;
  brand: string;
  basePrice: number;
  colors: string[];
  storage: Storage[];
  images: Record<string, string>;
  specifications: Specifications;
  createdAt: string;
  updatedAt: string;
}

export interface PhoneListResponse {
  phones: Phone[];
  currentPage: number;
  totalPages: number;
  total: number;
} 