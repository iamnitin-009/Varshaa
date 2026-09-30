import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchLocations, fetchForecast, fetchClimateSignals } from '../utils/api';

const ForecastContext = createContext();

export const ForecastProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('modinagar');
  const [selectedHorizon, setSelectedHorizon] = useState(14);
  const [forecast, setForecast] = useState(null);
  const [climateSignals, setClimateSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Initial load: locations and climate signals
  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        const [locRes, signalsRes] = await Promise.all([
          fetchLocations(),
          fetchClimateSignals()
        ]);

        if (locRes.data && locRes.data.length > 0) {
          setLocations(locRes.data);
          // Default to Modinagar (shows active dry spell risk for SIH demo) or first location
          const defaultLoc = locRes.data.find(l => l.id === 'modinagar') || locRes.data[0];
          setSelectedLocation(defaultLoc.id);
        }

        if (signalsRes.data) {
          setClimateSignals(signalsRes.data);
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError('Failed to load initial meteorological baseline data.');
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  // Fetch forecast whenever selectedLocation or selectedHorizon changes
  const loadForecast = useCallback(async (locId, horizonDays, showGeneratingAnimation = false) => {
    try {
      if (showGeneratingAnimation) {
        setIsGenerating(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const targetLoc = locId || selectedLocation;
      const targetHorizon = horizonDays || selectedHorizon;

      // Small delay if manual generation to show simulation computing feedback
      if (showGeneratingAnimation) {
        await new Promise(r => setTimeout(r, 600));
      }

      const res = await fetchForecast(targetLoc, targetHorizon);
      if (res.data) {
        setForecast(res.data);
      }
    } catch (err) {
      console.error('Error fetching forecast:', err);
      setError('Could not retrieve hyperlocal forecast model output.');
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  }, [selectedLocation, selectedHorizon]);

  useEffect(() => {
    if (selectedLocation) {
      loadForecast(selectedLocation, selectedHorizon, false);
    }
  }, [selectedLocation, selectedHorizon, loadForecast]);

  const triggerForecastGeneration = () => {
    loadForecast(selectedLocation, selectedHorizon, true);
  };

  const currentLocationObj = locations.find(l => l.id === selectedLocation) || locations[0] || null;

  return (
    <ForecastContext.Provider
      value={{
        locations,
        selectedLocation,
        setSelectedLocation,
        currentLocationObj,
        selectedHorizon,
        setSelectedHorizon,
        forecast,
        climateSignals,
        loading,
        isGenerating,
        error,
        triggerForecastGeneration,
        loadForecast
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};

export const useForecast = () => {
  const context = useContext(ForecastContext);
  if (!context) {
    throw new Error('useForecast must be used within a ForecastProvider');
  }
  return context;
};
