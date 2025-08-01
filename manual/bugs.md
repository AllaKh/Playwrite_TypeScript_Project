# Bugs

## BUG-001 – Login API fails with valid admin credentials
- Endpoint: POST https://automationintesting.online/auth/swagger-ui/index.html#/auth-controller/createToken
- Steps:
- 1. Try to authenticate with Payload:
- {
  "username": "admin",
  "password": "password"
  }
- Expected: 200 Ok, token received
- Actual: 404
- Impact: Admin cannot loging and get all reports, create and update rooms
- Severity: Critical

## BUG-002 – GET APIs fail with valid get request
- Endpoint: GET Booking report: Get bookings by ID without token/Get room by ID without token/Get room by dates without token
- https://automationintesting.online/report/swagger-ui/index.html#/report-controller/getSpecificRoomReport
- https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRoom
- https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRooms
- Steps:
- 1. Try to get rooms or bookings with APIs that don't require token
- Expected: 200 Ok, receive room/rooms/booking details
- Actual: 404
- Impact: Admin cannot get reports and bookings
- Severity: Critical

## BUG-003 – POST & GET APIs in room and GET with token API in room-controller API don't have valid Title
- Endpoint: POST & GET APIs in room and GET with token API in room-controller API
- https://automationintesting.online/room/swagger-ui/index.html#/room-controller/createRoom
- https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRooms
- https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRoom
- Steps:
- 1. Open these APIs
- Expected: Every API has unique clear Title
- Actual: Titles are completely missing
- Impact: Confuse Admin
- Severity: Medium

## BUG-004 – POST & PUT API in room - missing field validation
- Endpoint: POST & PUT APIs in room
- https://automationintesting.online/room/swagger-ui/index.html#/room-controller/createRoom
- https://automationintesting.online/room/swagger-ui/index.html#/room-controller/updateRoom
- Steps:
- 1. Try to enter payload with missing ot unavailable data
- Expected: Appropriate error message appears
- Actual: POST and PUT can be executed without validation
- Impact: Causes wrong booking process functionality 
- Severity: High

## BUG-005 – PUT API in room - missing Reset Button
- Endpoint: PUT APIs in room
- https://automationintesting.online/room/swagger-ui/index.html#/room-controller/updateRoom
- Steps:
- 1. POST API contains a Reset Button
- Expected: PUT API containes the same Reset Button due the same functionality
- Actual: Reset Button is missing
- Impact: Causes admin mismatch
- Severity: Low

## BUG-006 – Report - room details unavailable
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
  13. Click on the appropriate booking record
- Expected: I can see all dates for which the current booking made
  - Booking details are shown by clicking on on the booking record
- Actual: I can see only first date of the current booking
  - Booking details are not displayed
- Impact: Admin cannot view details of existing bookings
- Severity: High

## BUG-007 – Navigation Bar - number of messages doesn't match actual number of messages
- Page: Navigation Bar
- Steps:
  1. From homepage click on the Admin link
  2. Log in with username "admin" and password "password"
  4. Click on the Messages link
- Expected: Number of messages in the Navigation bar should be the same as actual number of messages
- Actual: Number of messages in the Navigation bar doesn't match actual number of messages
- Impact: Confuse admin user
- Severity: Low

## BUG-008 – Reservation – app crashes on attempt to booking a room for unavailable dates
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

## BUG-009 – Add a room with new valid type – new room doesn't appear in Our Rooms section and cannot be booking
- Page: Rooms
- Steps:
  1. From homepage click on the Admin link
  2. Log in with username "admin" and password "password"
  3. Fill in Room # with valid and non-existing number
  4. Select unexisting Type from the drop-down list
  5. Select Accessible = true
  6. Fill in the Price
  7. Check WiFi, TV, and Views radio buttons
  8. Click on Create button
  9. Return to the homepage
  10. Scroll down to Our Rooms section
- Expected: New room type should appear in the Rooms list and in the Our Rooms section
- Actual:  Newly created room is not displayed in the Our Rooms section
- Impact: Users cannot book newly added rooms with previously non-existing type
- Severity: High

# BUG-010 – Homepage – Amenities link does not scroll to section
- Page: Homepage
- Steps:
  1. From homepage click on the "Amenities" link in the navigation menu
- Expected: Page should scroll or jump to the Amenities section
- Actual: URL changes to #amenities but the page does not scroll or navigate
- Impact: Confuses users expecting to be taken directly to the Amenities section
- Severity: Low

# BUG-011 – Create new room – fields validation
- Page: Rooms
- Steps:
  1. From homepage click on the Admin link
  2. Log in with username "admin" and password "password"
  3. Don't fill "Room #" field and click on "Create" button
  4. Fill "Room #" field with letters/special characters and click on "Create" button
  5. Fill "Room #" field with existing room number and click on "Create" button
- Expected: Error message "Room # must be unique" appears
  - and appropriate error message appears by attempt entering non-digital Room #
- Actual: New room can be created in both cases without any error message
- Impact: Confuses admin and causes wrong booking process functionality
- Severity: Medium

# BUG-012 – Update existing room
- Page: Rooms
- Steps:
  1. From homepage click on the Admin link
  2. Log in with username "admin" and password "password"
  3. Edit existing type Single/Double/Suite: change Accessible = false, and check that this type is unique
  4. Return to the homepage and scroll down to Our Rooms section
- Expected: Edited room type doesn't appear
- Actual: Edited room type still appears instead
- Impact: Causes wrong booking process functionality
- Severity: High

# BUG-013 – Default room descriptions aren't in English
- Page: Rooms/Our Rooms
- Steps:
  1. From homepage scroll to the Our Rooms section
- Expected: Room descriptions appear in English
- Actual: Default room descriptions aren't in English
- Impact: Confuses users and needs additional translation
- Severity: Low

# BUG-014 – Partial Phone validation
- Page: Send Us a Message/Book This Room forms
- Steps:
  1. From homepage scroll to the Send Us a Message section
  2. Fill only non-numeric value in the Phone field, fill valid values in all other fields and click on "Submit"/"Reserve Now"
- Expected: Appropriate error message appears
- Actual: No error message appears
- Impact: May cause a problem with admin ability to cantact user
- Severity: Low