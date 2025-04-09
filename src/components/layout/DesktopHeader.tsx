import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  useTheme
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  AccountCircle,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { layoutStyles } from '../../styles/layout';
import { DesktopHeaderProps } from '../../types/layout';

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  navigationItems,
  isAuthenticated,
  isAdmin,
  cartItemCount,
  darkMode,
  onToggleDarkMode,
  onLogout
}) => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      <Box sx={layoutStyles.navContainer}>
        {navigationItems.map((item) => {
          // Simple, direct active tab logic
          const isActive = 
            location.pathname === item.path || 
            (item.path !== '/' && 
              item.path !== '/admin' && 
              location.pathname.startsWith(item.path));
          
          if ((item.text === 'Orders' && isAdmin) || 
              (item.text === 'My Orders' && !isAdmin) || 
              item.text === 'Products' || 
              item.text === 'Dashboard' || 
              item.text === 'Home' || 
              item.text === 'Customers' || 
              item.text === 'Coupons') {
            return (
              <Button 
                key={item.text}
                color="inherit" 
                component={RouterLink} 
                to={item.path}
                sx={layoutStyles.navButton(theme, isActive)}
              >
                {item.text}
              </Button>
            );
          }
          return null;
        })}
      </Box>
      
      <IconButton color="inherit" onClick={onToggleDarkMode}>
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      
      {isAuthenticated && !isAdmin && (
        <IconButton color="inherit" component={RouterLink} to="/cart" sx={layoutStyles.cartIconContainer}>
          <CartIcon />
          {cartItemCount > 0 && (
            <Box sx={layoutStyles.cartBadge(theme)}>
              {cartItemCount}
            </Box>
          )}
        </IconButton>
      )}
      
      {isAuthenticated ? (
        <>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
          <IconButton color="inherit" component={RouterLink} to="/profile">
            <AccountCircle />
          </IconButton>
        </>
      ) : (
        <Box sx={layoutStyles.authButtonsContainer}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/login"
            sx={layoutStyles.authButton(theme, location.pathname === '/login')}
          >
            Login
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/register"
            sx={layoutStyles.authButton(theme, location.pathname === '/register')}
          >
            Register
          </Button>
        </Box>
      )}
    </>
  );
};

export default DesktopHeader; 