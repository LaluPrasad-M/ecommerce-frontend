import { Product } from './product';
import { Coupon } from './coupons';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartItemProps {
  item: CartItem;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  loading: boolean;
  error: string | null;
  updatingItemId: string | null;
} 