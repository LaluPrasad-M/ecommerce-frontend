/**
 * Application-wide constants
 */

// API Constants
export const AUTH_TOKEN_KEY = process.env.REACT_APP_AUTH_STORAGE_KEY || 'authToken';
export const USER_DATA_KEY = process.env.REACT_APP_USER_DATA_KEY || 'userData';

// Feature flags
export const ENABLE_ANALYTICS = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';
export const ENABLE_NOTIFICATIONS = process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true';

// UI Configuration
export const DEFAULT_THEME = process.env.REACT_APP_DEFAULT_THEME || 'light';
export const DEFAULT_CURRENCY = process.env.REACT_APP_DEFAULT_CURRENCY || '₹';
export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE || 'en-IN';

// Contact Information
export const SUPPORT_EMAIL = process.env.REACT_APP_SUPPORT_EMAIL || 'support@ecommerce.com';
export const CUSTOMER_SERVICE_PHONE = process.env.REACT_APP_CUSTOMER_SERVICE_PHONE || '+91-1234567890';

// App Info
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';