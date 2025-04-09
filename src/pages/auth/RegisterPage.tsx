import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import RegisterForm from '../../components/auth/RegisterForm';
import AuthPage from '../../components/auth/AuthPage';

const RegisterPage: React.FC = () => {
  return (
    <AuthPage
      title="Create an Account"
      maxWidth="md"
      form={<RegisterForm />}
      linksJustify="center"
      links={
        <Link component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      }
    />
  );
};

export default RegisterPage; 