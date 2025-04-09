import { SxProps, Theme } from '@mui/material';

export interface FooterStylesType {
  footer: (theme: Theme) => SxProps<Theme>;
  container: SxProps<Theme>;
  stack: SxProps<Theme>;
  section: SxProps<Theme>;
  divider: SxProps<Theme>;
  copyright: SxProps<Theme>;
  link: SxProps<Theme>;
  linkWithMargin: SxProps<Theme>;
  linkLast: SxProps<Theme>;
}

export const footerStyles: FooterStylesType = {
  footer: (theme) => ({
    py: 3,
    px: 2,
    mt: 'auto',
    backgroundColor: theme.palette.mode === 'light' 
      ? theme.palette.grey[200] 
      : theme.palette.grey[900],
  }),
  container: {
    maxWidth: 'lg'
  },
  stack: {
    direction: { xs: 'column', sm: 'row' },
    spacing: 4,
    justifyContent: 'space-between'
  },
  section: {
    width: { xs: '100%', sm: '33%' }
  },
  divider: {
    my: 2
  },
  copyright: {
    variant: 'body2',
    color: 'text.secondary',
    align: 'center'
  },
  link: {
    color: 'inherit',
    display: 'block'
  },
  linkWithMargin: {
    color: 'inherit',
    display: 'block',
    mb: 1
  },
  linkLast: {
    color: 'inherit',
    display: 'block'
  }
}; 