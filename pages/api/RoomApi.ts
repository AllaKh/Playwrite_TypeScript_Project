import { BaseApiClient } from './BaseApiClient';
import { APIResponse } from '@playwright/test';
import { apiPaths } from '../../tests/apiPaths';

export class RoomApi extends BaseApiClient {

createRoom(payload: any, token: string): Promise<APIResponse> {
    return this.post(apiPaths.room.create, payload, { 'Authorization': `Bearer ${token}` });
  }

  getRoom(roomId: number): Promise<APIResponse> {
    return this.get(apiPaths.room.get.replace('{roomId}', String(roomId)));
  }

  updateRoom(roomId: number, payload: any, token: string): Promise<APIResponse> {
    return this.put(apiPaths.room.update.replace('{roomId}', String(roomId)), payload, { 'Authorization': `Bearer ${token}` });
  }

  deleteRoom(roomId: number, token: string): Promise<APIResponse> {
    return this.delete(apiPaths.room.delete.replace('{roomId}', String(roomId)), { 'Authorization': `Bearer ${token}` });
  }

  getAllRooms(token: string): Promise<APIResponse> {
    return this.get(apiPaths.room.getAll, { 'Authorization': `Bearer ${token}` });
  }
}
