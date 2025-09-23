import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Car, Star, Clock, Phone, MapPin } from 'lucide-react'

const DriverSelection = () => {
  const [bookingData, setBookingData] = useState(null)
  const [drivers, setDrivers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isBooking, setIsBooking] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('bookingData')
    if (data) {
      setBookingData(JSON.parse(data))
      // Simulate loading drivers
      setTimeout(() => {
        const mockDrivers = [
          {
            id: '1',
            name: 'Mike Johnson',
            rating: 4.8,
            car: 'Toyota Camry',
            color: 'White',
            plate: 'ABC-123',
            eta: '5 min',
            distance: '2.1 km',
            price: 12.50,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
          },
          {
            id: '2',
            name: 'Sarah Wilson',
            rating: 4.9,
            car: 'Honda Civic',
            color: 'Blue',
            plate: 'XYZ-789',
            eta: '7 min',
            distance: '3.2 km',
            price: 15.00,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
          },
          {
            id: '3',
            name: 'David Brown',
            rating: 4.7,
            car: 'Nissan Altima',
            color: 'Black',
            plate: 'DEF-456',
            eta: '12 min',
            distance: '5.1 km',
            price: 18.75,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
          }
        ]
        setDrivers(mockDrivers)
        setIsLoading(false)
      }, 2000)
    } else {
      navigate('/location')
    }
  }, [navigate])

  const handleBookRide = async (driver) => {
    setIsBooking(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newRide = {
      id: Date.now().toString(),
      pickup: bookingData.pickup,
      destination: bookingData.destination,
      driver,
      rideType: bookingData.rideType,
      fare: bookingData.fare,
      status: 'confirmed',
      estimatedTime: Math.floor(Math.random() * 20 + 10),
      createdAt: new Date().toISOString()
    }
    
    // Store ride in localStorage
    localStorage.setItem('currentRide', JSON.stringify(newRide))
    localStorage.removeItem('bookingData') // Clear booking data
    
    setIsBooking(false)
    navigate(`/tracking/${newRide.id}`)
  }

  const handleBack = () => {
    navigate('/ride-type')
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Choose Driver</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Summary */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-900">{bookingData.pickup}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-900">{bookingData.destination}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ride Type</span>
              <span className="font-medium text-gray-900 capitalize">{bookingData.rideType}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600">Estimated Fare</span>
              <span className="font-medium text-gray-900">${bookingData.fare}</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="card text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Finding Drivers</h3>
            <p className="text-gray-600">Searching for available drivers near you...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Available Drivers ({drivers.length})
            </h3>
            
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="card hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{driver.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{driver.rating}</span>
                        <span>•</span>
                        <span>{driver.car} ({driver.color})</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {driver.plate} • {driver.distance} away
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{driver.eta}</span>
                        </div>
                        <button className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700">
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ${driver.price}
                    </div>
                    <button
                      onClick={() => handleBookRide(driver)}
                      disabled={isBooking}
                      className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isBooking ? 'Booking...' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Map Placeholder */}
        <div className="card mt-6 p-0 overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Driver Locations</p>
              <p className="text-sm text-gray-500">Interactive map would show here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverSelection




