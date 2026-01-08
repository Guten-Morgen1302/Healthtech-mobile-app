# Testing Guide

## Overview
This guide provides comprehensive instructions for testing the BloodLink Blood Bank Management System, including manual testing, API testing with Postman, and automated testing approaches.

---

## Prerequisites

### Required Software
- Node.js (v18.20.8 or later)
- MongoDB Compass (for database inspection)
- Postman (for API testing)
- Web Browser (Chrome/Firefox recommended)
- Git

### Test Accounts

**Admin Account:**
```
Email: admin@bloodbank.in
Password: admin123
Role: manager
```

**Test Hospital Account:**
```
Email: hospital@example.com
Password: password123
Type: general
```

**Test Donor:**
```
Name: Test Donor
Email: testdonor@example.com
Phone: 9999999999
Blood Group: O+
```

---

## Environment Setup

### 1. Local Development Testing

**Backend Setup:**
```bash
cd blood-bank-backend
npm install
cp .env.example .env
# Update .env with your MongoDB connection
npm start
```

**Frontend Setup:**
```bash
cd blood-bank-app
npm install --legacy-peer-deps
cp .env.example .env
# Update REACT_APP_API_URL=http://localhost:5000/api
npm start
```

### 2. Production Testing

**URLs:**
- Frontend: https://blood-bank-frontend1.netlify.app
- Backend: https://blood-bank-backend-6nml.onrender.com/api

---

## Manual Testing Checklist

### Authentication Module

#### Test Case 1: Admin Login
- [ ] Navigate to login page
- [ ] Enter valid admin credentials
- [ ] Verify successful login
- [ ] Check JWT token in localStorage
- [ ] Verify redirect to dashboard
- [ ] Test logout functionality

**Expected Result:** User logged in successfully, token stored, dashboard visible

#### Test Case 2: Invalid Login
- [ ] Enter wrong email
- [ ] Enter wrong password
- [ ] Verify error messages
- [ ] Check no token stored

**Expected Result:** Login fails with appropriate error message

#### Test Case 3: Protected Routes
- [ ] Try accessing dashboard without login
- [ ] Verify redirect to login page
- [ ] Login and access dashboard
- [ ] Verify successful access

**Expected Result:** Unauthorized users redirected to login

---

### Blood Inventory Management

#### Test Case 4: View Blood Inventory
- [ ] Login as admin
- [ ] Navigate to Blood Inventory page
- [ ] Verify all blood specimens displayed
- [ ] Check pagination works
- [ ] Test search functionality
- [ ] Filter by blood group
- [ ] Filter by status

**Expected Result:** All inventory items displayed correctly with working filters

#### Test Case 5: Add Blood Specimen
- [ ] Click "Add Blood Specimen"
- [ ] Fill all required fields:
  - Specimen Number: SP_TEST_001
  - Blood Group: O+
  - Donor ID: (select from dropdown)
  - Expiry Date: (future date)
  - Status: Available
- [ ] Submit form
- [ ] Verify specimen added
- [ ] Check in database

**Expected Result:** New specimen created successfully

#### Test Case 6: Update Blood Specimen
- [ ] Select existing specimen
- [ ] Click edit button
- [ ] Change status to "Reserved"
- [ ] Save changes
- [ ] Verify update reflected

**Expected Result:** Specimen updated successfully

#### Test Case 7: Delete Blood Specimen
- [ ] Select test specimen
- [ ] Click delete button
- [ ] Confirm deletion
- [ ] Verify specimen removed

**Expected Result:** Specimen deleted from inventory

#### Test Case 8: Inventory Summary Stats
- [ ] Check dashboard summary cards
- [ ] Verify total units displayed
- [ ] Check blood group distribution
- [ ] Verify available vs reserved counts

**Expected Result:** Accurate statistics displayed

---

### Donor Management

#### Test Case 9: View All Donors
- [ ] Navigate to Donors page
- [ ] Verify donor list displayed
- [ ] Check donor details (name, blood group, phone)
- [ ] Test pagination
- [ ] Test search by name

**Expected Result:** All donors displayed with correct information

#### Test Case 10: Register New Donor
- [ ] Click "Add Donor"
- [ ] Fill form:
  - Name: Test Donor
  - Age: 28
  - Blood Group: O+
  - Phone: 9876543210
  - Email: newdonor@test.com
  - City: (select)
- [ ] Submit form
- [ ] Verify donor added
- [ ] Check validation for age (18-65)
- [ ] Test duplicate email prevention

**Expected Result:** Donor registered successfully with validation

