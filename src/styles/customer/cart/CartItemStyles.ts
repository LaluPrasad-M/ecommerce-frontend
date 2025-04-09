import { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export interface CartItemStylesType {
  card: SxProps<Theme>;
  cardInStock: (theme: Theme) => SxProps<Theme>;
  cardOutOfStock: (theme: Theme) => SxProps<Theme>;
  updateProgress: SxProps<Theme>;
  stack: SxProps<Theme>;
  mobileDivider: SxProps<Theme>;
  imageContainer: SxProps<Theme>;
  productImage: (theme: Theme) => SxProps<Theme>;
  infoContainer: SxProps<Theme>;
  productTitle: SxProps<Theme>;
  productDescription: SxProps<Theme>;
  priceContainer: SxProps<Theme>;
  priceText: SxProps<Theme>;
  quantityContainer: SxProps<Theme>;
  quantityButtonGroup: SxProps<Theme>;
  quantityButton: SxProps<Theme>;
  quantityValueButton: SxProps<Theme>;
  subtotalContainer: SxProps<Theme>;
  subtotalText: SxProps<Theme>;
  removeContainer: SxProps<Theme>;
  removeButton: SxProps<Theme>;
  productBox: SxProps<Theme>;
  badgeStyles: SxProps<Theme>;
  productInfoBox: SxProps<Theme>;
  productInfoHeader: SxProps<Theme>;
  productName: SxProps<Theme>;
  pricePerItem: SxProps<Theme>;
  stockChip: SxProps<Theme>;
  quantityControls: SxProps<Theme>;
  quantityPaper: SxProps<Theme>;
  quantityValue: SxProps<Theme>;
  removeIconButton: SxProps<Theme>;
  confirmDialogPaper: SxProps<Theme>;
  dialogActions: SxProps<Theme>;
}

export const cartItemStyles: CartItemStylesType = {
  card: {
    mb: 2,
    p: 2,
    borderRadius: 2,
    position: 'relative',
    boxShadow: (theme) => theme.palette.mode === 'dark' 
      ? '0 4px 15px 0 rgba(0,0,0,0.15)' 
      : '0 4px 15px 0 rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      boxShadow: (theme) => theme.palette.mode === 'dark' 
        ? '0 6px 20px 0 rgba(0,0,0,0.2)' 
        : '0 6px 20px 0 rgba(0,0,0,0.1)',
      transform: 'translateY(-2px)'
    }
  },
  cardInStock: (theme) => ({
    ...cartItemStyles.card,
    borderLeft: `4px solid ${theme.palette.success.main}`
  }),
  cardOutOfStock: (theme) => ({
    ...cartItemStyles.card,
    borderLeft: `4px solid ${theme.palette.error.main}`
  }),
  updateProgress: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    height: 2
  },
  stack: {
    direction: { xs: 'column', sm: 'row' },
    spacing: 2,
    p: 2,
    alignItems: 'center'
  },
  mobileDivider: {
    display: { xs: 'block', sm: 'none' },
    my: 1,
    borderBottom: '1px solid',
    borderColor: 'divider',
    width: '100%'
  },
  imageContainer: {
    width: { xs: '100%', sm: '15%' },
    display: 'flex',
    justifyContent: { xs: 'center', sm: 'flex-start' }
  },
  productImage: (theme) => ({
    objectFit: 'contain',
    borderRadius: 1,
    bgcolor: alpha(theme.palette.common.black, 0.04),
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  }),
  infoContainer: {
    flexGrow: 1,
    width: { xs: '100%', sm: '30%' }
  },
  productTitle: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  productDescription: {
    mt: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  priceContainer: {
    width: { xs: '50%', sm: '10%' },
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  priceText: {
    minWidth: '70px',
    textAlign: 'right',
    fontWeight: 'medium'
  },
  quantityContainer: {
    width: { xs: '50%', sm: '20%' },
    display: 'flex',
    justifyContent: { xs: 'flex-end', sm: 'center' },
    alignItems: 'center'
  },
  quantityButtonGroup: {
    boxShadow: (theme) => theme.palette.mode === 'dark' 
      ? '0 2px 8px 0 rgba(0,0,0,0.2)' 
      : '0 2px 8px 0 rgba(0,0,0,0.1)',
    borderRadius: 2,
    '& .MuiButtonGroup-grouped': {
      minWidth: { xs: '36px', sm: '40px' },
      height: { xs: '36px', sm: '40px' }
    },
    '& .MuiButton-root': {
      borderColor: (theme) => theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.15)' 
        : 'rgba(0,0,0,0.1)'
    }
  },
  quantityButton: {
    transition: 'all 0.2s ease',
    '&:hover:not(:disabled)': {
      backgroundColor: 'primary.main',
      color: 'white'
    }
  },
  quantityValueButton: {
    fontWeight: 'bold',
    minWidth: { xs: '36px', sm: '50px' },
    fontSize: { xs: '0.9rem', sm: '1rem' }
  },
  subtotalContainer: {
    width: { xs: '50%', sm: '15%' },
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  subtotalText: {
    minWidth: '70px',
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'primary.main'
  },
  removeContainer: {
    width: { xs: '50%', sm: '10%' },
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  removeButton: {
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    '&:hover': {
      backgroundColor: (theme) => theme.palette.error.light,
      transform: 'scale(1.1)'
    }
  },
  productBox: {
    cursor: 'pointer'
  },
  badgeStyles: {
    '& .MuiBadge-badge': { 
      fontSize: '0.8rem' 
    }
  },
  productInfoBox: {
    flexGrow: 1, 
    width: { xs: '100%', sm: 'auto' }
  },
  productInfoHeader: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start'
  },
  productName: {
    cursor: 'pointer',
    '&:hover': { 
      color: 'primary.main',
      textDecoration: 'underline'
    }
  },
  pricePerItem: {
    mt: 0.5, 
    mb: 1
  },
  stockChip: {
    mb: 1
  },
  quantityControls: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    width: { xs: '100%', sm: 'auto' }
  },
  quantityPaper: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '24px',
    overflow: 'hidden'
  },
  quantityValue: {
    px: 2, 
    fontWeight: 'medium'
  },
  removeIconButton: {
    ml: 1
  },
  confirmDialogPaper: {
    elevation: 4, 
    borderRadius: 2
  },
  dialogActions: {
    p: 2, 
    pt: 0
  }
}; 