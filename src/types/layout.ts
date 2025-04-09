import React from 'react';

export interface LayoutProps {
  children?: React.ReactNode;
}

export interface NavigationItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  isAuthenticated: boolean;
  isAdmin?: boolean;
  cartItemCount?: number;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onLogout: () => void;
}

export interface DesktopHeaderProps {
  navigationItems: NavigationItem[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  cartItemCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}
