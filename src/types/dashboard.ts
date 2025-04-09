import { ReactNode } from "react";

export interface DashboardData {
  totalOrders: number;
  ordersByStatus: Record<string, number>;
  totalSales: number;
  lowStockProducts: number;
  couponUsage: number;
  totalCustomers: number;
  totalItemsSold: number;
  productsInInventory: number;
}

export interface OrderStatusData {
  status: string;
  count: number;
  color: string;
}

export interface OrderStatusMetricsProps {
  ordersByStatus: OrderStatusData[];
  totalOrders: number;
}


export interface MetricCardProps {
  title: string;
  value: ReactNode;
  subtitle?: string;
  linkTo?: string;
}
  
export interface DashboardSummaryProps {
  metrics: {
    totalOrders: number;
    totalSales: number;
    lowStockProducts: number;
    productsInInventory: number;
    totalItemsSold: number;
    couponUsage: number;
  };
  ordersByStatus: OrderStatusData[];
}

export interface DashboardMetricsProps {
  totalOrders: number;
  totalSales: number;
  lowStockProducts: number;
  productsInInventory: number;
  totalItemsSold: number;
  couponUsage: number;
} 