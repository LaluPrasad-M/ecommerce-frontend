import { SxProps, Theme } from '@mui/material';

export const adminLayoutStyles: {
  container: SxProps<Theme>;
  headerBox: SxProps<Theme>;
  contentPaper: (noPadding: boolean) => SxProps<Theme>;
  loadingOverlay: SxProps<Theme>;
} = {
  container: {
    maxWidth: "lg"
  },
  headerBox: {
    mb: 4
  },
  contentPaper: (noPadding: boolean) => ({
    p: noPadding ? 0 : 2, 
    mb: 3, 
    position: 'relative'
  }),
  loadingOverlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'background.paper',
    opacity: 0.7,
    zIndex: 1
  }
}; 