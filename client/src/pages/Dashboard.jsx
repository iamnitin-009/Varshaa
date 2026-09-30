import React from 'react';
import { Link } from 'react-router-dom';
import { useForecast } from '../context/ForecastContext';
import LocationSelector from '../components/LocationSelector';
import HorizonSelector from '../components/HorizonSelector';
import SimulatedDataBadge from '../components/SimulatedDataBadge';
import KpiCard from '../components/KpiCard';
import ClimateSignalsSection from '../components/ClimateSignalsSection';
import MonsoonOnsetSection from '../components/MonsoonOnsetSection';
import BreakMonsoonSection from '../components/BreakMonsoonSection';
import {
  Compass,
  CloudRain,
  Flame,
  CloudLightning,
  Droplets,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  MapPin,
  Sprout,
  BellRing,
  AlertTriangle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function Dashboard() {
  const {
    forecast,
    loading,
    isGenerating,
    triggerForecastGeneration,
    currentLocationObj,
    selectedHorizon
  } = useForecast();

  const kpis = forecast?.kpis || {
    onsetProb: 72,
    drySpellProb: 38,
    heavyRainProb: 24,
    expectedRainfall: 184,
    confidence: 81
  };

  const chartData = forecast?.dailyData || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero / Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-monsoon-900 via-monsoon-800 to-earth-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-monsoon-700/50">
        {/* Background decorative atmosphere circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-monsoon-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-skyaccent-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <SimulatedDataBadge size="sm" className="bg-amber-400/20 text-amber-200 border-amber-400/40" />
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-monsoon-700/60 border border-monsoon-500/40 text-monsoon-200">
                Panchayat Res: ~5km
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
              VARSHAA
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-monsoon-200 tracking-wide">
              Hyperlocal Monsoon Intelligence
            </h2>
            <p className="text-sm sm:text-base text-earth-200 leading-relaxed">
              “Hyperlocal rainfall intelligence for better agricultural decisions.”
            </p>
          </div>

          {/* Controls Bar: Location, Horizon, Generate Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <div className="shrink-0">
              <LocationSelector className="w-full sm:w-auto" />
            </div>

            <div className="shrink-0">
              <HorizonSelector />
            </div>

            <button
              type="button"
              onClick={triggerForecastGeneration}
              disabled={isGenerating || loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-monsoon-500 to-teal-500 hover:from-monsoon-600 hover:to-teal-600 text-white text-xs md:text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Computing...' : 'Generate Forecast'}</span>
            </button>
          </div>
        </div>

        {/* Sub-hero quick meta strip */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between text-xs text-earth-200 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Active Block: <strong>{currentLocationObj?.name || 'Ghaziabad'}</strong> ({currentLocationObj?.district || 'Ghaziabad'}, UP)</span>
            <span className="text-white/40">•</span>
            <span>Soil: {currentLocationObj?.soilType || 'Alluvial'}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-monsoon-300">Downscaled Horizon: <strong>{selectedHorizon} Days</strong></span>
            <span className="text-white/40">•</span>
            <span className="text-monsoon-300">Composite Risk: <strong>{kpis.riskLevel || 'Moderate'}</strong></span>
          </div>
        </div>
      </section>

      {/* Main KPI Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-earth-600">
            Primary Agro-Monsoon Indicators
          </h2>
          <span className="text-xs text-earth-500">Simulated Real-Time Downscaling</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard
            title="Monsoon Onset Probability"
            value={`${kpis.onsetProb}%`}
            probability={kpis.onsetProb}
            subtitle="Likely Onset window"
            trend="+14 mm/day"
            icon={Compass}
            colorScheme="monsoon"
            badgeText={kpis.onsetProb >= 70 ? 'High' : 'Moderate'}
          />

          <KpiCard
            title="Dry Spell Probability"
            value={`${kpis.drySpellProb}%`}
            probability={kpis.drySpellProb}
            subtitle="Root-zone moisture stress"
            trend={kpis.drySpellProb >= 50 ? 'Severe Risk' : 'Normal'}
            icon={Flame}
            colorScheme={kpis.drySpellProb >= 50 ? 'rose' : 'amber'}
            badgeText={kpis.drySpellProb >= 50 ? 'Alert' : 'Moderate'}
          />

          <KpiCard
            title="Heavy Rain Probability"
            value={`${kpis.heavyRainProb}%`}
            probability={kpis.heavyRainProb}
            subtitle="Inundation / surge index"
            trend={kpis.heavyRainProb >= 30 ? 'Surge Warning' : 'Normal'}
            icon={CloudLightning}
            colorScheme="sky"
            badgeText={kpis.heavyRainProb >= 30 ? 'Elevated' : 'Low'}
          />

          <KpiCard
            title="Expected Rainfall"
            value={kpis.expectedRainfall}
            unit="mm"
            subtitle={`Cumulative ${selectedHorizon} days`}
            trend="+8% vs LPA"
            icon={Droplets}
            colorScheme="indigo"
            badgeText="Cumulative"
          />

          <KpiCard
            title="Model Confidence"
            value={`${kpis.confidence}%`}
            probability={kpis.confidence}
            subtitle="Ensemble concordance"
            trend="High Certainty"
            icon={ShieldCheck}
            colorScheme="monsoon"
            badgeText="Ensemble"
          />
        </div>
      </section>

      {/* Climate Signals Section (Section 2) */}
      <section>
        <ClimateSignalsSection />
      </section>

      {/* Forecast Overview Chart (Section 3) */}
      <section className="bg-white border border-earth-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-earth-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-monsoon-700"></span>
              <h3 className="text-lg font-bold text-earth-900 tracking-tight">
                Monsoon Probability Curves ({selectedHorizon} Days)
              </h3>
            </div>
            <p className="text-xs text-earth-500 mt-0.5">
              Simulated time-series probabilities for Onset, Break (Dry Spell), and Heavy Rainfall
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/forecast"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-monsoon-50 hover:bg-monsoon-100 text-monsoon-900 font-semibold text-xs rounded-xl border border-monsoon-200 transition-colors"
            >
              <span>Detailed Forecast View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOnset" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803d" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#15803d" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorDry" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorHeavy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} unit="%" tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
              />
              <Area
                type="monotone"
                dataKey="onsetProb"
                name="Onset Probability (%)"
                stroke="#15803d"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOnset)"
              />
              <Area
                type="monotone"
                dataKey="drySpellProb"
                name="Dry Spell Probability (%)"
                stroke="#d97706"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDry)"
              />
              <Area
                type="monotone"
                dataKey="heavyRainProb"
                name="Heavy Rain Probability (%)"
                stroke="#0284c7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHeavy)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Forecast Summary Narrative Box */}
        <div className="p-4 rounded-xl bg-earth-50 border border-earth-200/80 flex items-start gap-3">
          <div className="p-2 bg-monsoon-100 text-monsoon-800 rounded-lg shrink-0 mt-0.5">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-earth-500">
              Synoptic Forecast Summary ({currentLocationObj?.name} Block)
            </span>
            <p className="text-sm font-semibold text-earth-800 mt-1 leading-relaxed">
              “{forecast?.forecastSummary || 'Initial rainfall is expected during the coming week, followed by a moderate probability of a dry spell.'}”
            </p>
          </div>
        </div>
      </section>

      {/* Sections 4 & 5: Monsoon Onset & Break Monsoon */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonsoonOnsetSection />
        <BreakMonsoonSection />
      </section>

      {/* Quick Launchpad to other modules */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/risk-map"
          className="group p-5 bg-white border border-earth-200 rounded-2xl shadow-xs hover:border-monsoon-500 hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-earth-900 group-hover:text-monsoon-800 transition-colors">
                Hyperlocal Risk Map
              </h4>
              <p className="text-xs text-earth-500">Interactive OpenStreetMap with color-coded risk blocks</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-earth-400 group-hover:text-monsoon-700 group-hover:translate-x-1 transition-all shrink-0" />
        </Link>

        <Link
          to="/advisory"
          className="group p-5 bg-white border border-earth-200 rounded-2xl shadow-xs hover:border-monsoon-500 hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-teal-100 text-teal-800 rounded-xl group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-earth-900 group-hover:text-monsoon-800 transition-colors">
                Crop Advisory Engine
              </h4>
              <p className="text-xs text-earth-500">Rice, Wheat, Maize & Pulses recommendations</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-earth-400 group-hover:text-monsoon-700 group-hover:translate-x-1 transition-all shrink-0" />
        </Link>

        <Link
          to="/alerts"
          className="group p-5 bg-white border border-earth-200 rounded-2xl shadow-xs hover:border-monsoon-500 hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-sky-100 text-sky-800 rounded-xl group-hover:scale-105 transition-transform">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-earth-900 group-hover:text-monsoon-800 transition-colors">
                Farmer Alerts Dispatcher
              </h4>
              <p className="text-xs text-earth-500">SMS / WhatsApp format generator in English & हिन्दी</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-earth-400 group-hover:text-monsoon-700 group-hover:translate-x-1 transition-all shrink-0" />
        </Link>
      </section>
    </div>
  );
}
