# La Bella Vista - Restaurangbokningssystem

Ett modernt bokningssystem för restaurangen La Bella Vista, byggt med React, TypeScript och SCSS.

## 📋 Funktioner

- **Startsida**: Presentation av restaurangen, koncept och inriktning
- **Bokningssida**: Sökning av lediga tider och bokning av bord
- **Kontaktsida**: Kontaktuppgifter och kontaktformulär
- **Adminpanel**: CRUD-funktionalitet för hantering av bokningar

### Bokningsfunktionalitet
- 15 bord för max 6 personer per bord
- 2 sittningar per kväll (18:00 och 21:00)
- Sökning efter datum och antal personer
- Formulärvalidering
- GDPR-samtycke
- Bekräftelse av bokning

### Adminpanel
- Visa alla bokningar
- Lägg till ny bokning
- Redigera befintlig bokning
- Ta bort bokning

## 🚀 Kom igång

### Förutsättningar
- Node.js (v16 eller senare)
- npm eller yarn

### Installation

1. Klona repositoryt:
\`\`\`bash
git clone [repository-url]
cd the-resturant
\`\`\`

2. Installera beroenden:
\`\`\`bash
npm install
\`\`\`

3. **VIKTIGT**: Skapa en restaurang via API:et (behöver bara göras en gång):

Öppna en terminal och kör följande kommando:

\`\`\`bash
curl -X POST https://school-restaurant-api.azurewebsites.net/restaurant/create \\
  -H "Content-Type: application/json" \\
  -d '{"name": "La Bella Vista", "address": {"street": "Storgatan 123", "zip": "11122", "city": "Stockholm"}}'
\`\`\`

Eller använd PowerShell:

\`\`\`powershell
Invoke-RestMethod -Uri "https://school-restaurant-api.azurewebsites.net/restaurant/create" -Method POST -ContentType "application/json" -Body '{"name": "La Bella Vista", "address": {"street": "Storgatan 123", "zip": "11122", "city": "Stockholm"}}'
\`\`\`

Du kommer få tillbaka ett svar med ett \`id\`. Kopiera detta ID.

4. Uppdatera restaurang-ID:

Öppna filen \`src/config/restaurant.ts\` och ersätt \`'YOUR_RESTAURANT_ID'\` med det ID du fick från API:et.

5. Starta utvecklingsservern:
\`\`\`bash
npm run dev
\`\`\`

Applikationen öppnas på \`http://localhost:5173\`

## 🏗️ Projektstruktur

\`\`\`
the-resturant/
├── src/
│   ├── components/         # Återanvändbara komponenter
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/             # Sidkomponenter
│   │   ├── Home.tsx
│   │   ├── Booking.tsx
│   │   ├── Contact.tsx
│   │   └── Admin.tsx
│   ├── services/          # API-tjänster
│   │   └── api.ts
│   ├── types/             # TypeScript-typer
│   │   └── index.ts
│   ├── config/            # Konfiguration
│   │   └── restaurant.ts
│   ├── styles/            # SCSS-stilar
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _animations.scss
│   │   ├── App.scss
│   │   ├── Header.scss
│   │   ├── Footer.scss
│   │   ├── Home.scss
│   │   ├── Booking.scss
│   │   ├── Contact.scss
│   │   └── Admin.scss
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── README.md
\`\`\`

## 🎨 Design

Projektet använder en genomtänkt färgpalett och designprofil:

- **Primärfärg**: Guld (#c89446) - representerar lyx och kvalitet
- **Sekundärfärg**: Mörkblå (#2c3e50) - professionalism
- **Accentfärg**: Röd (#e74c3c) - för call-to-actions

### Animationer
- Fade-in effekter för innehåll
- Slide-in för kort och element
- Hover-effekter på knappar och kort
- Laddningsanimationer

## 📱 Responsiv Design

Applikationen är fullt responsiv och fungerar på:
- Desktop (1200px+)
- Tablet (768px - 1023px)
- Mobil (< 768px)

## 🔧 Teknisk Stack

- **Frontend Framework**: React 19
- **Språk**: TypeScript
- **Routing**: React Router DOM v7
- **Styling**: SCSS (Sass)
- **Build Tool**: Vite
- **API**: School Restaurant API (Azure)

## 📝 API-dokumentation

API:et finns på: \`https://school-restaurant-api.azurewebsites.net\`

Dokumentation: \`https://school-restaurant-api.azurewebsites.net/api-doc\`

### Endpoints som används:
- \`POST /restaurant/create\` - Skapa restaurang
- \`POST /booking/availability\` - Kontrollera tillgänglighet
- \`POST /booking/create\` - Skapa bokning
- \`GET /booking/restaurant/:id\` - Hämta alla bokningar
- \`PUT /booking/update/:id\` - Uppdatera bokning
- \`DELETE /booking/delete/:id\` - Ta bort bokning

## 🧪 Utveckling

### Tillgängliga kommandon:

\`\`\`bash
npm run dev        # Starta utvecklingsserver
npm run build      # Bygga för produktion
npm run preview    # Förhandsgranska produktionsbygget
npm run lint       # Kör ESLint
\`\`\`

## ✅ Kravlista

- ✅ React med TypeScript
- ✅ React Router för navigation
- ✅ Startsida med restaurangpresentation
- ✅ Bokningssida med sökfunktionalitet
- ✅ Kontaktsida
- ✅ Adminpanel med CRUD
- ✅ API-integration för bokningar
- ✅ Formulärvalidering
- ✅ GDPR-information
- ✅ Responsiv design
- ✅ SCSS med animationer
- ✅ God filstruktur
- ✅ Genomtänkt designprofil

## 👥 Team

Detta projekt är skapat som en skoluppgift.

## 📄 Licens

Detta projekt är skapat för utbildningssyfte.
