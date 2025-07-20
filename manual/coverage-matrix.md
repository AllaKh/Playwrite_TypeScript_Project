# Coverage Matrix

| #  | Area | Test Description                                     | Test type | Pass/Fail | Automation      | Bug Linked | 
|----|------|------------------------------------------------------|-----------|-----------|-----------------|------------| 
| 1  | API  | Admin login (valid)                                  | Positive  | ❌        | Automated       | BUG-001    |
| 2  | API  | Admin autentication validation                       | Negative  | ❌        | To Be Automated | BUG-001    |
| 3  | API  | Admin token validation                               | Positive  | ❌        | Automated       | BUG-001    |
| 4  | API  | Admin logout                                         | Positive  | ❌        | Automated       | BUG-001    |
| 5  | API  | Booking report: Get bookings by ID without token     | Positive  | ❌        | Automated       | BUG-002    |
| 6  | API  | Booking report: Get bookings by ID  validation       | Negative  | ✅        | Manual          |            |
| 7  | API  | Booking report: Get all bookings by token            | Positive  | ❌        | Automated       | BUG-001    |
| 8  | API  | Booking report: Get all bookings by token validation | Negative  | ✅        | Manual          |            |
| 9  | API  | Create new room type with Accessible=true (token)    | Positive  | ❌        | Automated       | BUG-004    |
| 10 | API  | Create new room type with Accessible=false (token)   | Positive  | ❌        | Manual          | BUG-003    |
| 11 | API  | Create new room type fields validation (token)       | Negative  | ❌        | To Be Automate  | BUG-004    |
| 12 | API  | Get room by ID without token                         | Positive  | ❌        | Automated       | BUG-002    |
| 13 | API  | Get room by dates without token                      | Positive  | ❌        | Automated       | BUG-002    |
| 14 | API  | Update room by ID with Accessible=false (token)      | Negative  | ❌        | Automated       | BUG-005    |
| 15 | API  | Partial update room (token)                          | Positive  | ❌        | Manual          | BUG-001    |
| 16 | API  | Update room fields validation (token)                | Negative  | ❌        | To Be Automate  | BUG-004    |
| 17 | API  | Delete room by room by ID with token                 | Positive  | ❌        | Automated       | BUG-001    |
| 18 | UI   | Admin login/logout success                           | Positive  | ✅        | Automated       |            |
| 19 | UI   | Admin login validation                               | Negative  | ✅        | Automated       |            |
| 20 | UI   | Book a double room (valid data)                      | Positive  | ✅        | To Be Automated |            |
| 21 | UI   | Book a single room (valid data)                      | Positive  | ✅        | To Be Automated |            |
| 22 | UI   | Book a suite  room (valid data)                      | Positive  | ❌        | Automated       | BUG-007    |
| 23 | UI   | Book a room fields validation                        | Negative  | ❌        | To Be Automated | BUG-010    |
| 24 | UI   | Book a room without admin                            | Positive  | ✅        | Manual          |            |
| 25 | UI   | Cancelling the booking process                       | Negative  | ✅        | Manual          |            |
| 26 | UI   | Attempt to booking for an unavailable date           | Negative  | ❌        | To Be Automated | BUG-008    |
| 27 | UI   | Update the booking in the Rooms section              | Positive  | ✅        | To Be Automated |            |
| 28 | UI   | Update the booking fields validation                 | Negative  | ✅        | Manual          |            |
| 29 | UI   | Delete the booking in the Rooms section              | Positive  | ✅        | To Be Automated |            |
| 30 | UI   | View details of existing booking on the Report page  | Positive  | ❌        | To Be Automated | BUG-006    |
| 31 | UI   | Book a double room via admin Report page             | Positive  | ✅        | To Be Automated |            |
| 32 | UI   | Book a single room via admin Report page             | Positive  | ✅        | Manual          |            |
| 33 | UI   | Book a suite  room via admin Report page             | Positive  | ✅        | Manual          |            |
| 34 | UI   | Book via admin Report page validation                | Negative  | ✅        | Manual          |            |
| 35 | UI   | Links navigation                                     | Positive  | ❌        | To Be Automated | BUG-010    |
| 36 | UI   | Create new room with Accessible=true                 | Positive  | ❌        | Automated       | BUG-009    |
| 37 | UI   | Create new room with Accessible=false                | Negative  | ✅        | Manual          |            |
| 38 | UI   | Create new room fields validation                    | Negative  | ❌        | To Be Automated | BUG-011    |
| 39 | UI   | Update existing room with Accessible=false           | Positive  | ❌        | To Be Automated | BUG-012    |
| 40 | UI   | Update a room fields validation                      | Negative  | ✅        | To Be Automated |            |
| 41 | UI   | Delete room                                          | Positive  | ✅        | To Be Automated |            |
| 42 | UI   | Room's appearence and describtion                    | Positive  | ❌        | Manual          | BUG-013    |
| 43 | UI   | Contact Us send form                                 | Positive  | ✅        | Manual          |            |
| 44 | UI   | Contact Us fields validation                         | Negative  | ❌        | Manual          | BUG-014    |
| 45 | UI   | B&B details aditing                                  | Positive  | ✅        | Manual          |            |
| 46 | UI   | B&B details fields validation                        | Negative  | ✅        | Manual          |            |
| 47 | UI   | Our Location appearence                              | Positive  | ✅        | Manual          |            |
---

## Strategy Summary

- Prioritized booking functionality (API + UI)
- Automated 3 API & 4 UI test cases, but since all APIs by attempt to submit return 404, tests need to be updated after this critical bug will be fixed
- Skipped tests requiring full auth token lifecycle or low business value
- Bugs discovered during testing
