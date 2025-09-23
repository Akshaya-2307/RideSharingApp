const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Something went wrong');
    }
    return response.json();
  }

  // Auth endpoints
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/auth/signin`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password })
    });
    return this.handleResponse(response);
  }

  async signup(userData) {
    const response = await fetch(`${this.baseURL}/auth/signup`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Ride endpoints
  async createRide(rideData) {
    const response = await fetch(`${this.baseURL}/rides`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(rideData)
    });
    return this.handleResponse(response);
  }

  async getRideById(rideId) {
    const response = await fetch(`${this.baseURL}/rides/${rideId}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getRidesByRider(riderId) {
    const response = await fetch(`${this.baseURL}/rides/rider/${riderId}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getRidesByDriver(driverId) {
    const response = await fetch(`${this.baseURL}/rides/driver/${driverId}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getAvailableRides() {
    const response = await fetch(`${this.baseURL}/rides/available`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async acceptRide(rideId, driverId) {
    const response = await fetch(`${this.baseURL}/rides/${rideId}/accept/${driverId}`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateRideStatus(rideId, status) {
    const response = await fetch(`${this.baseURL}/rides/${rideId}/status?status=${status}`, {
      method: 'PUT',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async rateRide(rideId, rating, userType) {
    const response = await fetch(`${this.baseURL}/rides/${rideId}/rate?rating=${rating}&userType=${userType}`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // User endpoints
  async getAllDrivers() {
    const response = await fetch(`${this.baseURL}/users/drivers`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getDriversWithMinRating(minRating) {
    const response = await fetch(`${this.baseURL}/users/drivers/rating/${minRating}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getUserById(userId) {
    const response = await fetch(`${this.baseURL}/users/${userId}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getCurrentUserProfile() {
    const response = await fetch(`${this.baseURL}/users/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateUserProfile(userData) {
    const response = await fetch(`${this.baseURL}/users/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  async updateUserRating(userId, rating) {
    const response = await fetch(`${this.baseURL}/users/${userId}/rate?rating=${rating}`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Driver endpoints
  async getAvailableDrivers() {
    const response = await fetch(`${this.baseURL}/drivers/available`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getNearbyDrivers(latitude, longitude, radius) {
    const params = new URLSearchParams();
    if (latitude) params.append('latitude', latitude);
    if (longitude) params.append('longitude', longitude);
    if (radius) params.append('radius', radius);
    
    const response = await fetch(`${this.baseURL}/drivers/nearby?${params}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getDriverVehicles(driverId) {
    const response = await fetch(`${this.baseURL}/drivers/${driverId}/vehicles`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getDriverRating(driverId) {
    const response = await fetch(`${this.baseURL}/drivers/${driverId}/rating`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }
}

export default new ApiService();



