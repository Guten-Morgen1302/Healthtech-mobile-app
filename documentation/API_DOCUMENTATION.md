# 📚 BloodLink API Documentation

## Base URL
- **Production**: `https://blood-bank-backend-6nml.onrender.com/api`
- **Local**: `http://localhost:5000/api`

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication APIs

### Register User (Admin/Staff)
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "manager" // or "staff"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "manager"
    },
    "token": "jwt_token_here"
  }
}
```

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@bloodbank.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Admin",
      "email": "admin@bloodbank.com",
      "role": "manager"
    },
    "token": "jwt_token_here"
  }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "Admin",
      "email": "admin@bloodbank.com",
      "role": "manager"
    }
  }
}
```

---

## 🩸 Blood Inventory APIs

### Get All Blood Specimens
```http
GET /bloodspecimens
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)
- `bloodGroup`: Filter by blood group (A+, A-, B+, B-, AB+, AB-, O+, O-)
- `status`: Filter by status (Available, Reserved, Used, Contaminated)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "specimen_id",
      "Specimen_Number": "SP001",
      "Blood_Group": "O+",
      "Donor_ID": "donor_id",
      "M_Id": "manager_id",
      "Status": "Available",
      "Expiry_Date": "2026-02-15T00:00:00.000Z",
      "Disease_Tested": true,
      "createdAt": "2026-01-08T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 250,
    "itemsPerPage": 50
  }
}
```

### Get Blood Specimen by ID
```http
GET /bloodspecimens/:id
Authorization: Bearer <token>
```

### Create Blood Specimen
```http
POST /bloodspecimens
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "Specimen_Number": "SP002",
  "Blood_Group": "A+",
  "Donor_ID": "donor_id",
  "M_Id": "manager_id",
  "Expiry_Date": "2026-03-15",
  "Disease_Tested": true,
  "Status": "Available"
}
```

### Update Blood Specimen
```http
PUT /bloodspecimens/:id
Authorization: Bearer <token>
```

### Delete Blood Specimen
```http
DELETE /bloodspecimens/:id
Authorization: Bearer <token>
```

### Get Inventory Summary
```http
GET /bloodspecimens/summary/stats
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUnits": 500,
    "byBloodGroup": {
      "A+": 120,
      "A-": 30,
      "B+": 100,
      "B-": 25,
      "AB+": 50,
      "AB-": 15,
      "O+": 130,
      "O-": 30
    },
    "byStatus": {
      "Available": 400,
      "Reserved": 50,
      "Used": 40,
      "Contaminated": 10
    },
    "expiringIn7Days": 25,
    "expiringIn30Days": 80
  }
}
```

---

## 👥 Donor Management APIs

### Get All Donors
```http
GET /donors
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`, `limit`: Pagination
- `bloodGroup`: Filter by blood group
- `city`: Filter by city
- `search`: Search by name or phone

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "donor_id",
      "D_Name": "Alice Smith",
      "D_Age": 28,
      "D_Bgroup": "O+",
      "D_Reg_Date": "2025-06-15T00:00:00.000Z",
      "D_Phno": "1234567890",
      "D_Mail": "alice@example.com",
      "City_ID": "city_id",
      "totalDonations": 5,
      "lastDonation": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Donor by ID
```http
GET /donors/:id
Authorization: Bearer <token>
```

### Create Donor
```http
POST /donors
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "D_Name": "Bob Johnson",
  "D_Age": 30,
  "D_Bgroup": "A+",
  "D_Reg_Date": "2026-01-08",
  "D_Phno": "9876543210",
  "D_Mail": "bob@example.com",
  "City_ID": "city_id"
}
```

### Update Donor
```http
PUT /donors/:id
Authorization: Bearer <token>
```

### Delete Donor
```http
DELETE /donors/:id
Authorization: Bearer <token>
```

### Get Donor Statistics
```http
GET /donors/stats/summary
Authorization: Bearer <token>
```

---

## 🏥 Hospital Management APIs

### Get All Hospitals
```http
GET /hospitals
Authorization: Bearer <token>
```

### Get Hospital by ID
```http
GET /hospitals/:id
Authorization: Bearer <token>
```

### Create Hospital
```http
POST /hospitals
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "Hosp_Name": "City Hospital",
  "Hosp_Needed_Bgrp": "O+",
  "Hosp_Phno": "1234567890",
  "City_ID": "city_id",
  "email": "hospital@example.com",
  "type": "general",
  "capacity": 500
}
```

### Hospital Authentication

#### Register Hospital
```http
POST /hospital/auth/register
```

**Request Body:**
```json
{
  "Hosp_Name": "General Hospital",
  "email": "hospital@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St, City",
  "City_ID": "city_id",
  "type": "general"
}
```

#### Login Hospital
```http
POST /hospital/auth/login
```

