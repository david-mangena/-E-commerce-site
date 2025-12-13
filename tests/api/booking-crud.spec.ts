import { test, expect } from '@playwright/test';
import { BookingAPI } from '../helpers/booking-api';
import testData from '../../test-data/bookings.json';

test.describe('Booking CRUD Operations', () => {
  let bookingAPI: BookingAPI;
  let createdBookingId: number;

  test.beforeEach(async ({ request }) => {
    bookingAPI = new BookingAPI(request);
  });

  test.describe('CREATE - POST /booking', () => {
    test('should create a new booking with valid data', async () => {
      const { response, body } = await bookingAPI.createBooking(testData.validBooking);

      expect(response.status()).toBe(200);
      expect(body).toHaveProperty('bookingid');
      expect(body.bookingid).toBeGreaterThan(0);
      expect(body).toHaveProperty('booking');

      // Validate booking data
      expect(body.booking.firstname).toBe(testData.validBooking.firstname);
      expect(body.booking.lastname).toBe(testData.validBooking.lastname);
      expect(body.booking.totalprice).toBe(testData.validBooking.totalprice);
      expect(body.booking.depositpaid).toBe(testData.validBooking.depositpaid);
      expect(body.booking.bookingdates.checkin).toBe(testData.validBooking.bookingdates.checkin);
      expect(body.booking.bookingdates.checkout).toBe(testData.validBooking.bookingdates.checkout);
      expect(body.booking.additionalneeds).toBe(testData.validBooking.additionalneeds);

      // Store for cleanup
      createdBookingId = body.bookingid;
    });

    test('should create booking with minimum required fields', async () => {
      const minimalBooking = {
        firstname: 'Min',
        lastname: 'Test',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-03-01',
          checkout: '2024-03-05',
        },
      };

      const { response, body } = await bookingAPI.createBooking(minimalBooking);

      expect(response.status()).toBe(200);
      expect(body).toHaveProperty('bookingid');
      expect(body.booking.firstname).toBe(minimalBooking.firstname);
    });

    test('should handle special characters in names', async () => {
      const specialCharBooking = {
        ...testData.validBooking,
        firstname: "O'Connor",
        lastname: "Smith-Jones",
      };

      const { response, body } = await bookingAPI.createBooking(specialCharBooking);

      expect(response.status()).toBe(200);
      expect(body.booking.firstname).toBe(specialCharBooking.firstname);
      expect(body.booking.lastname).toBe(specialCharBooking.lastname);
    });
  });

  test.describe('READ - GET /booking', () => {
    test.beforeAll(async ({ request }) => {
      // Create a booking to use for read tests
      const api = new BookingAPI(request);
      const { body } = await api.createBooking(testData.validBooking);
      createdBookingId = body.bookingid;
    });

    test('should get all booking IDs', async () => {
      const { response, body } = await bookingAPI.getAllBookings();

      expect(response.status()).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);

      // Each item should have bookingid
      body.forEach((booking: any) => {
        expect(booking).toHaveProperty('bookingid');
      });
    });

    test('should get booking by ID', async () => {
      const { response, body } = await bookingAPI.getBooking(createdBookingId);

      expect(response.status()).toBe(200);
      expect(body).toBeDefined();
      expect(body.firstname).toBeDefined();
      expect(body.lastname).toBeDefined();
      expect(body.totalprice).toBeDefined();
      expect(body.bookingdates).toBeDefined();
    });

    test('should filter bookings by firstname', async () => {
      const { response, body } = await bookingAPI.getAllBookings({
        firstname: 'John',
      });

      expect(response.status()).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
    });

    test('should filter bookings by lastname', async () => {
      const { response, body } = await bookingAPI.getAllBookings({
        lastname: 'Doe',
      });

      expect(response.status()).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
    });

    test('should filter bookings by checkin date', async () => {
      const { response, body } = await bookingAPI.getAllBookings({
        checkin: '2024-01-15',
      });

      expect(response.status()).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
    });

    test('should return 404 for non-existent booking ID', async () => {
      const { response } = await bookingAPI.getBooking(999999999);

      expect(response.status()).toBe(404);
    });
  });

  test.describe('UPDATE - PUT /booking/:id', () => {
    let bookingId: number;
    let token: string;

    test.beforeAll(async ({ request }) => {
      const api = new BookingAPI(request);

      // Create a booking
      const { body } = await api.createBooking(testData.validBooking);
      bookingId = body.bookingid;

      // Get authentication token
      token = await api.authenticate();
    });

    test('should update booking with valid data', async () => {
      const { response, body } = await bookingAPI.updateBooking(
        bookingId,
        testData.updateBooking,
        token
      );

      expect(response.status()).toBe(200);
      expect(body.firstname).toBe(testData.updateBooking.firstname);
      expect(body.lastname).toBe(testData.updateBooking.lastname);
      expect(body.totalprice).toBe(testData.updateBooking.totalprice);
      expect(body.depositpaid).toBe(testData.updateBooking.depositpaid);
      expect(body.additionalneeds).toBe(testData.updateBooking.additionalneeds);
    });

    test('should fail to update without authentication', async ({ request }) => {
      const response = await request.put(`/booking/${bookingId}`, {
        data: testData.updateBooking,
      });

      expect(response.status()).toBe(403);
    });

    test('should fail to update non-existent booking', async () => {
      const { response } = await bookingAPI.updateBooking(
        999999999,
        testData.updateBooking,
        token
      );

      expect(response.status()).toBe(405);
    });
  });

  test.describe('PARTIAL UPDATE - PATCH /booking/:id', () => {
    let bookingId: number;
    let token: string;

    test.beforeAll(async ({ request }) => {
      const api = new BookingAPI(request);

      // Create a booking
      const { body } = await api.createBooking(testData.validBooking);
      bookingId = body.bookingid;

      // Get authentication token
      token = await api.authenticate();
    });

    test('should partially update booking firstname and lastname', async () => {
      const { response, body } = await bookingAPI.partialUpdateBooking(
        bookingId,
        testData.partialUpdateBooking,
        token
      );

      expect(response.status()).toBe(200);
      expect(body.firstname).toBe(testData.partialUpdateBooking.firstname);
      expect(body.lastname).toBe(testData.partialUpdateBooking.lastname);

      // Other fields should remain unchanged
      expect(body.totalprice).toBe(testData.validBooking.totalprice);
    });

    test('should partially update only totalprice', async () => {
      const { response, body } = await bookingAPI.partialUpdateBooking(
        bookingId,
        { totalprice: 250 },
        token
      );

      expect(response.status()).toBe(200);
      expect(body.totalprice).toBe(250);
    });

    test('should fail partial update without authentication', async ({ request }) => {
      const response = await request.patch(`/booking/${bookingId}`, {
        data: { firstname: 'Test' },
      });

      expect(response.status()).toBe(403);
    });
  });

  test.describe('DELETE - DELETE /booking/:id', () => {
    let bookingId: number;
    let token: string;

    test.beforeEach(async ({ request }) => {
      const api = new BookingAPI(request);

      // Create a fresh booking for each delete test
      const { body } = await api.createBooking(testData.validBooking);
      bookingId = body.bookingid;

      // Get authentication token
      token = await api.authenticate();
    });

    test('should delete booking successfully', async () => {
      const response = await bookingAPI.deleteBooking(bookingId, token);

      expect(response.status()).toBe(201);

      // Verify booking is deleted
      const { response: getResponse } = await bookingAPI.getBooking(bookingId);
      expect(getResponse.status()).toBe(404);
    });

    test('should fail to delete without authentication', async ({ request }) => {
      const response = await request.delete(`/booking/${bookingId}`);

      expect(response.status()).toBe(403);
    });

    test('should return 405 when deleting non-existent booking', async () => {
      const response = await bookingAPI.deleteBooking(999999999, token);

      expect(response.status()).toBe(405);
    });

    test('should not be able to delete same booking twice', async () => {
      // First delete
      const firstDelete = await bookingAPI.deleteBooking(bookingId, token);
      expect(firstDelete.status()).toBe(201);

      // Second delete attempt
      const secondDelete = await bookingAPI.deleteBooking(bookingId, token);
      expect(secondDelete.status()).toBe(405);
    });
  });
});