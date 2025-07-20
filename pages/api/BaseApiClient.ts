import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
constructor(protected request: APIRequestContext) {}

  protected async get(url: string, headers: Record<string, string> = {}): Promise<APIResponse> {
    this.validateUrl(url);
    console.log('GET request to URL:', url);
    return await this.request.get(url, { headers });
  }

  protected async post(url: string, data: any, headers: Record<string, string> = {}): Promise<APIResponse> {
    this.validateUrl(url);
    console.log('POST request to URL:', url);
    return await this.request.post(url, { data, headers });
  }

  protected async put(url: string, data: any, headers: Record<string, string> = {}): Promise<APIResponse> {
    this.validateUrl(url);
    console.log('PUT request to URL:', url);
    return await this.request.put(url, { data, headers });
  }

  protected async delete(url: string, headers: Record<string, string> = {}): Promise<APIResponse> {
    this.validateUrl(url);
    console.log('DELETE request to URL:', url);
    return await this.request.delete(url, { headers });
  }

  private validateUrl(url: string): void {
    if (typeof url !== 'string') {
      throw new Error('URL must be a string');
    }
    try {
      new URL(url);
    } catch (e) {
      throw new Error(`Invalid URL format: ${url}`);
    }
  }
}
