import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CouponCardProps } from '../../../types';
import { couponCardStyles } from '../../../styles/admin/coupons';

const CouponCard: React.FC<CouponCardProps> = ({ 
  coupon, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TableRow sx={couponCardStyles.tableRow}>
      <TableCell sx={couponCardStyles.tableCell}>
        <Typography fontWeight="bold">
          {coupon.code}
        </Typography>
      </TableCell>
      <TableCell sx={couponCardStyles.tableCell}>
        {coupon.discountPercentage}%
      </TableCell>
      <TableCell sx={couponCardStyles.tableCell}>
        ₹{coupon.minimumCartValue.toFixed(2)}
      </TableCell>
      <TableCell sx={couponCardStyles.tableCell}>
        {new Date(coupon.startDate).toLocaleDateString()}
      </TableCell>
      <TableCell sx={couponCardStyles.tableCell}>
        {new Date(coupon.endDate).toLocaleDateString()}
      </TableCell>
      <TableCell sx={couponCardStyles.tableCell}>
        <Chip 
          label={coupon.isActive ? 'Active' : 'Inactive'} 
          sx={couponCardStyles.statusChip(coupon.isActive)}
          size="small"
        />
      </TableCell>
      <TableCell sx={couponCardStyles.actions} align="right">
        <IconButton
          size="small"
          onClick={() => onEdit(coupon)}
          color="primary"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onDelete(coupon.id)}
          color="error"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CouponCard; 