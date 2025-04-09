import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../../types';
import api from '../../api/client';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '../../constants';

// Define a type for registration data that includes password
interface RegisterUserData extends Omit<User, 'id' | 'role'> {
  password: string;
}

// Get user from localStorage
const getUserFromStorage = (): User | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userData = localStorage.getItem(USER_DATA_KEY);
  
  if (token && !userData) {
    // Token exists but no user data - clear token to ensure consistent state
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return null;
  }
  
  return userData ? JSON.parse(userData) : null;
};

// Create initial state
const initialState: AuthState = {
  user: getUserFromStorage(),
  token: localStorage.getItem(AUTH_TOKEN_KEY),
  isAuthenticated: !!(localStorage.getItem(AUTH_TOKEN_KEY) && localStorage.getItem(USER_DATA_KEY)),
  loading: false,
  error: null,
};

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      // Convert API request structure to match documentation
      const apiData = {
        name: userData.name,
        address: userData.address,
        mobileNumber: userData.mobileNumber,
        dateOfBirth: userData.dateOfBirth,
        email: userData.email,
        password: userData.password
      };
      
      const response = await api.post('/customer/register', apiData);
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { mobileNumber: string; password: string }, { rejectWithValue }) => {
    try {
      // Convert API request structure to match documentation
      const apiData = {
        mobileNumber: credentials.mobileNumber,
        password: credentials.password
      };
      
      const response = await api.post('/customer/login', apiData);
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Admin Login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials: { mobileNumber: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/login', credentials);
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Admin login failed');
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Remove token from localStorage
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      return true;
    } catch (error: any) {
      return rejectWithValue('Logout failed');
    }
  }
);

// Get user profile
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/customer/profile');
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await api.put('/customer/profile', userData);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user profile');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Admin Login
    builder.addCase(loginAdmin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Logout user
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    
    // Get user profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Update user profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 