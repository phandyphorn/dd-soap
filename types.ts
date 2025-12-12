export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; // Main display image
  images?: string[]; // Gallery images
  scent: string;
  ingredients: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  address: string;
  phone: string;
  note: string;
}

export type ViewState = 'HOME' | 'ADMIN' | 'CHECKOUT' | 'ADMIN_LOGIN' | 'PRODUCT_DETAIL';