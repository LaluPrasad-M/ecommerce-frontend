import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import AdminLayout from '../../components/admin/common/AdminLayout';
import { Product, ProductFormData } from '../../types';
import ProductCard from '../../components/admin/products/ProductCard';
import DeleteConfirmDialog from '../../components/admin/common/DeleteConfirmDialog';
import ProductForm from '../../components/admin/products/ProductForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  fetchAdminProducts, 
  addAdminProduct, 
  updateAdminProduct, 
  deleteAdminProduct 
} from '../../features/admin/products/adminProductsSlice';
import { adminProductPageStyles } from '../../styles/admin/products/AdminProductPageStyles';

const emptyFormData: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  image: '',
  isActive: true
};

const AdminProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.adminProducts);
  
  // Product form
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(emptyFormData);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  
  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  // Notification
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all products
  const fetchProducts = () => {
    dispatch(fetchAdminProducts())
      .unwrap()
      .catch(error => {
        showNotification(typeof error === 'string' ? error : 'Failed to fetch products', 'error');
      });
  };

  // Open form to add new product
  const handleAddProduct = () => {
    setFormData(emptyFormData);
    setFormMode('add');
    setCurrentProductId(null);
    setFormErrors({});
    setFormOpen(true);
  };

  // Open form to edit product
  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock,
      isActive: product.isActive !== undefined ? product.isActive : true
    });
    setFormMode('edit');
    setCurrentProductId(product.id);
    setFormErrors({});
    setFormOpen(true);
  };

  // Handle text field input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' ? (value === '' ? '' : Number(value)) : 
              name === 'price' ? (value === '' ? '' : Number(value)) : 
              value
    }));
  };

  // Handle select field change
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle boolean select change
  const handleBooleanSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === 'true'
    }));
  };

  // Validate form data
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ProductFormData, string>> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    // Fix type error by converting to number before comparison
    const priceValue = typeof formData.price === 'string' ? 
      (formData.price === '' ? 0 : parseFloat(formData.price)) : 
      formData.price;
    
    if (priceValue <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    
    // Handle empty stock value
    const stockValue = typeof formData.stock === 'string' ? 
      (formData.stock === '' ? 0 : parseInt(formData.stock)) : 
      formData.stock;
    
    if (stockValue < 0) {
      errors.stock = 'Stock cannot be negative';
    }

    if (stockValue === 0) {
      errors.stock = 'Stock should be greater than 0';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }
    
    if (!formData.image.trim()) {
      errors.image = 'Image URL is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit form to add/edit product
  const handleFormSubmit = async () => {
    // Convert empty price string to 0 for validation
    if (formData.price === '') {
      setFormData(prev => ({
        ...prev,
        price: 0
      }));
      
      // Add price error
      setFormErrors(prev => ({
        ...prev,
        price: 'Price must be greater than 0'
      }));
      
      return;
    }
    
    // Convert empty stock string to 0 for validation
    if (formData.stock === '') {
      setFormData(prev => ({
        ...prev,
        stock: 0
      }));
      
      // Add stock error
      setFormErrors(prev => ({
        ...prev,
        stock: 'Stock should be greater than 0'
      }));
      
      return;
    }
    
    if (!validateForm()) return;
    
    try {
      if (formMode === 'add') {
        // Add new product using Redux thunk
        await dispatch(addAdminProduct(formData)).unwrap();
        showNotification('Product added successfully', 'success');
      } else if (currentProductId) {
        // Update existing product using Redux thunk
        await dispatch(updateAdminProduct({ 
          productId: currentProductId, 
          formData 
        })).unwrap();
        showNotification('Product updated successfully', 'success');
      }
      
      setFormOpen(false);
    } catch (err: any) {
      const errorMessage = typeof err === 'string' ? err : `Failed to ${formMode} product`;
      showNotification(errorMessage, 'error');
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  // Delete product
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    try {
      // Delete product using Redux thunk
      await dispatch(deleteAdminProduct(productToDelete)).unwrap();
      showNotification('Product deleted successfully', 'success');
    } catch (err: any) {
      const errorMessage = typeof err === 'string' ? err : 'Failed to delete product';
      showNotification(errorMessage, 'error');
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Show notification
  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <AdminLayout
      title="Product Management"
      subtitle="Add, edit, and remove products from your inventory"
      loading={loading && products.length === 0}
      notification={{
        open: notification.open,
        message: notification.message,
        severity: notification.severity,
        onClose: handleCloseNotification
      }}
    >
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        sx={adminProductPageStyles.headerContainer}
      >
        <Typography variant="h6" sx={adminProductPageStyles.pageTitle}>
          Products
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
          sx={adminProductPageStyles.addButton}
        >
          Add Product
        </Button>
      </Stack>

      {error && products.length === 0 ? (
        <Alert severity="error" sx={adminProductPageStyles.errorAlert}>
          {error}
        </Alert>
      ) : (
        <Box>
          {products.length === 0 && !loading ? (
            <Box sx={adminProductPageStyles.emptyContainer}>
              <Typography variant="subtitle1" sx={adminProductPageStyles.emptyText}>
                No products found
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2} sx={adminProductPageStyles.productsList}>
              {products.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteClick}
                />
              ))}
            </Stack>
          )}
        </Box>
      )}

      {/* Add/Edit Product Form */}
      <ProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        formErrors={formErrors}
        formMode={formMode}
        loading={loading}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleBooleanSelectChange={handleBooleanSelectChange}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        loading={loading}
      />
    </AdminLayout>
  );
};

export default AdminProductsPage;
