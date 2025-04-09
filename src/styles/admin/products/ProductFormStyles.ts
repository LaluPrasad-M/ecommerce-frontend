import { SxProps, Theme } from '@mui/material';

export interface ProductFormStylesType {
  contentContainer: SxProps<Theme>;
  imagePreviewContainer: SxProps<Theme>;
  imageContainer: SxProps<Theme>;
  previewImage: SxProps<Theme>;
  productDetails: SxProps<Theme>;
  formControl: SxProps<Theme>;
  errorText: SxProps<Theme>;
}

export const productFormStyles: ProductFormStylesType = {
  contentContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 3,
    pt: 2
  },
  imagePreviewContainer: {
    width: { xs: '100%', md: '30%' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2
  },
  imageContainer: {
    width: '100%',
    aspectRatio: '1/1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed',
    borderColor: 'divider',
    borderRadius: 1,
    bgcolor: 'background.paper',
    overflow: 'hidden'
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  productDetails: {
    flex: 1
  },
  formControl: {
    mt: 2,
    mb: 1
  },
  errorText: {
    color: 'error.main',
    ml: 1.5,
    mt: 0.5,
    fontSize: '0.75rem'
  }
}; 