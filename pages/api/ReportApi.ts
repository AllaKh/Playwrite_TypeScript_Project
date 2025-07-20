import { BaseApiClient } from './BaseApiClient';
import { APIResponse } from '@playwright/test';

export class ReportApi extends BaseApiClient {

// Get all reports without token (if no authentication is needed)
getAllReports(): Promise<APIResponse> {
    return this.get('/report');
  }

  // Get a specific report by room ID without token (if no authentication is needed)
  getReportByRoomId(id: number): Promise<APIResponse> {
    return this.get(`/report/${id}`);
  }

  // Get all reports with token authentication
  getReportsWithToken(token: string): Promise<APIResponse> {
    return this.get('/report', {
      'Authorization': `Bearer ${token}`,
    });
  }

  // Get a specific report by room ID with token authentication
  getReportByRoomIdWithToken(id: number, token: string): Promise<APIResponse> {
    return this.get(`/report/${id}`, {
      'Authorization': `Bearer ${token}`,
    });
  }
}
