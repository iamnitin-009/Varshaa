/**
 * VARSHAA: Climate Data & Study Region Baselines
 * Simulated benchmark datasets representing Western UP / NCR Block & Panchayat clusters.
 */

const LOCATIONS = [
  {
    id: 'ghaziabad',
    name: 'Ghaziabad',
    type: 'Block & District HQ',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    lat: 28.6692,
    lon: 77.4538,
    elevation: 214,
    majorCrops: ['Rice', 'Wheat', 'Maize', 'Vegetables'],
    soilType: 'Alluvial Loam',
    panchayatsCount: 42,
    riskLevel: 'Moderate',
    riskColor: 'yellow',
    riskScore: 58,
    metrics: {
      onsetProb: 74,
      drySpellProb: 38,
      heavyRainProb: 24,
      expectedRainfall: 184,
      confidence: 81
    },
    topHazard: 'Potential 4-day dry spell post-onset'
  },
  {
    id: 'loni',
    name: 'Loni',
    type: 'Panchayat Cluster Block',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    lat: 28.7515,
    lon: 77.2882,
    elevation: 210,
    majorCrops: ['Rice', 'Maize', 'Pulses'],
    soilType: 'Sandy Alluvium',
    panchayatsCount: 38,
    riskLevel: 'High',
    riskColor: 'orange',
    riskScore: 71,
    metrics: {
      onsetProb: 68,
      drySpellProb: 64,
      heavyRainProb: 18,
      expectedRainfall: 142,
      confidence: 79
    },
    topHazard: 'Elevated dry-spell risk with moisture stress on early seedlings'
  },
  {
    id: 'modinagar',
    name: 'Modinagar',
    type: 'Intensive Agrarian Block',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    lat: 28.8340,
    lon: 77.5810,
    elevation: 220,
    majorCrops: ['Rice', 'Wheat', 'Sugarcane', 'Pulses'],
    soilType: 'Clayey Loam',
    panchayatsCount: 54,
    riskLevel: 'Critical',
    riskColor: 'red',
    riskScore: 84,
    metrics: {
      onsetProb: 78,
      drySpellProb: 68,
      heavyRainProb: 32,
      expectedRainfall: 198,
      confidence: 83
    },
    topHazard: 'Sharp dry-spell window following heavy initial rain flush'
  },
  {
    id: 'hapur',
    name: 'Hapur',
    type: 'District Agrarian Basin',
    district: 'Hapur',
    state: 'Uttar Pradesh',
    lat: 28.7306,
    lon: 77.7759,
    elevation: 213,
    majorCrops: ['Rice', 'Wheat', 'Maize', 'Pulses'],
    soilType: 'Silt Loam',
    panchayatsCount: 62,
    riskLevel: 'Moderate',
    riskColor: 'yellow',
    riskScore: 46,
    metrics: {
      onsetProb: 76,
      drySpellProb: 32,
      heavyRainProb: 28,
      expectedRainfall: 215,
      confidence: 85
    },
    topHazard: 'Mild dry spell; favorable pre-monsoon sowing window'
  },
  {
    id: 'dadri',
    name: 'Dadri',
    type: 'Lowland Panchayat Cluster',
    district: 'Gautam Buddha Nagar',
    state: 'Uttar Pradesh',
    lat: 28.5529,
    lon: 77.5539,
    elevation: 207,
    majorCrops: ['Rice', 'Maize', 'Wheat', 'Pulses'],
    soilType: 'Alluvial Clay',
    panchayatsCount: 46,
    riskLevel: 'Low',
    riskColor: 'green',
    riskScore: 28,
    metrics: {
      onsetProb: 80,
      drySpellProb: 22,
      heavyRainProb: 21,
      expectedRainfall: 205,
      confidence: 84
    },
    topHazard: 'Stable onset progression with steady moisture flux'
  },
  {
    id: 'muradnagar',
    name: 'Muradnagar',
    type: 'Canal Irrigated Block',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    lat: 28.7800,
    lon: 77.5020,
    elevation: 215,
    majorCrops: ['Rice', 'Sugarcane', 'Wheat', 'Vegetables'],
    soilType: 'Deep Alluvium',
    panchayatsCount: 39,
    riskLevel: 'Low',
    riskColor: 'green',
    riskScore: 31,
    metrics: {
      onsetProb: 75,
      drySpellProb: 28,
      heavyRainProb: 26,
      expectedRainfall: 192,
      confidence: 82
    },
    topHazard: 'Canal recharge supports buffer during minor dry intervals'
  },
  {
    id: 'pilkhuwa',
    name: 'Pilkhuwa',
    type: 'Sub-Block Panchayat Belt',
    district: 'Hapur',
    state: 'Uttar Pradesh',
    lat: 28.7120,
    lon: 77.6970,
    elevation: 212,
    majorCrops: ['Rice', 'Pulses', 'Wheat'],
    soilType: 'Sandy Loam',
    panchayatsCount: 35,
    riskLevel: 'Moderate',
    riskColor: 'yellow',
    riskScore: 52,
    metrics: {
      onsetProb: 73,
      drySpellProb: 44,
      heavyRainProb: 22,
      expectedRainfall: 176,
      confidence: 80
    },
    topHazard: 'Moderate sandy percolation; seedling moisture monitoring required'
  },
  {
    id: 'dhaulana',
    name: 'Dhaulana',
    type: 'Rural Panchayat Belt',
    district: 'Hapur',
    state: 'Uttar Pradesh',
    lat: 28.6470,
    lon: 77.7280,
    elevation: 211,
    majorCrops: ['Rice', 'Maize', 'Pulses', 'Wheat'],
    soilType: 'Alluvial Loam',
    panchayatsCount: 44,
    riskLevel: 'High',
    riskColor: 'orange',
    riskScore: 66,
    metrics: {
      onsetProb: 71,
      drySpellProb: 59,
      heavyRainProb: 19,
      expectedRainfall: 154,
      confidence: 78
    },
    topHazard: 'Rain shadow effect from Yamuna-Hindon interfluve during break phase'
  }
];

