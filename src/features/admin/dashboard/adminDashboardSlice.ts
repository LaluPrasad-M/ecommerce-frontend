import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DashboardData } from '../../../types';
import api from '../../../api/client';

interface AdminDashboardState {
  metrics: DashboardData;
  loading: boolean;
  error: string | null;
}

const initialState: AdminDashboardState = {
  metrics: {
    totalOrders: 0,
    ordersByStatus: {},
    totalSales: 0,
    lowStockProducts: 0,
    couponUsage: 0,
    totalCustomers: 0,
    totalItemsSold: 0,
    productsInInventory: 0
  },
  loading: false,
  error: null
};

// Fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  'adminDashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/dashboard');
      if (response.data.success) {
        return response.data.metrics;
      } else {
        return rejectWithValue('Failed to fetch dashboard data');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
);

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch dashboard data cases
    builder.addCase(fetchDashboardData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<DashboardData>) => {
      state.metrics = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDashboardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { clearDashboardError } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer; 