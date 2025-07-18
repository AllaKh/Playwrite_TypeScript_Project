import { test, expect } from '@playwright/test';
import { BookingApi, BookingPayload } from '../../pages/BookingApi.js';
import { AuthApi } from '../../pages/AuthApi.js';
import bookingPayloads from '../../data/bookingPayloads.json' assert { type: 'json' };
import { config } from '../config.js';

const payload: BookingPayload = bookingPayloads.validJohn;

test.describe('Booking API Tests', () => {
  let bookingApi: BookingApi;
  let authApi: AuthApi;
  let token: string;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    bookingApi = new BookingApi(request);
    const login = await authApi.login(config.auth.username, config.auth.password);
    token = (await login.json()).token;
  });

  test('Create booking returns 200', async () => {
    const res = await bookingApi.createBooking(payload, token);
    expect(res.status()).toBe(200);
  });

  test('Get booking by ID returns 200', async () => {
    const res = await bookingApi.createBooking(payload, token);
    const id = (await res.json()).bookingid;
    const get = await bookingApi.getBooking(id);
    expect(get.status()).toBe(200);
  });

  for (const email of bookingPayloads.invalidEmails) {
    test(`Create booking fails with invalid email: ${email}`, async () => {
      const invalid = { ...payload, email };
      const res = await bookingApi.createBooking(invalid, token);
      expect(res.status()).toBe(400);
    });
  }

  test('Delete booking returns 403 with invalid token', async () => {
    const res = await bookingApi.deleteBooking(1, 'invalid-token');
    expect(res.status()).toBe(403);
  });

  test('Update booking returns 200', async () => {
    const create = await bookingApi.createBooking(payload, token);
    const id = (await create.json()).bookingid;
    const update = await bookingApi.updateBooking(id, { ...payload, phone: '07777777777' }, token);
    expect(update.status()).toBe(200);
  });
});
