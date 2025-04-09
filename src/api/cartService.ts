import api from './client';
import { ApiResponse, Cart, Coupon } from '../types';

// Get cart
export const getCart = async (): Promise<ApiResponse<Cart>> => {
  const response = await api.get('/cart');
  return { success: true, data: response.data };
};

// Add item to cart
export const addItemToCart = async (productId: string, quantity: number): Promise<ApiResponse<Cart>> => {
  const response = await api.post('/cart/items', { productId, quantity });
  return { success: true, data: response.data };
};

// Update cart item quantity
export const updateCartItemQuantity = async (productId: string, quantity: number): Promise<ApiResponse<Cart>> => {
  const response = await api.put(`/cart/items/${productId}`, { quantity });
  return { success: true, data: response.data };
};

// Remove item from cart
export const removeCartItem = async (productId: string): Promise<ApiResponse<Cart>> => {
  const response = await api.delete(`/cart/items/${productId}`);
  return { success: true, data: response.data };
};

// Apply coupon
export const applyCoupon = async (couponCode: string): Promise<ApiResponse<{ cart: Cart; coupon: Coupon }>> => {
  const response = await api.post('/cart/apply-coupon', { couponCode });
  return { success: true, data: response.data };
};

// Remove coupon
export const removeCoupon = async (): Promise<ApiResponse<Cart>> => {
  const response = await api.delete('/cart/coupon');
  return { success: true, data: response.data };
};

// Clear cart
export const clearCart = async (): Promise<ApiResponse<Cart>> => {
  const response = await api.delete('/cart');
  return { success: true, data: response.data };
};