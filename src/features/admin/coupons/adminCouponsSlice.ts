import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Coupon, CouponFormData } from '../../../types';
import api from '../../../api/client';

interface AdminCouponsState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  selectedCoupon: Coupon | null;
}

const initialState: AdminCouponsState = {
  coupons: [],
  loading: false,
  error: null,
  selectedCoupon: null
};

// Fetch all coupons
export const fetchAdminCoupons = createAsyncThunk(
  'adminCoupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/coupons');
      return response.data.coupons || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupons');
    }
  }
);

// Add new coupon
export const addAdminCoupon = createAsyncThunk(
  'adminCoupons/addCoupon',
  async (couponData: CouponFormData, { rejectWithValue }) => {
    try {
      const submitData = {
        ...couponData,
        discountPercentage: Number(couponData.discountPercentage),
        minimumCartValue: Number(couponData.minimumCartValue),
        startDate: new Date(couponData.startDate).toISOString(),
        endDate: new Date(couponData.endDate).toISOString()
      };
      
      const response = await api.post('/admin/coupons', submitData);
      return response.data?.coupon;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add coupon');
    }
  }
);

// Update coupon
export const updateAdminCoupon = createAsyncThunk(
  'adminCoupons/updateCoupon',
  async ({ couponId, formData }: { couponId: string, formData: CouponFormData }, { rejectWithValue }) => {
    try {
      const submitData = {
        ...formData,
        discountPercentage: Number(formData.discountPercentage),
        minimumCartValue: Number(formData.minimumCartValue),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString()
      };
      
      const response = await api.put(`/admin/coupons/${couponId}`, submitData);
      return response.data?.coupon;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update coupon');
    }
  }
);

// Delete coupon
export const deleteAdminCoupon = createAsyncThunk(
  'adminCoupons/deleteCoupon',
  async (couponId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/coupons/${couponId}`);
      return couponId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete coupon');
    }
  }
);

const adminCouponsSlice = createSlice({
  name: 'adminCoupons',
  initialState,
  reducers: {
    clearCouponError: (state) => {
      state.error = null;
    },
    selectCoupon: (state, action: PayloadAction<Coupon>) => {
      state.selectedCoupon = action.payload;
    },
    clearSelectedCoupon: (state) => {
      state.selectedCoupon = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch coupons cases
    builder.addCase(fetchAdminCoupons.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
      state.coupons = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAdminCoupons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add coupon cases
    builder.addCase(addAdminCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addAdminCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
      state.coupons.push(action.payload);
      state.selectedCoupon = action.payload;
      state.loading = false;
    });
    builder.addCase(addAdminCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update coupon cases
    builder.addCase(updateAdminCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAdminCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
      const index = state.coupons.findIndex(coupon => coupon.id === action.payload.id);
      if (index !== -1) {
        state.coupons[index] = action.payload;
      }
      state.selectedCoupon = action.payload;
      state.loading = false;
    });
    builder.addCase(updateAdminCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete coupon cases
    builder.addCase(deleteAdminCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAdminCoupon.fulfilled, (state, action: PayloadAction<string>) => {
      state.coupons = state.coupons.filter(coupon => coupon.id !== action.payload);
      if (state.selectedCoupon && state.selectedCoupon.id === action.payload) {
        state.selectedCoupon = null;
      }
      state.loading = false;
    });
    builder.addCase(deleteAdminCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { clearCouponError, selectCoupon, clearSelectedCoupon } = adminCouponsSlice.actions;

export default adminCouponsSlice.reducer; 