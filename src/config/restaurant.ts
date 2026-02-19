// Restaurant configuration
// This should be created once via the API and then stored
export const RESTAURANT_CONFIG = {
  // You'll need to replace this with your actual restaurant ID after creating it
  id: 'YOUR_RESTAURANT_ID',
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
