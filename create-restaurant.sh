#!/bin/bash
# Bash script to create a restaurant via the API
# Run this script once before using the application

echo "Creating restaurant via API..."

response=$(curl -s -X POST https://school-restaurant-api.azurewebsites.net/restaurant/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "La Bella Vista",
    "address": {
      "street": "Storgatan 123",
      "zip": "11122",
      "city": "Stockholm"
    }
  }')

if [ $? -eq 0 ]; then
    echo -e "\n✅ Restaurant created successfully!\n"
    echo "Restaurant Details:"
    echo "$response" | jq '.'
    
    # Extract the ID
    id=$(echo "$response" | jq -r '.id')
    
    echo -e "\n========================================"
    echo "NEXT STEP:"
    echo "========================================"
    echo "Copy the ID above and update it in:"
    echo "src/config/restaurant.ts"
    echo -e "\nReplace 'YOUR_RESTAURANT_ID' with: $id"
    echo "========================================"
    
    # Save the ID to a file for easy reference
    echo "$id" > restaurant-id.txt
    echo -e "\nThe ID has been saved to restaurant-id.txt for your reference."
else
    echo -e "\n❌ Error creating restaurant"
    echo "Please check your internet connection and try again."
fi
