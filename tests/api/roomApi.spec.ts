import { test, expect } from '@playwright/test';
import { AuthApi } from '../../pages/api/AuthApi';
import { RoomApi } from '../../pages/api/RoomApi';
import { config } from '../../tests/config';
import { roomConfig } from '../../tests/roomconfig';

test.describe('Room API Accessible Toggle Tests', () => {
  let roomApi: RoomApi;
  let authApi: AuthApi;
  let token: string;
  const createdRoomId = Date.now();  // Unique ID for room creation

  // Before all tests, log in and get the token
  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    roomApi = new RoomApi(request);

    // Log in to get the authentication token
    const loginResponse = await authApi.login(config.auth.username, config.auth.password);
    const loginBody = await loginResponse.json();
    token = loginBody.token;
  });

  // Test case: Create, update, and delete room
  test('Create, update, and delete room', async () => {
    // Prepare initial room payload by using data from roomConfig
    const initialRoomPayload = {
      ...roomConfig,
      roomid: createdRoomId,
    };

    // Create room
    const createRoomResponse = await roomApi.createRoom(initialRoomPayload, token);
    expect(createRoomResponse.status()).toBe(200);

    // Get room and verify accessible flag
    const getRoomResponse = await roomApi.getRoom(createdRoomId);
    const roomData = await getRoomResponse.json();
    expect(roomData.accessible).toBe(true);

    // Update room to make it inaccessible
    const updatedPayload = {
      ...initialRoomPayload,
      accessible: false,
      type: 'Double',  // Change room type to 'Double'
    };

    const updateResponse = await roomApi.updateRoom(createdRoomId, updatedPayload, token);
    expect(updateResponse.status()).toBe(200);

    // Get updated room and verify accessible flag
    const updatedRoomResponse = await roomApi.getRoom(createdRoomId);
    const updatedRoomData = await updatedRoomResponse.json();
    expect(updatedRoomData.accessible).toBe(false);

    // Delete room
    const deleteResponse = await roomApi.deleteRoom(createdRoomId, token);
    expect(deleteResponse.status()).toBe(200);
  });
});
