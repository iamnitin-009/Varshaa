import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { fetchRiskMap } from '../utils/api';
import { useForecast } from '../context/ForecastContext';
import SimulatedDataBadge from '../components/SimulatedDataBadge';
import {
  MapPin,
  Compass,
  Flame,
  CloudLightning,
  Droplets,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

// Custom Map Controller to smoothly fly to selected location
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 11, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Generate colored SVG marker icon based on risk color
function createRiskMarkerIcon(riskColor, isSelected = false) {
  const colorHexMap = {
    red: '#dc2626',      // Critical
    orange: '#ea580c',   // High
    yellow: '#ca8a04',   // Moderate
    green: '#16a34a'     // Low
  };

  const bgHex = colorHexMap[riskColor] || '#16a34a';

  return L.divIcon({
    className: 'custom-risk-pin',
    html: `
      <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
        ${isSelected ? `<div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background-color: ${bgHex}; opacity: 0.3; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
        <div style="background-color: ${bgHex}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3); display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
}

export default function RiskMapPage() {
  const navigate = useNavigate();
  const { setSelectedLocation } = useForecast();

  const [locations, setLocations] = useState([]);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [mapCenter, setMapCenter] = useState([28.72, 77.52]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMapData() {
      try {
        setLoading(true);
        const res = await fetchRiskMap();
        if (res.data) {
          setLocations(res.data);
          // Set initial active selection to Modinagar (High/Critical) or first
          const defaultLoc = res.data.find(l => l.id === 'modinagar') || res.data[0];
          setSelectedLoc(defaultLoc);
          if (defaultLoc) {
            setMapCenter([defaultLoc.lat, defaultLoc.lon]);
          }
        }
      } catch (err) {
        console.error('Failed to load risk map locations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMapData();
  }, []);

  const handleSelectLocation = (loc) => {
    setSelectedLoc(loc);
    setMapCenter([loc.lat, loc.lon]);
  };

  const handleViewAdvisory = (loc) => {
    setSelectedLocation(loc.id);
    navigate(`/advisory?location=${loc.id}`);
  };

  const filteredLocations = locations.filter(loc => {
    if (filterRisk === 'ALL') return true;
    return loc.riskLevel.toUpperCase() === filterRisk;
  });

  const getRiskBadgeClasses = (level) => {
    switch ((level || '').toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Title & Clear Demo Label */}
      <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <SimulatedDataBadge size="sm" />
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                Demonstration locations • Simulated forecast
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-earth-900 tracking-tight">
              Hyperlocal Monsoon Risk Map
            </h1>
            <p className="text-xs sm:text-sm text-earth-500 mt-1">
              Block & Panchayat geospatial hazard zoning for Western Uttar Pradesh agrarian belt.
            </p>
          </div>

          {/* Color-Coded Legend */}
          <div className="flex flex-wrap items-center gap-2 bg-earth-50 p-2.5 rounded-xl border border-earth-200 text-xs font-medium">
            <span className="text-earth-400 font-bold uppercase tracking-wider text-[10px] mr-1">
              Risk Legend:
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Green = Low Risk
            </span>
            <span className="inline-flex items-center gap-1 text-yellow-800 font-semibold ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> Yellow = Moderate
            </span>
            <span className="inline-flex items-center gap-1 text-amber-800 font-semibold ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Orange = High
            </span>
            <span className="inline-flex items-center gap-1 text-red-800 font-semibold ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Red = Critical
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-4 pt-3 border-t border-earth-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-monsoon-700" />
            <span className="font-semibold text-earth-500">Filter By Risk:</span>
            {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setFilterRisk(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  filterRisk === lvl
                    ? 'bg-monsoon-800 text-white shadow-2xs'
                    : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="text-xs text-earth-500">
            Showing <strong>{filteredLocations.length}</strong> of {locations.length} blocks
          </div>
        </div>
      </div>

      {/* Main Map + Detailed Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Interactive Leaflet Map (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-earth-200 rounded-2xl overflow-hidden shadow-xs relative">
          <div className="h-[520px] w-full relative z-0">
            <MapContainer
              center={mapCenter}
              zoom={10}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController center={mapCenter} zoom={11} />

              {filteredLocations.map((loc) => {
                const isSelected = selectedLoc?.id === loc.id;
                return (
                  <Marker
                    key={loc.id}
                    position={[loc.lat, loc.lon]}
                    icon={createRiskMarkerIcon(loc.riskColor, isSelected)}
                    eventHandlers={{
                      click: () => handleSelectLocation(loc)
                    }}
                  >
                    <Popup>
                      <div className="p-1 text-xs">
                        <div className="font-bold text-sm text-earth-900">{loc.name}</div>
                        <div className="text-earth-500">{loc.district}, UP</div>
                        <div className="mt-1 font-semibold text-monsoon-800">
                          Risk: {loc.riskLevel}
                        </div>
                        <div className="text-[11px] text-earth-600">
                          Expected Rain: {loc.metrics.expectedRainfall} mm
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          {/* Map bottom bar */}
          <div className="p-3 bg-earth-50 border-t border-earth-200 flex items-center justify-between text-xs text-earth-500">
            <span>Click any marker to inspect Panchayat downscaled forecast</span>
            <span className="font-semibold text-monsoon-800">Study Region: Western UP</span>
          </div>
        </div>

        {/* Right Side: Detailed Location Card & Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedLoc ? (
            <div className="bg-white border-2 border-monsoon-600 rounded-2xl p-6 shadow-md animate-in fade-in duration-200 space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between pb-3 border-b border-earth-100">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-monsoon-700 shrink-0" />
                    <h2 className="text-xl font-black text-earth-900 tracking-tight">
                      {selectedLoc.name}
                    </h2>
                  </div>
                  <p className="text-xs text-earth-500 mt-0.5">
                    {selectedLoc.district} District • {selectedLoc.panchayatsCount} Panchayats
                  </p>
                </div>

                <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${getRiskBadgeClasses(selectedLoc.riskLevel)}`}>
                  {selectedLoc.riskLevel} Risk
                </span>
              </div>

              {/* Top Hazard Alert */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Agro-Hazard: </span>
                  <span>{selectedLoc.topHazard}</span>
                </div>
              </div>

              {/* Exact Required Fields: Location, Onset Prob, Dry Spell Prob, Heavy Rain Prob, Expected Rain, Confidence, Risk Level */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-earth-50 p-3 rounded-xl border border-earth-200">
                  <div className="flex items-center gap-1 text-earth-400 font-semibold mb-1">
                    <Compass className="w-3.5 h-3.5 text-monsoon-700" />
                    <span>Onset Probability</span>
                  </div>
                  <span className="text-lg font-black text-monsoon-800">
                    {selectedLoc.metrics.onsetProb}%
                  </span>
                </div>

                <div className="bg-earth-50 p-3 rounded-xl border border-earth-200">
                  <div className="flex items-center gap-1 text-earth-400 font-semibold mb-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dry Spell Probability</span>
                  </div>
                  <span className="text-lg font-black text-amber-700">
                    {selectedLoc.metrics.drySpellProb}%
                  </span>
                </div>

                <div className="bg-earth-50 p-3 rounded-xl border border-earth-200">
                  <div className="flex items-center gap-1 text-earth-400 font-semibold mb-1">
                    <CloudLightning className="w-3.5 h-3.5 text-sky-600" />
                    <span>Heavy Rain Probability</span>
                  </div>
                  <span className="text-lg font-black text-sky-800">
                    {selectedLoc.metrics.heavyRainProb}%
                  </span>
                </div>

                <div className="bg-earth-50 p-3 rounded-xl border border-earth-200">
                  <div className="flex items-center gap-1 text-earth-400 font-semibold mb-1">
                    <Droplets className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Expected Rainfall</span>
                  </div>
                  <span className="text-lg font-black text-earth-900">
                    {selectedLoc.metrics.expectedRainfall} mm
                  </span>
                </div>

                <div className="bg-earth-50 p-3 rounded-xl border border-earth-200">
                  <div className="flex items-center gap-1 text-earth-400 font-semibold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-monsoon-700" />
                    <span>Confidence</span>
                  </div>
                  <span className="text-lg font-black text-earth-900">
                    {selectedLoc.metrics.confidence}%
                  </span>
                </div>

                <div className="bg-earth-50 p-3 rounded-xl border border-earth-200">
                  <div className="text-earth-400 font-semibold mb-1">Risk Level</div>
                  <span className="text-lg font-black text-earth-900">
                    {selectedLoc.riskLevel}
                  </span>
                </div>
              </div>

              {/* Major crops info */}
              <div className="pt-2 text-xs text-earth-600">
                <span className="font-semibold text-earth-800">Dominant Crops: </span>
                {selectedLoc.majorCrops.join(', ')} • <span className="font-semibold text-earth-800">Soil: </span>{selectedLoc.soilType}
              </div>

              {/* Required "View Advisory" Action Button */}
              <button
                type="button"
                onClick={() => handleViewAdvisory(selectedLoc)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-monsoon-800 hover:bg-monsoon-900 text-white font-bold rounded-xl shadow-md transition-all active:scale-98 cursor-pointer text-sm"
              >
                <span>View Advisory for {selectedLoc.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-white border border-earth-200 rounded-2xl p-8 text-center text-earth-500">
              Select a location on the map to view detailed risk profile.
            </div>
          )}

          {/* Quick Location Switcher List */}
          <div className="bg-white border border-earth-200 rounded-2xl p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-earth-400 mb-2 px-1">
              Select Demonstration Block
            </h3>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    selectedLoc?.id === loc.id
                      ? 'bg-monsoon-50 font-bold text-monsoon-900 border border-monsoon-200'
                      : 'hover:bg-earth-50 text-earth-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: loc.riskColor === 'red' ? '#dc2626' : loc.riskColor === 'orange' ? '#ea580c' : loc.riskColor === 'yellow' ? '#ca8a04' : '#16a34a' }}></span>
                    <span>{loc.name} ({loc.district})</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskBadgeClasses(loc.riskLevel)}`}>
                    {loc.riskLevel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
