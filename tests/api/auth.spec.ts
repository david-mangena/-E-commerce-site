import { test, expect } from '@playwright/test';
import { BookingAPI } from '../helpers/booking-api.ts';
import testData from '../../test-data/bookings.json';

test.describe('Authentication API Tests', () => {
  let bookingAPI: BookingAPI;

  test.beforeEach(async ({ request }) => {
    bookingAPI = new BookingAPI(request);
  });

  test('should successfully authenticate with valid credentials', async ({ request }) => {
    const response = await request.post('/auth', {
      data: testData.authCredentials,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('should fail authentication with invalid credentials', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: 'invaliduser',
        password: 'wrongpassword',
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });

  test('should fail authentication with missing username', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        password: 'password123',
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });

  test('should fail authentication with missing password', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: 'admin',
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });

  test('should authenticate using helper class', async () => {
    const token = await bookingAPI.authenticate();

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('should validate token format', async ({ request }) => {
    const response = await request.post('/auth', {
      data: testData.authCredentials,
    });

    const body = await response.json();
    const token = body.token;

    // Token should be alphanumeric
    expect(token).toMatch(/^[a-zA-Z0-9]+$/);
  });
});