import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
  user: null,
  currentRide: null,
  rideHistory: [],
  drivers: [],
  isLoading: false,
  error: null
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_CURRENT_RIDE':
      return { ...state, currentRide: action.payload }
    case 'ADD_RIDE_TO_HISTORY':
      return { ...state, rideHistory: [action.payload, ...state.rideHistory] }
    case 'UPDATE_RIDE_STATUS':
      return {
        ...state,
        currentRide: state.currentRide ? { ...state.currentRide, status: action.payload } : null
      }
    case 'SET_DRIVERS':
      return { ...state, drivers: action.payload }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const setUser = (user) => dispatch({ type: 'SET_USER', payload: user })
  const setLoading = (loading) => dispatch({ type: 'SET_LOADING', payload: loading })
  const setError = (error) => dispatch({ type: 'SET_ERROR', payload: error })
  const setCurrentRide = (ride) => dispatch({ type: 'SET_CURRENT_RIDE', payload: ride })
  const addRideToHistory = (ride) => dispatch({ type: 'ADD_RIDE_TO_HISTORY', payload: ride })
  const updateRideStatus = (status) => dispatch({ type: 'UPDATE_RIDE_STATUS', payload: status })
  const setDrivers = (drivers) => dispatch({ type: 'SET_DRIVERS', payload: drivers })

  const value = {
    ...state,
    setUser,
    setLoading,
    setError,
    setCurrentRide,
    addRideToHistory,
    updateRideStatus,
    setDrivers
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
