import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { alpha } from '@mui/material/styles';

export interface OrderCardStylesType {
  card: {
    mb: number;
    p: number;
    borderRadius: number;
  };
  orderInfo: {
    mb: number;
  };
  orderMeta: {
    display: string;
    justifyContent: string;
    alignItems: string;
    mb: number;
  };
  statusContainer: {
    display: string;
    alignItems: string;
    gap: number;
  };
  chip: (status: string) => {
    color: string;
    fontWeight: string;
    textShadow?: string;
  };
  divider: {
    my: number;
  };
  contentContainer: {
    display: string;
    flexDirection: {
      xs: string;
      md: string;
    };
    gap: number;
  };
  mainContent: {
    flex: string;
  };
  infoSection: {
    display: string;
    flexDirection: {
      xs: string;
      sm: string;
    };
    gap: number;
    mb: number;
  };
  orderDetails: {
    mt: number;
  };
  orderItem: (isLast: boolean) => {
    display: string;
    alignItems: string;
    justifyContent: string;
    py: number;
    borderBottom?: string;
    mb?: number;
  };
  itemImage: {
    width: number;
    height: number;
    objectFit: string;
    borderRadius: number;
    mr: number;
  };
  itemContent: {
    flex: string;
  };
  actionsBox: {
    display: string;
    justifyContent: string;
    mt: number;
  };
  summaryBox: {
    backgroundColor: string;
    p: number;
    borderRadius: number;
    width: {
      xs: string;
      md: string;
    };
    alignSelf: string;
    border?: string;
  };
  summaryTitle: {
    mb: number;
  };
  summaryRow: {
    display: string;
    justifyContent: string;
    alignItems: string;
    mb: number;
  };
  summaryDivider: {
    my: number;
  };
  summaryTotal: {
    display: string;
    justifyContent: string;
    alignItems: string;
    mt: number;
  };
  customerInfo: {
    mb: number;
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
  productImage: SxProps<Theme>;
  orderIdBox: SxProps<Theme>;
  customerInfoBox: SxProps<Theme>;
  shippingAddressBox: SxProps<Theme>;
  itemImageContainer: SxProps<Theme>;
  productInfoBox: SxProps<Theme>;
  productNameText: SxProps<Theme>;
  quantityChip: SxProps<Theme>;
  itemRowBox: SxProps<Theme>;
  multiplicationSymbol: SxProps<Theme>;
}

// Helper function to get icon styles
export const getStatusIconStyles = (): SxProps => ({
  color: 'white',
});

// Helper function to get chip icon container styles
export const getChipIconStyles = (): SxProps => ({
  '& .MuiChip-icon': {
    color: 'white !important',
    opacity: 1
  }
});

export const orderCardStyles = (theme: Theme): OrderCardStylesType => ({
  card: {
    mb: 3,
    p: 3,
    borderRadius: 2,
  },
  orderInfo: {
    mb: 2,
  },
  orderMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  chip: (status: string) => ({
    color: 'white',
    fontWeight: 'bold',
    ...(theme.palette.mode === 'light' && {
      textShadow: '0px 0px 2px rgba(0,0,0,0.3)'
    })
  }),
  divider: {
    my: 2,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    gap: 3,
  },
  mainContent: {
    flex: '1 1 auto',
  },
  infoSection: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    gap: 2,
    mb: 2,
  },
  orderDetails: {
    mt: 2,
  },
  orderItem: (isLast: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    py: 1,
    ...(!isLast && {
      borderBottom: `1px solid ${theme.palette.divider}`,
      mb: 1
    }),
  }),
  itemImage: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 1,
    mr: 2,
  },
  itemContent: {
    flex: '1 1 auto',
  },
  actionsBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 2,
  },
  summaryBox: {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.background.paper 
      : theme.palette.grey[50],
    p: 2,
    borderRadius: 2,
    width: {
      xs: '100%',
      md: '30%',
    },
    alignSelf: 'flex-start',
    ...(theme.palette.mode === 'light' && {
      border: `1px solid ${theme.palette.divider}`
    }),
  },
  summaryTitle: {
    mb: 2,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
  },
  summaryDivider: {
    my: 2,
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 1,
  },
  customerInfo: {
    mb: 2,
  },
  previewDialogContent: {
    p: 0,
    position: 'relative',
  },
  closePreviewButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'white',
    bgcolor: 'rgba(0,0,0,0.5)',
    '&:hover': {
      bgcolor: 'rgba(0,0,0,0.7)',
    },
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '90vh',
    display: 'block',
    margin: '0 auto',
  },
  productImage: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    borderRadius: 1,
    bgcolor: alpha(theme.palette.common.black, 0.04),
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'zoom-in'
    }
  },
  orderIdBox: {
    display: 'flex', 
    alignItems: 'center'
  },
  customerInfoBox: {
    flex: 1
  },
  shippingAddressBox: {
    flex: 1
  },
  itemImageContainer: {
    cursor: 'pointer', 
    position: 'relative'
  },
  productInfoBox: {
    display: 'flex', 
    flexDirection: 'column'
  },
  productNameText: {
    cursor: 'pointer',
    '&:hover': { 
      color: 'primary.main',
      textDecoration: 'underline'
    }
  },
  quantityChip: {
    height: 18, 
    fontSize: '0.7rem',
    '& .MuiChip-label': { 
      px: 0.7,
      py: 0
    }
  },
  itemRowBox: {
    display: 'flex', 
    alignItems: 'center', 
    gap: 1.5
  },
  multiplicationSymbol: {
    opacity: 0.7
  }
}); 