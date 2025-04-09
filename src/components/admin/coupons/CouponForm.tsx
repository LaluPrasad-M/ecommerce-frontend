import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { CouponFormProps } from '../../../types';
import { couponFormStyles } from '../../../styles/admin/coupons';

const CouponForm: React.FC<CouponFormProps> = ({
  open,
  onClose,
  onSubmit,
  formData,
  formErrors,
  formMode,
  loading = false,
  handleInputChange,
  handleBooleanSelectChange
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {formMode === 'add' ? 'Add New Coupon' : 'Edit Coupon'}
      </DialogTitle>
      <DialogContent sx={couponFormStyles.dialogContent}>
        <Box sx={couponFormStyles.formBox}>
          <TextField
            label="Coupon Code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            fullWidth
            error={!!formErrors.code}
            helperText={formErrors.code}
            margin="normal"
            autoFocus
          />
          
          <TextField
            label="Discount Percentage (%)"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleInputChange}
            fullWidth
            error={!!formErrors.discountPercentage}
            helperText={formErrors.discountPercentage}
            margin="normal"
            type="number"
            inputProps={{ min: 1, max: 100, step: 1 }}
          />
          
          <TextField
            label="Minimum Cart Value (₹)"
            name="minimumCartValue"
            value={formData.minimumCartValue}
            onChange={handleInputChange}
            fullWidth
            error={!!formErrors.minimumCartValue}
            helperText={formErrors.minimumCartValue}
            margin="normal"
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
          />
          
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            fullWidth
            error={!!formErrors.startDate}
            helperText={formErrors.startDate}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            fullWidth
            error={!!formErrors.endDate}
            helperText={formErrors.endDate}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="isActive"
              value={formData.isActive ? 'true' : 'false'}
              onChange={handleBooleanSelectChange}
              label="Status"
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSubmit} 
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : formMode === 'add' ? 'Create Coupon' : 'Update Coupon'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CouponForm; 