#### Test Case 11: Donor Statistics
- [ ] View donor statistics page
- [ ] Check total donors count
- [ ] Verify blood group distribution
- [ ] Check active donors count

**Expected Result:** Accurate donor statistics

---

### Hospital Management

#### Test Case 12: Hospital Registration
- [ ] Navigate to hospital registration
- [ ] Fill hospital details:
  - Name: Test Hospital
  - Email: testhospital@test.com
  - Password: testpass123
  - Phone: 9999888877
  - Address: Test Address
  - Type: general
- [ ] Submit registration
- [ ] Verify hospital created
- [ ] Test duplicate email prevention

**Expected Result:** Hospital registered successfully

#### Test Case 13: Hospital Login
- [ ] Logout from admin
- [ ] Login with hospital credentials
- [ ] Verify hospital dashboard
- [ ] Check different UI/permissions
- [ ] Verify limited access

**Expected Result:** Hospital logged in with appropriate access

#### Test Case 14: View Hospitals (Admin)
- [ ] Login as admin
- [ ] Navigate to Hospitals page
- [ ] Verify all hospitals listed
- [ ] Check hospital details
- [ ] Test search functionality

**Expected Result:** All hospitals displayed correctly

---

### Blood Request Management

#### Test Case 15: Create Blood Request (Hospital)
- [ ] Login as hospital
- [ ] Navigate to Blood Requests
- [ ] Click "New Request"
- [ ] Fill request details:
  - Blood Group: O+
  - Units Needed: 3
  - Urgency: high
  - Patient Name: Test Patient
  - Reason: Surgery
- [ ] Submit request
- [ ] Verify request created

**Expected Result:** Blood request submitted successfully

#### Test Case 16: View Blood Requests (Admin)
- [ ] Login as admin
- [ ] Navigate to Blood Requests
- [ ] Verify all requests displayed
- [ ] Check request status
- [ ] Filter by status (pending/approved)
- [ ] Filter by urgency

**Expected Result:** All requests visible with filters working

#### Test Case 17: Approve Blood Request
- [ ] Select pending request
- [ ] Click "Approve"
- [ ] Add approval notes
- [ ] Confirm approval
- [ ] Verify status changed to "approved"
- [ ] Check inventory reserved

**Expected Result:** Request approved, inventory updated

#### Test Case 18: Reject Blood Request
- [ ] Select pending request
- [ ] Click "Reject"
- [ ] Add rejection reason
- [ ] Confirm rejection
- [ ] Verify status changed

**Expected Result:** Request rejected with reason

---

### Emergency SOS System

#### Test Case 19: Create Emergency Request
- [ ] Login as hospital
- [ ] Click "Emergency SOS" button
- [ ] Fill emergency details:
  - Blood Group: O-
  - Units: 5
  - Patient Name: Emergency Patient
  - Contact: 9999999999
  - Location: Emergency Ward
- [ ] Submit urgent request
- [ ] Verify high priority flag

**Expected Result:** Emergency request created with critical priority

#### Test Case 20: View Active Emergencies
- [ ] Login as admin
- [ ] Navigate to Emergency Dashboard
- [ ] Verify active emergencies displayed
- [ ] Check priority sorting
- [ ] Verify time stamps

**Expected Result:** Active emergencies visible, sorted by urgency

---

### Appointment System

#### Test Case 21: Schedule Appointment
- [ ] Navigate to Appointments
- [ ] Click "Schedule Appointment"
- [ ] Select donor
- [ ] Choose date and time
- [ ] Set purpose (Blood Donation)
- [ ] Submit appointment
- [ ] Verify scheduled

**Expected Result:** Appointment created successfully

#### Test Case 22: View Appointments
- [ ] Check appointments calendar
- [ ] Filter by date
- [ ] Filter by status
- [ ] Verify upcoming appointments

**Expected Result:** All appointments displayed correctly

---

### Donation Camp Management

#### Test Case 23: Create Donation Camp
- [ ] Navigate to Camps
- [ ] Click "Create Camp"
- [ ] Fill camp details:
  - Name: City Blood Drive 2026
  - Date: (future date)
  - Location: Community Center
  - City: (select)
  - Expected Donors: 100
  - Start Time: 09:00 AM
  - End Time: 05:00 PM
- [ ] Submit camp
- [ ] Verify camp created

**Expected Result:** Donation camp scheduled

#### Test Case 24: View Donation Camps
- [ ] View camps list
- [ ] Check upcoming camps
- [ ] View camp details
- [ ] Check donor registration count

**Expected Result:** All camps displayed with details

---

### Chat System

