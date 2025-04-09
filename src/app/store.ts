import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/customer/cart/cartSlice';
import productsReducer from '../features/customer/products/productsSlice';
import ordersReducer from '../features/customer/orders/ordersSlice';
import uiReducer from '../features/ui/uiSlice';
import adminProductsReducer from '../features/admin/products/adminProductsSlice';
import adminOrdersReducer from '../features/admin/orders/adminOrdersSlice';
import adminDashboardReducer from '../features/admin/dashboard/adminDashboardSlice';
import adminCouponsReducer from '../features/admin/coupons/adminCouponsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    orders: ordersReducer,
    ui: uiReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrdersReducer,
    adminDashboard: adminDashboardReducer,
    adminCoupons: adminCouponsReducer,
  },
  // You can add middleware here if needed
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/logout/fulfilled'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user'],
      },
    }),
});

// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch; 