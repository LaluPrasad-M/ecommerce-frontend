import React, { useEffect, useState } from 'react';
import { 
  Stack,
  Alert
} from '@mui/material';
import { OrderStatusData } from '../../types';
import AdminLayout from '../../components/admin/common/AdminLayout';
import DashboardSummary from '../../components/admin/dashboard/DashboardSummary';
import { getStatusColor } from '../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDashboardData } from '../../features/admin/dashboard/adminDashboardSlice';
import { adminDashboardPageStyles } from '../../styles/admin/dashboard/AdminDashboardPageStyles';

const AdminDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { metrics, loading, error } = useAppSelector(state => state.adminDashboard);
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info' as 'success' | 'error' | 'info' | 'warning'
  });
  
  useEffect(() => {
    fetchDashboardMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const fetchDashboardMetrics = () => {
    dispatch(fetchDashboardData())
      .unwrap()
      .catch(error => {
        showNotification(typeof error === 'string' ? error : 'Failed to fetch dashboard data', 'error');
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

  // Map status keys to readable names
  const getStatusLabel = (statusKey: string): string => {
    // Map status keys to readable names
    const statusMap: Record<string, string> = {
      'order placed': 'Order Placed',
      'packed': 'Packed',
      'shipping': 'Shipping',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
    };
    
    // Look up the status in the map, or use the key with first letter capitalized
    return statusMap[statusKey.toLowerCase()] || 
      (statusKey.charAt(0).toUpperCase() + statusKey.slice(1));
  };

  // Format order status data for the OrderStatusMetrics component
  const formatOrderStatusData = (): OrderStatusData[] => {
    return Object.entries(metrics.ordersByStatus).map(([status, countData]) => {
      // Extract the actual count value from different possible formats
      let count: number;
      if (typeof countData === 'number') {
        count = countData;
      } else if (typeof countData === 'object' && countData !== null) {
        // If it's an object with a count property, use that
        count = (countData as any).count || 0;
        
        // If the object has a _id property that looks like a status, use that for display
        if ((countData as any)._id && typeof (countData as any)._id === 'string') {
          status = (countData as any)._id;
        }
      } else {
        count = 0;
      }

      return {
        status: getStatusLabel(status),
        count,
        color: getStatusColor(status)
      };
    }).filter(item => item.count > 0); // Filter out zero counts
  };
  
  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Manage your store and view analytics"
      loading={loading}
      notification={{
        open: notification.open,
        message: notification.message,
        severity: notification.severity,
        onClose: handleCloseNotification
      }}
    >
      {error ? (
        <Alert severity="error" sx={adminDashboardPageStyles.errorAlert}>{error}</Alert>
      ) : (
        <Stack spacing={3} sx={adminDashboardPageStyles.container}>
          {/* Dashboard Summary */}
          <DashboardSummary 
            metrics={{
              lowStockProducts: metrics.lowStockProducts,
              productsInInventory: metrics.productsInInventory,
              totalOrders: metrics.totalOrders,
              totalItemsSold: metrics.totalItemsSold,
              couponUsage: metrics.couponUsage,
              totalSales: metrics.totalSales
            }}
            ordersByStatus={formatOrderStatusData()}
          />

          {/* Other dashboard sections can go here */}
          
        </Stack>
      )}
    </AdminLayout>
  );
};

export default AdminDashboardPage; 