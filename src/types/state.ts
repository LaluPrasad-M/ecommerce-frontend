import { AuthState } from './user';
import { CartState } from './cart';
import { Coupon } from './coupons';
import { Product } from './product';
import { Order } from './order';
import { Notification } from './notification';
import { DashboardData } from './dashboard';

export interface UIState {
  darkMode: boolean;
  notifications: Notification[];
  isMobileMenuOpen: boolean;
} 

export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  activeFilters: {
    category: string;
    priceRange: { min: number; max: number };
  };
}

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

export interface AdminProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentProduct: Product | null;
}

export interface AdminOrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export interface AdminDashboardState {
  metrics: DashboardData;
  loading: boolean;
  error: string | null;
}

export interface AdminCouponsState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  cart: CartState;
  products: ProductsState;
  orders: OrdersState;
  ui: UIState;
  adminProducts: AdminProductsState;
  adminOrders: AdminOrdersState;
  adminDashboard: AdminDashboardState;
  adminCoupons: AdminCouponsState;
} 
