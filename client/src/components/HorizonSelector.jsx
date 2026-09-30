import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { Calendar } from 'lucide-react';

const HORIZONS = [7, 14, 21, 30];

export default function HorizonSelector({ className = '' }) {
  const { selectedHorizon, setSelectedHorizon } = useForecast();

  return (
    <div className={`flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-xs border border-earth-200 rounded-xl shadow-xs ${className}`}>
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-earth-500 uppercase tracking-wider hidden sm:flex">
        <Calendar className="w-3.5 h-3.5 text-monsoon-700" />
        <span>Horizon:</span>
      </div>
      <div className="flex items-center gap-1">
        {HORIZONS.map((days) => {
          const isActive = selectedHorizon === days;
          return (
            <button
              key={days}
              type="button"
              onClick={() => setSelectedHorizon(days)}
              className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-monsoon-800 text-white shadow-xs font-semibold'
                  : 'text-earth-600 hover:text-earth-900 hover:bg-earth-100'
              }`}
            >
              {days} Days
            </button>
          );
        })}
      </div>
    </div>
  );
}
