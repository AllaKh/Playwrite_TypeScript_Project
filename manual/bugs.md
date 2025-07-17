# Bugs

## BUG-001 – Login API fails with valid admin credentials
- Endpoint: POST https://automationintesting.online/auth/swagger-ui/index.html
- Login Payload:
- {
  "username": "admin",
  "password": "password"
  }
- Expected: 200 Ok, token received
- Actual: 404
- Impact: User cannot loging and create booking, get reports, create and update new room types
- Severity: Critical

## BUG-002 – Suite-room code mismatch in Report
- Page: Homepage
- Steps:
    1. Leave email empty
    2. Submit booking
- Expected: Validation error shown
- Actual: Booking gets created without email
- Impact: Users can submit incomplete bookings
- Severity: High
