import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { logout } from './features/auth/authSlice';
import { addNotification } from './features/ui/uiSlice';

// Layout components
import Layout from './components/layout/Layout';
import NotificationSystem from './components/shared/NotificationSystem';

// Page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProductsPage from './pages/customer/products/ProductsPage';
import ProductDetailPage from './pages/customer/products/ProductDetailPage';
import CartPage from './pages/customer/cart/CartPage';
import OrdersPage from './pages/customer/orders/OrdersPage';
import OrderDetailPage from './pages/customer/orders/OrderDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminCouponsPage from './pages/admin/AdminCouponsPage';

// Protected route component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  requiresAdmin?: boolean 
}> = ({ children, requiresAdmin = false }) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiresAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

// Customer route component - only for non-admin authenticated users
const CustomerRoute: React.FC<{ 
  children: React.ReactNode;
}> = ({ children }) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Redirect admins to admin dashboard
  if (user?.role === 'admin') {
    return <Navigate to="/admin" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector(state => state.ui);
  const theme = createAppTheme(darkMode ? 'dark' : 'light');
  
  useEffect(() => {
    // Listen for auth expiration events from the API interceptor
    const handleAuthExpired = (event: CustomEvent) => {
      const message = event.detail?.message || 'Your session has expired. Please log in again.';
      dispatch(logout());
      
      // Show notification
      dispatch(addNotification({
        message,
        type: 'error',
        duration: 5000
      }));
    };
    
    window.addEventListener('auth:expired', handleAuthExpired as EventListener);
    
    return () => {
      window.removeEventListener('auth:expired', handleAuthExpired as EventListener);
    };
  }, [dispatch]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <NotificationSystem />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            
            {/* Protected profile route - accessible to all users */}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            
            {/* Customer-only routes */}
            <Route path="/cart" element={<CustomerRoute><CartPage /></CustomerRoute>} />
            <Route path="/orders" element={<CustomerRoute><OrdersPage /></CustomerRoute>} />
            <Route path="/orders/:id" element={<CustomerRoute><OrderDetailPage /></CustomerRoute>} />
            
            {/* Protected admin routes */}
            <Route path="/admin" element={<ProtectedRoute requiresAdmin><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute requiresAdmin><AdminProductsPage /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute requiresAdmin><AdminOrdersPage /></ProtectedRoute>} />
            <Route path="/admin/coupons" element={<ProtectedRoute requiresAdmin><AdminCouponsPage /></ProtectedRoute>} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
