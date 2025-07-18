# Bugs

## BUG-001 – Login API fails with valid admin credentials
- Endpoint: POST https://automationintesting.online/auth/swagger-ui/index.html
- Steps:
- 1. Try to authenticate with Payload:
- {
  "username": "admin",
  "password": "password"
  }
- Expected: 200 Ok, token received
- Actual: 404
- Impact: User cannot loging and create booking, get reports, create and update new room types
- Severity: Critical

## BUG-002 – Report - room details unavailable
- Page: Report
- Steps:
  1. Go to homepage
  2. Click on the Admin link
  3. Log in with username "admin" and password "password"
  4. Click on Restful Booker Platform Demo link
  5. Scroll down to Our Rooms section
  6. Click on Book now button in Double room section
  7. Select available dates in the Book This Room modal
  8. Click on Reserve now button
  9. Fill the credentials form with valid data
  10. Submit the form
  11. Click on the Admin link
  12. Click on the Report link
  13. Click on the booking record
- Expected: Booking details are shown
- Actual: Booking details are not displayed
- Impact: Admin cannot view details of existing bookings
- Severity: High

## BUG-002 – Report - room details unavailable
- Page: Report
- Steps:
  1. Go to homepage
  2. Click on the Admin link
  3. Log in with username "admin" and password "password"
  4. Click on Restful Booker Platform Demo link
  5. Scroll down to Our Rooms section
  6. Click on Book now button in Double room section
  7. Select available dates in the Book This Room modal
  8. Click on Reserve now button
  9. Fill the credentials form with valid data
  10. Submit the form
  11. Click on the Admin link
  12. Click on the Report link
  13. Click on the booking record
- Expected: Booking details are shown
- Actual: Booking details are not displayed
- Impact: Admin cannot view details of existing bookings
- Severity: High

## BUG-003 – Navigation Bar - number of messages doesn't match actual number of messages
- Page: Navigation Bar
- Steps:
  1. From homepage click on the Admin link
  2. Log in with username "admin" and password "password"
  4. Click on the Messages link
- Expected: Number of messages in the Navigation bar should be the same as actual number of messages
- Actual: Number of messages in the Navigation bar always = 1 and doesn't match actual number of messages
- Impact: Confuse admin user
- Severity: Low

## BUG-004 – Reservation – app crashes on attempt to booking a room for unavailable dates
- Page: Report
- Steps:
  1. From homepage scroll down to Our Rooms section
  2. Click on Book now button in Single/Double/Suite room section
  3. Select unavailable dates (e.g. past dates) in the Book This Room modal
  4. Click on Reserve now button
  5. Wait for the SPA to finish loading
- Expected: User sees a clear “No availability for selected dates” message and can pick different dates
- Actual: Full-screen error banner appears; browser console shows an uncaught JavaScript exception:
  - Application error: a client-side exception has occurred while loading automationintesting.online (see the browser console for more information).
  - Booking UI does not load
- Impact: Users are unable to proceed with booking and entire frontend crashes
- Severity: Critical

## BUG-005 – Reservation – app crashes on attempt to booking a room for unavailable dates
- Page: Report
- Steps:
  1. From homepage click on the Admin link
  2. Log in with username "admin" and password "password"
  3. Fill in Room # with unexisting number
  4. Select unexisting Type from the drop-down list
  5. Select Accessible = true
  6. Fill in the Price
  7. Check WiFi, TV, and Views radio buttons
  8. Click on Create button
  9. Return to the homepage
  10. Scroll down to Our Rooms section
- Expected: New room type should appear in the Rooms list and in the Our Rooms section
- Actual:  Newly created room is not displayed
- Impact: Users cannot book newly added rooms
- Severity: High

# BUG-006 – Homepage – Amenities link does not scroll to section
- Page: Homepage
- Steps:
  1. From homepage click on the "Amenities" link in the navigation menu
- Expected: Page should scroll or jump to the Amenities section
- Actual: URL changes to #amenities but the page does not scroll or navigate
- Impact: Confuses users expecting to be taken directly to the Amenities section
- Severity: Low

