import { BaseApiClient } from './BaseApiClient';
import { APIResponse } from '@playwright/test';
import { apiPaths } from '../../tests/apiPaths';

export class ReportApi extends BaseApiClient {

getAllReports(): Promise<APIResponse> {
    return this.get(apiPaths.report.getAllBookings);
  }

  getReportByRoomId(id: number): Promise<APIResponse> {
    return this.get(`${apiPaths.report.getBookingByRoomId}/${id}`);
  }

  getReportsWithToken(token: string): Promise<APIResponse> {
    return this.get(apiPaths.report.getAllBookings, { 'Authorization': `Bearer ${token}` });
  }

  getReportByRoomIdWithToken(id: number, token: string): Promise<APIResponse> {
    return this.get(`${apiPaths.report.getBookingByRoomId}/${id}`, { 'Authorization': `Bearer ${token}` });
  }
}
