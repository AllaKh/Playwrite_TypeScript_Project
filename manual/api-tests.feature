## Manual Test Cases (Gherkin Format) for APIs swagger:
## https://automationintesting.online/auth/swagger-ui/index.html
## https://automationintesting.online/report/swagger-ui/index.html
## https://automationintesting.online/room/swagger-ui/index.html

Feature: Booking API Manual Tests

  Background:
    Given I am logged in as admin
    And I have a valid authentication token

  Scenario: Create new room with valid data
    Given I have a valid room payload
    When I send a POST request to the room api with Accessible=true
    Then the response status should be 200
    And the response should contain the bookingid "ID"
    And the room appears in UI admin and home pages

  Scenario: Get room by ID
    Given I have a valid token and an existing room with "ID"
    When I send a GET request with room "ID"
    Then the response should be 200 and should contain the room details and existing bookings for this room

  Scenario: Update room with valid data and with Accessible=false
    Given I have a valid token and an existing room with "ID"
    When I send a PUT request with updated room data
    Then the response status should be 200
    And the room doesn't appear in UI home page and appears in UI admin page

  Scenario: Delete booking with invalid token
    Given I have a valid token and an existing room with "ID"
    When I send a DELETE request with the room "ID"
    Then the response status should be 200
    And the room doesn't appear in UI admin and home pages

  Scenario: Get report by ID
    Given I have a valid token and an existing room with "ID"
    When I send a GET request with room "ID"
    Then the response should be 200 and should contain all booking for the room with start/end dates and titles