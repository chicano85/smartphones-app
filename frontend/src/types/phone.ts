export interface StorageOption {
  capacity: string;
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

export interface PhoneDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
  };
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: Phone[];
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface CartItem {
  phoneId: string;
  name: string;
  brand: string;
  color: string;
  storage: string;
  price: number;
  image: string;
  quantity?: number;
}

export interface PhoneListResponse {
  phones: Phone[];
  currentPage: number;
  totalPages: number;
  total: number;
} 