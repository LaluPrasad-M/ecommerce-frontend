import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  IconButton
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  ShoppingCart as CartIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { layoutStyles } from '../../styles/layout';
import { MobileDrawerProps } from '../../types/layout';

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  navigationItems,
  isAuthenticated,
  isAdmin = false,
  cartItemCount = 0,
  darkMode = false,
  onToggleDarkMode,
  onLogout
}) => {
  const theme = useTheme();
  const location = useLocation();
  
  const drawerContent = (
    <Box sx={layoutStyles.drawer} role="presentation">
      <Box sx={layoutStyles.drawerHeader}>
        <Typography variant="h6" component="div">
          E-Commerce
        </Typography>
        <IconButton 
          color="inherit"
          onClick={(e) => { e.stopPropagation(); onToggleDarkMode?.(); }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => {
          // Simple, direct active tab logic
          const isActive = 
            location.pathname === item.path || 
            (item.path !== '/' && 
             item.path !== '/admin' && 
             location.pathname.startsWith(item.path));
          
          return (
            <ListItem 
              key={item.text} 
              component={RouterLink} 
              to={item.path} 
              onClick={onClose}
              sx={isActive ? layoutStyles.activeNavItem(theme) : layoutStyles.inactiveNavItem}
            >
              <ListItemIcon sx={layoutStyles.navIcon(theme, isActive)}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  color: isActive
                    ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main)
                    : (theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit'),
                  fontWeight: isActive ? 'bold' : 'normal'
                }}
              />
            </ListItem>
          );
        })}
      </List>
      
      <Divider />
      
      {isAuthenticated && !isAdmin && (
        <ListItem 
          component={RouterLink} 
          to="/cart" 
          onClick={onClose}
          sx={layoutStyles.cartItem(theme, location.pathname === '/cart')}
        >
          <ListItemIcon sx={layoutStyles.navIcon(theme, location.pathname === '/cart')}>
            <Box sx={layoutStyles.relativePositionBox}>
              <CartIcon />
              {cartItemCount > 0 && (
                <Box sx={layoutStyles.cartBadge(theme)}>
                  {cartItemCount}
                </Box>
              )}
            </Box>
          </ListItemIcon>
          <ListItemText 
            primary="Cart" 
            primaryTypographyProps={{
              fontWeight: location.pathname === '/cart' ? 'bold' : 'normal',
              color: location.pathname === '/cart' 
                ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main)
                : (theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit'),
            }}
          />
        </ListItem>
      )}
      
      {isAuthenticated && (
        <ListItem 
          component={RouterLink} 
          to="/profile" 
          onClick={onClose}
          sx={layoutStyles.profileItem(theme, location.pathname === '/profile')}
        >
          <ListItemIcon sx={layoutStyles.navIcon(theme, location.pathname === '/profile')}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText 
            primary="Profile" 
            primaryTypographyProps={{
              fontWeight: location.pathname === '/profile' ? 'bold' : 'normal',
              color: location.pathname === '/profile' 
                ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main)
                : (theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit'),
            }}
          />
        </ListItem>
      )}
      
      <Divider />
      
      <List>
        {!isAuthenticated ? (
          <>
            <ListItem 
              component={RouterLink} 
              to="/login" 
              onClick={onClose}
              sx={layoutStyles.loginItem(theme, location.pathname === '/login')}
            >
              <ListItemText 
                primary="Login"
                primaryTypographyProps={{
                  color: location.pathname === '/login'
                    ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main)
                    : (theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit'),
                }}
              />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/register" 
              onClick={onClose}
              sx={layoutStyles.registerItem(theme, location.pathname === '/register')}
            >
              <ListItemText 
                primary="Register"
                primaryTypographyProps={{
                  color: location.pathname === '/register'
                    ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main)
                    : (theme.palette.mode === 'dark' ? theme.palette.text.primary : 'inherit'),
                }}
              />
            </ListItem>
          </>
        ) : (
          <ListItem 
            onClick={(e) => { e.stopPropagation(); onLogout?.(); onClose(); }}
            sx={layoutStyles.logoutItem(theme)}
          >
            <ListItemIcon sx={layoutStyles.logoutIcon(theme)}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      keepMounted
      SlideProps={{ 
        timeout: 300 
      }}
      PaperProps={{
        sx: layoutStyles.drawerPaper
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default MobileDrawer; 