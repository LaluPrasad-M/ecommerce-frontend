import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { ORDER_STATUSES, StatusUpdateDialogProps } from '../../../types';
import { statusUpdateDialogStyles } from '../../../styles/admin/orders';

const StatusUpdateDialog: React.FC<StatusUpdateDialogProps> = ({
  open,
  onClose,
  onSubmit,
  selectedOrder,
  newStatus,
  onStatusChange,
  loading
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={statusUpdateDialogStyles.dialogTitle}>
        Update Order Status
      </DialogTitle>
      <DialogContent sx={statusUpdateDialogStyles.dialogContent}>
        <FormControl sx={statusUpdateDialogStyles.formControl}>
          <InputLabel>Status</InputLabel>
          <Select
            value={newStatus}
            label="Status"
            onChange={onStatusChange}
          >
            {ORDER_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={loading || newStatus === selectedOrder?.status}
        >
          {loading ? <CircularProgress size={statusUpdateDialogStyles.loadingSpinner.size} /> : 'Update Status'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateDialog; 