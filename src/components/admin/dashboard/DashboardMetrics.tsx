import React from 'react';
import { Box } from '@mui/material';
import MetricCard from './MetricCard';
import { dashboardMetricsStyles } from '../../../styles/admin/dashboard';
import { DashboardMetricsProps } from '../../../types';
const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  lowStockProducts,
  productsInInventory,
  totalOrders,
  totalItemsSold,
  couponUsage,
  totalSales
}) => {
  return (
    <Box sx={dashboardMetricsStyles.container}>
      <MetricCard 
        title="Products (Low Stock)"
        value={lowStockProducts}
        subtitle={`${productsInInventory} total products in inventory`}
        linkTo="/admin/products"
      />
      
      <MetricCard 
        title="Orders"
        value={totalOrders}
        subtitle={`${totalItemsSold} products sold`}
        linkTo="/admin/orders"
      />

      <MetricCard 
        title="Coupon Usage"
        value={couponUsage}
        linkTo="/admin/coupons"
      />

      <MetricCard 
        title="Revenue"
        value={`₹${totalSales.toLocaleString()}`}
      />
    </Box>
  );
};

export default DashboardMetrics; 