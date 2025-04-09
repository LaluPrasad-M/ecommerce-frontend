export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  mobileNumber: string;
  dateOfBirth?: string;
  role: 'admin' | 'customer';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
} 