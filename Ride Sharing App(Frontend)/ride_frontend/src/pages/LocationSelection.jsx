import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ArrowRight, ArrowLeft, Search } from 'lucide-react'

const LocationSelection = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleNext = () => {
    if (pickup && destination) {
      // Store locations in localStorage for the booking flow
      localStorage.setItem('bookingData', JSON.stringify({
        pickup,
        destination
      }))
      navigate('/ride-type')
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  const recentLocations = [
    { name: 'Home', address: '123 Main St, Downtown', type: 'home' },
    { name: 'Work', address: '456 Business Ave, Uptown', type: 'work' },
    { name: 'Airport', address: '789 Airport Blvd, Terminal 1', type: 'airport' },
    { name: 'Mall', address: '321 Shopping Center, Midtown', type: 'shopping' }
  ]

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
            <h1 className="text-xl font-semibold text-gray-900">Where to?</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Input Form */}
        <div className="space-y-6">
          {/* Pickup Location */}
          <div className="card">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Pickup</span>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup location"
                  className="input-field pl-10 text-lg"
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* Destination Location */}
          <div className="card">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Destination</span>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="input-field pl-10 text-lg"
                />
              </div>
            </div>
          </div>

          {/* Recent Locations */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Locations</h3>
            <div className="space-y-3">
              {recentLocations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!pickup) {
                      setPickup(location.address)
                    } else if (!destination) {
                      setDestination(location.address)
                    }
                  }}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{location.name}</div>
                      <div className="text-sm text-gray-600">{location.address}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Use Current Location</span>
              </div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Search on Map</span>
              </div>
            </button>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8">
          <button
            onClick={handleNext}
            disabled={!pickup || !destination}
            className="w-full btn-primary py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center">
              Choose Ride Type
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationSelection


