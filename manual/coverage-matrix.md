# Coverage Matrix

| #  | Area | Test Description                           | Test type | Pass/Fail | Automation      | Bug Linked | 
|----|------|--------------------------------------------|-----------|-----------|-----------------|------------| 
| 1  | API  | Admin login (valid)                        | Positive  | ❌        | Automated       | BUG-001    |
| 2  | API  | Admin autentication validation             | Negative  | ❌        | To Be Automated | BUG-001    |
| 3  | API  | Admin token validation                     | Positive  | ❌        | Automated       | BUG-001    |
| 4  | API  | Admin logout                               | Positive  | ❌        | Automated       | BUG-001    |
| 5  | API  | Booking report: Get booking by ID          | Positive  | ❌        | Automated       | BUG-001    |
| 6  | API  | Booking report: Get booking by token       | Positive  | ❌        | Automated       | BUG-001    |
| 7  | API  | Create new room type with Accessible=true  | Positive  | ❌        | Automated       | BUG-001    |
| 8  | API  | Create new room type with Accessible=false | Positive  | ❌        | Manual          | BUG-001    |
| 9  | API  | Create new room type fields validation     | Negative  | ❌        | Manual          | BUG-001    |
| 10 | API  | Get room by ID                             | Positive  | ❌        | Automated       | BUG-001    |
| 11 | API  | Update room by ID with Accessible=false    | Negative  | ❌        | Automated       | BUG-001    |
| 12 | API  | Partial update room                        | Positive  | ❌        | Manual          | BUG-001    |
| 13 | API  | Update room fields validation              | Negative  | ❌        | To Be Automate  | BUG-001    |
| 14 | API  | Delete room by room ID )                   | Positive  | ❌        | Automated       | BUG-001    |
| 15 | UI   | Admin login/logout success                 | Positive  | ❌        | Automated       | BUG-003    |
| 16 | UI   | Admin login validation                     | Negative  | ✅        | Automated       |            |
| 17 | UI   | Book a double room (valid data)            | Positive  | ✅        | To Be Automated |            |
| 18 | UI   | Book a single room (valid data)            | Positive  | ✅        | To Be Automated |            |
| 19 | UI   | Book a suite  room (valid data)            | Positive  | ❌        | Automated       | BUG-002    |
| 20 | UI   | Book a room fields validation              | Negative  | ❌        | To Be Automated | BUG-010    |
| 21 | UI   | Book a room without admin                  | Positive  | ✅        | Manual          |            |
| 22 | UI   | Cancelling the booking process             | Negative  | ✅        | Manual          |            |
| 23 | UI   | Attempt to booking for an unavailable date | Negative  | ❌        | To Be Automated | BUG-004    |
| 24 | UI   | Update the booking in the Rooms section    | Positive  | ✅        | To Be Automated |            |
| 25 | UI   | Update the booking fields validation       | Negative  | ✅        | Manual          |            |
| 26 | UI   | Delete the booking in the Rooms section    | Positive  | ✅        | To Be Automated |            |
| 27 | UI   | Book a double room via admin Report page   | Positive  | ✅        | To Be Automated |            |
| 28 | UI   | Book a single room via admin Report page   | Positive  | ✅        | Manual          |            |
| 29 | UI   | Book a suite  room via admin Report page   | Positive  | ✅        | Manual          |            |
| 30 | UI   | Book via admin Report page validation      | Negative  | ✅        | Manual          |            |
| 31 | UI   | Links navigation                           | Positive  | ❌        | To Be Automated | BUG-006    |
| 32 | UI   | Create new room with Accessible=true       | Positive  | ❌        | Automated       | BUG-005    |
| 33 | UI   | Create new room with Accessible=false      | Negative  | ✅        | Manual          |            |
| 34 | UI   | Create new room fields validation          | Negative  | ❌        | To Be Automated | BUG-007    |
| 35 | UI   | Edit a room                                | Positive  | ❌        | To Be Automated | BUG-008    |
| 36 | UI   | Edit a room fields validation              | Negative  | ✅        | To Be Automated |            |
| 37 | UI   | Delete room                                | Positive  | ✅        | To Be Automated |            |
| 38 | UI   | Room's appearence and describtion          | Positive  | ❌        | Manual          | BUG-009    |
| 39 | UI   | Contact Us send form                       | Positive  | ✅        | Manual          |            |
| 40 | UI   | Contact Us fields validation               | Negative  | ❌        | Manual          | BUG-010    |
| 41 | UI   | B&B details aditing                        | Positive  | ✅        | Manual          |            |
| 42 | UI   | B&B details fields validation              | Negative  | ✅        | Manual          |            |
| 43 | UI   | Our Location appearence                    | Positive  | ✅        | Manual          |            |
---

## Strategy Summary

- Prioritized booking functionality (API + UI)
- Automated 3 API & 4 UI test cases, but since the token cannot be received, only the health check passes in API tests and all other tests need to be updated after this critical bug will be fixed
- Skipped tests requiring full auth token lifecycle or low business value
- Bugs discovered during testing
