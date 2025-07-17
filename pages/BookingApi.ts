import { BaseApiClient } from './BaseApiClient';
import { APIResponse } from '@playwright/test';

export interface BookingPayload {
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  email: string;
  phone: string;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
}

export class BookingApi extends BaseApiClient {
  createBooking(payload: BookingPayload, token: string): Promise<APIResponse> {
    return this.post('/room/booking', payload, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  updateBooking(id: number, payload: Partial<BookingPayload>, token: string): Promise<APIResponse> {
    return this.put(`/room/booking/${id}`, payload, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  deleteBooking(id: number, token: string): Promise<APIResponse> {
    return this.delete(`/room/booking/${id}`, {
      'Authorization': `Bearer ${token}`,
    });
  }

  getBooking(id: number): Promise<APIResponse> {
    return this.get(`/room/booking/${id}`);
  }
}