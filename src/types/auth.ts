import { ReactNode } from 'react';

export interface AuthPageProps {
  title: string;
  maxWidth: 'xs' | 'md';
  form: ReactNode;
  links: ReactNode;
  linksJustify: 'space-between' | 'center';
} 