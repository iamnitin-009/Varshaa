import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { AlertTriangle, Clock, Calendar, Flame, AlertCircle } from 'lucide-react';

export default function BreakMonsoonSection() {
  const { forecast } = useForecast();

  if (!forecast) return null;

  const breakInfo = forecast.breakMonsoonDetails;
  const isHighRisk = breakInfo.probability >= 50;

  return (
    <div className="bg-white border border-earth-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-earth-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-bold rounded-md border ${
                isHighRisk
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-yellow-100 text-yellow-900 border-yellow-300'
              }`}>
                Intra-Seasonal Risk
              </span>
              <h3 className="text-lg font-bold text-earth-900 tracking-tight uppercase">
                Dry Spell / Break Monsoon
              </h3>
            </div>
            <p className="text-xs text-earth-500 mt-0.5">
              Monsoon trough displacement dynamics & root-zone desiccation risks
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold">Trough Shift:</span>
            <span className="text-xs font-bold">Himalayan Foothills</span>
          </div>
        </div>

        {/* Highlight Callout */}
        <div className="my-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Meteorological Hazard Advisory
            </div>
            <p className="text-sm font-medium text-amber-950 mt-1 leading-relaxed">
              “{breakInfo.summary}”
            </p>
          </div>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-earth-50/70 p-3.5 rounded-xl border border-earth-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-500 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Dry Spell Probability</span>
            </div>
            <div className={`text-xl font-black ${isHighRisk ? 'text-amber-700' : 'text-earth-900'}`}>
              {breakInfo.probability}%
            </div>
          </div>

          <div className="bg-earth-50/70 p-3.5 rounded-xl border border-earth-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Expected Duration</span>
            </div>
            <div className="text-base font-bold text-earth-900">
              {breakInfo.expectedDuration}
            </div>
          </div>

          <div className="bg-earth-50/70 p-3.5 rounded-xl border border-earth-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Possible Start Date</span>
            </div>
            <div className="text-base font-bold text-earth-900">
              {breakInfo.possibleStartDate}
            </div>
          </div>

          <div className="bg-earth-50/70 p-3.5 rounded-xl border border-earth-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-500 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Moisture Stress</span>
            </div>
            <div className="text-base font-bold text-amber-900">
              {breakInfo.moistureStressLevel}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-earth-100 flex items-center justify-between text-xs text-earth-500">
        <span>Mitigation: Pre-plan supplemental tubewell canal release</span>
        <span className="font-semibold text-monsoon-700">See Crop Advisory →</span>
      </div>
    </div>
  );
}
