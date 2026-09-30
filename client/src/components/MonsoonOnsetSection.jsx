import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { Calendar, CheckCircle2, Compass, Droplet, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MonsoonOnsetSection() {
  const { forecast } = useForecast();

  if (!forecast) return null;

  const onset = forecast.onsetDetails;
  const stages = [
    { id: 'pre', label: 'Pre-Onset', desc: 'Cross-equatorial flow active' },
    { id: 'possible', label: 'Possible Onset', desc: 'Tropospheric shear vortex' },
    { id: 'likely', label: 'Likely Onset', desc: 'Monsoon surge over Bay of Bengal' },
    { id: 'established', label: 'Established', desc: '2.5mm rain for 2 days' }
  ];

  // Active stage index (Likely Onset is index 2)
  const currentStageIndex = 2;

  return (
    <div className="bg-white border border-earth-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-earth-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                Phase Active
              </span>
              <h3 className="text-lg font-bold text-earth-900 tracking-tight uppercase">
                Expected Monsoon Onset
              </h3>
            </div>
            <p className="text-xs text-earth-500 mt-0.5">
              Northern limit of monsoon (NLM) synoptic tracking & block-level criteria
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-300/80 rounded-xl text-emerald-900">
            <span className="text-xs font-semibold">Status:</span>
            <span className="text-sm font-extrabold">{onset.status}</span>
          </div>
        </div>

        {/* 4 Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5">
          <div className="bg-earth-50/70 p-3.5 rounded-xl border border-earth-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-monsoon-700" />
              <span>Expected Window</span>
            </div>
            <div className="text-sm md:text-base font-bold text-earth-900">
              {onset.expectedWindow}
            </div>
          </div>

          <div className="bg-earth-50/70 p-3.5 rounded-xl border border-earth-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-500 mb-1">
              <Compass className="w-3.5 h-3.5 text-monsoon-700" />
              <span>Onset Probability</span>
            </div>
            <div className="text-sm md:text-base font-bold text-monsoon-800">
              {onset.probability}%
            </div>
          </div>

          <div className="bg-earth-50/70 p-3.5 rounded-xl border border-earth-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-500 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-monsoon-700" />
              <span>Model Confidence</span>
            </div>
            <div className="text-sm md:text-base font-bold text-earth-900">
              {onset.confidence}%
            </div>
          </div>

          <div className="bg-earth-50/70 p-3.5 rounded-xl border border-earth-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-500 mb-1">
              <Droplet className="w-3.5 h-3.5 text-monsoon-700" />
              <span>Rainfall Trend</span>
            </div>
            <div className="text-sm md:text-base font-bold text-sky-800 truncate" title={onset.rainfallTrend}>
              {onset.rainfallTrend}
            </div>
          </div>
        </div>

        {/* Visual Timeline: Pre-Onset → Possible Onset → Likely Onset → Established */}
        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-earth-500 mb-3">
            Monsoon Progression Timeline
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 relative">
            {stages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={stage.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-monsoon-800 text-white border-monsoon-900 shadow-md ring-2 ring-monsoon-500/30'
                      : isPast
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-earth-50/50 border-earth-200 text-earth-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold tracking-wider uppercase opacity-80">
                      Step 0{idx + 1}
                    </span>
                    {isPast && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {isCurrent && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-monsoon-900 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className={`font-bold text-sm ${isCurrent ? 'text-white' : isPast ? 'text-earth-900' : 'text-earth-500'}`}>
                    {stage.label}
                  </div>
                  <div className={`text-xs mt-1 leading-snug ${isCurrent ? 'text-monsoon-100' : 'text-earth-500'}`}>
                    {stage.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* IMD Trigger Verification */}
      <div className="mt-4 pt-3 border-t border-earth-100 flex flex-wrap items-center justify-between text-xs text-earth-500 gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>IMD Criteria Met: 2.5mm rain trigger + 600hPa Westerly wind flux</span>
        </span>
        <span className="text-earth-400">Resolution: 5km Block Downscale</span>
      </div>
    </div>
  );
}
