import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Shop,
  FormatListBulleted,
  Home
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { toggleDarkMode } from '../../features/ui/uiSlice';
import { layoutStyles } from '../../styles/layout';
import { NavigationItem } from '../../types/layout';
import MobileDrawer from './MobileDrawer';
import DesktopHeader from './DesktopHeader';

const Header: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const { darkMode } = useAppSelector(state => state.ui);
  const { items } = useAppSelector(state => state.cart);
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  const isAdmin = user?.role === 'admin';
  
  // Close drawer when location changes
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  // Create navigation items based on user role
  const getNavigationItems = (): NavigationItem[] => {
    // Admin navigation
    if (isAdmin) {
      return [
        { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
        { text: 'Products', icon: <Shop />, path: '/admin/products' },
        { text: 'Orders', icon: <FormatListBulleted />, path: '/admin/orders' },
        { text: 'Coupons', icon: <Shop />, path: '/admin/coupons' }
      ];
    }
    
    // Customer navigation
    const customerNav = [
      { text: 'Home', icon: <Home />, path: '/' },
      { text: 'Products', icon: <Shop />, path: '/products' }
    ];
    
    // Add Orders for authenticated customers
    if (isAuthenticated) {
      customerNav.push({ text: 'My Orders', icon: <FormatListBulleted />, path: '/orders' });
    }
    
    return customerNav;
  };
  
  const navigationItems = getNavigationItems();
  
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <div onClick={handleDrawerToggle}>
              <MenuIcon fontSize="large" sx={layoutStyles.menuButton} />
            </div>
          )}
          
          <Typography variant="h6" component="div" sx={layoutStyles.headerTitle}>
            <Button component={RouterLink} to="/" color="inherit" sx={layoutStyles.siteName}>
              E-Commerce
            </Button>
          </Typography>
          
          {!isMobile && (
            <DesktopHeader 
              navigationItems={navigationItems}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              cartItemCount={cartItemCount}
              darkMode={darkMode}
              onToggleDarkMode={handleToggleDarkMode}
              onLogout={handleLogout}
            />
          )}
          
        </Toolbar>
      </AppBar>
      
      {isMobile && (
        <MobileDrawer 
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            navigationItems={navigationItems}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            cartItemCount={cartItemCount}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
            onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
