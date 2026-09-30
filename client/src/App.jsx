import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ForecastPage from './pages/ForecastPage';
import RiskMapPage from './pages/RiskMapPage';
import AdvisoryPage from './pages/AdvisoryPage';
import AlertsPage from './pages/AlertsPage';
import ModelMethodologyPage from './pages/ModelMethodologyPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-earth-50 text-earth-900 font-sans selection:bg-monsoon-200 selection:text-monsoon-900">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/risk-map" element={<RiskMapPage />} />
          <Route path="/advisory" element={<AdvisoryPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/model" element={<ModelMethodologyPage />} />
          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
