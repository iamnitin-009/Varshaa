import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForecast } from '../context/ForecastContext';
import { useLanguage } from '../context/LanguageContext';
import { generateCropAdvisory } from '../utils/api';
import SimulatedDataBadge from '../components/SimulatedDataBadge';
import {
  Sprout,
  AlertTriangle,
  Droplet,
  CloudRain,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Volume2,
  Languages,
  Send,
  Wheat
} from 'lucide-react';

const CROPS = [
  { id: 'Rice', nameEn: 'Rice (Paddy)', nameHi: 'धान (चावल)', icon: '🌾' },
  { id: 'Wheat', nameEn: 'Wheat', nameHi: 'गेहूं', icon: '🌿' },
  { id: 'Maize', nameEn: 'Maize', nameHi: 'मक्का', icon: '🌽' },
  { id: 'Pulses', nameEn: 'Pulses (Arhar/Moong)', nameHi: 'दलहन (अरहर/मूंग)', icon: '🌱' }
];

const STAGES = [
  { id: 'Sowing', nameEn: 'Sowing / Nursery', nameHi: 'बुवाई / नर्सरी', descEn: 'Seed germination & early establishment', descHi: 'अंकुरण व शुरुआती पौध अवस्था' },
  { id: 'Vegetative', nameEn: 'Vegetative Tillering', nameHi: 'वानस्पतिक वृद्धि', descEn: 'Rapid canopy growth & moisture demand', descHi: 'कल्ले फूटना व पत्तियों का विकास' },
  { id: 'Flowering', nameEn: 'Flowering / Heading', nameHi: 'फूल आना / बाली निकलना', descEn: 'Peak vulnerability to moisture shock', descHi: 'नमी की कमी से सर्वाधिक नुकसान' },
  { id: 'Harvest', nameEn: 'Maturity / Harvest', nameHi: 'परिपक्वता / कटाई', descEn: 'Vulnerable to unseasonal rain damage', descHi: 'असामयिक बारिश से नुकसान का खतरा' }
];

