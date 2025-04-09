import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product } from '../../../types';
import api from '../../../api/client';

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedProduct: null,
  loading: false,
  error: null,
  activeFilters: {
    category: 'all',
    priceRange: { min: 0, max: Infinity }
  }
};

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/customer/products');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/customer/products/${id}`);
      return response.data.product;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

// Fetch product categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/customer/categories');
      return response.data.categories;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Admin: Add product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData: Omit<Product, 'id'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/products', productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

// Admin: Update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }: { id: string; data: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/products/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

// Admin: Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/products/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

// Product slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProductsByCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      state.activeFilters.category = category;
      applyFilters(state);
    },
    
    filterProductsByPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      const { min, max } = action.payload;
      state.activeFilters.priceRange = { min, max };
      applyFilters(state);
    },
    
    clearProductFilters: (state) => {
      state.activeFilters = {
        category: 'all',
        priceRange: { min: 0, max: Infinity }
      };
      state.filteredProducts = state.products;
    },
    
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ success: boolean, count: number, products: Product[] }>) => {
      state.products = action.payload.products;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Fetch product by ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Fetch categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Add product (admin)
    builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.filteredProducts = state.products;
    });
    
    // Update product (admin)
    builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.filteredProducts = state.products;
      }
    });
    
    // Delete product (admin)
    builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.filteredProducts = state.filteredProducts.filter(
        product => product.id !== action.payload
      );
    });
  },
});

// Helper function to apply all active filters
function applyFilters(state: ProductsState) {
  let filtered = [...state.products];
  
  // Apply category filter
  if (state.activeFilters.category !== 'all') {
    filtered = filtered.filter(
      product => product.category === state.activeFilters.category
    );
  }
  
  // Apply price range filter
  const { min, max } = state.activeFilters.priceRange;
  filtered = filtered.filter(
    product => product.price >= min && product.price <= max
  );
  
  state.filteredProducts = filtered;
}

export const {
  filterProductsByCategory,
  filterProductsByPriceRange,
  clearProductFilters,
  clearSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer; 