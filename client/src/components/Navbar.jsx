import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SimulatedDataBadge from './SimulatedDataBadge';
import {
  CloudRain,
  Compass,
  MapPin,
  Sprout,
  BellRing,
  Cpu,
  Menu,
  X,
  Languages,
  Activity
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: Compass },
  { path: '/forecast', label: 'Monsoon Forecast', icon: CloudRain },
  { path: '/risk-map', label: 'Hyperlocal Risk Map', icon: MapPin },
  { path: '/advisory', label: 'Crop Advisory', icon: Sprout },
  { path: '/alerts', label: 'Farmer Alerts', icon: BellRing },
  { path: '/model', label: 'Model & Methodology', icon: Cpu }
];

export default function Navbar() {
  const { lang, setLang, isHindi } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-earth-200 shadow-2xs">
      {/* Top micro-bar for SIH Badge & Language switcher */}
      <div className="bg-earth-100/70 border-b border-earth-200/60 px-4 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <SimulatedDataBadge size="sm" />
            <span className="text-[11px] text-earth-500 hidden sm:inline">
              Smart India Hackathon • Block & Panchayat Early Warning
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switch: English | हिन्दी */}
            <div className="flex items-center gap-1 bg-white border border-earth-300 rounded-md p-0.5 shadow-2xs">
              <Languages className="w-3.5 h-3.5 text-monsoon-700 ml-1" />
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-monsoon-800 text-white shadow-2xs'
                    : 'text-earth-600 hover:text-earth-900'
                }`}
              >
                English
              </button>
              <span className="text-earth-300 text-xs">|</span>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  lang === 'hi'
                    ? 'bg-monsoon-800 text-white shadow-2xs'
                    : 'text-earth-600 hover:text-earth-900'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-monsoon-800 via-monsoon-700 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <CloudRain className="w-6 h-6 animate-subtle-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-earth-900 font-sans">
                  VARSHAA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-monsoon-100 text-monsoon-800 rounded">
                  SIH
                </span>
              </div>
              <p className="text-[11px] font-medium text-earth-500 tracking-tight leading-none">
                Hyperlocal Monsoon Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-monsoon-50 text-monsoon-900 font-bold border border-monsoon-200 shadow-2xs'
                        : 'text-earth-600 hover:text-earth-900 hover:bg-earth-100/80'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-monsoon-700" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Tagline / Action badge */}
          <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-earth-200">
            <span className="text-xs font-semibold text-earth-500 italic">
              “Predict. Prepare. Protect.”
            </span>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-earth-600 hover:text-earth-900 hover:bg-earth-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-earth-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="pb-2 border-b border-earth-100 flex items-center justify-between">
            <span className="text-xs font-bold text-earth-400 uppercase tracking-wider">
              Navigation Menu
            </span>
            <span className="text-xs italic text-earth-500">“Predict. Prepare. Protect.”</span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-monsoon-100 text-monsoon-900 border border-monsoon-300'
                        : 'text-earth-700 hover:bg-earth-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-monsoon-700" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
