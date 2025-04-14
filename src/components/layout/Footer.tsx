import React from 'react';
import { Box, Container, Typography, Link, Stack, Divider, useTheme, SvgIcon } from '@mui/material';
import { footerStyles } from '../../styles/layout';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Custom SVG icons for better visibility
const LinkedInIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </SvgIcon>
);

const GitHubIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.55-1.29-1.28-1.65-1.28-1.65-1.03-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.76.4-1.27.73-1.57-2.42-.28-4.97-1.21-4.97-5.4 0-1.2.43-2.17 1.13-2.93-.11-.28-.49-1.42.11-2.95 0 0 .92-.3 3.02 1.13a10.6 10.6 0 015.6 0c2.11-1.43 3.03-1.13 3.03-1.13.6 1.53.22 2.67.1 2.95.71.76 1.13 1.74 1.13 2.94 0 4.2-2.56 5.12-4.99 5.38.41.36.76 1.05.76 2.12l-.01 3.16c0 .29.19.63.74.53A11 11 0 0012 1.27z" />
  </SvgIcon>
);

const Footer: React.FC = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();
  const styles = footerStyles;
  
  return (
    <Box
      component="footer"
      sx={styles.footer(theme)}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4} 
          justifyContent="space-between"
        >
          <Box sx={styles.section}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              LaluPrasad
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Full-Stack Software Engineer with backend expertise in microservices, 
              API design, and distributed systems. Passionate about building scalable 
              solutions and crafting seamless user experiences with React.
            </Typography>
            <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mb: 1.5 }}>
              {['JavaScript', 'TypeScript', 'Node.js', 'NestJS', 'React'].map((skill) => (
                <Box
                  key={skill}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.7rem',
                    mb: 0.5
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Link
                href="https://www.linkedin.com/in/laluprasad-m"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#0077B5',
                  color: 'white',
                  borderRadius: 1,
                  p: 1,
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: '#005582',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="https://github.com/laluprasad-m"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#333',
                  color: 'white',
                  borderRadius: 1,
                  p: 1,
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: '#111',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <GitHubIcon />
              </Link>
            </Stack>
          </Box>
          
          <Box sx={styles.section}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Experience
            </Typography>
            <Typography variant="subtitle2" color="text.primary" sx={{ mt: 1 }}>
              Senior Software Engineer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Developing scalable microservices and RESTful APIs using Node.js and TypeScript.
              Leading backend architecture decisions and mentoring junior developers.
            </Typography>
            
            <Typography variant="subtitle2" color="text.primary" sx={{ mt: 1 }}>
              Full Stack Developer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Built responsive web applications with React and integrated with backend services.
              Implemented CI/CD pipelines and container-based deployments.
            </Typography>
            
            <Typography variant="subtitle2" color="text.primary" sx={{ mt: 1 }}>
              Education
            </Typography>
            <Typography variant="body2" color="text.secondary">
              B.Tech in Computer Science and Engineering
            </Typography>
          </Box>
          
          <Box sx={styles.section}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Me
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                <Link href="mailto:laluprasad.73515274@gmail.com" color="inherit" underline="hover">
                  laluprasad.73515274@gmail.com
                </Link>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                <Link href="tel:+919035229611" color="inherit" underline="hover">
                  +91-9035229611
                </Link>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Bangalore, Karnataka, India
              </Typography>
            </Stack>
          </Box>
        </Stack>
        
        <Divider sx={styles.divider} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {year}
          {' LaluPrasad. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 