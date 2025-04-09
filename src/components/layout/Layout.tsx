import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { LayoutProps } from '../../types';
import Header from './Header';
import { layoutStyles } from '../../styles/layout';
import Footer from './Footer';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={layoutStyles.root}>
      <Header />
      <Container component="main" sx={layoutStyles.main}>
        {children || <Outlet />}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout; 