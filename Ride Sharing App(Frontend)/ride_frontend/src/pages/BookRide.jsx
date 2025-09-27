import React, { useState, useEffect } from 'react'
import { MapPin, Clock, Car, Star, Navigation } from 'lucide-react'
import { useApp } from '../context/AppContext'
import apiService from '../services/api'

const BookRide = () => {
  const { setCurrentRide, drivers, setDrivers } = useApp()
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [rideType, setRideType] = useState('standard')
  const [estimatedFare, setEstimatedFare] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [isBooking, setIsBooking] = useState(false)

  const rideTypes = [
    {
      id: 'standard',
      name: 'Standard',
      icon: Car,
      price: 1.0,
      description: 'Comfortable everyday rides',
      eta: '5-10 min'
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Star,
      price: 1.5,
      description: 'Luxury vehicles with extra comfort',
      eta: '8-15 min'
    },
    {
      id: 'pool',
      name: 'Pool',
      icon: Navigation,
      price: 0.7,
      description: 'Share your ride and save money',
      eta: '10-20 min'
    }
  ]

  const calculateFare = () => {
    const baseFare = 5.00
    const perKmRate = 2.50
    const distance = Math.random() * 10 + 2 // Mock distance 2-12 km
    const selectedRideType = rideTypes.find(type => type.id === rideType)
    const multiplier = selectedRideType ? selectedRideType.price : 1.0
    
    const fare = (baseFare + (distance * perKmRate)) * multiplier
    setEstimatedFare(fare.toFixed(2))
    setEstimatedTime(Math.floor(Math.random() * 20 + 10)) // Mock time 10-30 min
  }

  // Fetch available drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      if (pickup && destination) {
        try {
          const driversData = await apiService.getAvailableDrivers()
          // Transform driver data to match frontend format
          const transformedDrivers = driversData.map((driver, index) => ({
            id: driver.id.toString(),
            name: driver.name,
            rating: driver.rating,
            car: 'Vehicle', // You might want to fetch vehicle data separately
            color: 'Unknown',
            plate: 'N/A',
            eta: `${5 + index * 2} min`,
            distance: `${2.1 + index * 1.5} km`,
            price: (12.50 + index * 3.25).toFixed(2)
          }))
          setDrivers(transformedDrivers)
        } catch (error) {
          console.error('Error fetching drivers:', error)
          setDrivers([])
        }
      } else {
        setDrivers([])
      }
    }

    fetchDrivers()
  }, [pickup, destination, setDrivers])

  const handleBookRide = async (driver) => {
    setIsBooking(true)
    
    try {
      const rideData = {
        pickupLocation: pickup,
        destination: destination,
        rideType: rideType.toUpperCase(),
        estimatedFare: parseFloat(estimatedFare),
        estimatedDurationMinutes: estimatedTime,
        notes: ''
      }
      
      const response = await apiService.createRide(rideData)
      
      // Accept the ride with the selected driver
      const acceptedRide = await apiService.acceptRide(response.id, parseInt(driver.id))
      
      setCurrentRide(acceptedRide)
      setIsBooking(false)
      
      // Redirect to tracking page
      window.location.href = `/tracking/${acceptedRide.id}`
    } catch (error) {
      console.error('Error booking ride:', error)
      setIsBooking(false)
      alert('Failed to book ride. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Ride</h1>
          <p className="text-gray-600">Enter your pickup and destination to get started</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="space-y-6">
                {/* Pickup Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="Enter pickup address"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Enter destination"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                {/* Ride Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Ride Type
                  </label>
                  <div className="space-y-3">
                    {rideTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <div
                          key={type.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            rideType === type.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setRideType(type.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Icon className="w-6 h-6 text-primary-600" />
                              <div>
                                <h3 className="font-medium text-gray-900">{type.name}</h3>
                                <p className="text-sm text-gray-600">{type.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">
                                {type.price}x
                              </div>
                              <div className="text-xs text-gray-500">{type.eta}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Fare Estimate */}
                {pickup && destination && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Estimated Fare</span>
                      <span className="text-lg font-semibold text-gray-900">
                        ${estimatedFare}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estimated Time</span>
                      <span className="text-sm font-medium text-gray-900">
                        {estimatedTime} minutes
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Available Drivers */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Available Drivers
              </h2>
              
              {!pickup || !destination ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Enter pickup and destination to see available drivers
                  </p>
                </div>
              ) : drivers.length === 0 ? (
                <div className="text-center py-12">
                  <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No drivers available</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Try adjusting your pickup or destination location
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {drivers.map((driver) => (
                    <div
                      key={driver.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <Car className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{driver.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{driver.rating}</span>
                              <span>•</span>
                              <span>{driver.car} ({driver.color})</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {driver.plate} • {driver.distance} away
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            ${driver.price}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            {driver.eta}
                          </div>
                          <button
                            onClick={() => handleBookRide(driver)}
                            disabled={isBooking}
                            className="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isBooking ? 'Booking...' : 'Book Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookRide