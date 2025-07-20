import { BaseApiClient } from './BaseApiClient';
import { APIResponse } from '@playwright/test';

export class RoomApi extends BaseApiClient {
createRoom(payload: any, token: string): Promise<APIResponse> {
    return this.post('/rooms', payload, { Authorization: `Bearer ${token}` });
  }

  getRoom(roomId: number): Promise<APIResponse> {
    return this.get(`/rooms/${roomId}`);
  }

  updateRoom(roomId: number, payload: any, token: string): Promise<APIResponse> {
    return this.put(`/rooms/${roomId}`, payload, { Authorization: `Bearer ${token}` });
  }

  deleteRoom(roomId: number, token: string): Promise<APIResponse> {
    return this.delete(`/rooms/${roomId}`, { Authorization: `Bearer ${token}` });
  }
}
