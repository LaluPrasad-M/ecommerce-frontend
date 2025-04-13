/**
 * Application-wide constants
 */

// API Constants
export const AUTH_TOKEN_KEY = process.env.REACT_APP_AUTH_STORAGE_KEY || 'authToken';
export const USER_DATA_KEY = process.env.REACT_APP_USER_DATA_KEY || 'userData';

// UI Configuration
export const DEFAULT_THEME = process.env.REACT_APP_DEFAULT_THEME || 'light';
export const DEFAULT_CURRENCY = process.env.REACT_APP_DEFAULT_CURRENCY || '₹';
export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE || 'en-IN';

// App Info
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';