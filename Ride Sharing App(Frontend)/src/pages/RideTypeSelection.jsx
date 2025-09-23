import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Car, Star, Navigation, Clock, Users } from 'lucide-react'

const RideTypeSelection = () => {
  const [selectedType, setSelectedType] = useState('standard')
  const [bookingData, setBookingData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('bookingData')
    if (data) {
      setBookingData(JSON.parse(data))
    } else {
      navigate('/location')
    }
  }, [navigate])

  const rideTypes = [
    {
      id: 'standard',
      name: 'Standard',
      icon: Car,
      price: 1.0,
      description: 'Comfortable everyday rides',
      eta: '5-10 min',
      features: ['Regular cars', 'Standard pricing', 'Quick pickup'],
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Star,
      price: 1.5,
      description: 'Luxury vehicles with extra comfort',
      eta: '8-15 min',
      features: ['Luxury cars', 'Professional drivers', 'Premium amenities'],
      color: 'purple'
    },
    {
      id: 'pool',
      name: 'Pool',
      icon: Users,
      price: 0.7,
      description: 'Share your ride and save money',
      eta: '10-20 min',
      features: ['Shared rides', 'Lower cost', 'Eco-friendly'],
      color: 'green'
    }
  ]

  const calculateFare = (type) => {
    const baseFare = 5.00
    const perKmRate = 2.50
    const distance = Math.random() * 10 + 2 // Mock distance 2-12 km
    const multiplier = type.price
    
    return (baseFare + (distance * perKmRate)) * multiplier
  }

  const handleNext = () => {
    if (bookingData) {
      const updatedData = {
        ...bookingData,
        rideType: selectedType,
        fare: calculateFare(rideTypes.find(t => t.id === selectedType))
      }
      localStorage.setItem('bookingData', JSON.stringify(updatedData))
      navigate('/driver-selection')
    }
  }

  const handleBack = () => {
    navigate('/location')
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
            <h1 className="text-xl font-semibold text-gray-900">Choose Ride Type</h1>
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
        </div>

        {/* Ride Type Options */}
        <div className="space-y-4 mb-8">
          {rideTypes.map((type) => {
            const Icon = type.icon
            const fare = calculateFare(type)
            const isSelected = selectedType === type.id
            
            return (
              <div
                key={type.id}
                className={`card cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-2 border-primary-500 bg-primary-50'
                    : 'border border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-primary-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isSelected ? 'text-primary-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                        {isSelected && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{type.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{type.eta}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{type.price}x</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {type.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${fare.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">Estimated fare</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full btn-primary py-4 text-lg font-medium"
        >
          <div className="flex items-center justify-center">
            Find Drivers
            <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default RideTypeSelection




