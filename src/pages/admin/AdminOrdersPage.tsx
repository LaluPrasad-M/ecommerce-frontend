import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Alert,
  Stack,
  SelectChangeEvent
} from '@mui/material';
import { Order, ORDER_STATUSES } from '../../types';
import OrderCard from '../../components/shared/order/OrderCard';
import StatusUpdateDialog from '../../components/admin/orders/StatusUpdateDialog';
import AdminLayout from '../../components/admin/common/AdminLayout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAdminOrders, updateOrderStatus } from '../../features/admin/orders/adminOrdersSlice';
import { adminOrdersPageStyles } from '../../styles/admin/orders/AdminOrdersPageStyles';

const AdminOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector(state => state.adminOrders);
  
  // Status update dialog
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');
  
  // Notification
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all orders
  const fetchOrders = () => {
    dispatch(fetchAdminOrders())
      .unwrap()
      .catch(error => {
        showNotification(typeof error === 'string' ? error : 'Failed to fetch orders', 'error');
      });
  };

  // Open status update dialog
  const handleStatusUpdate = (order: Order) => {
    setSelectedOrder(order);
    
    // Find matching status with exact case
    const matchingStatus = ORDER_STATUSES.find(
      status => status === order.status || status.toLowerCase() === order.status.toLowerCase()
    );
    
    if (matchingStatus) {
      // Use the exact case from ORDER_STATUSES
      setNewStatus(matchingStatus);
    } else {
      // If status doesn't match any in our predefined statuses, default to first status
      console.log('Invalid order status:', order.status);
      setNewStatus(ORDER_STATUSES[0]); 
    }
    
    setStatusDialogOpen(true);
  };
  
  // Handle status change
  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    setNewStatus(e.target.value);
  };

  // Submit status update
  const handleSubmitStatusUpdate = async () => {
    if (!selectedOrder || newStatus === selectedOrder.status) {
      setStatusDialogOpen(false);
      return;
    }
    
    try {
      await dispatch(updateOrderStatus({ 
        orderId: selectedOrder.id, 
        status: newStatus 
      })).unwrap();
      
      showNotification('Order status updated successfully', 'success');
      setStatusDialogOpen(false);
    } catch (err: any) {
      const errorMessage = typeof err === 'string' ? err : 'Failed to update order status';
      showNotification(errorMessage, 'error');
    }
  };

  // Show notification
  const showNotification = (message: string, severity: 'success' | 'error') => {
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
      title="Order Management"
      subtitle="View and manage customer orders"
      loading={loading && orders.length === 0}
      notification={{
        open: notification.open,
        message: notification.message,
        severity: notification.severity,
        onClose: handleCloseNotification
      }}
    >
      <Typography variant="h6" gutterBottom sx={adminOrdersPageStyles.pageTitle}>
        Orders
      </Typography>

      {loading && orders.length === 0 ? (
        <Box sx={adminOrdersPageStyles.loadingPlaceholder} /> 
      ) : error && orders.length === 0 ? (
        <Alert severity="error" sx={adminOrdersPageStyles.errorAlert}>{error}</Alert>
      ) : (
        <Box>
          {orders.length === 0 ? (
            <Box sx={adminOrdersPageStyles.emptyContainer}>
              <Typography variant="subtitle1" sx={adminOrdersPageStyles.emptyText}>
                No orders found
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2} sx={adminOrdersPageStyles.ordersList}>
              {orders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  variant="admin"
                  onStatusUpdate={handleStatusUpdate} 
                />
              ))}
            </Stack>
          )}
        </Box>
      )}

      {/* Status Update Dialog */}
      <StatusUpdateDialog 
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        onSubmit={handleSubmitStatusUpdate}
        selectedOrder={selectedOrder}
        newStatus={newStatus}
        onStatusChange={handleStatusChange}
        loading={loading}
      />
    </AdminLayout>
  );
};

export default AdminOrdersPage;
