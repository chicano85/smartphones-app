export interface StorageOption {
  capacity: number;
  price: number;
}

export interface PhoneSpecifications {
  screen?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  battery?: string;
  os?: string;
  [key: string]: any;
}

export interface Phone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface PhoneDetail extends Phone {
  colors: string[];
  storage: StorageOption[];
  specifications: PhoneSpecifications;
}

export interface CartItem {
  phoneId: string;
  name: string;
  brand: string;
  color: string;
  storage: number;
  price: number;
  image: string;
}

export interface PhoneListResponse {
  phones: Phone[];
  currentPage: number;
  totalPages: number;
  total: number;
} 