# Coverage Matrix

| #  | Area | Test Description                                     | Test type | Pass/Fail | Automation      | Bug Linked | 
|----|------|------------------------------------------------------|-----------|-----------|-----------------|------------| 
| 1  | API  | Admin login (valid)                                  | Positive  | ❌        | Automated       | BUG-001    |
| 2  | API  | Admin autentication validation                       | Negative  | ❌        | To Be Automated | BUG-001    |
| 3  | API  | Admin token validation                               | Positive  | ❌        | Automated       | BUG-001    |
| 4  | API  | Admin logout                                         | Positive  | ❌        | Automated       | BUG-001    |
| 5  | API  | Booking report: Get bookings by ID without token     | Positive  | ❌        | Automated       | BUG-002    |
| 6  | API  | Booking report: Get all bookings by token            | Positive  | ❌        | Automated       | BUG-001    |
| 6  | API  | Booking report: Get all bookings by token validation | Negative  | ✅        | Manual          |            |
| 7  | API  | Create new room type with Accessible=true (token)    | Positive  | ❌        | Automated       | BUG-001    |
| 8  | API  | Create new room type with Accessible=false (token)   | Positive  | ❌        | Manual          | BUG-001    |
| 9  | API  | Create new room type fields validation (token)       | Negative  | ❌        | To Be Automate  | BUG-001    |
| 10 | API  | Get room by ID without token                         | Positive  | ❌        | Automated       | BUG-003    |
| 11 | API  | Get room by dates without token                      | Positive  | ❌        | Automated       | BUG-004    |
| 12 | API  | Update room by ID with Accessible=false (token)      | Negative  | ❌        | Automated       | BUG-001    |
| 13 | API  | Partial update room (token)                          | Positive  | ❌        | Manual          | BUG-001    |
| 14 | API  | Update room fields validation (token)                | Negative  | ✅        | To Be Automate  |            |
| 15 | API  | Delete room by room by ID with token                 | Positive  | ❌        | Automated       | BUG-001    |
| 16 | UI   | Admin login/logout success                           | Positive  | ❌        | Automated       | BUG-006    |
| 17 | UI   | Admin login validation                               | Negative  | ✅        | Automated       |            |
| 18 | UI   | Book a double room (valid data)                      | Positive  | ✅        | To Be Automated |            |
| 19 | UI   | Book a single room (valid data)                      | Positive  | ✅        | To Be Automated |            |
| 20 | UI   | Book a suite  room (valid data)                      | Positive  | ❌        | Automated       | BUG-008    |
| 21 | UI   | Book a room fields validation                        | Negative  | ❌        | To Be Automated | BUG-010    |
| 22 | UI   | Book a room without admin                            | Positive  | ✅        | Manual          |            |
| 23 | UI   | Cancelling the booking process                       | Negative  | ✅        | Manual          |            |
| 24 | UI   | Attempt to booking for an unavailable date           | Negative  | ❌        | To Be Automated | BUG-007    |
| 25 | UI   | Update the booking in the Rooms section              | Positive  | ✅        | To Be Automated |            |
| 26 | UI   | Update the booking fields validation                 | Negative  | ✅        | Manual          |            |
| 27 | UI   | Delete the booking in the Rooms section              | Positive  | ✅        | To Be Automated |            |
| 28 | UI   | Book a double room via admin Report page             | Positive  | ✅        | To Be Automated |            |
| 29 | UI   | Book a single room via admin Report page             | Positive  | ✅        | Manual          |            |
| 30 | UI   | Book a suite  room via admin Report page             | Positive  | ✅        | Manual          |            |
| 31 | UI   | Book via admin Report page validation                | Negative  | ✅        | Manual          |            |
| 32 | UI   | Links navigation                                     | Positive  | ❌        | To Be Automated | BUG-009    |
| 33 | UI   | Create new room with Accessible=true                 | Positive  | ❌        | Automated       | BUG-008    |
| 34 | UI   | Create new room with Accessible=false                | Negative  | ✅        | Manual          |            |
| 35 | UI   | Create new room fields validation                    | Negative  | ❌        | To Be Automated | BUG-0010   |
| 36 | UI   | Edit a room                                          | Positive  | ❌        | To Be Automated | BUG-0011   |
| 37 | UI   | Edit a room fields validation                        | Negative  | ✅        | To Be Automated |            |
| 38 | UI   | Delete room                                          | Positive  | ✅        | To Be Automated |            |
| 39 | UI   | Room's appearence and describtion                    | Positive  | ❌        | Manual          | BUG-0012   |
| 40 | UI   | Contact Us send form                                 | Positive  | ✅        | Manual          |            |
| 41 | UI   | Contact Us fields validation                         | Negative  | ❌        | Manual          | BUG-0013   |
| 42 | UI   | B&B details aditing                                  | Positive  | ✅        | Manual          |            |
| 43 | UI   | B&B details fields validation                        | Negative  | ✅        | Manual          |            |
| 44 | UI   | Our Location appearence                              | Positive  | ✅        | Manual          |            |
---

## Strategy Summary

- Prioritized booking functionality (API + UI)
- Automated 3 API & 4 UI test cases, but since the token cannot be received, only the health check passes in API tests and all other tests need to be updated after this critical bug will be fixed
- Skipped tests requiring full auth token lifecycle or low business value
- Bugs discovered during testing
