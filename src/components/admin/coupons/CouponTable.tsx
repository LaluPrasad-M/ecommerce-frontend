import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { CouponTableProps } from '../../../types';
import CouponCard from './CouponCard';
import { couponTableStyles } from '../../../styles/admin/coupons';

const CouponTable: React.FC<CouponTableProps> = ({
  coupons,
  loading,
  error,
  onEdit,
  onDelete
}) => {
  if (error) {
    return <Alert severity="error" sx={couponTableStyles.errorAlert}>{error}</Alert>;
  }

  if (loading && coupons.length === 0) {
    return (
      <Box sx={couponTableStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (coupons.length === 0 && !loading) {
    return (
      <Box sx={couponTableStyles.emptyState}>
        <Typography variant="subtitle1" color="text.secondary">
          No coupons found
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer sx={couponTableStyles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={couponTableStyles.tableHead}>Code</TableCell>
            <TableCell sx={couponTableStyles.tableHead}>Discount Percentage</TableCell>
            <TableCell sx={couponTableStyles.tableHead}>Minimum Cart Value</TableCell>
            <TableCell sx={couponTableStyles.tableHead}>Start Date</TableCell>
            <TableCell sx={couponTableStyles.tableHead}>End Date</TableCell>
            <TableCell sx={couponTableStyles.tableHead}>Status</TableCell>
            <TableCell sx={couponTableStyles.tableHead} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CouponTable; 