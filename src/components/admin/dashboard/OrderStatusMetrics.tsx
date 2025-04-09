import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  Box, 
  Divider,
  Stack,
  LinearProgress
} from '@mui/material';
import { OrderStatusMetricsProps } from '../../../types';
import { orderStatusMetricsStyles } from '../../../styles/admin/dashboard';

const OrderStatusMetrics: React.FC<OrderStatusMetricsProps> = ({
  ordersByStatus,
  totalOrders
}) => {
  return (
    <Paper sx={orderStatusMetricsStyles.container}>
      <Box sx={orderStatusMetricsStyles.header}>
        <Typography variant="h6" gutterBottom>
          Orders by Status
        </Typography>
        <Divider />
      </Box>
      
      <Stack spacing={2}>
        {ordersByStatus.map((item) => {
          const percentage = totalOrders > 0 ? (item.count / totalOrders) * 100 : 0;
          
          return (
            <Box 
              key={item.status} 
              component={Link} 
              to="/admin/orders" 
              sx={orderStatusMetricsStyles.statusLabel}
            >
              <Box sx={orderStatusMetricsStyles.statusRow}>
                <Typography variant="body2" color="text.secondary">
                  {item.status}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {item.count} ({percentage.toFixed(1)}%)
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={percentage} 
                sx={orderStatusMetricsStyles.progressBar(item.color)} 
              />
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default OrderStatusMetrics; 