export default function AdvisoryPage() {
  const [searchParams] = useSearchParams();
  const { locations, selectedLocation, setSelectedLocation } = useForecast();
  const { lang, setLang, isHindi } = useLanguage();

  const queryLoc = searchParams.get('location');

  const [activeLoc, setActiveLoc] = useState(queryLoc || selectedLocation || 'modinagar');
  const [activeCrop, setActiveCrop] = useState('Rice');
  const [activeStage, setActiveStage] = useState('Sowing');
  const [advisoryResult, setAdvisoryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync if URL query param is present
  useEffect(() => {
    if (queryLoc) {
      setActiveLoc(queryLoc);
      setSelectedLocation(queryLoc);
    }
  }, [queryLoc, setSelectedLocation]);

  // Load advisory on initial mount or when inputs change
  const handleGenerate = async (loc = activeLoc, crop = activeCrop, stage = activeStage) => {
    try {
      setLoading(true);
      const res = await generateCropAdvisory({
        location: loc,
        crop: crop,
        cropStage: stage,
        horizon: 7
      });
      if (res.data) {
        setAdvisoryResult(res.data);
      }
    } catch (err) {
      console.error('Failed to generate advisory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate(activeLoc, activeCrop, activeStage);
  }, []);

  const locObj = locations.find(l => l.id === activeLoc) || locations[0];

  // Active language content
  const content = advisoryResult ? (isHindi ? advisoryResult.hi : advisoryResult.en) : null;
  const metrics = advisoryResult?.meteorologicalContext;

  // Text to speech simulation for rural farmers
  const handleSpeak = () => {
    if (!content) return;
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const text = isHindi
        ? `${content.riskTitle}। अनुशंसित सलाह: ${content.recommendedAction}। कारण: ${content.whyReasoning}`
        : `${content.riskTitle}. Recommended action: ${content.recommendedAction}. Reason: ${content.whyReasoning}`;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with Language Toggle */}
      <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <SimulatedDataBadge size="sm" />
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-monsoon-100 text-monsoon-900 border border-monsoon-300">
                Crop Phenology & Soil-Water Balance Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-earth-900 tracking-tight font-sans">
              {isHindi ? 'फसल-विशिष्ट कृषि मौसम परामर्श' : 'Crop-Specific Agricultural Advisory'}
            </h1>
            <p className="text-xs sm:text-sm text-earth-500 mt-1">
              {isHindi
                ? 'स्थानीय मानसूनी जोखिम, फसल अवस्था और मिट्टी की नमी पर आधारित किसान-केन्द्रित वैज्ञानिक सलाह।'
                : 'Actionable agro-climatic advisories tailored to crop growth stages and hyperlocal monsoon risk.'}
            </p>
          </div>

          {/* Language Switch: English | हिन्दी */}
          <div className="flex items-center gap-2 bg-earth-50 border border-earth-200 p-1.5 rounded-xl self-start lg:self-center">
            <Languages className="w-4 h-4 text-monsoon-700 ml-1" />
            <span className="text-xs font-bold text-earth-500 hidden sm:inline">भाषा / Language:</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                !isHindi
                  ? 'bg-monsoon-800 text-white shadow-xs'
                  : 'text-earth-600 hover:text-earth-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                isHindi
                  ? 'bg-monsoon-800 text-white shadow-xs'
                  : 'text-earth-600 hover:text-earth-900'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Input Configuration & Dynamic Advisory Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Farmer Input Form (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-earth-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-earth-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-earth-900 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-monsoon-700" />
              <span>{isHindi ? 'खेत और फसल विवरण' : 'Farm & Crop Parameters'}</span>
            </h2>
            <span className="text-xs text-monsoon-700 font-semibold">Step 1 of 2</span>
          </div>

          {/* 1. Location Selection */}
          <div>
            <label className="block text-xs font-bold text-earth-700 uppercase tracking-wide mb-1.5">
              {isHindi ? 'स्थान (ब्लॉक / पंचायत)' : 'Study Location (Block)'}
            </label>
            <select
              value={activeLoc}
              onChange={(e) => setActiveLoc(e.target.value)}
              className="w-full p-2.5 bg-earth-50 border border-earth-300 rounded-xl text-sm font-semibold text-earth-900 focus:outline-hidden focus:border-monsoon-600"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.district}, UP) — {loc.riskLevel} Risk
                </option>
              ))}
            </select>
          </div>

          {/* 2. Crop Selection */}
          <div>
            <label className="block text-xs font-bold text-earth-700 uppercase tracking-wide mb-2">
              {isHindi ? 'फसल चुनें (Crop)' : 'Select Crop'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CROPS.map((crop) => {
                const isSelected = activeCrop === crop.id;
                return (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => setActiveCrop(crop.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-monsoon-50 border-monsoon-600 text-monsoon-950 font-bold shadow-xs ring-1 ring-monsoon-500'
                        : 'bg-white border-earth-200 text-earth-700 hover:border-earth-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">{crop.icon}</span>
                    <span className="text-xs font-semibold">
                      {isHindi ? crop.nameHi : crop.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Crop Growth Stage */}
          <div>
            <label className="block text-xs font-bold text-earth-700 uppercase tracking-wide mb-2">
              {isHindi ? 'फसल की अवस्था (Growth Stage)' : 'Select Crop Stage'}
            </label>
            <div className="space-y-1.5">
              {STAGES.map((stg) => {
                const isSelected = activeStage === stg.id;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => setActiveStage(stg.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-monsoon-800 text-white border-monsoon-900 font-bold shadow-xs'
                        : 'bg-white border-earth-200 text-earth-700 hover:bg-earth-50'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-earth-900'}`}>
                        {isHindi ? stg.nameHi : stg.nameEn}
                      </div>
                      <div className={`text-[10px] ${isSelected ? 'text-monsoon-200' : 'text-earth-400'}`}>
                        {isHindi ? stg.descHi : stg.descEn}
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Advisory Button */}
          <button
            type="button"
            onClick={() => handleGenerate(activeLoc, activeCrop, activeStage)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-monsoon-700 to-teal-600 hover:from-monsoon-800 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>
              {loading
                ? (isHindi ? 'सलाह तैयार की जा रही है...' : 'Generating Advisory...')
                : (isHindi ? 'सलाह प्राप्त करें (Generate Advisory)' : 'Generate Advisory')}
            </span>
          </button>
        </div>

        {/* Right Side: Dynamic Advisory Presentation (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {content ? (
            <div className="bg-white border-2 border-monsoon-700/80 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
              {/* Header with Risk Banner & Audio Readout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-earth-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                      {content.riskBadge}
                    </span>
                    <span className="text-xs text-earth-500">
                      {isHindi ? 'पूर्वानुमान अवधि: अगले 7 दिन' : 'Outlook: Next 7 Days'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-earth-900 tracking-tight mt-2">
                    {content.riskTitle}
                  </h3>
                </div>

                {/* Audio speech button for rural farmers */}
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-earth-100 hover:bg-earth-200 text-earth-800 text-xs font-bold transition-all self-start sm:self-center cursor-pointer"
                  title="Listen to advisory"
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-monsoon-700 animate-pulse' : 'text-earth-600'}`} />
                  <span>{isSpeaking ? (isHindi ? 'सुन रहे हैं...' : 'Speaking...') : (isHindi ? 'बोलकर सुनाएं (Audio)' : 'Read Out Loud')}</span>
                </button>
              </div>

              {/* Primary Callout: Recommended Action (Required) */}
              <div className="p-5 rounded-2xl bg-monsoon-50/80 border-2 border-monsoon-600/60 shadow-xs">
                <div className="flex items-center gap-2 text-monsoon-900 font-extrabold text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-monsoon-700" />
                  <span>{isHindi ? 'अनुशंसित किसान कार्रवाई (Recommended Action)' : 'Recommended Action'}</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-earth-950 leading-relaxed">
                  “{content.recommendedAction}”
                </p>
              </div>

              {/* Reasoning: Why? (Required) */}
              <div className="p-4 rounded-xl bg-earth-50 border border-earth-200">
                <div className="flex items-center gap-2 text-earth-700 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <HelpCircle className="w-4 h-4 text-monsoon-700" />
                  <span>{isHindi ? 'वैज्ञानिक कारण (Why this action?)' : 'Why? (Meteorological Reasoning)'}</span>
                </div>
                <p className="text-sm font-medium text-earth-800 leading-relaxed">
                  “{content.whyReasoning}”
                </p>
              </div>

              {/* 4 Detail Grid: Rainfall Outlook, Moisture Risk, Suggested Action, Reasoning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900 mb-1">
                    <CloudRain className="w-4 h-4 text-sky-700" />
                    <span>{isHindi ? 'वर्षा का अनुमान (Rainfall Outlook)' : 'Rainfall Outlook'}</span>
                  </div>
                  <p className="text-xs text-sky-950 leading-relaxed font-medium">
                    {content.rainfallOutlook}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                    <Droplet className="w-4 h-4 text-amber-700" />
                    <span>{isHindi ? 'मिट्टी नमी जोखिम (Moisture Risk)' : 'Moisture Risk'}</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed font-medium">
                    {content.moistureRisk}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-earth-50 border border-earth-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-earth-700 mb-1">
                    <Droplet className="w-4 h-4 text-monsoon-700" />
                    <span>{isHindi ? 'सिंचाई दिशा-निर्देश' : 'Irrigation Directive'}</span>
                  </div>
                  <p className="text-xs text-earth-800 leading-relaxed font-medium">
                    {content.irrigationAdvice}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-earth-50 border border-earth-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-earth-700 mb-1">
                    <Sprout className="w-4 h-4 text-monsoon-700" />
                    <span>{isHindi ? 'उर्वरक / खाद सलाह' : 'Fertilizer & Spray'}</span>
                  </div>
                  <p className="text-xs text-earth-800 leading-relaxed font-medium">
                    {content.fertilizerAdvice}
                  </p>
                </div>
              </div>

              {/* Sowing Suitability Index */}
              <div className="p-4 rounded-xl bg-earth-50 border border-earth-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-earth-500">
                    {isHindi ? 'कृषि कार्य अनुकूलता सूचकांक' : 'Field Operation Suitability Index'}
                  </span>
                  <div className="text-sm font-semibold text-earth-800 mt-0.5">
                    {content.suitabilityScore}/100 — {content.suitabilityScore > 60 ? (isHindi ? 'अनुकूल' : 'Favorable') : (isHindi ? 'सतर्कता आवश्यक' : 'Caution Advised')}
                  </div>
                </div>

                <div className="w-full sm:w-48">
                  <div className="w-full h-2.5 bg-earth-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        content.suitabilityScore > 65
                          ? 'bg-emerald-600'
                          : content.suitabilityScore > 40
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${content.suitabilityScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Quick Link to Alerts Generator */}
              <div className="pt-2 border-t border-earth-100 flex flex-col sm:flex-row items-center justify-between text-xs text-earth-500 gap-2">
                <span>
                  {isHindi ? 'गाँव स्तर पर यह चेतावनी प्रसारित करें' : 'Dispatch this advisory to farmers via SMS / WhatsApp'}
                </span>
                <Link
                  to="/alerts"
                  className="font-bold text-monsoon-800 hover:text-monsoon-900 inline-flex items-center gap-1"
                >
                  <span>{isHindi ? 'किसान अलर्ट बनाएं →' : 'Generate SMS Alert →'}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-earth-200 rounded-2xl p-12 text-center text-earth-500">
              Generating crop advisory for {activeCrop}...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
