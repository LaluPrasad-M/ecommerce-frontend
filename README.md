# E-Commerce Frontend Application

A modern e-commerce frontend application built with React, TypeScript, Redux Toolkit, and Material UI.

## Overview

This project is a fully-featured e-commerce frontend application that provides a seamless shopping experience for users. It includes user authentication, product browsing, shopping cart functionality, order management, and an admin dashboard.

## Features

- **User Authentication**
  - Registration and login
  - User profile management
  - Role-based access control (customer/admin)

- **Product Management**
  - Browse products with filtering and searching capabilities
  - View detailed product information
  - Admin product management (add, edit, delete)

- **Shopping Cart**
  - Add/remove products
  - Update quantities
  - Apply discount coupons

- **Order Processing**
  - Checkout flow
  - Order history
  - Order status tracking

- **Admin Dashboard**
  - Manage products
  - View and update orders
  - User management
  - Coupon management

- **Responsive Design**
  - Mobile-first approach
  - Dark/light mode toggle

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material UI 7
- **Routing**: React Router 7
- **Form Handling**: Formik & Yup
- **API Integration**: Axios with interceptors for authentication
- **Date Handling**: date-fns and dayjs
- **Notifications**: Notistack and React-Toastify

## Project Structure

```
frontend/
├── public/                 # Static files
├── src/                    # Source code
│   ├── api/                # API services and axios configuration
│   │   ├── client.ts       # Axios configuration with interceptors
│   │   ├── authService.ts  # Authentication API calls
│   │   ├── productService.ts # Product-related API calls
│   │   ├── orderService.ts # Order-related API calls
│   │   └── cartService.ts  # Cart-related API calls
│   ├── app/                # Redux store setup
│   │   ├── store.ts        # Redux store configuration
│   │   └── hooks.ts        # Custom Redux hooks
│   ├── assets/             # Static assets (images, fonts)
│   ├── components/         # Reusable components
│   │   ├── admin/          # Admin-specific components
│   │   ├── auth/           # Authentication-related components
│   │   ├── customer/       # Customer-facing components
│   │   ├── layout/         # Layout components (header, footer, etc.)
│   │   └── shared/         # Shared UI components
│   ├── constants/          # Application constants
│   ├── features/           # Redux slices organized by feature
│   │   ├── admin/          # Admin-related slices
│   │   │   ├── dashboard/  # Admin dashboard slice
│   │   │   ├── products/   # Admin products management slice
│   │   │   ├── orders/     # Admin orders management slice
│   │   │   └── coupons/    # Admin coupons management slice
│   │   ├── auth/           # Authentication slice
│   │   ├── customer/       # Customer-related slices
│   │   │   ├── cart/       # Cart slice
│   │   │   ├── products/   # Products slice
│   │   │   └── orders/     # Orders slice
│   │   └── ui/             # UI-related state
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── auth/           # Authentication pages
│   │   ├── customer/       # Customer-facing pages
│   │   │   ├── products/   # Product-related pages
│   │   │   ├── cart/       # Cart and checkout pages
│   │   │   └── orders/     # Order-related pages
│   │   ├── profile/        # User profile pages
│   │   ├── HomePage.tsx    # Home page component
│   │   └── NotFoundPage.tsx # 404 page component
│   ├── styles/             # Global styles
│   ├── theme/              # Material UI theme configuration
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component with routing
│   └── index.tsx           # Entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16.x or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LaluPrasad-M/ecommerce-frontend.git
   cd ecommerce-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. The application will be available at [http://localhost:3000](http://localhost:3000)

### Live Demo

<div align="center">
  <a href="https://ecommerce-frontend-production-1d3c.up.railway.app/" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 20px; text-align: center; text-decoration: none; font-size: 16px; border-radius: 8px; font-weight: bold; margin: 20px 0;">
    🚀 Launch Live Demo
  </a>
</div>

## Architecture and Design Choices

### Routing and Authentication

The application uses React Router v7 with protected routes to manage user access:

- `ProtectedRoute`: A component that redirects unauthenticated users to the login page
- `CustomerRoute`: Specific for customer-only routes, redirects admins to the admin dashboard
- Role-based navigation and UI rendering based on user role (admin/customer)

### State Management

Redux Toolkit is used for centralized state management:

- **Store Configuration**: Centralized in `src/app/store.ts`
- **Feature-based Organization**: State is divided into slices based on features (auth, products, cart, etc.)
- **Custom Hooks**: `useAppDispatch` and `useAppSelector` for typed Redux hooks
- **Serialization**: Custom serialization configuration to handle non-serializable values

### API Integration

Axios is used for API communication with the following features:

- **Centralized Client**: Base configuration in `src/api/client.ts`
- **Interceptors**: Automatic token attachment and refresh handling
- **Service Pattern**: API calls grouped by domain in service files
- **Error Handling**: Centralized error handling with notification dispatch
- **Authentication Events**: Custom events for authentication expiration

### UI Design

Material UI v7 is used for the component library with customizations:

- **Custom Theme**: Defined in `src/theme/index.ts` with light/dark mode support
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Component Structure**: Organized into shared, layout, and feature-specific components
- **Notification System**: Centralized notification system using Notistack/React-Toastify

### Form Handling

The application uses Formik with Yup for form validation:

- **Field Validation**: Form schemas defined with Yup for client-side validation
- **Form Submission**: Integration with Redux actions for form submission
- **Error Handling**: Consistent error display across forms

### Live Deployment

The application is currently deployed on Railway:

<div align="center">
  <a href="https://ecommerce-frontend-production-1d3c.up.railway.app/" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 20px; text-align: center; text-decoration: none; font-size: 16px; border-radius: 8px; font-weight: bold; margin: 20px 0;">
    🌐 Visit Deployment
  </a>
</div>

## Development Workflow

### Code Organization

The codebase follows several organizational principles:

1. **Feature-based Organization**: Code is primarily organized by feature, not by technical function
2. **Component Reusability**: Components are structured to maximize reusability
3. **Container/Presentational Pattern**: Complex components are often split into container/presentational components
4. **Type Safety**: TypeScript is used throughout with strict type checking

### Adding New Features

When adding new features, follow these steps:

1. Define types in the appropriate file under `src/types/`
2. Create the Redux slice in `src/features/` if needed
3. Add API service methods in the appropriate service file
4. Create components in `src/components/`
5. Create pages in `src/pages/`
6. Add routes to `App.tsx` if necessary
7. Register new reducers in the store if needed

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

This will create a `build` directory with optimized production files.

### Environment Configuration

The application uses environment variables for configuration:

- Create a `.env` file in the project root for local development
- Set up environment variables in your deployment platform for production

Required environment variables:

```
# API URLs
REACT_APP_API_URL=http://localhost:3000

# Application Version
REACT_APP_VERSION=1.0.0

# Authentication
REACT_APP_AUTH_STORAGE_KEY=ecommerce_auth_token
REACT_APP_USER_DATA_KEY=ecommerce_user_data

# UI Configuration
REACT_APP_DEFAULT_THEME=light
REACT_APP_DEFAULT_CURRENCY=₹
REACT_APP_DEFAULT_LOCALE=en-IN
```

### Deployment Options

- **Vercel**: Connect your GitHub repository and deploy automatically
  ```bash
  npm install -g vercel
  vercel
  ```
## Backend Integration

The frontend is designed to connect to a RESTful API backend. The API endpoints expected are:

- **Authentication**: `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`
- **Products**: `/api/products`, `/api/products/:id`
- **Cart**: `/api/cart`, `/api/cart/:id`
- **Orders**: `/api/orders`, `/api/orders/:id`
- **Admin**: `/api/admin/products`, `/api/admin/orders`, `/api/admin/coupons`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request