## Manual Test Cases (Gherkin Format) for APIs swagger:
## https://automationintesting.online/auth/swagger-ui/index.html
## https://automationintesting.online/report/swagger-ui/index.html
## https://automationintesting.online/room/swagger-ui/index.html

Feature: Booking API Manual Tests

  Background:
    Given I am logged in as admin
    And I have a valid authentication token

  Scenario: Create booking with valid data
    Given I have a valid booking payload
    When I send a POST request to the booking endpoint
    Then the response status should be 200
    And the response should contain the bookingid "ID"

  Scenario: Update booking with valid data
    Given I have a valid token and an existing booking with "ID"
    When I send a PUT request with updated booking data
    Then the response status should be 200
    And the booking should be updated

  Scenario: Delete booking with invalid token
    Given I have an invalid authentication token
    When I send a DELETE request with the bookingid "ID"
    Then the response status should be 403

  Scenario: Get room type by ID
    Given I have a valid token and an existing room type with "ID"
    When I send a GET request with room type "ID"
    Then the response should be 200 and should contain the room type details

  Scenario: Get report by token
    Given I have a valid token and an existing room types
    When I send a GET request with valid token
    Then the response should be 200 and should contain the room start/end dates and title