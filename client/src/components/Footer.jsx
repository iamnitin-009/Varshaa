import React from 'react';
import { Link } from 'react-router-dom';
import SimulatedDataBadge from './SimulatedDataBadge';
import { CloudRain, Shield, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-300 mt-16 border-t border-earth-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-monsoon-700 flex items-center justify-center text-white shadow-md">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  VARSHAA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 ml-2 bg-monsoon-900 text-monsoon-300 border border-monsoon-700 rounded">
                  SIH Prototype
                </span>
                <p className="text-xs text-earth-400">Hyperlocal Monsoon Intelligence</p>
              </div>
            </div>

            <p className="text-xs text-earth-400 max-w-md leading-relaxed">
              Hyperlocal prediction of Indian monsoon onset, break/dry spells and heavy rainfall at
              Block/Panchayat level, with crop-specific agricultural advisories.
            </p>

            <div className="pt-1">
              <SimulatedDataBadge size="sm" />
            </div>

            <p className="text-[11px] text-earth-400 italic">
              “Predict. Prepare. Protect.” — Empowering Indian farmers and panchayat administration with actionable agro-climatic intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-earth-200 mb-3">
              System Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Monsoon Intelligence Dashboard
                </Link>
              </li>
              <li>
                <Link to="/forecast" className="hover:text-white transition-colors">
                  Multi-Horizon Forecast Curves
                </Link>
              </li>
              <li>
                <Link to="/risk-map" className="hover:text-white transition-colors">
                  Hyperlocal Risk Map (Leaflet)
                </Link>
              </li>
              <li>
                <Link to="/advisory" className="hover:text-white transition-colors">
                  Crop Advisory Engine
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-white transition-colors">
                  Farmer Alert Generator (SMS/WA)
                </Link>
              </li>
              <li>
                <Link to="/model" className="hover:text-white transition-colors">
                  Model Architecture & Pipeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Note */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-earth-200 mb-3">
              Prototype Disclaimer
            </h4>
            <p className="text-[11px] text-earth-400 leading-relaxed">
              Current prototype uses simulated data to demonstrate the prediction workflow. The
              architecture is designed for integration with real meteorological datasets (IMD,
              NCMRWF, ERA5) and trained ML downscalers.
            </p>
            <div className="mt-4 p-2.5 rounded-lg bg-earth-800/80 border border-earth-700/80 text-[11px] text-earth-300">
              <span className="font-semibold text-monsoon-400">Study Region:</span> Western Uttar Pradesh / NCR Cluster (Ghaziabad, Modinagar, Loni, Hapur, Dadri).
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-earth-800 flex flex-col sm:flex-row items-center justify-between text-xs text-earth-400 gap-3">
          <div>
            © {new Date().getFullYear()} VARSHAA • Smart India Hackathon Prototype
          </div>
          <div className="flex items-center gap-4">
            <span className="text-earth-400">Single Render Web Service Architecture</span>
            <span className="text-earth-400">•</span>
            <span className="text-earth-400">Zero External API Keys Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
