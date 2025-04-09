import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFormData, AdminProductsState } from '../../../types';
import api from '../../../api/client';

const initialState: AdminProductsState = {
  products: [],
  loading: false,
  error: null,
  currentProduct: null
};

// Fetch all products
export const fetchAdminProducts = createAsyncThunk(
  'adminProducts/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/products');
      return response.data.products || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Add new product
export const addAdminProduct = createAsyncThunk(
  'adminProducts/addProduct',
  async (productData: ProductFormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/products', productData);
      return response.data.product;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

// Update existing product
export const updateAdminProduct = createAsyncThunk(
  'adminProducts/updateProduct',
  async ({ productId, formData }: { productId: string, formData: ProductFormData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/products/${productId}`, formData);
      return response.data.product;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

// Delete product
export const deleteAdminProduct = createAsyncThunk(
  'adminProducts/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/products/${productId}`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch products cases
    builder.addCase(fetchAdminProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add product cases
    builder.addCase(addAdminProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addAdminProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addAdminProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update product cases
    builder.addCase(updateAdminProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAdminProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateAdminProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete product cases
    builder.addCase(deleteAdminProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAdminProduct.fulfilled, (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteAdminProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { clearProductError, setCurrentProduct } = adminProductsSlice.actions;
export default adminProductsSlice.reducer; 