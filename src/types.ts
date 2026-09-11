export type ProductCategory = 
  | 'All'
  | 'Tailored Couture'
  | 'Artisan Leather'
  | 'Timepieces'
  | 'Fragrance & Scents'
  | 'Curated Living';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  featured?: boolean;
  stockCount: number;
  description: string;
  details: string[];
  materials: string;
  dimensions?: string;
  origin: string;
  images: {
    primary: string;
    secondary: string;
    details: string[];
  };
  colors: ProductColor[];
  sizes: string[];
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id based on product.id + color + size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface CurrencyConfig {
  code: 'USD' | 'EUR' | 'GBP' | 'AED';
  symbol: string;
  rate: number; // relative to USD
}

export interface PromoCode {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  minSpend?: number;
  description: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: string;
  currency: CurrencyConfig;
}
