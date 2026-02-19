# Snabbstart - Viktiga steg!

## 1. Skapa restaurang via API (GÖR DETTA FÖRST!)

Detta behöver bara göras **EN GÅNG** innan du kan använda bokningsfunktionaliteten.

### Med PowerShell (Windows):

\`\`\`powershell
$body = @{
    name = "La Bella Vista"
    address = @{
        street = "Storgatan 123"
        zip = "11122"
        city = "Stockholm"
    }
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "https://school-restaurant-api.azurewebsites.net/restaurant/create" -Method POST -ContentType "application/json" -Body $body

Write-Host "Restaurant ID: $($response.id)"
\`\`\`

### Med Curl (Mac/Linux eller Git Bash):

\`\`\`bash
curl -X POST https://school-restaurant-api.azurewebsites.net/restaurant/create \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "La Bella Vista",
    "address": {
      "street": "Storgatan 123",
      "zip": "11122",
      "city": "Stockholm"
    }
  }'
\`\`\`

## 2. Uppdatera Restaurant ID

Efter att du har skapat restaurangen kommer du få tillbaka ett svar som ser ut så här:

\`\`\`json
{
  "id": "abc123xyz789",
  "name": "La Bella Vista",
  "address": {
    "street": "Storgatan 123",
    "zip": "11122",
    "city": "Stockholm"
  }
}
\`\`\`

**Kopiera ID:t** och öppna filen \`src/config/restaurant.ts\`.

Ersätt denna rad:
\`\`\`typescript
id: 'YOUR_RESTAURANT_ID',
\`\`\`

Med ditt faktiska ID:
\`\`\`typescript
id: 'abc123xyz789',
\`\`\`

## 3. Starta applikationen

\`\`\`bash
npm run dev
\`\`\`

Applikationen öppnas på \`http://localhost:5173\`

## 4. Testa funktionaliteten

1. **Startsida** - Presenterar restaurangen
2. **Boka Bord** - Sök lediga tider och gör en bokning
3. **Kontakt** - Se kontaktuppgifter
4. **Admin** - Hantera bokningar (lägg till, redigera, ta bort)

## Felsökning

### Problem: "Failed to check availability" eller "Failed to create booking"

**Lösning**: Kontrollera att du har uppdaterat \`RESTAURANT_CONFIG.id\` i \`src/config/restaurant.ts\` med ditt faktiska restaurant-ID från API:et.

### Problem: Inga bokningar visas i adminpanelen

**Lösning**: Kontrollera att restaurant-ID:t är korrekt och att du har skapat minst en bokning via bokningssidan.

### Problem: Fel vid API-anrop

**Lösning**: Kontrollera din internetanslutning och att API:et är tillgängligt på \`https://school-restaurant-api.azurewebsites.net\`.

## API-dokumentation

Fullständig dokumentation: https://school-restaurant-api.azurewebsites.net/api-doc
