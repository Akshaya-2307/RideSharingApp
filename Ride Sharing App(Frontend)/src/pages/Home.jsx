import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, Shield, Zap } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Easy Booking',
      description: 'Book a ride in seconds with our intuitive interface'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track your driver and estimated arrival time'
    },
    {
      icon: Star,
      title: 'Top Rated Drivers',
      description: 'Ride with verified, highly-rated drivers'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your safety is our top priority'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Quick pickup and drop-off service'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Ride, Your Way
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Book a ride in seconds, track in real-time, and arrive safely
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/location"
                className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Book a Ride Now
              </Link>
              <Link
                to="/history"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                View Ride History
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RideShare?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of transportation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Rides Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Download our app or book a ride through the web
          </p>
          <Link
            to="/location"
            className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200 inline-block"
          >
            Book Your First Ride
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
