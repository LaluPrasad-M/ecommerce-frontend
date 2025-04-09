import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export interface ProfilePageStylesType {
  container: SxProps<Theme>;
  header: SxProps<Theme>;
  subtitle: SxProps<Theme>;
  paper: SxProps<Theme>;
  profileHeader: SxProps<Theme>;
  profileInfo: SxProps<Theme>;
  avatar: SxProps<Theme>;
  nameText: SxProps<Theme>;
  emailText: SxProps<Theme>;
  divider: SxProps<Theme>;
  infoStack: SxProps<Theme>;
  sectionTitle: SxProps<Theme>;
  editButton: SxProps<Theme>;
  sectionBox: SxProps<Theme>;
  infoItem: SxProps<Theme>;
  infoLabel: SxProps<Theme>;
  infoValue: SxProps<Theme>;
  addressBox: SxProps<Theme>;
  noAddressText: SxProps<Theme>;
  loadingBox: SxProps<Theme>;
  sectionIcon: SxProps<Theme>;
  infoIcon: SxProps<Theme>;
}

export const profilePageStyles: ProfilePageStylesType = {
  container: {
    py: 4,
    maxWidth: { xs: '100%', md: '1000px' }
  },
  header: {
    mb: 3,
    textAlign: 'left'
  },
  subtitle: {
    color: 'text.secondary',
    mb: 2
  },
  paper: {
    p: { xs: 2, sm: 4 },
    boxShadow: 3,
    borderRadius: 2
  },
  profileHeader: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'center', sm: 'flex-start' },
    gap: 3,
    mb: 3,
    position: 'relative'
  },
  profileInfo: {
    flexGrow: 1,
    alignSelf: { xs: 'center', sm: 'flex-start' }
  },
  avatar: {
    width: { xs: 80, sm: 100 },
    height: { xs: 80, sm: 100 },
    boxShadow: 2,
    bgcolor: 'primary.main',
    fontSize: '2rem'
  },
  nameText: {
    fontWeight: 600,
    mb: 0.5
  },
  emailText: {
    color: 'text.secondary',
    mb: 1
  },
  divider: {
    my: 3
  },
  infoStack: {
    width: '100%'
  },
  sectionTitle: {
    position: 'relative',
    mb: 2,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    '&::after': {
      content: '""',
      display: 'block',
      width: '50px',
      height: '3px',
      backgroundColor: 'primary.main',
      position: 'absolute',
      bottom: '-8px',
      left: 0
    }
  },
  editButton: {
    position: { xs: 'relative', sm: 'absolute' },
    right: { xs: 'auto', sm: 0 },
    top: { xs: 'auto', sm: 0 },
    mt: { xs: 2, sm: 0 },
    borderRadius: 4,
    px: 3
  },
  sectionBox: {
    backgroundColor: 'action.hover',
    borderRadius: 2,
    p: 3,
    mt: 3
  },
  infoItem: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'flex-start', sm: 'center' },
    mb: 2,
    pb: 2,
    borderBottom: '1px solid',
    borderColor: 'divider',
    '&:last-child': {
      mb: 0,
      pb: 0,
      borderBottom: 'none'
    }
  },
  infoLabel: {
    minWidth: '180px',
    fontWeight: 500,
    color: 'text.secondary',
    mb: { xs: 0.5, sm: 0 }
  },
  infoValue: {
    color: 'text.primary',
    flexGrow: 1
  },
  addressBox: {
    p: 2,
    backgroundColor: 'background.paper',
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'divider'
  },
  noAddressText: {
    color: 'text.secondary',
    fontStyle: 'italic',
    p: 2
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
  },
  sectionIcon: {
    mr: 1, 
    verticalAlign: 'middle'
  },
  infoIcon: {
    mr: 1, 
    verticalAlign: 'middle', 
    opacity: 0.7
  }
}; 