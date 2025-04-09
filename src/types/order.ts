import { Coupon } from './coupons';
import { Product } from './product';
import { SelectChangeEvent } from '@mui/material';

export interface OrderItem {
  id: string;
  product?: Product;
  name?: string;
  price: number;
  quantity: number;
  image?: string;
}

export type OrderStatus = 'Order Placed' | 'Packed' | 'Shipping' | 'Delivered' | 'Cancelled';

export const ORDER_STATUSES: OrderStatus[] = [
  'Order Placed',
  'Packed',
  'Shipping',
  'Delivered',
  'Cancelled'
];

export interface Order {
  id: string;
  user: {
    id: string;
    name: string;
    mobileNumber: string;
  };
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  coupon?: Coupon | null;
  shippingAddress: string;
  createdAt: string;
  updatedAt?: string;
}

// Component props for OrderDetail
export interface OrderDetailProps {
  order: Order;
}

// Component props for shared OrderCard
export interface OrderCardProps {
  order: Order;
  variant: 'admin' | 'customer';
  onStatusUpdate?: (order: Order) => void;
}

export interface StatusUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  selectedOrder: Order | null;
  newStatus: string;
  onStatusChange: (e: SelectChangeEvent<string>) => void;
  loading: boolean;
} 