# RideShare - Ride Sharing App Frontend

A modern, responsive React frontend for a ride-sharing application built with Vite, Tailwind CSS, and React Router.

## Features

### 🔐 Authentication System
- **User Registration**: Complete sign-up process with form validation
- **User Login**: Secure login with email and password
- **Protected Routes**: Authentication guards for secure access
- **Session Management**: Persistent login with localStorage
- **Demo Account**: Quick access with pre-configured demo credentials

### 🚗 Core Functionality
- **Ride Booking**: Easy-to-use interface for booking rides with pickup and destination selection
- **Real-time Tracking**: Track driver location and ride progress in real-time
- **Multiple Ride Types**: Standard, Premium, and Pool ride options
- **Driver Selection**: Choose from available drivers with ratings and vehicle information

### 📱 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Interactive Components**: Smooth animations and transitions
- **Accessibility**: Built with accessibility best practices

### 💳 Payment & Billing
- **Payment Methods**: Add and manage multiple payment methods
- **Transaction History**: View detailed transaction history
- **Billing Summary**: Track spending and payment statistics

### 👤 User Management
- **Profile Management**: Update personal information and preferences
- **Ride History**: View past rides with detailed information
- **Ratings & Reviews**: Rate drivers and view ride statistics
- **Saved Addresses**: Manage frequently used locations

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Headless UI**: Unstyled, accessible UI components

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ride-sharing-app-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── ProtectedRoute.jsx # Authentication guard
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # User login page
│   ├── SignUp.jsx      # User registration page
│   ├── BookRide.jsx    # Ride booking page
│   ├── Tracking.jsx    # Ride tracking page
│   ├── RideHistory.jsx # Ride history page
│   ├── Profile.jsx     # User profile page
│   └── Payment.jsx     # Payment management page
├── context/            # React Context for state management
│   ├── AuthContext.jsx # Authentication state
│   └── AppContext.jsx  # Global app state
├── services/           # API services and utilities
├── utils/              # Helper functions
├── assets/             # Static assets
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Key Features Implementation

### Authentication
- Complete user registration and login system
- Form validation with real-time error handling
- Protected routes that require authentication
- Session persistence with localStorage
- Demo account for quick testing

### State Management
- Uses React Context for global state management
- Separate contexts for authentication and app state
- Manages user data, ride information, and app state
- Provides actions for updating state across components

### Routing
- React Router for client-side navigation
- Protected routes and dynamic routing
- URL parameters for ride tracking

### Responsive Design
- Mobile-first approach
- Breakpoints for different screen sizes
- Touch-friendly interface elements

### Mock Data
- Comprehensive mock data for demonstration
- Simulated API responses
- Realistic user interactions

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Component-specific styles in individual files

### Mock Data
- Update mock data in context and components
- Modify `src/context/AppContext.jsx` for default state
- Add new mock data in individual pages

## Future Enhancements

- [ ] Real-time map integration (Google Maps, Mapbox)
- [ ] WebSocket integration for live updates
- [ ] Push notifications
- [ ] Offline support with service workers
- [ ] Progressive Web App (PWA) features
- [ ] Internationalization (i18n)
- [ ] Dark mode theme
- [ ] Advanced filtering and search
- [ ] Driver mode interface
- [ ] Admin dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
