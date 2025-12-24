export interface Product {
  id: string;
  name: string;
  name_km?: string;
  price: number;
  description: string;
  description_km?: string;
  image: string; // Main display image
  images?: string[]; // Gallery images
  scent: string;
  scent_km?: string;
  ingredients: string;
  ingredients_km?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  phone: string;
  address: string;
}

export type ViewState =
  | "HOME"
  | "ADMIN"
  | "CHECKOUT"
  | "ADMIN_LOGIN"
  | "PRODUCT_DETAIL";

export type Language = "en" | "km";
