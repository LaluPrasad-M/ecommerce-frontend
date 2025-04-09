import { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export interface CartSummaryStylesType {
  paper: SxProps<Theme>;
  title: SxProps<Theme>;
  divider: SxProps<Theme>;
  listItem: SxProps<Theme>;
  amountText: SxProps<Theme>;
  couponBox: SxProps<Theme>;
  couponTitleBox: SxProps<Theme>;
  couponInputBox: SxProps<Theme>;
  couponTextField: SxProps<Theme>;
  addressBox: SxProps<Theme>;
  placeOrderButton: SxProps<Theme>;
  receiptIcon: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
  warningAlert: SxProps<Theme>;
  appliedCouponBox: SxProps<Theme>;
  appliedCouponText: SxProps<Theme>;
  couponSection: SxProps<Theme>;
  couponHeading: SxProps<Theme>;
  couponHeadingIcon: SxProps<Theme>;
  couponForm: SxProps<Theme>;
  couponButton: SxProps<Theme>;
  couponErrorAlert: SxProps<Theme>;
  checkIcon: SxProps<Theme>;
  couponTag: SxProps<Theme>;
  couponInput: SxProps<Theme>;
  couponSavings: SxProps<Theme>;
  removeButton: SxProps<Theme>;
  couponCodeText: SxProps<Theme>;
  couponFieldContainer: SxProps<Theme>;
  orderButtonContainer: SxProps<Theme>;
}

export const cartSummaryStyles: CartSummaryStylesType = {
  paper: {
    p: 3,
    borderRadius: 2,
    boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 4px 20px 0 rgba(0,0,0,0.12)' : '0 4px 20px 0 rgba(0,0,0,0.08)'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  divider: {
    my: 2
  },
  listItem: {
    py: 1,
    px: 0
  },
  amountText: {
    minWidth: '80px',
    textAlign: 'right'
  },
  couponBox: {
    mb: 2
  },
  couponTitleBox: {
    mb: 1,
    display: 'flex',
    alignItems: 'center'
  },
  couponInputBox: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  couponTextField: {
    flexGrow: 1,
    mr: 1
  },
  addressBox: {
    mb: 2
  },
  placeOrderButton: {
    py: 1.5,
    fontWeight: 'bold',
    borderRadius: 2
  },
  receiptIcon: {
    mr: 1
  },
  errorAlert: {
    mb: 2
  },
  warningAlert: {
    mb: 2
  },
  appliedCouponBox: {
    mb: 2,
    p: 2,
    borderRadius: 2,
    bgcolor: (theme) => alpha(theme.palette.success.main, 0.15),
    border: '1px solid',
    borderColor: (theme) => alpha(theme.palette.success.main, 0.3),
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '6px',
      height: '100%',
      backgroundColor: 'success.main',
    }
  },
  appliedCouponText: {
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  couponSection: {
    mb: 2
  },
  couponHeading: {
    display: 'flex', 
    alignItems: 'center', 
    mb: 2
  },
  couponHeadingIcon: {
    mr: 1, 
    color: 'primary.main'
  },
  couponForm: {
    display: 'flex',
    width: '100%'
  },
  couponButton: {
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 'medium',
    minWidth: '80px',
    height: '40px'
  },
  couponErrorAlert: {
    mt: 1, 
    width: '100%'
  },
  checkIcon: {
    color: 'success.main', 
    mr: 1,
    fontSize: 20
  },
  couponTag: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mr: 2
  },
  couponInput: {
    borderRadius: 2,
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
        borderWidth: 1.5
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
        borderWidth: 1.5
      }
    }
  },
  couponSavings: {
    fontSize: '0.85rem',
    mt: 0.5,
    color: 'success.main',
    fontWeight: 'medium'
  },
  removeButton: {
    borderRadius: '50px',
    textTransform: 'none',
    fontWeight: 'medium',
    color: 'error.main',
    borderColor: 'error.main',
    '&:hover': {
      backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
      borderColor: 'error.main'
    }
  },
  couponCodeText: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: '1.1rem'
  },
  couponFieldContainer: {
    position: 'relative',
    width: '100%',
    mr: 1
  },
  orderButtonContainer: {
    mt: 2
  }
}; 