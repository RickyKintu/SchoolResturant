// API Types
export interface Restaurant {
  id: string;
  name: string;
  address: {
    street: string;
    zip: string;
    city: string;
  };
}

export interface Customer {
  _id: string;
  name: string;
  lastname?: string;
  email: string;
  phone: string;
}

// What the API returns
export interface BookingFromAPI {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}

// What we use in our app (with customer info merged)
export interface Booking {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface BookingRequest {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface AvailabilityCheck {
  restaurantId: string;
  date: string;
  numberOfGuests: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
