import React from 'react';
import SimulatedDataBadge from '../components/SimulatedDataBadge';
import {
  Cpu,
  Layers,
  Globe,
  Database,
  GitBranch,
  ArrowDown,
  ShieldAlert,
  Binary,
  CheckCircle,
  Activity,
  Workflow,
  Sparkles,
  Server,
  CloudRain
} from 'lucide-react';

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'GLOBAL CLIMATE SIGNALS',
    subtitle: 'ENSO • IOD • MJO • Teleconnections',
    icon: Globe,
    color: 'from-blue-600 to-indigo-700',
    description: 'Captures planetary planetary-scale ocean-atmosphere oscillations (Niño 3.4 SST anomalies, Dipole Mode Index, and eastward-propagating equatorial convective waves) that dictate subcontinent monsoon vigor.'
  },
  {
    step: '02',
    title: 'REGIONAL WEATHER DATA',
    subtitle: 'Rainfall • Temperature • Humidity • Soil Moisture',
    icon: Database,
    color: 'from-teal-600 to-emerald-700',
    description: 'Aggregates surface synoptic observations, Doppler weather radar reflectivity, ERA5 reanalysis, and 850 hPa low-level moisture convergence vectors across northern plains.'
  },
  {
    step: '03',
    title: 'HYBRID PREDICTION ENGINE',
    subtitle: 'Physics-Guided ML + Statistical Ensemble',
    icon: Cpu,
    color: 'from-emerald-700 to-monsoon-900',
    description: 'Couples dynamical atmospheric physics (conservation of mass and moisture budget) with Gradient Boosted Trees and Temporal Convolutional Networks to predict monsoon regime shifts.'
  },
  {
    step: '04',
    title: 'HYPERLOCAL DOWNSCALING',
    subtitle: 'Block / Panchayat (~5 km Resolution)',
    icon: Layers,
    color: 'from-amber-600 to-orange-700',
    description: 'Employs digital elevation models (DEM), land use patterns, and canal interfluve micro-climate weights to downscale 0.25° IMD grid to Block and Panchayat granularity.'
  },
  {
    step: '05',
    title: 'RISK PROBABILITIES',
    subtitle: 'Onset • Break / Dry Spell • Heavy Rain',
    icon: Activity,
    color: 'from-rose-600 to-red-700',
    description: 'Generates calibrated probability density functions for early/delayed onset windows, intra-seasonal monsoon break spells (>4 consecutive dry days), and heavy convective surges.'
  },
  {
    step: '06',
    title: 'AGRICULTURAL ADVISORY',
    subtitle: 'Crop + Stage + Location Rules Engine',
    icon: Sparkles,
    color: 'from-emerald-600 to-teal-800',
    description: 'Translates raw meteorological probabilities into actionable agronomic decisions for Paddy, Wheat, Maize, and Pulses across specific phenological phases.'
  }
];

const INPUT_CARDS = [
  { name: 'ENSO', category: 'Global Ocean-Atmosphere', source: 'NOAA CPC / ONI', desc: 'Sea surface temperature anomalies in Niño 3.4 index' },
  { name: 'IOD', category: 'Indian Ocean Dynamics', source: 'BoM / DMI', desc: 'Equatorial Indian Ocean Sea Surface Temperature gradient' },
  { name: 'MJO', category: 'Intraseasonal Waves', source: 'Wheeler-Hendon Phase Space', desc: 'Convective pulse phase and amplitude tracking' },
  { name: 'Historical Rainfall', category: 'Climatological Baseline', source: 'IMD 50-Yr Gridded LPA', desc: 'Long-period average precipitation distribution' },
  { name: 'Rainfall Anomaly', category: 'Synoptic Monitoring', source: 'IMD NCMRWF / WRF', desc: 'Deviation from expected seasonal baseline' },
  { name: 'Temperature', category: 'Thermodynamics', source: 'AWS Automatic Weather Stations', desc: 'Diurnal range and maximum convective heating' },
  { name: 'Humidity', category: 'Moisture Flux', source: 'Surface AWS & Radiosonde', desc: 'Specific humidity & dew point at 850 hPa' },
  { name: 'Soil Moisture', category: 'Boundary Conditions', source: 'SMAP / Root-Zone Simulation', desc: '0-30 cm volumetric root-zone water saturation' }
];

const OUTPUT_CARDS = [
  { name: 'Monsoon Onset Probability', metric: '0 – 100%', threshold: 'IMD 2.5mm / 2 consecutive days trigger', desc: 'Likelihood of monsoon front arrival within 7–14 days window.' },
  { name: 'Dry Spell Probability', metric: '0 – 100%', threshold: 'Rainfall < 2.5 mm for ≥ 4 consecutive days', desc: 'Probability of break monsoon trough shift causing moisture stress.' },
  { name: 'Heavy Rain Probability', metric: '0 – 100%', threshold: 'Daily rainfall > 64.5 mm (IMD Heavy Rain)', desc: 'Risk of localized waterlogging and convective inundation.' },
  { name: 'Rainfall Anomaly', metric: '% vs LPA', threshold: 'Deficit (<-19%), Normal (±19%), Excess (>+19%)', desc: 'Sub-divisional cumulative volume variance projection.' },
  { name: 'Confidence Score', metric: '0 – 100%', threshold: 'Ensemble member agreement ratio', desc: 'Multi-model spread and forecast reliability index.' }
];

