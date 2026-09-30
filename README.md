# VARSHAA — Hyperlocal Monsoon Intelligence
> **“Predict. Prepare. Protect.”**

*Smart India Hackathon (SIH) Prototype*  
**Problem Statement:** Hyperlocal prediction of Indian monsoon onset, break/dry spells and heavy rainfall at Block/Panchayat level, with crop-specific agricultural advisories.

---

## 🌟 Key Highlights & Innovations
- **Single Full-Stack Architecture**: Unified Node.js + Express backend serving the production React (Vite + Tailwind CSS) client. Deployable as a single Render Web Service.
- **Zero External API Keys Needed**: Built-in deterministic physics-guided simulation engine modeling realistic synoptic monsoon dynamics across Western Uttar Pradesh / NCR Panchayats (Ghaziabad, Modinagar, Loni, Hapur, Dadri, Muradnagar, Pilkhuwa, Dhaulana).
- **Interactive Multi-Horizon Forecasts**: Real-time switchable projections across 7, 14, 21, and 30-day horizons with multi-curve Recharts tracking Onset, Break (Dry Spell), and Heavy Rain probabilities.
- **Geospatial Hazard Mapping**: Leaflet + OpenStreetMap engine rendering color-coded risk markers (Green = Low, Yellow = Moderate, Orange = High, Red = Critical) with pan-and-inspect block cards.
- **Farmer-Focused Bilingual Crop Advisory**: Dynamic agronomic decision engine for **Rice**, **Wheat**, **Maize**, and **Pulses** across **Sowing**, **Vegetative**, **Flowering**, and **Harvest** stages with full **English | हिन्दी** language translation and speech synthesis audio playback.
- **Farmer Alert Dispatcher (SMS/WhatsApp)**: Authentic mobile message mockup generating actionable hazard broadcasts with one-click copy and text-to-speech for rural accessibility.
- **End-to-End Methodology Pipeline**: Visual 6-stage workflow detailing global teleconnection ingestion (ENSO, IOD, MJO) through physics-guided neural networks to block-level spatial downscaling.

---

## 📂 Project Structure

```
Varshaa/
├── package.json              # Root scripts (build, start, dev) & Express dependencies
├── README.md                 # Project documentation & SIH pitch summary
├── server/
│   ├── index.js              # Full-stack server; serves /api and static client/dist
│   ├── routes/
│   │   └── api.js            # Express API endpoints
│   └── services/
│       ├── climateData.js    # Regional benchmarks & synoptic teleconnection signals
│       ├── predictionEngine.js # High-res probabilistic downscaling simulation
│       └── advisoryEngine.js # Crop phenology rules with English & Hindi translations
└── client/
    ├── index.html            # Vite HTML template with fonts and Leaflet CSS
    ├── vite.config.js        # Vite config with /api proxy for dev
    ├── tailwind.config.js    # Custom climate-tech color theme
    ├── postcss.config.js
    ├── package.json          # React, Leaflet, Recharts, Lucide dependencies
    └── src/
        ├── main.jsx
        ├── App.jsx           # React Router route registry
        ├── index.css         # Tailwind & custom scrollbar styles
        ├── context/
        │   ├── ForecastContext.jsx # Global active block, horizon, forecast state
        │   └── LanguageContext.jsx # English | हिन्दी language state
        ├── components/
        │   ├── Navbar.jsx    # Sticky navigation with language switcher & badge
        │   ├── Footer.jsx    # SIH disclaimer & architecture notes
        │   ├── LocationSelector.jsx
        │   ├── HorizonSelector.jsx
        │   ├── KpiCard.jsx
        │   ├── ClimateSignalsSection.jsx
        │   ├── MonsoonOnsetSection.jsx
        │   ├── BreakMonsoonSection.jsx
        │   └── SimulatedDataBadge.jsx
        └── pages/
            ├── Dashboard.jsx        # Route /
            ├── ForecastPage.jsx     # Route /forecast
            ├── RiskMapPage.jsx      # Route /risk-map
            ├── AdvisoryPage.jsx     # Route /advisory
            ├── AlertsPage.jsx       # Route /alerts
            └── ModelMethodologyPage.jsx # Route /model
```

---

## 🚀 Running Locally

### 1. Install & Build
```bash
# Clone or navigate to the directory
cd Varshaa

# Install root dependencies and build client bundle
npm install
npm run build
```

### 2. Start Full-Stack Server
```bash
npm start
```
The application will launch on `http://localhost:5000`.

### 3. Development Mode (Concurrent Server + Vite)
```bash
npm run dev
```

---

## ☁️ Deploying to Render (Single Web Service)

1. Create a **New Web Service** on [Render](https://render.com).
2. Connect your Git repository.
3. Configure the service settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `PORT`: `5000` (or Render default)
4. Click **Deploy Web Service**.

> **Note**: Express automatically detects `process.env.PORT` and serves both the REST API and the React production bundle from `client/dist`. No separate frontend deployment is required!

---

## 🛰️ REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & simulated mode status |
| `GET` | `/api/locations` | List of benchmark study blocks with coordinates and baseline risks |
| `GET` | `/api/climate-signals` | Active synoptic teleconnections (ENSO, IOD, MJO, Moisture, Anomaly, Soil) |
| `GET` | `/api/forecast?location=modinagar&horizon=14` | Probabilistic multi-variable daily time series & summary KPIs |
| `GET` | `/api/risk-map` | Spatial dataset for Leaflet map with color-coded risk levels |
| `POST` | `/api/advisory` | Computes crop advisory for `{ location, crop, cropStage, horizon }` in English & Hindi |

---

## ⚖️ Hackathon Disclaimer
> **Prototype • Simulated Forecast Data**  
> Current prototype uses simulated data to demonstrate the prediction workflow. The architecture is designed for direct integration with real meteorological datasets (IMD, NCMRWF, ERA5) and trained ML models.
