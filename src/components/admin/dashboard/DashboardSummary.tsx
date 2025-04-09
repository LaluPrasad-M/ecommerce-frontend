import React from 'react';
import { Stack, Box } from '@mui/material';
import DashboardMetrics from './DashboardMetrics';
import OrderStatusMetrics from './OrderStatusMetrics';
import { DashboardSummaryProps } from '../../../types';
import { dashboardSummaryStyles } from '../../../styles/admin/dashboard';

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  metrics,
  ordersByStatus
}) => {
  return (
    <Box sx={dashboardSummaryStyles.container}>
      <Stack sx={dashboardSummaryStyles.stackContainer}>
        {/* Main Metrics */}
        <Box sx={dashboardSummaryStyles.metricsBox}>
          <DashboardMetrics 
            lowStockProducts={metrics.lowStockProducts}
            productsInInventory={metrics.productsInInventory}
            totalOrders={metrics.totalOrders}
            totalItemsSold={metrics.totalItemsSold}
            couponUsage={metrics.couponUsage}
            totalSales={metrics.totalSales}
          />
        </Box>
        
        {/* Orders by Status */}
        <Box sx={dashboardSummaryStyles.statusBox}>
          <OrderStatusMetrics 
            ordersByStatus={ordersByStatus} 
            totalOrders={metrics.totalOrders}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardSummary; 