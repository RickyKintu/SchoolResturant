import type { Restaurant, Booking, BookingRequest, AvailabilityCheck, BookingFromAPI, Customer } from '../types';

const API_BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

// Helper function to fetch customer information
const getCustomer = async (customerId: string): Promise<Customer | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/customer/${customerId}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    
    // API returns { value: [customer], Count: 1 }
    if (data.value && Array.isArray(data.value) && data.value.length > 0) {
      return data.value[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};

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

// Get all bookings (needed by checkAvailability)
export const getAllBookings = async (restaurantId: string): Promise<Booking[]> => {
  const response = await fetch(`${API_BASE_URL}/booking/restaurant/${restaurantId}`);

  if (!response.ok) {
    // If no bookings exist, return empty array instead of throwing error
    if (response.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch bookings');
  }

  const bookingsFromAPI: BookingFromAPI[] = await response.json();
  
  // Ensure we have an array
  if (!Array.isArray(bookingsFromAPI)) {
    return [];
  }

  // Fetch customer information for each booking
  const bookingsWithCustomers = await Promise.all(
    bookingsFromAPI.map(async (booking) => {
      const customer = await getCustomer(booking.customerId);
      
      return {
        id: booking._id,
        restaurantId: booking.restaurantId,
        date: booking.date,
        time: booking.time,
        numberOfGuests: booking.numberOfGuests,
        customer: customer ? {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        } : {
          name: 'Okänd',
          email: 'N/A',
          phone: 'N/A',
        },
      };
    })
  );

  return bookingsWithCustomers;
};

// Booking API - Check availability
export const checkAvailability = async (data: AvailabilityCheck): Promise<string[]> => {
  // Get all bookings for the restaurant
  const bookings = await getAllBookings(data.restaurantId);
  
  // Filter bookings for the requested date
  const dateBookings = bookings.filter(booking => booking.date === data.date);
  
  // Count bookings per time slot
  const timeSlotCounts: { [key: string]: number } = {
    '18:00': 0,
    '21:00': 0,
  };
  
  dateBookings.forEach(booking => {
    if (timeSlotCounts[booking.time] !== undefined) {
      timeSlotCounts[booking.time]++;
    }
  });
  
  // Check which time slots are available (15 tables total)
  const availableTimes: string[] = [];
  const maxTables = 15;
  
  if (timeSlotCounts['18:00'] < maxTables) {
    availableTimes.push('18:00');
  }
  if (timeSlotCounts['21:00'] < maxTables) {
    availableTimes.push('21:00');
  }
  
  return availableTimes;
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

  const bookingFromAPI: BookingFromAPI = await response.json();
  
  // Return booking in the format our app expects
  return {
    id: bookingFromAPI._id,
    restaurantId: bookingFromAPI.restaurantId,
    date: bookingFromAPI.date,
    time: bookingFromAPI.time,
    numberOfGuests: bookingFromAPI.numberOfGuests,
    customer: bookingData.customer, // Use the customer data we sent
  };
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

  const bookingFromAPI: BookingFromAPI = await response.json();
  
  // Fetch customer information
  const customer = await getCustomer(bookingFromAPI.customerId);
  
  return {
    id: bookingFromAPI._id,
    restaurantId: bookingFromAPI.restaurantId,
    date: bookingFromAPI.date,
    time: bookingFromAPI.time,
    numberOfGuests: bookingFromAPI.numberOfGuests,
    customer: customer ? {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    } : bookingData.customer || {
      name: 'Okänd',
      email: 'N/A',
      phone: 'N/A',
    },
  };
};
