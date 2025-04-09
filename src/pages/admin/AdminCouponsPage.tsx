import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Coupon, CouponFormData } from '../../types';
import AdminLayout from '../../components/admin/common/AdminLayout';
import CouponTable from '../../components/admin/coupons/CouponTable';
import DeleteConfirmDialog from '../../components/admin/common/DeleteConfirmDialog';
import CouponForm from '../../components/admin/coupons/CouponForm';
import { adminCouponPageStyles } from '../../styles/admin/coupons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  fetchAdminCoupons, 
  addAdminCoupon, 
  updateAdminCoupon, 
  deleteAdminCoupon 
} from '../../features/admin/coupons/adminCouponsSlice';

const emptyCouponForm: CouponFormData = {
  code: '',
  discountPercentage: '',
  minimumCartValue: '',
  startDate: '',
  endDate: '',
  isActive: true
};

const AdminCouponsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { coupons, loading, error } = useAppSelector(state => state.adminCoupons);
  
  // Coupon form
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<CouponFormData>(emptyCouponForm);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentCouponId, setCurrentCouponId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CouponFormData, string>>>({});
  
  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);
  
  // Notification
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  // Fetch coupons on component mount
  useEffect(() => {
    fetchCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all coupons
  const fetchCoupons = () => {
    dispatch(fetchAdminCoupons())
      .unwrap()
      .catch(error => {
        showNotification(typeof error === 'string' ? error : 'Failed to fetch coupons', 'error');
      });
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

  // Open form to add new coupon
  const handleAddCoupon = () => {
    setFormData(emptyCouponForm);
    setFormMode('add');
    setCurrentCouponId(null);
    setFormErrors({});
    setFormOpen(true);
  };

  // Open form to edit coupon
  const handleEditCoupon = (coupon: Coupon) => {
    setFormData({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      minimumCartValue: coupon.minimumCartValue,
      startDate: coupon.startDate ? coupon.startDate.split('T')[0] : '',
      endDate: coupon.endDate ? coupon.endDate.split('T')[0] : '',
      isActive: coupon.isActive
    });
    setFormMode('edit');
    setCurrentCouponId(coupon.id);
    setFormErrors({});
    setFormOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (couponId: string) => {
    setCouponToDelete(couponId);
    setDeleteDialogOpen(true);
  };

  // Delete coupon
  const handleDeleteCoupon = async () => {
    if (!couponToDelete) return;
    
    try {
      await dispatch(deleteAdminCoupon(couponToDelete)).unwrap();
      showNotification('Coupon deleted successfully', 'success');
    } catch (err: any) {
      showNotification(typeof err === 'string' ? err : 'Failed to delete coupon', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setCouponToDelete(null);
    }
  };

  // Handle text field input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['discountPercentage', 'minimumCartValue'].includes(name) 
        ? (value === '' ? '' : Number(value)) 
        : value
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

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CouponFormData, string>> = {};
    
    if (!formData.code.trim()) {
      errors.code = 'Coupon code is required';
    }
    
    if (formData.discountPercentage === '' || Number(formData.discountPercentage) <= 0) {
      errors.discountPercentage = 'Discount percentage must be greater than 0';
    }
    
    if (Number(formData.discountPercentage) > 100) {
      errors.discountPercentage = 'Discount percentage cannot exceed 100%';
    }
    
    if (formData.minimumCartValue === '' || Number(formData.minimumCartValue) < 0) {
      errors.minimumCartValue = 'Minimum cart value must be 0 or greater';
    }
    
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.endDate = 'End date must be after start date';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit form
  const handleSubmitForm = async () => {
    if (!validateForm()) return;
    
    try {
      if (formMode === 'add') {
        await dispatch(addAdminCoupon(formData)).unwrap();
        showNotification('Coupon created successfully', 'success');
      } else if (currentCouponId) {
        await dispatch(updateAdminCoupon({ 
          couponId: currentCouponId, 
          formData 
        })).unwrap();
        showNotification('Coupon updated successfully', 'success');
      }
      
      setFormOpen(false);
    } catch (err: any) {
      showNotification(typeof err === 'string' ? err : 'Failed to save coupon', 'error');
    }
  };

  return (
    <AdminLayout
      title="Coupon Management"
      subtitle="Create, edit, and manage discount coupons for your store"
      loading={loading && coupons.length === 0}
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
        sx={adminCouponPageStyles.header}
      >
        <Typography variant="h6">Coupons</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCoupon}
        >
          Add Coupon
        </Button>
      </Stack>

      {error && coupons.length === 0 ? (
        <Box sx={adminCouponPageStyles.errorPlaceholder} />
      ) : (
        <CouponTable
          coupons={coupons}
          loading={loading}
          error={error}
          onEdit={handleEditCoupon}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Add/Edit Coupon Dialog */}
      <CouponForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmitForm}
        formData={formData}
        formErrors={formErrors}
        formMode={formMode}
        loading={loading}
        handleInputChange={handleInputChange}
        handleBooleanSelectChange={handleBooleanSelectChange}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteCoupon}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon? This action cannot be undone."
      />
    </AdminLayout>
  );
};

export default AdminCouponsPage; 