import api from './client';
import { ApiResponse, Product } from '../types';

// Get all products
export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await api.get('/products');
  return { success: true, data: response.data };
};

// Get product by ID
export const getProductById = async (productId: string): Promise<ApiResponse<Product>> => {
  const response = await api.get(`/products/${productId}`);
  return { success: true, data: response.data };
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<ApiResponse<Product[]>> => {
  const response = await api.get('/products', { params: { category } });
  return { success: true, data: response.data };
};

// Get products by price range
export const getProductsByPriceRange = async (min: number, max: number): Promise<ApiResponse<Product[]>> => {
  const response = await api.get('/products', { params: { minPrice: min, maxPrice: max } });
  return { success: true, data: response.data };
}; 