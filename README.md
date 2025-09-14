# MERN AutoTrader

Live-URLs

- Backend: https://mern-autotrader.onrender.com
- Frontend: https://mern-autotrader.vercel.app

## Tech-Stack

- MongoDB (Atlas), Express.js, React (Vite), Node.js

## Features

- CRUD für Fahrzeuge (Marke, Modell, Preis, km, Baujahr, Bild, Beschreibung)
- Suche (Marke/Modell), responsives Grid
- State-Management via React Context + useReducer

## Lokale Entwicklung

```bash
# Terminal 1
cd server && cp .env.example .env  # MONGODB_URI eintragen
npm i
npm run seed
npm run dev

# Terminal 2
cd client
npm i
npm run dev
```
