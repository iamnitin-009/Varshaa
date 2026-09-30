import React from 'react';

export default function KpiCard({
  title,
  value,
  unit = '',
  probability,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = 'monsoon', // 'monsoon' | 'amber' | 'sky' | 'indigo' | 'rose'
  badgeText
}) {
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'amber':
        return {
          bg: 'bg-amber-50/70',
          border: 'border-amber-200/80',
          text: 'text-amber-900',
          bar: 'bg-amber-500',
          iconBg: 'bg-amber-100 text-amber-700'
        };
      case 'rose':
        return {
          bg: 'bg-rose-50/70',
          border: 'border-rose-200/80',
          text: 'text-rose-900',
          bar: 'bg-rose-500',
          iconBg: 'bg-rose-100 text-rose-700'
        };
      case 'sky':
        return {
          bg: 'bg-sky-50/70',
          border: 'border-sky-200/80',
          text: 'text-sky-900',
          bar: 'bg-sky-500',
          iconBg: 'bg-sky-100 text-sky-700'
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-50/70',
          border: 'border-indigo-200/80',
          text: 'text-indigo-900',
          bar: 'bg-indigo-500',
          iconBg: 'bg-indigo-100 text-indigo-700'
        };
      default:
        return {
          bg: 'bg-monsoon-50/70',
          border: 'border-monsoon-200/80',
          text: 'text-monsoon-900',
          bar: 'bg-monsoon-600',
          iconBg: 'bg-monsoon-100 text-monsoon-800'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="relative overflow-hidden bg-white border border-earth-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-earth-500 tracking-wide uppercase">
              {title}
            </span>
            {badgeText && (
              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${colors.bg} ${colors.text} border ${colors.border}`}>
                {badgeText}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-earth-900 tracking-tight">
              {value}
            </span>
            {unit && <span className="text-sm font-semibold text-earth-500">{unit}</span>}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${colors.iconBg} shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Probability Progress Bar (if applicable) */}
      {probability !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-medium text-earth-500 mb-1">
            <span>Probability Index</span>
            <span className="font-bold text-earth-800">{probability}%</span>
          </div>
          <div className="w-full h-1.5 bg-earth-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
              style={{ width: `${Math.min(100, Math.max(0, probability))}%` }}
            />
          </div>
        </div>
      )}

      {/* Subtitle / Context info */}
      {subtitle && (
        <div className="mt-3 pt-2.5 border-t border-earth-100 text-xs text-earth-600 flex items-center justify-between">
          <span>{subtitle}</span>
          {trend && <span className="font-medium text-earth-700">{trend}</span>}
        </div>
      )}
    </div>
  );
}
