import { BaseApiClient } from './BaseApiClient';
import { APIResponse } from '@playwright/test';
import { apiPaths } from '../../tests/apiPaths';

export class AuthApi extends BaseApiClient {

login(username: string, password: string): Promise<APIResponse> {
    return this.post(apiPaths.auth.login, { username, password }, { 'Content-Type': 'application/json' });
  }

  validateToken(token: string): Promise<APIResponse> {
    return this.post(apiPaths.auth.validateToken, { token }, { 'Content-Type': 'application/json' });
  }

  logout(): Promise<APIResponse> {
    return this.get(apiPaths.auth.logout);
  }
}
