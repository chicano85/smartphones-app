export interface CartItem {
  phoneId: string;
  name: string;
  brand: string;
  color: string;
  storage: number;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}
