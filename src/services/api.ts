import type { Restaurant, Booking, BookingRequest, AvailabilityCheck } from '../types';

const API_BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

// Restaurant API
export const createRestaurant = async (restaurantData: Omit<Restaurant, 'id'>): Promise<Restaurant> => {
  const response = await fetch(`${API_BASE_URL}/restaurant/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurantData),
  });

  if (!response.ok) {
    throw new Error('Failed to create restaurant');
  }

  return response.json();
};

// Booking API
export const checkAvailability = async (data: AvailabilityCheck): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/booking/availability`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to check availability');
  }

  return response.json();
};

export const createBooking = async (bookingData: BookingRequest): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/booking/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error('Failed to create booking');
  }

  return response.json();
};

export const getAllBookings = async (restaurantId: string): Promise<Booking[]> => {
  const response = await fetch(`${API_BASE_URL}/booking/restaurant/${restaurantId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  return response.json();
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/booking/delete/${bookingId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete booking');
  }
};

export const updateBooking = async (bookingId: string, bookingData: Partial<BookingRequest>): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/booking/update/${bookingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error('Failed to update booking');
  }

  return response.json();
};