#### Test Case 25: Hospital Chat
- [ ] Login as hospital
- [ ] Open chat interface
- [ ] Send message to admin
- [ ] Verify message sent
- [ ] Check message history

**Expected Result:** Chat message sent successfully

#### Test Case 26: Admin Chat
- [ ] Login as admin
- [ ] View all hospital conversations
- [ ] Select hospital
- [ ] View message history
- [ ] Send reply
- [ ] Verify hospital receives message

**Expected Result:** Two-way communication working

---

### Analytics Dashboard

#### Test Case 27: View Dashboard Statistics
- [ ] Login as admin
- [ ] Navigate to Dashboard
- [ ] Verify stat cards:
  - Total Blood Units
  - Total Donors
  - Pending Requests
  - Active Hospitals
- [ ] Check charts:
  - Blood Group Distribution
  - Monthly Donations
  - Request Trends

**Expected Result:** All statistics and charts display correctly

---

## API Testing with Postman

### Setup Postman Collection

1. **Import Collection:**
   ```
   File → Import → documentation/BloodLink_API.postman_collection.json
   ```

2. **Set Environment Variables:**
   ```
   baseUrl: https://blood-bank-backend-6nml.onrender.com/api
   authToken: (will be set automatically on login)
   hospitalToken: (will be set automatically on hospital login)
   ```

### API Test Cases

#### Authentication APIs

**Test 1: Register Admin**
```
POST {{baseUrl}}/auth/register
Body:
{
  "name": "Test Admin",
  "email": "testadmin@test.com",
  "password": "test123",
  "role": "manager"
}
Expected: 201 Created
```

**Test 2: Login Admin**
```
POST {{baseUrl}}/auth/login
Body:
{
  "email": "admin@bloodbank.in",
  "password": "admin123"
}
Expected: 200 OK, JWT token returned
Auto-set: authToken variable
```

**Test 3: Get Current User**
```
GET {{baseUrl}}/auth/me
Headers: Authorization: Bearer {{authToken}}
Expected: 200 OK, user details returned
```

#### Blood Inventory APIs

**Test 4: Get All Blood Specimens**
```
GET {{baseUrl}}/bloodspecimens?page=1&limit=50
Expected: 200 OK, array of specimens
```

**Test 5: Get Blood Specimen by ID**
```
GET {{baseUrl}}/bloodspecimens/:id
Expected: 200 OK, specimen details
```

**Test 6: Create Blood Specimen**
```
POST {{baseUrl}}/bloodspecimens
Body:
{
  "Specimen_Number": "SP_TEST_002",
  "Blood_Group": "A+",
  "Donor_ID": "donor_id",
  "M_Id": "manager_id",
  "Expiry_Date": "2026-06-01",
  "Disease_Tested": true,
  "Status": "Available"
}
Expected: 201 Created
```

**Test 7: Update Blood Specimen**
```
PUT {{baseUrl}}/bloodspecimens/:id
Body:
{
  "Status": "Reserved"
}
Expected: 200 OK
```

**Test 8: Delete Blood Specimen**
```
DELETE {{baseUrl}}/bloodspecimens/:id
Expected: 200 OK
```

**Test 9: Get Inventory Summary**
```
GET {{baseUrl}}/bloodspecimens/summary/stats
Expected: 200 OK, summary statistics
```

#### Donor APIs

**Test 10: Create Donor**
```
POST {{baseUrl}}/donors
Body:
{
  "D_Name": "API Test Donor",
  "D_Age": 30,
  "D_Bgroup": "B+",
  "D_Reg_Date": "2026-01-08",
  "D_Phno": "8888888888",
  "D_Mail": "apidonor@test.com",
  "City_ID": "city_id"
}
Expected: 201 Created
```

**Test 11: Get Donor Statistics**
```
GET {{baseUrl}}/donors/stats/summary
Expected: 200 OK, donor statistics
```

#### Hospital APIs

**Test 12: Register Hospital**
```
POST {{baseUrl}}/hospital/auth/register
Body:
{
  "Hosp_Name": "API Test Hospital",
  "email": "apihospital@test.com",
  "password": "test123",
  "phone": "7777777777",
  "address": "Test Address",
  "City_ID": "city_id",
  "type": "general"
}
Expected: 201 Created
```

**Test 13: Login Hospital**
```
POST {{baseUrl}}/hospital/auth/login
Body:
{
  "email": "hospital@example.com",
  "password": "password123"
}
Expected: 200 OK, token returned
Auto-set: hospitalToken variable
```

#### Blood Request APIs

