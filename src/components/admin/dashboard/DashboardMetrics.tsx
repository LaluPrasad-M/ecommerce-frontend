import React from 'react';
import { Box } from '@mui/material';
import MetricCard from './MetricCard';
import { dashboardMetricsStyles } from '../../../styles/admin/dashboard';
import { DashboardMetricsProps } from '../../../types';
import { formatPrice } from '../../../utils/helpers';

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
        value={lowStockProducts.toString()}
        subtitle={`${productsInInventory} total products in inventory`}
        linkTo="/admin/products"
      />
      
      <MetricCard 
        title="Orders"
        value={totalOrders.toString()}
        subtitle={`${totalItemsSold} products sold`}
        linkTo="/admin/orders"
      />

      <MetricCard 
        title="Coupon Usage"
        value={couponUsage.toString()}
        subtitle="Applied to orders"
        linkTo="/admin/coupons"
      />

      <MetricCard 
        title="Revenue"
        value={formatPrice(totalSales)}
        subtitle="Total sales amount"
        linkTo="/admin/orders"
      />
    </Box>
  );
};

export default DashboardMetrics; 