import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { getThemeBasedStatusColor } from '../../../utils/helpers';

export interface OrderDetailStylesType {
  container: SxProps;
  headerPaper: {
    p: number;
    mb: number;
    borderRadius: number;
  };
  headerBox: {
    display: string;
    justifyContent: string;
    alignItems: string;
    mb: number;
  };
  infoSection: {
    mt: number;
  };
  infoStack: {
    width: string;
  };
  infoBox: {
    flex: number;
  };
  iconWithText: {
    display: string;
    alignItems: string;
    mb: number;
  };
  infoIcon: {
    mr: number;
  };
  progressPaper: {
    p: number;
    mb: number;
    borderRadius: number;
    mt: number;
  };
  cancelBox: {
    display: string;
    justifyContent: string;
    mt: number;
  };
  orderProgress: {
    mb: number;
    '& .MuiStepLabel-root.Mui-completed': {
      color: string;
    }
  };
  statusMessageText: {
    mb: number;
    textAlign: string;
  };
  itemsPaper: {
    p: number;
    mb: number;
    borderRadius: number;
    mt: number;
  };
  tableContainer: {
    maxHeight: number;
  };
  summaryPaper: {
    p: number;
    borderRadius: number;
    mt: number;
  };
  summaryBox: {
    display: string;
    flexDirection: string;
    gap: number;
  };
  summaryRow: {
    display: string;
    justifyContent: string;
  };
  divider: {
    my: number;
  };
  cancelButtonContainer: {
    display: string;
    justifyContent: string;
  };
  alertMessageCentered: {
    mb: number;
    '& .MuiAlert-message': {
      width: string;
      textAlign: string;
    }
  };
  errorAlert: {
    mt: number;
  };
  collapsibleHeader: {
    display: string;
    justifyContent: string;
    alignItems: string;
    cursor: string;
    p: number;
    borderRadius: number;
  };
  collapsibleHeaderHover: {
    backgroundColor: string;
  };
  dialogPaper: {
    elevation: number;
    borderRadius: number;
  };
  dialogTitle: {
    pb: number;
  };
  dialogActions: {
    px: number;
    pb: number;
  };
  cancelButton: {
    minWidth: number;
  };
  equalHeightCard: {
    height: string;
  };
  equalWidthBox: {
    flex: number;
    width: string;
  };
  stackFullWidth: {
    width: string;
  };
  previewDialogContent: {
    p: number;
    position: string;
  };
  closePreviewButton: {
    position: string;
    top: number;
    right: number;
    color: string;
    bgcolor: string;
    '&:hover': {
      bgcolor: string;
    };
  };
  previewImage: {
    maxWidth: string;
    maxHeight: string;
    display: string;
    margin: string;
  };
  productImage: {
    width: number;
    height: number;
    objectFit: string;
    borderRadius: number;
    bgcolor: string;
    transition: string;
    '&:hover': {
      transform: string;
      cursor: string;
    };
  };
  productBox: {
    cursor: string;
    mr: number;
    display: string;
  };
  statusIcon: {
    color: string;
  };
  avatarStyle: (theme: Theme) => {
    mr: number;
    width: number;
    height: number;
    bgcolor: string;
  };
  productNameStyle: {
    cursor: string;
    '&:hover': {
      color: string;
      textDecoration: string;
    };
  };
  flexBox: SxProps<Theme>;
  cancelIcon: SxProps<Theme>;
  contentDivider: SxProps<Theme>;
  cancelledAlert: SxProps<Theme>;
  cancelledStatusBox: SxProps<Theme>;
  orderStatusChip: (status: string, theme: Theme) => SxProps<Theme>;
  quantityChip: SxProps<Theme>;
}

export const orderDetailStyles = (theme: Theme): OrderDetailStylesType => ({
  container: {},
  headerPaper: {
    p: 3,
    mb: 3,
    borderRadius: 2,
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  infoSection: {
    mt: 2,
  },
  infoStack: {
    width: '100%',
  },
  infoBox: {
    flex: 1,
  },
  iconWithText: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
  },
  infoIcon: {
    mr: 1,
  },
  progressPaper: {
    p: 3,
    mb: 3,
    borderRadius: 2,
    mt: 3,
  },
  cancelBox: {
    display: 'flex',
    justifyContent: 'center',
    mt: 3,
  },
  orderProgress: {
    mb: 3,
    '& .MuiStepLabel-root.Mui-completed': {
      color: 'success.main'
    }
  },
  statusMessageText: {
    mb: 2,
    textAlign: 'center'
  },
  itemsPaper: {
    p: 3,
    mb: 3,
    borderRadius: 2,
    mt: 3,
  },
  tableContainer: {
    maxHeight: 400,
  },
  summaryPaper: {
    p: 3,
    borderRadius: 2,
    mt: 3,
  },
  summaryBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  divider: {
    my: 1,
  },
  cancelButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  alertMessageCentered: {
    mb: 2,
    '& .MuiAlert-message': {
      width: '100%',
      textAlign: 'center',
    }
  },
  errorAlert: {
    mt: 2,
  },
  collapsibleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    p: 1,
    borderRadius: 1,
  },
  collapsibleHeaderHover: {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
  },
  dialogPaper: {
    elevation: 8,
    borderRadius: 2,
  },
  dialogTitle: {
    pb: 1,
  },
  dialogActions: {
    px: 3,
    pb: 3,
  },
  cancelButton: {
    minWidth: 150,
  },
  equalHeightCard: {
    height: '100%',
  },
  equalWidthBox: {
    flex: 1,
    width: '100%',
  },
  stackFullWidth: {
    width: '100%',
  },
  previewDialogContent: {
    p: 0,
    position: 'relative'
  },
  closePreviewButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'white',
    bgcolor: 'rgba(0,0,0,0.5)',
    '&:hover': {
      bgcolor: 'rgba(0,0,0,0.7)',
    }
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    display: 'block',
    margin: '0 auto'
  },
  productImage: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    borderRadius: 1,
    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'zoom-in'
    }
  },
  productBox: {
    cursor: 'pointer',
    mr: 2,
    display: 'flex'
  },
  statusIcon: {
    color: 'white'
  },
  avatarStyle: (theme) => ({
    mr: 2,
    width: 40,
    height: 40,
    bgcolor: theme.palette.primary.light
  }),
  productNameStyle: {
    cursor: 'pointer',
    '&:hover': {
      color: 'primary.main',
      textDecoration: 'underline'
    }
  },
  flexBox: {
    flex: 1
  },
  cancelIcon: {
    mr: 1
  },
  contentDivider: {
    mb: 2
  },
  cancelledAlert: {
    mt: 2
  },
  cancelledStatusBox: {
    display: 'flex', 
    alignItems: 'center'
  },
  orderStatusChip: (status, theme) => ({
    bgcolor: status ? getThemeBasedStatusColor(status, theme.palette.mode) : undefined,
    color: 'white',
    fontWeight: 'bold',
    px: 1
  }),
  quantityChip: {
    fontSize: '0.875rem',
    height: 24
  },
});

// Helper function for styling chip icons
export const getOrderDetailChipStyles = (status: string, theme: Theme): SxProps => ({
  '& .MuiChip-icon': {
    color: 'white !important',
    opacity: 1
  }
}); 