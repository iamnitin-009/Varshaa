import React from 'react';

export default function SimulatedDataBadge({ size = 'md', className = '' }) {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 text-amber-900 font-medium shadow-xs ${
        isSm ? 'px-2.5 py-0.5 text-xs' : 'px-3.5 py-1 text-xs md:text-sm'
      } ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
      <span className="tracking-wide">Prototype • Simulated Forecast Data</span>
    </div>
  );
}
