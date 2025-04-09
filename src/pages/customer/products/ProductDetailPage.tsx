import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchProductById } from '../../../features/customer/products/productsSlice';
import ProductDetail from '../../../components/customer/product/ProductDetail';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector(state => state.products);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);
  
  if (loading) {
    return (
      <Container>
        <Typography>Loading product...</Typography>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  
  if (!selectedProduct) {
    return (
      <Container>
        <Typography>Product not found</Typography>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <ProductDetail product={selectedProduct} />
    </Container>
  );
};

export default ProductDetailPage;
