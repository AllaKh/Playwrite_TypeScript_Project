import { test, expect } from '@playwright/test';
import { AuthApi } from '../../pages/api/AuthApi';
import { RoomApi } from '../../pages/api/RoomApi';
import { config } from '../../tests/config';
import { roomConfig, roomConfigUpdate } from '../../tests/roomconfig';
import { apiPaths } from '../apiPaths';

test.describe('Room API Accessible Toggle Tests', () => {
  let roomApi: RoomApi;
  let authApi: AuthApi;
  let token: string;
  const createdRoomId = Date.now(); // Unique room ID for creation

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    roomApi = new RoomApi(request);

    // Log in to get the authentication token
    const loginResponse = await authApi.login(config.auth.username, config.auth.password);
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    token = loginBody.token;
  });

  test('Create, update, get, and delete room', async ({ page }) => {
    const initialRoomPayload = {
      ...roomConfig,
      roomid: createdRoomId,
    };

    // Step 1: POST - Create new room type with Accessible=true (token) via Swagger UI
    await page.goto('https://automationintesting.online/room/swagger-ui/index.html#/room-controller/createRoom');

    const tryItOutButton = page.locator('#operations-room-controller-createRoom > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out.btn-group > button:nth-child(1)');
    await tryItOutButton.click();

    const tokenInput = page.locator('#operations-room-controller-createRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    await tokenInput.fill(token);

    const payloadInput = page.locator('#operations-room-controller-createRoom > div.no-margin > div > div.opblock-section > div.opblock-section.opblock-section-request-body > div.opblock-description-wrapper > div > div > div > textarea');
    await payloadInput.fill(JSON.stringify(initialRoomPayload));

    const executeButton = page.locator('#operations-room-controller-createRoom > div.no-margin > div > div.execute-wrapper > button');
    await executeButton.click();

    const responseCode = await page.locator('#operations-room-controller-createRoom > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status');
    expect(await responseCode.innerText()).toBe('200');

    const responseBody = await page.locator('#operations-room-controller-createRoom > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBody.innerText()).toContain('roomid');
    expect(await responseBody.innerText()).toContain(String(createdRoomId));

    // Step 2: GET - Get room by ID without token via Swagger UI
    await page.goto('https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRoom');

    const tryItOutButtonGetRoom = page.locator('#operations-room-controller-getRoom > div > button.opblock-summary-control > div');
    await tryItOutButtonGetRoom.click();

    const roomIdInput = page.locator('#operations-room-controller-getRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    await roomIdInput.fill(String(createdRoomId)); // Use the room ID from the created room

    const executeButtonGetRoom = page.locator('#operations-room-controller-getRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    await executeButtonGetRoom.click();

    const responseCodeGetRoom = await page.locator('#operations-room-controller-getRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    expect(await responseCodeGetRoom.innerText()).toBe('200');

    const responseBodyGetRoom = await page.locator('#operations-room-controller-getRoom > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBodyGetRoom.innerText()).toContain(String(createdRoomId)); // Check if the room ID matches
    expect(await responseBodyGetRoom.innerText()).toContain('accessible:true'); // Check if the room is accessible

    // Step 3: PUT - Update Room via Swagger UI by ID with Accessible=false (token)
    await page.goto('https://automationintesting.online/room/swagger-ui/index.html#/room-controller/updateRoom');

    const tryItOutButtonUpdateRoom = page.locator('#operations-room-controller-updateRoom > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out > button');
    await tryItOutButtonUpdateRoom.click();

    const roomIdInputUpdate = page.locator('#operations-room-controller-updateRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr:nth-child(1) > td.parameters-col_description > input[type=text]');
    await roomIdInputUpdate.fill(String(createdRoomId));

    const tokenInputUpdate = page.locator('#operations-room-controller-updateRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr:nth-child(2) > td.parameters-col_description > input[type=text]');
    await tokenInputUpdate.fill(token);

    const payloadInputUpdate = page.locator('#operations-room-controller-updateRoom > div.no-margin > div > div.opblock-section > div.opblock-section.opblock-section-request-body > div.opblock-description-wrapper > div > div > div > textarea');
    await payloadInputUpdate.fill(JSON.stringify({ ...roomConfigUpdate, roomid: createdRoomId }));

    const executeButtonUpdateRoom = page.locator('#operations-room-controller-updateRoom > div.no-margin > div > div.execute-wrapper > button');
    await executeButtonUpdateRoom.click();

    const responseCodeUpdateRoom = await page.locator('#operations-room-controller-updateRoom > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status');
    expect(await responseCodeUpdateRoom.innerText()).toBe('200');

    const responseBodyUpdateRoom = await page.locator('#operations-room-controller-updateRoom > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBodyUpdateRoom.innerText()).toContain('roomid');
    expect(await responseBodyUpdateRoom.innerText()).toContain(String(createdRoomId));

    // Step 4: GET - Get room by ID after PUT update to check if accessible=false
    await page.goto('https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRoom');

    const tryItOutButtonGetRoomAfterUpdate = page.locator('#operations-room-controller-getRoom > div > button.opblock-summary-control > div');
    await tryItOutButtonGetRoomAfterUpdate.click();

    const roomIdInputAfterUpdate = page.locator('#operations-room-controller-getRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    await roomIdInputAfterUpdate.fill(String(createdRoomId)); // Use the room ID from the created room

    const executeButtonGetRoomAfterUpdate = page.locator('#operations-room-controller-getRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    await executeButtonGetRoomAfterUpdate.click();

    const responseCodeGetRoomAfterUpdate = await page.locator('#operations-room-controller-getRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr > td.parameters-col_description > input[type=text]');
    expect(await responseCodeGetRoomAfterUpdate.innerText()).toBe('200');

    const responseBodyGetRoomAfterUpdate = await page.locator('#operations-room-controller-getRoom > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBodyGetRoomAfterUpdate.innerText()).toContain(String(createdRoomId)); // Check if the room ID matches
    expect(await responseBodyGetRoomAfterUpdate.innerText()).toContain('accessible:false'); // Check if the room is updated correctly

    // Step 5: Get Rooms by Dates without token via Swagger UI
    await page.goto('https://automationintesting.online/room/swagger-ui/index.html#/room-controller/getRooms');

    const tryItOutButtonGetRoomsByDates = page.locator('#operations-room-controller-getRooms > div.no-margin > div > div.opblock-section > div.opblock-section-header > div.try-out > button');
    await tryItOutButtonGetRoomsByDates.click();

    const checkinInput = page.locator('#operations-room-controller-getRooms > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr:nth-child(1) > td.parameters-col_description > input[type=text]');
    const checkoutInput = page.locator('#operations-room-controller-getRooms > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr:nth-child(2) > td.parameters-col_description > input[type=text]');

    const checkinDate = '2025-08-01';  // Example check-in date
    const checkoutDate = '2025-08-07'; // Example check-out date

    await checkinInput.fill(checkinDate);
    await checkoutInput.fill(checkoutDate);

    const executeButtonGetRoomsByDates = page.locator('#operations-room-controller-getRooms > div.no-margin > div > div.btn-group > button.btn.execute.opblock-control__btn');
    await executeButtonGetRoomsByDates.click();

    const responseCodeGetRoomsByDates = await page.locator('#operations-room-controller-getRooms > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status');
    expect(await responseCodeGetRoomsByDates.innerText()).toBe('200');

    const responseBodyGetRoomsByDates = await page.locator('#operations-room-controller-getRooms > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBodyGetRoomsByDates.innerText()).toContain('roomid');
    expect(await responseBodyGetRoomsByDates.innerText()).toContain(checkinDate);
    expect(await responseBodyGetRoomsByDates.innerText()).toContain(checkoutDate);


    // Step 4: DELETE - Delete Room via Swagger UI by ID (to remove created room)
    await page.goto('https://automationintesting.online/room/swagger-ui/index.html#/room-controller/deleteRoom');

    const tryItOutButtonDeleteRoom = page.locator('#operations-room-controller-deleteRoom > div > button.opblock-summary-control > div');
    await tryItOutButtonDeleteRoom.click();

    const roomIdInputDelete = page.locator('#operations-room-controller-deleteRoom > div.no-margin > div > div.opblock-section > div.parameters-container > div > table > tbody > tr:nth-child(1) > td.parameters-col_description > input[type=text]');
    await roomIdInputDelete.fill(String(createdRoomId)); // Use the room ID to delete the created room

    const executeButtonDeleteRoom = page.locator('#operations-room-controller-deleteRoom > div.no-margin > div > div.execute-wrapper > button');
    await executeButtonDeleteRoom.click();

    const responseCodeDeleteRoom = await page.locator('#operations-room-controller-deleteRoom > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status');
    expect(await responseCodeDeleteRoom.innerText()).toBe('200');

    const responseBodyDeleteRoom = await page.locator('#operations-room-controller-deleteRoom > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_description > div:nth-child(2) > div > pre > code > span:nth-child(429)');
    expect(await responseBodyDeleteRoom.innerText()).toContain('roomid');
    expect(await responseBodyDeleteRoom.innerText()).toContain(String(createdRoomId)); // Confirm that the room was deleted
  });
});
