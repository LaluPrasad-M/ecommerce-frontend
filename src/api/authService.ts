import api from './client';
import { ApiResponse, User } from '../types';

// Define response types
interface AuthResponse extends ApiResponse<{
  user: User;
  token: string;
}> {}

// Register user
export const register = async (userData: {
  name: string;
  address: string;
  mobileNumber: string;
  dob: string;
  email?: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', userData);
  return { 
    success: true, 
    data: response.data 
  };
};

// Login user
export const login = async (credentials: {
  mobileNumber: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', credentials);
  return { 
    success: true, 
    data: response.data 
  };
};

// Get current user profile
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  const response = await api.get('/auth/me');
  return { 
    success: true, 
    data: response.data 
  };
};

// Update user profile
export const updateProfile = async (updateData: Partial<User>): Promise<ApiResponse<User>> => {
  const response = await api.put('/auth/profile', updateData);
  return { 
    success: true, 
    data: response.data 
  };
}; 