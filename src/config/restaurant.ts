// Restaurant configuration
// This should be created once via the API and then stored
export const RESTAURANT_CONFIG = {
  // Restaurant ID from API
  id: '6996edaf1f79230601108dac',
  name: 'La Bella Vista',
  address: {
    street: 'Storgatan 123',
    zip: '11122',
    city: 'Stockholm',
  },
  // Booking configuration
  tables: 15,
  seatsPerTable: 6,
  sittings: ['18:00', '21:00'],
};

// Function to help create the restaurant (run once)
export const RESTAURANT_INIT_DATA = {
  name: RESTAURANT_CONFIG.name,
  address: RESTAURANT_CONFIG.address,
};
