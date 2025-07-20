import { BaseApiClient } from './BaseApiClient';
import { APIResponse } from '@playwright/test';

export class AuthApi extends BaseApiClient {
  login(username: string, password: string): Promise<APIResponse> {
    return this.post('/auth/login', { username, password }, { 'Content-Type': 'application/json' });
  }

  validateToken(token: string): Promise<APIResponse> {
    return this.post('/auth/validate', { token }, { 'Content-Type': 'application/json' });
  }

  logout(): Promise<APIResponse> {
    return this.get('/auth/logout');
  }
}