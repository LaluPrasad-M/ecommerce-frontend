import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Avatar,
  Button,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  Fade,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Person as PersonIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Badge as BadgeIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { profilePageStyles } from '../../styles/profile';
import { updateUserProfile } from '../../features/auth/authSlice';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading: authLoading } = useAppSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [submitError, setSubmitError] = useState('');
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Format date for input field
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleEditProfile = () => {
    // Initialize form with current user data
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      address: user?.address || '',
      dateOfBirth: formatDateForInput(user?.dateOfBirth),
    });
    setErrors({});
    setSubmitError('');
    setEditDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setEditDialogOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Date of birth is optional, but if provided, it should be valid
    if (formData.dateOfBirth) {
      const date = new Date(formData.dateOfBirth);
      if (isNaN(date.getTime())) {
        newErrors.dateOfBirth = 'Invalid date format';
      } else if (date > new Date()) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    // Close dialog immediately
    setEditDialogOpen(false);
    
    // Show loading state
    setLoading(true);
    setSubmitError('');
    setProfileUpdateSuccess(false);
    
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      setProfileUpdateSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setProfileUpdateSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(typeof error === 'string' ? error : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  // Loading state
  if (loading || authLoading) {
    return (
      <Container sx={profilePageStyles.container}>
        <Box sx={profilePageStyles.loadingBox}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  return (
    <Container sx={profilePageStyles.container}>
      <Box sx={profilePageStyles.header}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="subtitle1" sx={profilePageStyles.subtitle}>
          Manage your account information and settings
        </Typography>
      </Box>
      
      {/* Success message */}
      <Fade in={profileUpdateSuccess} timeout={500}>
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          onClose={() => setProfileUpdateSuccess(false)}
        >
          Profile updated successfully!
        </Alert>
      </Fade>
      
      {/* Error message */}
      {submitError && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setSubmitError('')}
        >
          {submitError}
        </Alert>
      )}
      
      <Paper sx={profilePageStyles.paper}>
        <Box sx={profilePageStyles.profileHeader}>
          <Avatar
            sx={profilePageStyles.avatar}
            alt={user?.name || 'User'}
            src={user?.avatar || ''}
          />
          <Box sx={profilePageStyles.profileInfo}>
            <Typography variant="h5" sx={profilePageStyles.nameText}>
              {user?.name || 'User Name'}
            </Typography>
            <Typography variant="body1" sx={profilePageStyles.emailText}>
              {user?.email || 'user@example.com'}
            </Typography>
            <Typography variant="body2" color="primary">
              {user?.role === 'admin' ? 'Administrator Account' : 'Customer Account'}
            </Typography>
          </Box>
          {user?.role !== 'admin' && (
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              color="primary"
              onClick={handleEditProfile}
              sx={profilePageStyles.editButton}
              disabled={loading}
            >
              Edit Profile
            </Button>
          )}
        </Box>
        
        <Divider sx={profilePageStyles.divider} />
        
        <Stack spacing={4} sx={profilePageStyles.infoStack}>
          <Box>
            <Typography variant="h6" sx={profilePageStyles.sectionTitle}>
              <PersonIcon sx={profilePageStyles.sectionIcon} />
              Personal Information
            </Typography>
            <Box sx={profilePageStyles.sectionBox}>
              <Box sx={profilePageStyles.infoItem}>
                <Typography sx={profilePageStyles.infoLabel}>
                  <PersonIcon fontSize="small" sx={profilePageStyles.infoIcon} />
                  Full Name:
                </Typography>
                <Typography sx={profilePageStyles.infoValue}>
                  {user?.name || 'Not provided'}
                </Typography>
              </Box>
              
              <Box sx={profilePageStyles.infoItem}>
                <Typography sx={profilePageStyles.infoLabel}>
                  <EmailIcon fontSize="small" sx={profilePageStyles.infoIcon} />
                  Email:
                </Typography>
                <Typography sx={profilePageStyles.infoValue}>
                  {user?.email || 'Not provided'}
                </Typography>
              </Box>
              
              <Box sx={profilePageStyles.infoItem}>
                <Typography sx={profilePageStyles.infoLabel}>
                  <PhoneIcon fontSize="small" sx={profilePageStyles.infoIcon} />
                  Mobile Number:
                </Typography>
                <Typography sx={profilePageStyles.infoValue}>
                  {user?.mobileNumber || 'Not provided'}
                </Typography>
              </Box>
              
              <Box sx={profilePageStyles.infoItem}>
                <Typography sx={profilePageStyles.infoLabel}>
                  <CakeIcon fontSize="small" sx={profilePageStyles.infoIcon} />
                  Date of Birth:
                </Typography>
                <Typography sx={profilePageStyles.infoValue}>
                  {formatDate(user?.dateOfBirth)}
                </Typography>
              </Box>
              
              <Box sx={profilePageStyles.infoItem}>
                <Typography sx={profilePageStyles.infoLabel}>
                  <BadgeIcon fontSize="small" sx={profilePageStyles.infoIcon} />
                  Account Type:
                </Typography>
                <Typography sx={profilePageStyles.infoValue}>
                  {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box>
            <Typography variant="h6" sx={profilePageStyles.sectionTitle}>
              <HomeIcon sx={profilePageStyles.sectionIcon} />
              {user?.role === 'admin' ? 'Address' : 'Shipping Address'}
            </Typography>
            <Box sx={profilePageStyles.sectionBox}>
              {user?.address ? (
                <Box sx={profilePageStyles.addressBox}>
                  <Typography variant="body1">
                    {user.address}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1" sx={profilePageStyles.noAddressText}>
                  No address information available
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>
      </Paper>
      
      {/* Edit Profile Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Edit Profile
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              disabled={loading}
            />
            
            <TextField
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
            />
            
            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              fullWidth
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              InputLabelProps={{ shrink: true }}
              disabled={loading}
            />
            
            <TextField
              name="address"
              label="Address"
              fullWidth
              multiline
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              disabled={loading}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage; 