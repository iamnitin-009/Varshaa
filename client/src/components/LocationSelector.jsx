import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { MapPin, ChevronDown } from 'lucide-react';

export default function LocationSelector({ className = '' }) {
  const { locations, selectedLocation, setSelectedLocation } = useForecast();

  const getRiskColor = (level) => {
    switch ((level || '').toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const currentLocation = locations.find(l => l.id === selectedLocation);

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-white border border-earth-200 rounded-xl shadow-xs hover:border-monsoon-600 transition-colors">
        <MapPin className="w-4 h-4 text-monsoon-700 shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold text-earth-400 tracking-wider">
            Study Block / Panchayat
          </span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-sm font-semibold text-earth-900 bg-transparent cursor-pointer focus:outline-hidden pr-6 appearance-none font-sans"
            aria-label="Select study block"
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id} className="text-earth-900 py-1">
                {loc.name} ({loc.district}, UP) — {loc.riskLevel} Risk
              </option>
            ))}
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-earth-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
      </div>

      {currentLocation && (
        <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-md border hidden md:inline-flex items-center ${getRiskColor(currentLocation.riskLevel)}`}>
          {currentLocation.riskLevel} Risk
        </span>
      )}
    </div>
  );
}
