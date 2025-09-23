import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Clock, Car, Phone, Star, Navigation, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const Tracking = () => {
  const { rideId } = useParams()
  const navigate = useNavigate()
  const { currentRide, updateRideStatus, addRideToHistory } = useApp()
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7128, lng: -74.0060 })
  const [rideStatus, setRideStatus] = useState('confirmed')
  const [timeRemaining, setTimeRemaining] = useState(0)

  useEffect(() => {
    // Check localStorage for current ride
    const savedRide = localStorage.getItem('currentRide')
    if (savedRide) {
      const ride = JSON.parse(savedRide)
      setCurrentRide(ride)
      setTimeRemaining(ride?.estimatedTime || 15)
    } else if (!currentRide) {
      // If no current ride, redirect to location page
      navigate('/location')
      return
    }
  }, [currentRide, navigate, setCurrentRide])

  const getStatusMessage = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Ride confirmed! Looking for a driver...'
      case 'driver_assigned':
        return 'Driver assigned! They are on their way to you.'
      case 'driver_arriving':
        return 'Your driver is arriving in a few minutes.'
      case 'driver_arrived':
        return 'Your driver has arrived! Please meet them at the pickup location.'
      case 'ride_started':
        return 'Ride started! Enjoy your journey.'
      case 'ride_completed':
        return 'Ride completed! Thank you for choosing RideShare.'
      default:
        return 'Processing your ride...'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
      case 'driver_assigned':
      case 'driver_arriving':
        return <Clock className="w-6 h-6 text-blue-500" />
      case 'driver_arrived':
        return <MapPin className="w-6 h-6 text-green-500" />
      case 'ride_started':
        return <Car className="w-6 h-6 text-primary-500" />
      case 'ride_completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-500" />
    }
  }

  if (!currentRide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ride details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Your Ride</h1>
              <p className="text-gray-600">Ride ID: {rideId}</p>
            </div>
            <button
              onClick={() => navigate('/location')}
              className="btn-secondary"
            >
              Book Another Ride
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ride Status */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {getStatusIcon(rideStatus)}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {getStatusMessage(rideStatus)}
                </h2>
                {timeRemaining > 0 && rideStatus !== 'ride_completed' && (
                  <p className="text-gray-600">
                    Estimated time: {timeRemaining} minutes
                  </p>
                )}
              </div>

              {/* Driver Info */}
              {currentRide.driver && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-gray-900 mb-4">Your Driver</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{currentRide.driver.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{currentRide.driver.rating}</span>
                        <span>•</span>
                        <span>{currentRide.driver.car}</span>
                      </div>
                    </div>
                    <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Ride Details */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-medium text-gray-900 mb-4">Ride Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup</span>
                    <span className="text-gray-900">{currentRide.pickup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination</span>
                    <span className="text-gray-900">{currentRide.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fare</span>
                    <span className="text-gray-900">${currentRide.fare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ride Type</span>
                    <span className="text-gray-900 capitalize">{currentRide.rideType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="card p-0 overflow-hidden">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Driver location: {driverLocation.lat.toFixed(4)}, {driverLocation.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex-1">
                <Phone className="w-5 h-5 mr-2" />
                Call Driver
              </button>
              <button className="btn-secondary flex-1">
                <MapPin className="w-5 h-5 mr-2" />
                Share Location
              </button>
              {rideStatus === 'ride_completed' && (
                <button
                  onClick={() => navigate('/history')}
                  className="btn-primary flex-1"
                >
                  View Ride History
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tracking