**Test 14: Create Blood Request**
```
POST {{baseUrl}}/requests
Headers: Authorization: Bearer {{hospitalToken}}
Body:
{
  "bloodGroup": "O+",
  "unitsNeeded": 3,
  "urgencyLevel": "high",
  "patientName": "API Test Patient",
  "reason": "Testing",
  "hospitalId": "hospital_id"
}
Expected: 201 Created
```

**Test 15: Approve Request**
```
PATCH {{baseUrl}}/requests/:id/approve
Headers: Authorization: Bearer {{authToken}}
Expected: 200 OK
```

#### Emergency APIs

**Test 16: Create Emergency Request**
```
POST {{baseUrl}}/emergency
Headers: Authorization: Bearer {{hospitalToken}}
Body:
{
  "bloodGroup": "O-",
  "unitsNeeded": 5,
  "patientName": "Emergency Test",
  "hospitalId": "hospital_id",
  "contactNumber": "6666666666",
  "location": "Emergency Ward"
}
Expected: 201 Created
```

### Postman Test Scripts

**Auto-save Auth Token:**
```javascript
// Add to Login request Tests tab
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("authToken", jsonData.data.token);
    console.log("Token saved:", jsonData.data.token);
}
```

**Validate Response Structure:**
```javascript
// Add to all GET requests
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.be.true;
});

pm.test("Response has data field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
});
```

---

## Database Testing

### MongoDB Compass Queries

**Check Total Blood Specimens:**
```javascript
db.bloodspecimens.countDocuments({})
```

**Find Available Blood by Type:**
```javascript
db.bloodspecimens.find({
  "Blood_Group": "O+",
  "Status": "Available"
})
```

**Check Pending Requests:**
```javascript
db.bloodrequests.find({
  "status": "pending"
}).sort({ "requestDate": -1 })
```

**Find Active Emergencies:**
```javascript
db.emergencyrequests.find({
  "status": "active"
}).sort({ "requestTime": -1 })
```

**Donor Statistics:**
```javascript
db.donors.aggregate([
  {
    $group: {
      _id: "$D_Bgroup",
      count: { $sum: 1 }
    }
  }
])
```

---

## Performance Testing

### Load Testing with Artillery

**Install Artillery:**
```bash
npm install -g artillery
```

**Create test config (artillery.yml):**
```yaml
config:
  target: "https://blood-bank-backend-6nml.onrender.com"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Get Inventory"
    flow:
      - get:
          url: "/api/bloodspecimens"
```

**Run test:**
```bash
artillery run artillery.yml
```

---

## Security Testing

### Test Cases

1. **SQL Injection Prevention:**
   - Try injecting SQL in email field
   - Expected: Input sanitized

2. **XSS Prevention:**
   - Try injecting `<script>alert('xss')</script>` in text fields
   - Expected: Script tags escaped

3. **Authentication Bypass:**
   - Try accessing protected routes without token
   - Expected: 401 Unauthorized

4. **Token Expiration:**
   - Use expired token
   - Expected: 401 Unauthorized, token expired message

5. **Rate Limiting:**
   - Send 100 requests rapidly
   - Expected: 429 Too Many Requests after limit

---

## Bug Reporting Template

```markdown
### Bug Report

**Title:** [Clear, concise description]

**Environment:**
- Browser/Platform:
- URL:
- User Role:

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
[Attach if applicable]

**Console Errors:**
[Copy any errors from browser console]

**Additional Context:**
Any other relevant information
```

---

## Test Coverage Goals

- [ ] Authentication: 100%
- [ ] Blood Inventory: 100%
- [ ] Donor Management: 100%
- [ ] Hospital Management: 100%
- [ ] Blood Requests: 100%
- [ ] Emergency System: 100%
- [ ] Appointments: 80%
- [ ] Camps: 80%
- [ ] Chat: 80%
- [ ] Analytics: 70%

---

## Automated Testing (Future Implementation)

### Frontend Tests (Jest + React Testing Library)
```javascript
// Example: Login.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('submits form with credentials', async () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'admin@bloodbank.in' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'admin123' }
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  // Assert successful login
});
```

### Backend Tests (Jest + Supertest)
```javascript
// Example: auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  test('POST /api/auth/login - success', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@bloodbank.in',
        password: 'admin123'
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });

  test('POST /api/auth/login - invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong@email.com',
        password: 'wrongpass'
      });
    expect(response.status).toBe(401);
  });
});
```

---

## Test Execution Schedule

### Daily
- Smoke tests on production
- Critical path testing

### Weekly
- Full regression testing
- Performance testing
- Security scanning

### Before Deployment
- Complete test suite
- Load testing
- Security audit
- Database backup verification
