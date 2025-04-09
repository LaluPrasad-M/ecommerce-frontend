import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';
import AuthPage from '../../components/auth/AuthPage';

const LoginPage: React.FC = () => {
  return (
    <AuthPage
      title="Sign In"
      maxWidth="xs"
      form={<LoginForm />}
      linksJustify="space-between"
      links={
        <>
          <Link component={RouterLink} to="/forgot-password" variant="body2">
            Forgot password?
          </Link>
          <Link component={RouterLink} to="/register" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </>
      }
    />
  );
};

export default LoginPage; 