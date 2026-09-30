import React, { useState } from 'react';
import { useForecast } from '../context/ForecastContext';
import LocationSelector from '../components/LocationSelector';
import HorizonSelector from '../components/HorizonSelector';
import SimulatedDataBadge from '../components/SimulatedDataBadge';
import MonsoonOnsetSection from '../components/MonsoonOnsetSection';
import BreakMonsoonSection from '../components/BreakMonsoonSection';
import {
  CloudRain,
  Calendar,
  Layers,
  Info,
  Droplets,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  SlidersHorizontal,
  Table
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function ForecastPage() {
  const { forecast, selectedHorizon, currentLocationObj } = useForecast();

  // Metric toggles for interactive exploration
  const [visibleSeries, setVisibleSeries] = useState({
    rainfallProb: true,
    drySpellProb: true,
    heavyRainProb: true,
    onsetProb: true,
    expectedRainfall: true
  });

  const [activeTab, setActiveTab] = useState('chart'); // 'chart' | 'table' | 'synoptic'

  const toggleSeries = (key) => {
    setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const chartData = forecast?.dailyData || [];
  const kpis = forecast?.kpis;

  const getRiskBadge = (level) => {
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
      {/* Top Header Banner */}
      <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <SimulatedDataBadge size="sm" />
              <span className="text-xs font-semibold text-earth-500">
                IMD-GFS High-Resolution Downscaled Model
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-earth-900 tracking-tight">
              Monsoon Forecast Engine
            </h1>
            <p className="text-xs sm:text-sm text-earth-500 mt-1">
              Probabilistic multi-variable rainfall, dry spell, and onset projections at Panchayat resolution.
            </p>
          </div>

          {/* Controls: Location & Horizon */}
          <div className="flex flex-wrap items-center gap-3">
            <LocationSelector />
            <HorizonSelector />
          </div>
        </div>

        {/* Quick summary stats strip */}
        <div className="mt-5 pt-4 border-t border-earth-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-earth-50 border border-earth-200">
            <span className="text-earth-400 block text-[10px] uppercase font-bold">Horizon Period</span>
            <span className="font-extrabold text-earth-800 text-sm">{selectedHorizon} Days Projection</span>
          </div>
          <div className="p-2.5 rounded-xl bg-earth-50 border border-earth-200">
            <span className="text-earth-400 block text-[10px] uppercase font-bold">Total Expected Rain</span>
            <span className="font-extrabold text-sky-800 text-sm">{kpis?.expectedRainfall || 0} mm</span>
          </div>
          <div className="p-2.5 rounded-xl bg-earth-50 border border-earth-200">
            <span className="text-earth-400 block text-[10px] uppercase font-bold">Onset Confidence</span>
            <span className="font-extrabold text-monsoon-800 text-sm">{kpis?.confidence || 0}% Certainty</span>
          </div>
          <div className="p-2.5 rounded-xl bg-earth-50 border border-earth-200">
            <span className="text-earth-400 block text-[10px] uppercase font-bold">Dry Spell Hazard</span>
            <span className={`font-extrabold text-sm ${kpis?.drySpellProb >= 50 ? 'text-amber-700' : 'text-emerald-700'}`}>
              {kpis?.drySpellProb || 0}% ({kpis?.riskLevel || 'Moderate'})
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Forecast Card */}
      <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-xs space-y-4">
        {/* Navigation & Series Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-earth-100 gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('chart')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'chart'
                  ? 'bg-monsoon-800 text-white shadow-xs'
                  : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
              }`}
            >
              Interactive Curves
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('table')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'table'
                  ? 'bg-monsoon-800 text-white shadow-xs'
                  : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
              }`}
            >
              Daily Breakdown Table
            </button>
          </div>

          {/* Series Visibility Toggles */}
          {activeTab === 'chart' && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-earth-400 font-semibold text-[11px] uppercase tracking-wider mr-1">
                Toggle Series:
              </span>
              <button
                type="button"
                onClick={() => toggleSeries('rainfallProb')}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                  visibleSeries.rainfallProb
                    ? 'bg-teal-50 border-teal-300 text-teal-800'
                    : 'bg-white border-earth-200 text-earth-400 opacity-60'
                }`}
              >
                Rainfall Prob
              </button>
              <button
                type="button"
                onClick={() => toggleSeries('drySpellProb')}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                  visibleSeries.drySpellProb
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-white border-earth-200 text-earth-400 opacity-60'
                }`}
              >
                Dry Spell Prob
              </button>
              <button
                type="button"
                onClick={() => toggleSeries('heavyRainProb')}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                  visibleSeries.heavyRainProb
                    ? 'bg-sky-50 border-sky-300 text-sky-800'
                    : 'bg-white border-earth-200 text-earth-400 opacity-60'
                }`}
              >
                Heavy Rain Prob
              </button>
              <button
                type="button"
                onClick={() => toggleSeries('onsetProb')}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                  visibleSeries.onsetProb
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-earth-200 text-earth-400 opacity-60'
                }`}
              >
                Onset Prob
              </button>
              <button
                type="button"
                onClick={() => toggleSeries('expectedRainfall')}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                  visibleSeries.expectedRainfall
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                    : 'bg-white border-earth-200 text-earth-400 opacity-60'
                }`}
              >
                Daily Rain (mm)
              </button>
            </div>
          )}
        </div>

        {/* View Mode 1: Interactive Recharts */}
        {activeTab === 'chart' ? (
          <div>
            <div className="h-96 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  {/* Left Axis: Probabilities 0 - 100% */}
                  <YAxis
                    yAxisId="left"
                    stroke="#94a3b8"
                    fontSize={11}
                    domain={[0, 100]}
                    unit="%"
                    tickLine={false}
                  />
                  {/* Right Axis: Daily Rain mm */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#6366f1"
                    fontSize={11}
                    domain={[0, 50]}
                    unit="mm"
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }} />

                  {/* Daily Rainfall Bars on Right Axis */}
                  {visibleSeries.expectedRainfall && (
                    <Bar
                      yAxisId="right"
                      dataKey="expectedRainfall"
                      name="Expected Rain (mm)"
                      fill="#818cf8"
                      opacity={0.4}
                      radius={[4, 4, 0, 0]}
                    />
                  )}

                  {/* Lines on Left Axis */}
                  {visibleSeries.rainfallProb && (
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="rainfallProb"
                      name="Rainfall Probability (%)"
                      stroke="#0d9488"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  )}
                  {visibleSeries.drySpellProb && (
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="drySpellProb"
                      name="Dry Spell Probability (%)"
                      stroke="#d97706"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  )}
                  {visibleSeries.heavyRainProb && (
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="heavyRainProb"
                      name="Heavy Rainfall Probability (%)"
                      stroke="#0284c7"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  )}
                  {visibleSeries.onsetProb && (
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="onsetProb"
                      name="Onset Probability (%)"
                      stroke="#15803d"
                      strokeWidth={2.5}
                      strokeDasharray="4 2"
                      dot={{ r: 3 }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-earth-500 pt-2 px-1">
              <span>Left Axis: Probability (%)</span>
              <span>Right Axis: Daily Rain Volume (mm)</span>
            </div>
          </div>
        ) : (
          /* View Mode 2: Table Breakdown */
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-earth-100 text-earth-700 sticky top-0">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Day & Date</th>
                  <th className="py-2.5 px-3 font-bold text-center">Onset Prob</th>
                  <th className="py-2.5 px-3 font-bold text-center">Dry Spell Prob</th>
                  <th className="py-2.5 px-3 font-bold text-center">Heavy Rain Prob</th>
                  <th className="py-2.5 px-3 font-bold text-center">Rainfall (mm)</th>
                  <th className="py-2.5 px-3 font-bold text-center">Soil Moisture</th>
                  <th className="py-2.5 px-3 font-bold text-right">Risk Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                {chartData.map((d, index) => (
                  <tr key={d.day} className={index % 2 === 0 ? 'bg-white' : 'bg-earth-50/50'}>
                    <td className="py-2 px-3 font-semibold text-earth-900">
                      {d.day} <span className="text-earth-400 font-normal">({d.date})</span>
                    </td>
                    <td className="py-2 px-3 text-center font-bold text-monsoon-800">{d.onsetProb}%</td>
                    <td className="py-2 px-3 text-center font-bold text-amber-700">{d.drySpellProb}%</td>
                    <td className="py-2 px-3 text-center font-bold text-sky-800">{d.heavyRainProb}%</td>
                    <td className="py-2 px-3 text-center font-extrabold text-earth-800">{d.expectedRainfall} mm</td>
                    <td className="py-2 px-3 text-center font-medium text-earth-600">{d.soilMoisture}%</td>
                    <td className="py-2 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskBadge(d.riskLevel)}`}>
                        {d.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Forecast Summary Narrative Below Chart (Required) */}
        <div className="p-4 rounded-xl bg-earth-50 border border-earth-200 flex items-start gap-3 mt-4">
          <div className="p-2 bg-monsoon-700 text-white rounded-lg shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-earth-500">
              Synoptic Forecast Analysis & Outlook ({currentLocationObj?.name} Block)
            </div>
            <p className="text-sm font-semibold text-earth-900 mt-1 leading-relaxed">
              “{forecast?.forecastSummary || 'Initial rainfall is expected during the coming week, followed by a moderate probability of a dry spell.'}”
            </p>
            <p className="text-xs text-earth-500 mt-1.5">
              Based on physics-informed neural network downscaling of IMD synoptic charts and atmospheric sounding profiles.
            </p>
          </div>
        </div>
      </div>

      {/* Onset & Break Monsoon Detailed Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonsoonOnsetSection />
        <BreakMonsoonSection />
      </div>
    </div>
  );
}
