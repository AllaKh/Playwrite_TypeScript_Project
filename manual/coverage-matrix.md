# Coverage Matrix

| #  | Area | Test Description                           | Test type | Pass/Fail | Automation      | Bug Linked | 
|----|------|--------------------------------------------|-----------|-----------|-----------------|------------| 
| 1  | API  | Admin login (valid)                        | Positive  | ❌        | Automated       | BUG-001    |
| 2  | API  | Admin autentication validation             | Negative  | ❌        | To Be Automated | BUG-001    |
| 3  | API  | Admin token validation                     | Positive  | ❌        | Automated       | BUG-001    |
| 4  | API  | Admin logout                               | Positive  | ❌        | Automated       | BUG-001    |
| 5  | API  | Create booking (valid)                     | Positive  | ❌        | Automated       | BUG-001    |
| 6  | API  | Create booking validation                  | Negative  | ❌        | To Be Automated | BUG-001    |
| 7  | API  | Create booking without admin               | Positive  | ❌        | To Be Automated | N/A        |
| 8  | API  | Get booking by ID                          | Positive  | ❌        | Automated       | N/A        |
| 9  | API  | Get booking by checkin and checkout dates  | Positive  | ❌        | To Be Automated | N/A        |
| 10 | API  | Delete booking (valid)                     | Positive  | ❌        | To Be Automated | N/A        |
| 11 | API  | Delete booking (invalid token)             | Negative  | ❌        | Automated       | N/A        |
| 12 | API  | Update booking (valid)                     | Positive  | ❌        | Automated       | N/A        |
| 13 | API  | Partial update booking (valid)             | Positive  | ❌        | Manual          | N/A        |
| 14 | API  | Booking report: Get booking by ID          | Positive  | ❌        | Automated       | BUG-001    |
| 15 | API  | Booking report: Get booking by token       | Positive  | ❌        | Automated       | BUG-001    |
| 16 | API  | Create new room type with Accessible=true  | Positive  | ❌        | Automated       | BUG-001    |
| 17 | API  | Create new room type with Accessible=false | Positive  | ❌        | Manual          | BUG-001    |
| 18 | API  | Create new room type fields validation     | Negative  | ❌        | Manual          | BUG-001    |
| 19 | API  | Update room type with Accessible=false     | Negative  | ❌        | Automated       | BUG-001    |
| 20 | API  | Update room type fields validation         | Negative  | ❌        | To Be Automate  | BUG-001    |
| 21 | API  | Delete room type (by room ID)              | Positive  | ❌        | Automated       | BUG-001    |
| 22 | API  | Partial update room type                   | Positive  | ❌        | Manual          | BUG-001    |
| 23 | UI   | Admin login/logout success                 | Positive  | ❌        | Automated       | BUG-003    |
| 24 | UI   | Admin login validation                     | Negative  | ✅        | To Be Automated |            |
| 25 | UI   | Book a double room (valid data)            | Positive  | ✅        | To Be Automated |            |
| 26 | UI   | Book a single room (valid data)            | Positive  | ✅        | To Be Automated |            |
| 27 | UI   | Book a suite  room (valid data)            | Positive  | ❌        | Automated       | BUG-002    |
| 28 | UI   | Book a room fields validation              | Negative  | ✅        | To Be Automated |            |
| 29 | UI   | Book a room without admin                  | Positive  | ✅        | Manual          |            |
| 30 | UI   | Cancelling the booking process             | Negative  | ✅        | Manual          |            |
| 29 | UI   | Attempt to booking for an unavailable date | Negative  | ❌        | To Be Automated | BUG-004    |
| 31 | UI   | Update the booking (valid)                 | Positive  | ❌        | To Be Automated | N/A        |
| 32 | UI   | Cancelling the update                      | Negative  | ❌        | Manual          | N/A        |
| 33 | UI   | Update a non-existing booking              | Negative  | ❌        | Manual          | N/A        |
| 34 | UI   | Delete the booking (valid)                 | Positive  | ❌        | To Be Automated | N/A        |
| 35 | UI   | Cancelling the delete                      | Negative  | ❌        | Manual          | N/A        |
| 36 | UI   | Delete a non-existing booking              | Negative  | ❌        | Manual          | N/A        |
| 37 | UI   | Book a double room via admin Report page   | Positive  | ✅        | To Be Automated |            |
| 38 | UI   | Book a single room via admin Report page   | Positive  | ✅        | Manual          |            |
| 39 | UI   | Book a suite  room via admin Report page   | Positive  | ✅        | Manual          |            |
| 40 | UI   | Book via admin Report page validation      | Negative  | ✅        | Manual          |            |
| 41 | UI   | Links navigation                           | Positive  | ❌        | To Be Automated | BUG-006    |
| 42 | UI   | Create new room type with Accessible=true  | Positive  | ❌        | Automated       | BUG-005    |
| 43 | UI   | Create new room type with Accessible=false | Negative  | ✅        | Manual          |            |
| 44 | UI   | Create new room type fields validation     | Negative  | ✅        | To Be Automated |            |
| 45 | UI   | Edit room type                             | Positive  | ❌        | To Be Automated | BUG-007    |
| 46 | UI   | Edit room type fields validation           | Negative  | ❌        | To Be Automated | BUG-008    |
| 47 | UI   | Delete room type                           | Positive  | ✅        | To Be Automated |            |
| 48 | UI   | Contact Us send form                       | Positive  | ✅        | Manual          |            |
| 49 | UI   | Contact Us fields validation               | Negative  | ✅        | Manual          |            |
| 50 | UI   | B&B details aditing                        | Positive  | ✅        | Manual          |            |
| 51 | UI   | B&B details fields validation              | Negative  | ✅        | Manual          |            |
---

## Strategy Summary

- Prioritized booking functionality (API + UI)
- Automated 3 API & 4 UI test cases
- Skipped tests requiring full auth token lifecycle or low business value
- Bugs discovered during testing
