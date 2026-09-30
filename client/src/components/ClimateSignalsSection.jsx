import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { Activity, Waves, Wind, Droplets, TrendingUp, Sprout, Info } from 'lucide-react';

const ICON_MAP = {
  Activity,
  Waves,
  Wind,
  Droplets,
  TrendingUp,
  Sprout
};

export default function ClimateSignalsSection() {
  const { climateSignals } = useForecast();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'positive':
      case 'neutral':
      case '+8%':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'moderate':
      case '62%':
      case 'phase 4':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="bg-white border border-earth-200/90 rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-earth-100 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-monsoon-600 animate-ping opacity-75"></span>
            <h3 className="text-lg font-bold text-earth-900 tracking-tight">
              Synoptic Climate Drivers & Teleconnections
            </h3>
          </div>
          <p className="text-xs text-earth-500 mt-0.5">
            Active macro-indices driving subcontinent moisture flux and monsoon troughs
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-earth-50 rounded-lg border border-earth-200 text-xs text-earth-600 font-medium">
          <Info className="w-3.5 h-3.5 text-monsoon-700" />
          <span>Simulated IMD / NOAA GFS Ensemble</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {climateSignals.map((signal) => {
          const Icon = ICON_MAP[signal.icon] || Activity;
          return (
            <div
              key={signal.id}
              className="bg-earth-50/70 border border-earth-200/80 rounded-xl p-4 hover:border-monsoon-400 hover:bg-white transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-earth-500 tracking-wider uppercase">
                    {signal.name}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white border border-earth-200 text-monsoon-800 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="my-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-earth-900">
                      {signal.status}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${getStatusColor(signal.status)}`}>
                      {signal.value.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-[11px] text-earth-500 font-medium">
                    {signal.fullName}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-earth-200/60">
                <p className="text-[11px] leading-relaxed text-earth-600 line-clamp-3">
                  {signal.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
