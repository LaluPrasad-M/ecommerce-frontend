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
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Person as PersonIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Badge as BadgeIcon
} from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks';
import { profilePageStyles } from '../../styles/profile';

const ProfilePage: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const [loading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
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

  const handleEditProfile = () => {
    setEditMode(true);
    // In a real implementation, this would navigate to an edit form or open a modal
    alert('Edit profile functionality would open here');
    setEditMode(false);
  };
  
  // Loading state
  if (loading) {
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
              disabled={editMode}
              onClick={handleEditProfile}
              sx={profilePageStyles.editButton}
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
    </Container>
  );
};

export default ProfilePage; 