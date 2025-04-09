import { SxProps, Theme } from '@mui/material';

export interface ProductCardStylesType {
  paper: SxProps<Theme>;
  container: SxProps<Theme>;
  imageContainer: SxProps<Theme>;
  image: SxProps<Theme>;
  detailsContainer: SxProps<Theme>;
  headerContainer: SxProps<Theme>;
  editButton: SxProps<Theme>;
  deleteButton: SxProps<Theme>;
  infoStack: SxProps<Theme>;
  categoryChip: SxProps<Theme>;
  statusIndicator: SxProps<Theme>;
  statusDot: (isActive: boolean) => SxProps<Theme>;
  description: SxProps<Theme>;
}

export const adminProductCardStyles: ProductCardStylesType = {
  paper: {
    p: 2,
    '&:hover': { 
      boxShadow: 3
    },
    transition: 'box-shadow 0.2s ease-in-out'
  },
  container: {
    display: 'flex', 
    flexDirection: { xs: 'column', sm: 'row' }
  },
  imageContainer: {
    width: { xs: '100%', sm: '180px' }, 
    height: { xs: '180px', sm: '180px' },
    mr: { xs: 0, sm: 3 },
    mb: { xs: 2, sm: 0 },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: 'action.hover',
    borderRadius: 1,
    overflow: 'hidden'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  },
  detailsContainer: {
    flex: 1
  },
  headerContainer: {
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 1.5
  },
  editButton: {
    mr: 1
  },
  deleteButton: {},
  infoStack: {
    spacing: 1.5
  },
  categoryChip: {
    bgcolor: 'action.hover',
    fontWeight: 'medium',
    ml: 1
  },
  statusIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    ml: 1
  },
  statusDot: (isActive: boolean) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    display: 'inline-block',
    bgcolor: isActive ? 'success.main' : 'error.main',
    mr: 1
  }),
  description: {
    mt: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  }
}; 