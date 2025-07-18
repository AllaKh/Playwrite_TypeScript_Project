Feature: Web UI Manual Tests

  Scenario Outline: Successful admin login/logout and links validation
    Given I am on the homepage
    And I click on the Admin link
    When I enter username "admin" and password "password"
    And I click the login button
    Then I should be redirected to the admin dashboard
    When I click  on the Report link
    Then I should be redirected to the Report page with calendar
    When I click on the Next link
    Then I should be redirected to the next month page
    When I click on the Today link
    Then I should be redirected to the current month page
    When I click on the Back link
    Then I should be redirected to the previous month page
    When I clik on the Branding link
    Then I should be redirected to the Branding page with B&B details
    When I clik on the Messages link
    Then I should be redirected to the Messages page with messages table
    When I click on <home page link>
    Then I should be redirected to the homepage
    When I click on the Admin link
    Then I should be redirected to the admin dashboard
    When I click on Logout link
    Then I should be redirected to the homepage
    When I click on the Admin link
    Then I should be redirected to the Login page

    Examples:
      | home page link               |
      | Restful Booker Platform Demo |
      | Front Page                   |

  Scenario Outline: Failed admin login with missing or wrong <password>
    Given I am on the admin login page
    When I enter username "admin" and <password>
    And I click the login button
    Then I should see an error message

    Examples:
      | password                  |
      | [blank]                   |
      |                           |
      | ''                        |
      | abc123                    |
      | ' OR '1'='1               |
      | admin' --                 |
      | ' OR 1=1--                |
      | ' OR 'a'='a               |
      | ; DROP TABLE users; --    |
      | <script>alert(1)</script> |
      | ../../etc/passwd          |
      | \u202E                    |
      | null byte                 |
      | \x00                      |
      | 0xFFFFFFFF                |

  Scenario: Book a suite room with valid data
    Given I am on the homepage
    And I click on the Admin link
    And I enter username "admin" and password "password"
    And I click the login button
    And I click on Restful Booker Platform Demo link
    And I scroll down to Our Rooms section
    When I click on Book now button in Suite room section
    Then I should be redirected to the Suite room booking page
    When I select available dates in the Book This Room section
    And I click on Reserve now button
    Then The credentials form modal should appear
    When I fill the credentials form with valid data
    And I submit the form
    Then I should see a booking confirmation modal
    When I click on Return home button
    Then I should be redirected to the home page
    When I click on the Admin link
    And I clcik on the Report link
    Then I should see my booking in the appropriate date
    When I clcik on the Messages link
    Then I should be redirected to the Messages page
    And I should see message with my username and subject
    When I clcik on the message with my username and subject
    Then the message details modal should appear with valid information
    When I clcik on the Close button
    Then the message details page must be closed and this message must appears as read

  Scenario Outline: Create booking with missing or invalid email
    Given I am on the homepage
    And I scroll down to Our Rooms section
    When I click on Book now button in Double room section
    And I should be redirected to the Double room booking page
    And I select available dates in the Book This Room section
    And I click on Reserve now button
    And The credentials form should appear
    And I fill the booking form with email set to <email>
    And I submit the form
    Then I should see a validation error

    Examples:
      | email                       |
      |                             |
      | ''                          |
      | 0123456789abc               |
      | abc@a.c                     |
      | john.with.any.family@ex.com |

  Scenario: Add a new valid room type
    Given I am on the homepage
    And I click on the Admin link
    And I enter username "admin" and password "password"
    And I click the login button
    When I fill Room #
    And I select Type from the drop-down list
    And I select Accessible = true from the drop-down list
    And I fill the Price
    And I ckeck WiFi, TV, and Views radiobuttons
    And I click on Create button
    Then the new room type should appear in the Rooms list
    When I click on Restful Booker Platform Demo link
    And I scroll down to Our Rooms section
    Then I should see a new room in the Our Rooms section