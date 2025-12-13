import { APIRequestContext, expect } from '@playwright/test';
import testData from '../../test-data/bookings.json';

export class BookingAPI {
  private request: APIRequestContext;
  private token: string | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Authenticate and get token
   */
  async authenticate(): Promise<string> {
    const apiUrl = 'https://restful-booker.herokuapp.com';  
    const response = await this.request.post(apiUrl + '/auth', {
      data: testData.authCredentials,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    this.token = body.token;

    if (!this.token) {
      throw new Error('Authentication failed: token not received');
    }

    return this.token;
  }

  /**
   * Get token for authenticated requests
   */
  getToken(): string {
    if (!this.token) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }
    return this.token;
  }

  /**
   * Create a new booking
   */
  async createBooking(bookingData: any) {
    const response = await this.request.post('/booking', {
      data: bookingData,
    });

    return {
      response,
      body: await response.json(),
    };
  }

  /**
   * Get booking by ID
   */
  async getBooking(bookingId: number) {
    const response = await this.request.get(`/booking/${bookingId}`);

    return {
      response,
      body: response.ok() ? await response.json() : null,
    };
  }

  /**
   * Get all booking IDs
   */
  async getAllBookings(params?: Record<string, string>) {
    const url = params 
      ? `/booking?${new URLSearchParams(params).toString()}`
      : '/booking';

    const response = await this.request.get(url);

    return {
      response,
      body: await response.json(),
    };
  }

  /**
   * Update booking (PUT)
   */
  async updateBooking(bookingId: number, bookingData: any, token?: string) {
    const authToken = token || this.token;
    if (!authToken) {
      throw new Error('Token is required for update operations');
    }

    const response = await this.request.put(`/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${authToken}`,
      },
      data: bookingData,
    });

    return {
      response,
      body: response.ok() ? await response.json() : null,
    };
  }

  /**
   * Partial update booking (PATCH)
   */
  async partialUpdateBooking(bookingId: number, bookingData: any, token?: string) {
    const authToken = token || this.token;
    if (!authToken) {
      throw new Error('Token is required for partial update operations');
    }

    const response = await this.request.patch(`/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${authToken}`,
      },
      data: bookingData,
    });

    return {
      response,
      body: response.ok() ? await response.json() : null,
    };
  }

  /**
   * Delete booking
   */
  async deleteBooking(bookingId: number, token?: string) {
    const authToken = token || this.token;
    if (!authToken) {
      throw new Error('Token is required for delete operations');
    }

    const response = await this.request.delete(`/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${authToken}`,
      },
    });

    return response;
  }

  /**
   * Health check
   */
  async healthCheck() {
    const response = await this.request.get('/ping');
    return response;
  }
}