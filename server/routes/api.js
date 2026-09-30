/**
 * VARSHAA Express API Routes
 */

const express = require('express');
const router = express.Router();
const predictionEngine = require('../services/predictionEngine');
const advisoryEngine = require('../services/advisoryEngine');

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'VARSHAA - Hyperlocal Monsoon Intelligence',
    version: '1.0.0-SIH-Prototype',
    mode: 'Simulated Forecast Data',
    timestamp: new Date().toISOString()
  });
});

// Locations in Study Region
router.get('/locations', (req, res) => {
  try {
    const locations = predictionEngine.getLocations();
    res.json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Climate Signals (ENSO, IOD, MJO, Regional Moisture, Anomaly, Soil Moisture)
router.get('/climate-signals', (req, res) => {
  try {
    const signals = predictionEngine.getClimateSignals();
    res.json({
      success: true,
      data: signals,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Forecast for given location & horizon
router.get('/forecast', (req, res) => {
  try {
    const { location = 'ghaziabad', horizon = 14 } = req.query;
    const forecast = predictionEngine.generateForecast(location, Number(horizon));
    res.json({
      success: true,
      data: forecast
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Hyperlocal Risk Map Data
router.get('/risk-map', (req, res) => {
  try {
    const mapData = predictionEngine.getRiskMap();
    res.json({
      success: true,
      center: [28.7041, 77.5025], // Western UP / NCR cluster center
      zoom: 10,
      region: 'Western Uttar Pradesh / NCR Block Cluster',
      data: mapData
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Agricultural Crop Advisory Engine
router.post('/advisory', (req, res) => {
  try {
    const { location = 'ghaziabad', crop = 'Rice', cropStage = 'Sowing', horizon = 7 } = req.body;
    
    // Call the advisory engine
    const advisory = advisoryEngine.generateAdvisory({
      locationId: location,
      crop,
      cropStage,
      horizon: Number(horizon) || 7
    });

    res.json({
      success: true,
      data: advisory
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
