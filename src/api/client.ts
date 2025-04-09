import axios from 'axios';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '../constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Check for token expiration in the response
    if (response && 
        (response.status === 401 || 
         (response.data && 
          (response.data.error === 'jwt expired' || 
           response.data.message === 'Invalid token')))) {
      
      // Clear authentication data
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      
      // Dispatch a custom event that the app can listen to
      window.dispatchEvent(new CustomEvent('auth:expired', { 
        detail: { message: response.data?.message || 'Your session has expired. Please log in again.' } 
      }));
      
      // If we're not already on the login page, redirect
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 