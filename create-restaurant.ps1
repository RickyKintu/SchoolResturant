# PowerShell script to create a restaurant via the API
# Run this script once before using the application

Write-Host "Creating restaurant via API..." -ForegroundColor Cyan

$body = @{
    name = "La Bella Vista"
    address = @{
        street = "Storgatan 123"
        zip = "11122"
        city = "Stockholm"
    }
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://school-restaurant-api.azurewebsites.net/restaurant/create" -Method POST -ContentType "application/json" -Body $body
    
    Write-Host "`nRestaurant created successfully!" -ForegroundColor Green
    Write-Host "`nRestaurant Details:" -ForegroundColor Yellow
    Write-Host "ID: $($response.id)" -ForegroundColor White
    Write-Host "Name: $($response.name)" -ForegroundColor White
    Write-Host "Address: $($response.address.street), $($response.address.zip) $($response.address.city)" -ForegroundColor White
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "NEXT STEP:" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Copy the ID above and update it in:" -ForegroundColor White
    Write-Host "src/config/restaurant.ts" -ForegroundColor Green
    Write-Host "`nReplace 'YOUR_RESTAURANT_ID' with: $($response.id)" -ForegroundColor White
    Write-Host "========================================" -ForegroundColor Cyan
    
    # Save the ID to a file for easy reference
    $response.id | Out-File -FilePath "restaurant-id.txt" -NoNewline
    Write-Host "`nThe ID has been saved to restaurant-id.txt for your reference." -ForegroundColor Cyan
    
} catch {
    Write-Host "`nError creating restaurant:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "`nPlease check your internet connection and try again." -ForegroundColor Yellow
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
