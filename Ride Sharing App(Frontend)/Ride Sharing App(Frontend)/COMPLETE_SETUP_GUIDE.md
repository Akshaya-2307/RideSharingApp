# Complete Ride Sharing App Setup Guide

This guide will help you set up the complete Ride Sharing App with React frontend, Spring Boot backend, and MySQL database.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Java 17** - [Download here](https://adoptium.net/)
- **Maven** (v3.6+) - [Download here](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** - [Download here](https://dev.mysql.com/downloads/)
- **Git** - [Download here](https://git-scm.com/)

## 🗂️ Project Structure

```
Ride Sharing App/
├── Frontend/ (React + Vite)
│   ├── src/
│   ├── package.json
│   └── ...
├── Backend/ (Spring Boot)
│   ├── src/main/java/com/rideshare/
│   ├── database/
│   ├── pom.xml
│   └── ...
└── README.md
```

## 🚀 Step-by-Step Setup

### Step 1: Database Setup

1. **Start MySQL Service**:
   ```bash
   # Windows (if installed as service)
   net start mysql80
   
   # Or start from MySQL Workbench/Command Line
   ```

2. **Create Database**:
   ```sql
   mysql -u root -p
   CREATE DATABASE ride_sharing_db;
   USE ride_sharing_db;
   ```

3. **Run Setup Script**:
   ```bash
   mysql -u root -p ride_sharing_db < "Ride Sharing App Backend/database/setup.sql"
   ```

### Step 2: Backend Setup

1. **Navigate to Backend Directory**:
   ```bash
   cd "Ride Sharing App Backend"
   ```

2. **Update Database Configuration** (if needed):
   Edit `src/main/resources/application.yml`:
   ```yaml
   spring:
     datasource:
       username: your_mysql_username
       password: your_mysql_password
   ```

3. **Build and Run Backend**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Verify Backend is Running**:
   - Open browser: `http://localhost:8080/api`
   - You should see a basic response or error page

### Step 3: Frontend Setup

1. **Navigate to Frontend Directory**:
   ```bash
   cd "Ride Sharing App(Frontend)"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Verify Frontend is Running**:
   - Open browser: `http://localhost:5173`
   - You should see the Ride Sharing App homepage

## 🔧 Configuration

### Backend Configuration

The backend is configured to run on port 8080 with the following key settings:

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/ride_sharing_db
    username: root
    password: password
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8080/api` in the `src/services/api.js` file.

## 🧪 Testing the Application

### 1. Test User Registration/Login

1. Open the app at `http://localhost:5173`
2. Click "Sign Up" or "Login"
3. Use these test credentials:
   - **Email**: `john@example.com`
   - **Password**: `password123`

### 2. Test Ride Booking

1. Login with test credentials
2. Click "Book a Ride Now"
3. Enter pickup and destination
4. Select a ride type
5. Choose a driver and book

### 3. Test API Endpoints

You can test the API directly using curl:

```bash
# Test login
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Test get drivers
curl -X GET http://localhost:8080/api/drivers/available \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Sample Data

The database comes pre-populated with:

- **5 Users**: 2 riders, 3 drivers
- **5 Vehicles**: Assigned to drivers
- **Default Password**: `password123` for all users

### Test Users:
- `john@example.com` / `password123` (Rider)
- `jane@example.com` / `password123` (Rider)
- `mike@example.com` / `password123` (Driver)
- `sarah@example.com` / `password123` (Driver)
- `david@example.com` / `password123` (Driver)

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Database Connection Error
```
Error: Could not create connection to database server
```
**Solution**:
- Check MySQL service is running
- Verify database credentials in `application.yml`
- Ensure database `ride_sharing_db` exists

#### 2. CORS Error in Browser
```
Access to fetch at 'http://localhost:8080/api' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solution**:
- Check backend is running on port 8080
- Verify CORS configuration in `WebSecurityConfig.java`
- Ensure frontend is running on port 5173

#### 3. JWT Token Error
```
Error: Unauthorized
```
**Solution**:
- Check if user is logged in
- Verify token is being sent in requests
- Check token hasn't expired

#### 4. Frontend Build Error
```
Module not found: Can't resolve '../services/api'
```
**Solution**:
- Ensure `src/services/api.js` exists
- Check import paths are correct
- Run `npm install` to install dependencies

#### 5. Backend Compilation Error
```
Error: Could not find or load main class
```
**Solution**:
- Ensure Java 17 is installed
- Run `mvn clean install`
- Check Maven configuration

### Debugging Steps

1. **Check Logs**:
   - Backend: Look at console output
   - Frontend: Check browser console (F12)

2. **Verify Services**:
   - MySQL: `mysql -u root -p`
   - Backend: `curl http://localhost:8080/api`
   - Frontend: Check `http://localhost:5173`

3. **Check Ports**:
   - Backend: 8080
   - Frontend: 5173
   - MySQL: 3306

## 🔄 Development Workflow

### Making Changes

1. **Backend Changes**:
   - Edit Java files
   - Restart Spring Boot application
   - Test with Postman or frontend

2. **Frontend Changes**:
   - Edit React components
   - Changes auto-reload in browser
   - Test functionality

3. **Database Changes**:
   - Modify entities
   - Hibernate will auto-update schema
   - Or run SQL scripts manually

### Adding New Features

1. **Backend**:
   - Create entity → repository → service → controller
   - Add DTOs for requests/responses
   - Update security configuration if needed

2. **Frontend**:
   - Create React components
   - Add API calls in `api.js`
   - Update routing in `App.jsx`

## 📱 Features Overview

### Current Features
- ✅ User authentication (login/signup)
- ✅ Ride booking and management
- ✅ Driver selection and rating
- ✅ Real-time ride tracking
- ✅ User profile management
- ✅ Ride history
- ✅ Payment integration (basic)

### Future Enhancements
- 🔄 Real-time location tracking
- 🔄 Push notifications
- 🔄 Advanced payment processing
- 🔄 Driver earnings dashboard
- 🔄 Admin panel
- 🔄 Mobile app

## 📞 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Verify all prerequisites are installed
3. Check the logs for error messages
4. Ensure all services are running on correct ports

## 🎉 Success!

Once everything is running, you should have:
- A fully functional ride sharing app
- User authentication working
- Ride booking and tracking
- Driver management
- Database persistence

The app is now ready for development and testing!

