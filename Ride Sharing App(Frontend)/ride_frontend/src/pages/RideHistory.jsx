import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, Car, Filter, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'

const RideHistory = () => {
  const { rideHistory } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filteredRides, setFilteredRides] = useState([])

  useEffect(() => {
    let filtered = rideHistory

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(ride =>
        ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(ride => ride.status === filterStatus)
    }

    setFilteredRides(filtered)
  }, [rideHistory, searchTerm, filterStatus])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride History</h1>
          <p className="text-gray-600">View and manage your past rides</p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rides by location or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field"
              >
                <option value="all">All Rides</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="card text-center py-16">
          <Car className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No rides yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't taken any rides yet. Book your first ride to get started!
          </p>
          <Link to="/location" className="btn-primary">
            Book Your First Ride
          </Link>
        </div>

        {/* Summary Stats - Empty */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">0</div>
            <div className="text-sm text-gray-600">Total Rides</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">$0.00</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">0</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">0.0</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RideHistory