**Request Body:**
```json
{
  "email": "hospital@example.com",
  "password": "password123"
}
```

---

## 📋 Blood Request APIs

### Get All Requests
```http
GET /requests
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: pending, approved, rejected
- `bloodGroup`: Filter by blood group
- `urgent`: true/false

### Create Blood Request
```http
POST /requests
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "bloodGroup": "O+",
  "unitsNeeded": 3,
  "urgencyLevel": "high",
  "patientName": "John Doe",
  "reason": "Surgery",
  "hospitalId": "hospital_id"
}
```

### Approve Request
```http
PATCH /requests/:id/approve
Authorization: Bearer <token>
```

### Reject Request
```http
PATCH /requests/:id/reject
Authorization: Bearer <token>
```

---

## 🚨 Emergency SOS APIs

### Create Emergency Request
```http
POST /emergency
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "bloodGroup": "O-",
  "unitsNeeded": 5,
  "patientName": "Emergency Patient",
  "hospitalId": "hospital_id",
  "contactNumber": "9999999999",
  "location": "City Hospital, Emergency Ward"
}
```

### Get Active Emergencies
```http
GET /emergency/active
Authorization: Bearer <token>
```

---

## 📅 Appointment APIs

### Create Appointment
```http
POST /appointments
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "donorId": "donor_id",
  "appointmentDate": "2026-01-15",
  "timeSlot": "10:00 AM",
  "purpose": "Blood Donation"
}
```

### Get All Appointments
```http
GET /appointments
Authorization: Bearer <token>
```

### Update Appointment Status
```http
PATCH /appointments/:id/status
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "completed" // or "cancelled", "confirmed"
}
```

---

## 🎪 Donation Camp APIs

### Get All Camps
```http
GET /camps
Authorization: Bearer <token>
```

### Create Camp
```http
POST /camps
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "Camp_Name": "City Blood Drive 2026",
  "Camp_Date": "2026-02-15",
  "Location": "Community Center",
  "City_ID": "city_id",
  "Organized_By": "manager_id",
  "expectedDonors": 100,
  "startTime": "09:00 AM",
  "endTime": "05:00 PM"
}
```

---

## 💬 Chat APIs

### Admin Chat

#### Get All Conversations
```http
GET /admin/chat/conversations
Authorization: Bearer <token>
```

#### Get Conversation Messages
```http
GET /admin/chat/messages/:hospitalId
Authorization: Bearer <token>
```

#### Send Message to Hospital
```http
POST /admin/chat/send/:hospitalId
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "message": "Your request has been approved"
}
```

### Hospital Chat

#### Get Messages
```http
GET /chat/hospital/messages
Authorization: Bearer <hospital_token>
```

#### Send Message to Admin
```http
POST /chat/hospital/send
Authorization: Bearer <hospital_token>
```

**Request Body:**
```json
{
  "message": "We need 5 units of O+ blood urgently"
}
```

---

## 📊 Analytics APIs

### Get Dashboard Statistics
```http
GET /analytics/dashboard
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalDonors": 1500,
    "totalBloodUnits": 500,
    "totalRequests": 250,
    "activeEmergencies": 3,
    "todayDonations": 15,
    "monthlyDonations": 320,
    "bloodGroupDistribution": {
      "O+": 130,
      "A+": 120,
      "B+": 100
    },
    "recentActivities": []
  }
}
```

### Get Donation Trends
```http
GET /analytics/trends
Authorization: Bearer <token>
```

**Query Parameters:**
- `period`: daily, weekly, monthly, yearly
- `startDate`: ISO date string
- `endDate`: ISO date string

---

## 🏆 Rewards APIs

### Get Donor Rewards
```http
GET /rewards/donor/:donorId
Authorization: Bearer <token>
```

### Award Points
```http
POST /rewards/award
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "donorId": "donor_id",
  "points": 100,
  "reason": "Blood Donation",
  "badgeAwarded": "Gold Donor"
}
```

---

## 🌆 City APIs

### Get All Cities
```http
GET /cities
```

### Get City by ID
```http
GET /cities/:id
```

---

## 🔔 QR Code APIs

### Generate QR Code for Specimen
```http
GET /qr/specimen/:specimenId
Authorization: Bearer <token>
```

**Response:** Image/PNG QR Code

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

### Common Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Server Error

---

## Rate Limiting
- **Free Tier**: 100 requests per 15 minutes
- **Authenticated**: 1000 requests per 15 minutes

---

## Testing
Use the Postman collection in `documentation/BloodLink_API.postman_collection.json` for testing all endpoints.

---

## Need Help?
- 📧 Email: support@bloodlink.com
- 📖 Docs: https://docs.bloodlink.com
- 🐛 Issues: https://github.com/yourusername/bloodlink/issues