const CLIMATE_SIGNALS = [
  {
    id: 'enso',
    name: 'ENSO',
    fullName: 'El Niño–Southern Oscillation',
    status: 'Neutral',
    value: '+0.2°C (ONI)',
    badgeColor: 'emerald',
    icon: 'Activity',
    explanation: 'Pacific Sea Surface Temperatures within normal boundaries. Monsoon suppression risk is low.',
    impact: 'Normal Walker circulation; no large-scale monsoon hindrance.'
  },
  {
    id: 'iod',
    name: 'IOD',
    fullName: 'Indian Ocean Dipole',
    status: 'Positive',
    value: '+0.48°C (DMI)',
    badgeColor: 'sky',
    icon: 'Waves',
    explanation: 'Warmer western equatorial Indian Ocean enhances moisture advection towards the Indian subcontinent.',
    impact: 'Favorable cross-equatorial monsoon low-level jet stream.'
  },
  {
    id: 'mjo',
    name: 'MJO',
    fullName: 'Madden-Julian Oscillation',
    status: 'Phase 4',
    value: 'Amplitude 1.4',
    badgeColor: 'indigo',
    icon: 'Wind',
    explanation: 'Intraseasonal wave currently traversing the Maritime Continent / Bay of Bengal basin.',
    impact: 'Enhances convective cloudiness and synoptic low-pressure vortex formation.'
  },
  {
    id: 'regional_moisture',
    name: 'Regional Moisture',
    fullName: 'Tropospheric Precipitable Water',
    status: 'Moderate',
    value: '48 mm (TPW)',
    badgeColor: 'teal',
    icon: 'Droplets',
    explanation: '850 hPa specific humidity along the Gangetic plain sustains moisture convergence.',
    impact: 'Adequate for localized convective showers preceding the monsoon front.'
  },
  {
    id: 'rainfall_anomaly',
    name: 'Rainfall Anomaly',
    fullName: 'Standardized Precipitation Anomaly',
    status: '+8%',
    value: '+14.2 mm above normal',
    badgeColor: 'emerald',
    icon: 'TrendingUp',
    explanation: 'Early summer pre-monsoon precipitation slightly above long-period average (LPA).',
    impact: 'Good soil priming for initial land preparation and nursery beds.'
  },
  {
    id: 'soil_moisture',
    name: 'Soil Moisture',
    fullName: 'Root-Zone Volumetric Content (0-30 cm)',
    status: '62%',
    value: '0.28 m³/m³',
    badgeColor: 'amber',
    icon: 'Sprout',
    explanation: 'Topsoil saturation sufficient for early tilling, but vulnerable to break spells without irrigation.',
    impact: 'Moderate moisture buffer; critical to monitor 7-day evaporation rate.'
  }
];

module.exports = {
  LOCATIONS,
  CLIMATE_SIGNALS
};
