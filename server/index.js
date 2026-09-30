/**
 * VARSHAA - Hyperlocal Monsoon Intelligence
 * Main Full-Stack Application Server
 * Serves Express REST APIs and the production React client build.
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Serve static React build in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Fallback to React SPA for all non-API routes
app.get('*', (req, res) => {
  // If request starts with /api, return 404 json
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`VARSHAA - Hyperlocal Monsoon Intelligence Engine`);
  console.log(`SIH Prototype Active • Simulated Forecast Mode`);
  console.log(`Server listening on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
