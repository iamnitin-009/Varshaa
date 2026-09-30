/**
 * API service helper for VARSHAA backend endpoints
 */

const API_BASE = '/api';

export async function fetchLocations() {
  const res = await fetch(`${API_BASE}/locations`);
  if (!res.ok) throw new Error('Failed to fetch study locations');
  return res.json();
}

export async function fetchClimateSignals() {
  const res = await fetch(`${API_BASE}/climate-signals`);
  if (!res.ok) throw new Error('Failed to fetch climate signals');
  return res.json();
}

export async function fetchForecast(location = 'ghaziabad', horizon = 14) {
  const res = await fetch(`${API_BASE}/forecast?location=${encodeURIComponent(location)}&horizon=${horizon}`);
  if (!res.ok) throw new Error('Failed to fetch forecast');
  return res.json();
}

export async function fetchRiskMap() {
  const res = await fetch(`${API_BASE}/risk-map`);
  if (!res.ok) throw new Error('Failed to fetch risk map data');
  return res.json();
}

export async function generateCropAdvisory({ location, crop, cropStage, horizon = 7 }) {
  const res = await fetch(`${API_BASE}/advisory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location, crop, cropStage, horizon })
  });
  if (!res.ok) throw new Error('Failed to generate crop advisory');
  return res.json();
}
