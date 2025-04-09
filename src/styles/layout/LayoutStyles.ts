import { SxProps, Theme } from '@mui/material';

export interface LayoutStylesType {
  container: SxProps<Theme>;
  drawer: SxProps<Theme>;
  drawerHeader: SxProps<Theme>;
  mainContent: SxProps<Theme>;
  activeNavItem: (theme: Theme) => SxProps<Theme>;
  navIcon: (theme: Theme, isActive: boolean) => SxProps<Theme>;
  menuButton: any;
  cartBadge: (theme: Theme) => SxProps<Theme>;
  footerContainer: SxProps<Theme>;
  footerContent: SxProps<Theme>;
  root: SxProps<Theme>;
  main: SxProps<Theme>;
  inactiveNavItem: SxProps<Theme>;
  cartItem: (theme: Theme, isActive: boolean) => SxProps<Theme>;
  profileItem: (theme: Theme, isActive: boolean) => SxProps<Theme>;
  logoutItem: (theme: Theme) => SxProps<Theme>;
  logoutIcon: (theme: Theme) => SxProps<Theme>;
  loginItem: (theme: Theme, isActive: boolean) => SxProps<Theme>;
  registerItem: (theme: Theme, isActive: boolean) => SxProps<Theme>;
  siteName: {
    textTransform: string;
    fontSize: string;
  };
  navButton: (theme: Theme, isActive: boolean) => {
    borderBottom: string;
    fontWeight: string;
    backgroundColor: string;
  };
  authButton: (theme: Theme, isActive: boolean) => {
    borderBottom: string;
    fontWeight: string;
    backgroundColor: string;
  };
  cartIconContainer: {
    position: string;
  };
  drawerPaper: {
    width: number;
    backgroundColor: string;
  };
  headerTitle: {
    flexGrow: number;
  };
  navContainer: SxProps<Theme>;
  authButtonsContainer: SxProps<Theme>;
  relativePositionBox: SxProps<Theme>;
}

export const layoutStyles: LayoutStylesType = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  drawer: {
    width: 250,
    flexShrink: 0,
    height: '100%',
  },
  drawerHeader: {
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flexGrow: 1,
    padding: 3,
    marginTop: 2,
    marginBottom: 2,
  },
  activeNavItem: (theme) => ({
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  navIcon: (theme, isActive) => ({
    color: isActive 
      ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main)
      : (theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit'),
  }),
  inactiveNavItem: {
    '&:hover': { backgroundColor: 'action.hover' },
    color: 'inherit'
  },
  cartItem: (theme, isActive) => ({
    '&:hover': { backgroundColor: 'action.hover' },
    ...(isActive && {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    }),
    color: 'inherit'
  }),
  profileItem: (theme, isActive) => ({
    '&:hover': { backgroundColor: 'action.hover' },
    ...(isActive && {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    }),
    color: 'inherit'
  }),
  logoutItem: (theme) => ({
    cursor: 'pointer', 
    '&:hover': { backgroundColor: 'action.hover' },
    color: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.main
  }),
  logoutIcon: (theme) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.main
  }),
  loginItem: (theme, isActive) => ({
    '&:hover': { backgroundColor: 'action.hover' },
    backgroundColor: isActive ? 'action.selected' : 'transparent',
    color: isActive
      ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main)
      : (theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit'),
    fontWeight: isActive ? 'bold' : 'normal'
  }),
  registerItem: (theme, isActive) => ({
    '&:hover': { backgroundColor: 'action.hover' },
    backgroundColor: isActive ? 'action.selected' : 'transparent',
    color: isActive
      ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main)
      : (theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit'),
    fontWeight: isActive ? 'bold' : 'normal'
  }),
  menuButton: {
    display: { xs: 'flex', md: 'none' },
    cursor: 'pointer'
  },
  cartBadge: (theme) => ({
    position: 'absolute',
    top: -8,
    right: -8,
    padding: '0 4px',
    borderRadius: '50%',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.main,
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.contrastText : theme.palette.secondary.contrastText,
    fontSize: 12,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 18,
    height: 18,
  }),
  footerContainer: {
    backgroundColor: 'background.paper',
    padding: 2,
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
    padding: 3,
    marginTop: 2,
    marginBottom: 2,
  },
  siteName: {
    textTransform: 'none', 
    fontSize: '1.25rem'
  },
  navButton: (theme, isActive) => ({
    borderBottom: isActive ? `2px solid ${theme.palette.primary.contrastText}` : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? 'action.selected' : 'transparent'
  }),
  authButton: (theme, isActive) => ({
    borderBottom: isActive ? `2px solid ${theme.palette.primary.contrastText}` : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? 'action.selected' : 'transparent'
  }),
  cartIconContainer: {
    position: 'relative'
  },
  drawerPaper: {
    width: 250,
    backgroundColor: 'background.paper'
  },
  headerTitle: {
    flexGrow: 1
  },
  navContainer: {
    display: 'flex'
  },
  authButtonsContainer: {
    display: 'flex'
  },
  relativePositionBox: {
    position: 'relative'
  }
}; 