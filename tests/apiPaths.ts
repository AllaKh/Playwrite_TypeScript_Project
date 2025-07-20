export const apiPaths = {
   auth: {
      login: 'https://automationintesting.online/auth/swagger-ui/index.html#/auth-controller/createToken',
      validateToken: 'https://automationintesting.online/auth/swagger-ui/index.html#/auth-controller/validateToken',
      logout: 'https://automationintesting.online/auth/swagger-ui/index.html#/auth-controller/clearToken',
      },
   report: {
      getAllBookings: 'https://automationintesting.online/report/swagger-ui/index.html#/report-controller/getAllRoomReports',
      getBookingByRoomId: 'https://automationintesting.online/report/swagger-ui/index.html#/report-controller/getSpecificRoomReport',
      },
   room: {
      create: 'https://automationintesting.online/room/swagger-ui/index.html#/room-controller/createRoom',
      get: 'https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRoom',
      getAll: 'https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRooms',
      update: 'https://automationintesting.online/room/swagger-ui/index.html#/room-controller/updateRoom',
      delete: 'https://automationintesting.online/room/swagger-ui/index.html#/room-controller/deleteRoom',
      }
};