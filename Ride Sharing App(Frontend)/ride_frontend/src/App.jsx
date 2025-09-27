import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider, useApp } from './context/AppContext'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BookRide from './pages/BookRide'
import LocationSelection from './pages/LocationSelection'
import RideTypeSelection from './pages/RideTypeSelection'
import DriverSelection from './pages/DriverSelection'
import RideHistory from './pages/RideHistory'
import Profile from './pages/Profile'
import Payment from './pages/Payment'
import Tracking from './pages/Tracking'

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AppProvider>
      <AppWithUser user={user} isAuthenticated={isAuthenticated} />
    </AppProvider>
  )
}

function AppWithUser({ user, isAuthenticated }) {
  const { setUser } = useApp()

  React.useEffect(() => {
    setUser(user)
  }, [user, setUser])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Header />}
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            } />
            <Route path="/book" element={
              <ProtectedRoute>
                <BookRide />
              </ProtectedRoute>
            } />
            <Route path="/location" element={
              <ProtectedRoute>
                <LocationSelection />
              </ProtectedRoute>
            } />
            <Route path="/ride-type" element={
              <ProtectedRoute>
                <RideTypeSelection />
              </ProtectedRoute>
            } />
            <Route path="/driver-selection" element={
              <ProtectedRoute>
                <DriverSelection />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <RideHistory />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } />
            <Route path="/tracking/:rideId" element={
              <ProtectedRoute>
                <Tracking />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App