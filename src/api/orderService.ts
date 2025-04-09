import api from './client';
import { ApiResponse, Order } from '../types';

// Get all orders
export const getOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await api.get('/orders');
  return { success: true, data: response.data };
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<ApiResponse<Order>> => {
  const response = await api.get(`/orders/${orderId}`);
  return { success: true, data: response.data };
};

// Place order
export const placeOrder = async (): Promise<ApiResponse<Order>> => {
  const response = await api.post('/orders');
  return { success: true, data: response.data };
};

// Cancel order
export const cancelOrder = async (orderId: string): Promise<ApiResponse<Order>> => {
  const response = await api.put(`/orders/${orderId}/cancel`);
  return { success: true, data: response.data };
}; 