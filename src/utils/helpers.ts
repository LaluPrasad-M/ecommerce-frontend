/**
 * Common utility functions used throughout the application
 */

/**
 * Format a date string into a readable format
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format a price number into a currency string
 */
export const formatPrice = (price: number): string => {
  // Format as Indian Rupees
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0 // Remove decimal places for INR
  }).format(price);
};

/**
 * Truncate text to a specified length and add ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Calculate prices for cart or order items
 */
export const calculatePrices = (
  items: Array<{ product: { price: number }; quantity: number }>,
  discountPercentage: number = 0,
): {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
} => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const discount = discountPercentage > 0 ? subtotal * (discountPercentage / 100) : 0;
  const total = subtotal + tax - discount;
  
  return {
    subtotal,
    tax,
    discount,
    total,
  };
};

/**
 * Get appropriate class or color based on order status
 * @param status - order status
 * @returns appropriate color name
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'order placed': return '#f39c12';
    case 'packed': return '#3498db';
    case 'shipping': return '#2ecc71';
    case 'delivered': return '#27ae60';
    case 'cancelled': return '#e74c3c';
    default: return '#95a5a6';
  }
};

/**
 * Get appropriate color name or hex color based on order status and theme mode
 * @param status - order status
 * @param mode - theme mode ('light' or 'dark')
 * @returns appropriate color
 */
export const getThemeBasedStatusColor = (status: string, mode?: 'light' | 'dark') => {
  // For chip color props (when used as a named color)
  if (!mode) {
    switch (status.toLowerCase()) {
      case 'order placed': return 'info';
      case 'packed': return 'primary';
      case 'shipping': return 'warning';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  }
  
  // For explicit background colors with better contrast in different themes
  switch (status.toLowerCase()) {
    case 'order placed': 
      return mode === 'light' ? '#42a5f5' : '#0d47a1';
    case 'packed': 
      return mode === 'light' ? '#7e57c2' : '#4527a0';
    case 'shipping': 
      return mode === 'light' ? '#ffa726' : '#e65100';
    case 'delivered': 
      return mode === 'light' ? '#66bb6a' : '#2e7d32';
    case 'cancelled': 
      return mode === 'light' ? '#ef5350' : '#b71c1c';
    default: 
      return mode === 'light' ? '#78909c' : '#455a64';
  }
};