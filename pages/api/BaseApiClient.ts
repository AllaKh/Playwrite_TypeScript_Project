import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
  constructor(protected request: APIRequestContext) {}

  protected async get(url: string, headers: Record<string, string> = {}): Promise<APIResponse> {
    return await this.request.get(url, { headers });
  }

  protected async post(url: string, data: any, headers: Record<string, string> = {}): Promise<APIResponse> {
    return await this.request.post(url, {
      data,
      headers,
    });
  }

  protected async put(url: string, data: any, headers: Record<string, string> = {}): Promise<APIResponse> {
    return await this.request.put(url, {
      data,
      headers,
    });
  }

  protected async delete(url: string, headers: Record<string, string> = {}): Promise<APIResponse> {
    return await this.request.delete(url, { headers });
  }
}