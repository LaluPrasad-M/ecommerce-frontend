import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, CircularProgress, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/customer/products/productsSlice';

// Import components
import HeroSection from '../components/customer/home/HeroSection';
import FeaturedProducts from '../components/customer/home/FeaturedProducts';
import FeaturesSection from '../components/customer/home/FeaturesSection';
import CallToAction from '../components/customer/home/CallToAction';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Redirect admins to admin dashboard
  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  // Loading state
  if (loading) {
    return <CircularProgress />;
  }

    // Error state
    if (error) {
      return <Alert severity="error">{error}</Alert>;
    }

  // Get featured products (just a sample of products)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <Container maxWidth="xl">
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <FeaturesSection />
      { !isAuthenticated && <CallToAction />}
    </Container>
  );
};

export default HomePage; 