export default function ModelMethodologyPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white border border-earth-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <SimulatedDataBadge size="sm" />
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-monsoon-100 text-monsoon-900 border border-monsoon-300">
                Physics-Guided Machine Learning (PGML) Pipeline
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-earth-900 tracking-tight font-sans">
              Model Architecture & Downscaling Methodology
            </h1>
            <p className="text-sm sm:text-base text-earth-600 mt-2 leading-relaxed">
              VARSHAA bridges the critical spatial gap between continental numerical weather predictions
              and farm-level decision making through physics-informed spatial-temporal downscaling.
            </p>
          </div>

          <div className="p-3 bg-earth-50 border border-earth-200 rounded-xl text-xs text-earth-700 font-semibold max-w-xs">
            <span className="text-monsoon-800 font-extrabold block mb-0.5">SIH Innovation Focus:</span>
            Sub-divisional IMD forecasts downscaled to ~5km Block/Panchayat resolution.
          </div>
        </div>

        {/* Mandatory SIH Prototype Disclaimer Note (Required) */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-300/80 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <strong className="block font-bold text-amber-900 uppercase tracking-wide mb-0.5">
              Notice for Hackathon Evaluators:
            </strong>
            “Current prototype uses simulated data to demonstrate the prediction workflow. The
            architecture is designed for integration with real meteorological datasets and trained ML
            models.”
          </div>
        </div>
      </div>

      {/* Visually Impressive Pipeline Visualization (Required) */}
      <div className="bg-white border border-earth-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-monsoon-700">
            End-to-End Workflow Architecture
          </span>
          <h2 className="text-2xl font-black text-earth-900 tracking-tight mt-1">
            Data Ingestion to Agricultural Advisory Pipeline
          </h2>
          <p className="text-xs text-earth-500 mt-1">
            How macro-climatic atmospheric teleconnections are translated into hyperlocal crop protection decisions.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto pt-4">
          {PIPELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                <div className="p-5 rounded-2xl border border-earth-200 bg-earth-50/60 hover:bg-white hover:border-monsoon-500 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-monsoon-800">
                          STAGE {step.step}
                        </span>
                        <span className="text-earth-300">•</span>
                        <span className="text-xs font-semibold text-earth-500">
                          {step.subtitle}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-earth-900 tracking-tight mt-0.5">
                        {step.title}
                      </h3>
                      <p className="text-xs text-earth-600 mt-1 leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow connector between pipeline blocks */}
                {idx < PIPELINE_STEPS.length - 1 && (
                  <div className="flex justify-center my-1.5">
                    <div className="w-8 h-8 rounded-full bg-monsoon-50 border border-monsoon-200 flex items-center justify-center text-monsoon-700 shadow-2xs">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Inputs & Outputs Cards (Required) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Cards */}
        <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-earth-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-monsoon-700">
                Data Feeds (8 Parameters)
              </span>
              <h3 className="text-lg font-black text-earth-900">Model Inputs</h3>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-earth-100 text-earth-700 rounded-lg">
              Dynamic Ingestion
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INPUT_CARDS.map((inp) => (
              <div
                key={inp.name}
                className="p-3.5 rounded-xl border border-earth-200/90 bg-earth-50/50 hover:bg-earth-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-earth-900">{inp.name}</span>
                  <span className="text-[10px] font-semibold text-monsoon-700 bg-monsoon-50 px-2 py-0.5 rounded border border-monsoon-200">
                    {inp.category}
                  </span>
                </div>
                <div className="text-[11px] text-earth-400 font-medium">{inp.source}</div>
                <p className="text-xs text-earth-600 mt-1 leading-snug">{inp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Output Cards */}
        <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-earth-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-monsoon-700">
                Forecast Outputs (5 Target Variables)
              </span>
              <h3 className="text-lg font-black text-earth-900">Model Outputs</h3>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-lg">
              Panchayat Level
            </span>
          </div>

          <div className="space-y-3">
            {OUTPUT_CARDS.map((out) => (
              <div
                key={out.name}
                className="p-4 rounded-xl border border-earth-200/90 bg-earth-50/50 hover:bg-white hover:border-monsoon-400 transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-earth-900">{out.name}</h4>
                    <p className="text-xs text-earth-600 mt-0.5 leading-snug">{out.desc}</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-extrabold rounded-lg bg-monsoon-50 text-monsoon-900 border border-monsoon-200 shrink-0">
                    {out.metric}
                  </span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-earth-200/60 flex items-center justify-between text-[11px] text-earth-500">
                  <span className="font-semibold text-earth-700">Threshold:</span>
                  <span className="italic">{out.threshold}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
