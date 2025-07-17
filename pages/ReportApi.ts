import { BaseApiClient } from './BaseApiClient';
import { APIResponse } from '@playwright/test';

export class ReportApi extends BaseApiClient {
  getAllReports(): Promise<APIResponse> {
    return this.get('/report');
  }

  getReportByRoomId(id: number): Promise<APIResponse> {
    return this.get(`/report/${id}`);
  }

  getReportsWithToken(token: string): Promise<APIResponse> {
    return this.get('/report', {
      'Authorization': `Bearer ${token}`,
    });
  }
}
