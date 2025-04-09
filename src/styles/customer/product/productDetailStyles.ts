import { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export interface ProductDetailStylesType {
  container: SxProps<Theme>;
  backButtonContainer: SxProps<Theme>;
  contentWrapper: SxProps<Theme>;
  imageContainer: SxProps<Theme>;
  productImage: SxProps<Theme>;
  closePreviewButton: SxProps<Theme>;
  previewImage: SxProps<Theme>;
  previewDialogContent: SxProps<Theme>;
  detailsContainer: SxProps<Theme>;
  errorContainer: SxProps<Theme>;
  headerSection: SxProps<Theme>;
  productName: SxProps<Theme>;
  categoryChip: SxProps<Theme>;
  divider: SxProps<Theme>;
  price: SxProps<Theme>;
  priceText: SxProps<Theme>;
  description: SxProps<Theme>;
  descriptionContainer: SxProps<Theme>;
  descriptionText: SxProps<Theme>;
  stockInfo: SxProps<Theme>;
  stockStatusContainer: SxProps<Theme>;
  stockText: SxProps<Theme>;
  stockLabel: SxProps<Theme>;
  creationDateText: SxProps<Theme>;
  featuresContainer: SxProps<Theme>;
  featureChip: SxProps<Theme>;
  quantityContainer: SxProps<Theme>;
  quantityLabel: SxProps<Theme>;
  quantityControls: SxProps<Theme>;
  quantityControlsPaper: SxProps<Theme>;
  quantityValue: SxProps<Theme>;
  quantityValueWide: SxProps<Theme>;
  quantityInput: SxProps<Theme>;
  actionContainer: SxProps<Theme>;
  addToCartButton: SxProps<Theme>;
  addButton: SxProps<Theme>;
  successMessage: SxProps<Theme>;
  successAlert: SxProps<Theme>;
  ratingContainer: SxProps<Theme>;
  reviewCount: SxProps<Theme>;
  noImageBox: SxProps<Theme>;
}

export const productDetailStyles: ProductDetailStylesType = {
  container: { 
    p: { xs: 2, md: 3 },
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  },
  backButtonContainer: {
    display: 'flex', 
    justifyContent: 'flex-end', 
    mb: 2
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 2, md: 4 }
  },
  imageContainer: { 
    width: { xs: '100%', md: '40%' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productImage: { 
    height: '400px', 
    objectFit: 'contain',
    backgroundColor: 'white',
    borderRadius: 1,
    cursor: 'zoom-in',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  closePreviewButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'white',
    bgcolor: 'rgba(0,0,0,0.5)',
    '&:hover': {
      bgcolor: 'rgba(0,0,0,0.7)'
    }
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    display: 'block',
    margin: '0 auto'
  },
  previewDialogContent: {
    p: 0,
    position: 'relative'
  },
  detailsContainer: { 
    width: { xs: '100%', md: '60%' },
    display: 'flex',
    flexDirection: 'column'
  },
  errorContainer: {
    p: 3,
    textAlign: 'center'
  },
  headerSection: {
    display: 'flex',
    alignItems: 'center',
    mb: 1
  },
  productName: {
    fontWeight: 'bold',
    color: 'text.primary'
  },
  categoryChip: { 
    ml: 2 
  },
  divider: { 
    my: 2 
  },
  price: { 
    mb: 2 
  },
  priceText: {
    fontWeight: 'bold',
    my: 1.5,
    fontSize: '1.8rem'
  },
  description: { 
    mb: 3 
  },
  descriptionContainer: {
    my: 2
  },
  descriptionText: {
    color: 'text.secondary',
    lineHeight: 1.7
  },
  stockInfo: { 
    display: 'flex', 
    alignItems: 'center', 
    mb: 1 
  },
  stockStatusContainer: {
    mt: 1,
    p: 1,
    borderRadius: 1,
    bgcolor: 'background.paper'
  },
  stockText: {
    fontWeight: 'medium'
  },
  stockLabel: { 
    mr: 2 
  },
  creationDateText: {
    mt: 1, 
    fontSize: '0.75rem'
  },
  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    my: 2
  },
  featureChip: {
    mr: 1,
    mb: 1,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  },
  quantityContainer: { 
    mb: 3 
  },
  quantityLabel: { 
    mb: 1,
    fontWeight: 'medium'
  },
  quantityControls: { 
    display: 'flex', 
    alignItems: 'center' 
  },
  quantityControlsPaper: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '24px',
    overflow: 'hidden'
  },
  quantityValue: {
    px: 2, 
    fontWeight: 'medium', 
    minWidth: '2rem', 
    textAlign: 'center'
  },
  quantityValueWide: {
    px: 2, 
    fontWeight: 'medium', 
    minWidth: '3rem', 
    textAlign: 'center'
  },
  quantityInput: { 
    width: '70px', 
    mx: 1 
  },
  actionContainer: {
    mt: 2
  },
  addToCartButton: {
    py: 1.5,
    borderRadius: 8,
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
    }
  },
  addButton: { 
    mb: 2 
  },
  successMessage: {
    mt: 2,
    p: 2,
    bgcolor: 'success.light',
    borderRadius: 1,
    color: 'success.dark',
    textAlign: 'center',
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
      '0%': { opacity: 0.8 },
      '50%': { opacity: 1 },
      '100%': { opacity: 0.8 }
    }
  },
  successAlert: { 
    mt: 2 
  },
  ratingContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    mb: 2 
  },
  reviewCount: { 
    ml: 1 
  },
  noImageBox: {
    p: 3, 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1)
  },
}; 