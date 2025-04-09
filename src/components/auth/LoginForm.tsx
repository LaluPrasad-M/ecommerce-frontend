import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, loginAdmin } from '../../features/auth/authSlice';
import { loginFormStyles } from '../../styles/auth';

const phoneRegExp = /^[0-9]{10}$/;

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password visibility toggle
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validation schema
  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(phoneRegExp, 'Please enter a valid 10-digit mobile number')
      .required('Mobile number is required'),
    password: Yup.string().required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      mobile: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (isSubmitting) return;
      
      console.log('Submitting form with values:', values);
      setIsSubmitting(true);
      
      try {
        if (isAdmin) {
          console.log('Dispatching admin login');
          // Don't use unwrap to see if that's causing issues
          dispatch(loginAdmin({ 
            mobileNumber: values.mobile, 
            password: values.password 
          }));
        } else {
          console.log('Dispatching regular login');
          // Don't use unwrap to see if that's causing issues
          dispatch(login({ 
            mobileNumber: values.mobile, 
            password: values.password 
          }));
        }
      } catch (err) {
        console.error('Error during login submission:', err);
      } finally {
        console.log('Login submission completed');
        setIsSubmitting(false);
      }
    },
  });

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <Container sx={loginFormStyles.container}>
      <Paper elevation={3} sx={loginFormStyles.paper}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {isAdmin ? 'Admin Login' : 'Login'}
        </Typography>
        
        {error && (
          <Typography color="error" align="center" sx={loginFormStyles.error}>
            {error}
          </Typography>
        )}
        
        <Box 
          component="form" 
          noValidate
          onSubmit={(e) => {
            console.log('Form submit event triggered');
            e.preventDefault();
            formik.handleSubmit();
            return false;
          }}
          sx={loginFormStyles.form}
        >
          <FormControlLabel
            control={
              <Switch 
                checked={isAdmin} 
                onChange={handleAdminToggle} 
                name="adminMode" 
                color="primary"
              />
            }
            label="Admin Login"
            sx={loginFormStyles.adminToggle}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="mobile"
            name="mobile"
            label="Mobile Number"
            type="tel"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={loginFormStyles.submitButton}
          >
            {loading ? 'Logging in...' : isAdmin ? 'Admin Login' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm; 