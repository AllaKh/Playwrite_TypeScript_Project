import { test, expect } from '@playwright/test';
import { RoomApi, RoomPayload } from '../../pages/RoomApi.js';
import { AuthApi } from '../../pages/AuthApi.js';
import { BookingApi, BookingPayload } from '../../pages/BookingApi.js';
import bookingPayloads from '../../data/bookingPayloads.json' assert { type: 'json' };
import { config } from '../config.js';

test.describe('Room API Accessible Toggle and Booking Tests', () => {
  let roomApi: RoomApi;
  let authApi: AuthApi;
  let bookingApi: BookingApi;
  let token: string;
  let createdRoomId: number = Date.now();

  const initialRoomPayload: RoomPayload = {
    roomid: createdRoomId,
    roomName: 'Room Test',
    type: 'Family',
    accessible: true,
    image: 'image.jpg',
    description: 'A test room',
    features: ['TV', 'WiFi'],
    roomPrice: 100
  };

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    bookingApi = new BookingApi(request);
    const login = await authApi.login(config.auth.username, config.auth.password);
    token = (await login.json()).token;
  });


  test('Create room with accessible=true and book it', async () => {
    const createRoomResponse = await roomApi.createRoom(initialRoomPayload, token);
    expect(createRoomResponse.status()).toBe(200);

    const getRoom = await roomApi.getRoom(createdRoomId);
    const roomData = await getRoom.json();
    expect(roomData.accessible).toBe(true);

    const bookingPayload: BookingPayload = {
      ...bookingPayloads.validJane,
      roomid: createdRoomId
    };

    const bookingResponse = await bookingApi.createBooking(bookingPayload, token);
    expect(bookingResponse.status()).toBe(200);
    const booking = await bookingResponse.json();
    expect(booking).toHaveProperty('bookingid');
  });

  test('Update room to accessible=false and try booking (expect failure)', async () => {
    const updatedPayload: RoomPayload = {
      ...initialRoomPayload,
      accessible: false,
      type: 'Double'
    };

    const updateResponse = await roomApi.updateRoom(createdRoomId, updatedPayload, token);
    expect(updateResponse.status()).toBe(200);

    const updatedRoom = await roomApi.getRoom(createdRoomId);
    const updatedBody = await updatedRoom.json();
    expect(updatedBody.accessible).toBe(false);

    const bookingPayload: BookingPayload = {
      ...bookingPayloads.validJane,
      roomid: createdRoomId
    };

    const bookingResponse = await bookingApi.createBooking(bookingPayload, token);
    expect(bookingResponse.status()).not.toBe(200); // Expected failure
  });

  test('Delete room returns 200', async () => {
    const response = await roomApi.deleteRoom(createdRoomId, token);
    expect(response.status()).toBe(200);
  });
});
