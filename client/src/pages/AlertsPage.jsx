import React, { useState, useEffect } from 'react';
import { useForecast } from '../context/ForecastContext';
import { useLanguage } from '../context/LanguageContext';
import SimulatedDataBadge from '../components/SimulatedDataBadge';
import {
  BellRing,
  Copy,
  Check,
  MessageSquare,
  Smartphone,
  Share2,
  RefreshCw,
  Volume2,
  AlertTriangle,
  Info,
  Send,
  Languages
} from 'lucide-react';

export default function AlertsPage() {
  const { locations, selectedLocation, setSelectedLocation } = useForecast();
  const { lang, setLang, isHindi } = useLanguage();

  const [activeLocId, setActiveLocId] = useState(selectedLocation || 'modinagar');
  const [copied, setCopied] = useState(false);
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'sms'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hazardType, setHazardType] = useState('dry_spell'); // 'dry_spell' | 'heavy_rain' | 'favorable'

  const activeLoc = locations.find(l => l.id === activeLocId) || locations[0];

  // Pre-configured alert templates based on hazard, location, and language
  const getAlertContent = () => {
    const locName = activeLoc?.name || 'Modinagar';
    const district = activeLoc?.district || 'Ghaziabad';

    if (hazardType === 'dry_spell') {
      return {
        en: `⚠️ VARSHAA MONSOON ALERT\n\nYour area [${locName} Block, ${district}] has a high probability of a dry spell over the next 7 days. Consider delaying sowing and keep irrigation arrangements ready.\n\n- Advisory ID: VAR-${Math.floor(1000 + Math.random() * 9000)}\n- Dial 1800-VARSHAA for Kisan Helpline`,
        hi: `⚠️ वर्षा मानसून चेतावनी\n\nआपके क्षेत्र [${locName} ब्लॉक, ${district}] में अगले 7 दिनों में सूखे (ड्राई स्पेल) की उच्च संभावना है। कृपया धान की बुवाई टालें और सिंचाई की व्यवस्था तैयार रखें।\n\n- परामर्श आईडी: VAR-${Math.floor(1000 + Math.random() * 9000)}\n- किसान हेल्पलाइन: 1800-VARSHAA`
      };
    } else if (hazardType === 'heavy_rain') {
      return {
        en: `🚨 VARSHAA MONSOON ALERT\n\nHeavy rainfall warning for [${locName} Block, ${district}]: Inundation expected over next 48-72 hours. Open field drainage channels immediately and suspend all pesticide spraying.\n\n- Prototype • Simulated Alert`,
        hi: `🚨 वर्षा मानसून चेतावनी\n\n[${locName} ब्लॉक, ${district}] के लिए भारी वर्षा की चेतावनी: अगले 48-72 घंटों में जलभराव की आशंका। खेतों में जल निकासी तुरंत सुनिश्चित करें और कीटनाशक छिड़काव रोकें।\n\n- प्रोटोटाइप • सिम्युलेटेड अलर्ट`
      };
    } else {
      return {
        en: `✅ VARSHAA MONSOON ADVISORY\n\nFavorable monsoon surge predicted in [${locName} Block, ${district}]. Ideal moisture window for paddy nursery preparation and timely seedbed sowing.\n\n- Prototype • Simulated Advisory`,
        hi: `✅ वर्षा मानसून सलाह\n\n[${locName} ब्लॉक, ${district}] में अनुकूल मानसूनी बारिश का अनुमान। धान की नर्सरी और खेत तैयारी के लिए उत्तम समय।\n\n- प्रोटोटाइप • सिम्युलेटेड सलाह`
      };
    }
  };

  const [currentText, setCurrentText] = useState(getAlertContent().en);

  // Update text when location, hazard, or language changes
  useEffect(() => {
    const alertPair = getAlertContent();
    setCurrentText(isHindi ? alertPair.hi : alertPair.en);
  }, [activeLocId, hazardType, isHindi]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAlert = () => {
    const alertPair = getAlertContent();
    setCurrentText(isHindi ? alertPair.hi : alertPair.en);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(currentText.replace(/[\n*#_]/g, ' '));
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
      {/* Top Banner */}
      <div className="bg-white border border-earth-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <SimulatedDataBadge size="sm" />
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                Panchayat Broadcast Gateway Simulation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-earth-900 tracking-tight">
              Farmer Alerts & SMS/WhatsApp Dispatcher
            </h1>
            <p className="text-xs sm:text-sm text-earth-500 mt-1">
              Automated bilingual early-warning broadcast simulator for block agronomists and farmers.
            </p>
          </div>

          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>DEMO ONLY • No actual SMS or WhatsApp is dispatched.</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Configurator on Left, Smartphone Mock on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Generator Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-earth-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-earth-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-earth-900 flex items-center gap-2">
              <BellRing className="w-4 h-4 text-monsoon-700" />
              <span>Alert Generator Controls</span>
            </h2>
          </div>

          {/* Location Selector */}
          <div>
            <label className="block text-xs font-bold text-earth-700 uppercase tracking-wide mb-1.5">
              Target Panchayat / Block
            </label>
            <select
              value={activeLocId}
              onChange={(e) => setActiveLocId(e.target.value)}
              className="w-full p-2.5 bg-earth-50 border border-earth-300 rounded-xl text-sm font-semibold text-earth-900 focus:outline-hidden focus:border-monsoon-600"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.district}, UP)
                </option>
              ))}
            </select>
          </div>

          {/* Hazard Scenario Selector */}
          <div>
            <label className="block text-xs font-bold text-earth-700 uppercase tracking-wide mb-2">
              Simulated Hazard Scenario
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setHazardType('dry_spell')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  hazardType === 'dry_spell'
                    ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-xs'
                    : 'bg-white border-earth-200 text-earth-600 hover:bg-earth-50'
                }`}
              >
                Dry Spell Risk
              </button>
              <button
                type="button"
                onClick={() => setHazardType('heavy_rain')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  hazardType === 'heavy_rain'
                    ? 'bg-sky-100 border-sky-400 text-sky-950 shadow-xs'
                    : 'bg-white border-earth-200 text-earth-600 hover:bg-earth-50'
                }`}
              >
                Heavy Rain
              </button>
              <button
                type="button"
                onClick={() => setHazardType('favorable')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  hazardType === 'favorable'
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs'
                    : 'bg-white border-earth-200 text-earth-600 hover:bg-earth-50'
                }`}
              >
                Favorable
              </button>
            </div>
          </div>

          {/* Required Action Buttons: Generate Alert, Hindi, English, Copy */}
          <div className="pt-2 border-t border-earth-100 space-y-3">
            <label className="block text-xs font-bold text-earth-700 uppercase tracking-wide">
              Actions & Language
            </label>

            <div className="grid grid-cols-2 gap-2">
              {/* Hindi Button (Required) */}
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  isHindi
                    ? 'bg-monsoon-800 text-white border-monsoon-900 shadow-xs'
                    : 'bg-white border-earth-300 text-earth-700 hover:bg-earth-50'
                }`}
              >
                हिन्दी (Hindi)
              </button>

              {/* English Button (Required) */}
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  !isHindi
                    ? 'bg-monsoon-800 text-white border-monsoon-900 shadow-xs'
                    : 'bg-white border-earth-300 text-earth-700 hover:bg-earth-50'
                }`}
              >
                English
              </button>
            </div>

            {/* Generate Alert Button (Required) */}
            <button
              type="button"
              onClick={handleGenerateAlert}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-monsoon-800 hover:bg-monsoon-900 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Alert</span>
            </button>

            {/* Copy Button (Required) */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-earth-100 hover:bg-earth-200 text-earth-800 font-bold text-xs rounded-xl border border-earth-300 transition-all active:scale-98 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-earth-600" />}
              <span>{copied ? 'Copied Alert to Clipboard!' : 'Copy Alert Text'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Smartphone Mockup Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Channel selector (WhatsApp vs SMS) */}
          <div className="flex items-center gap-2 mb-3 bg-white p-1 rounded-xl border border-earth-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setChannel('whatsapp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                channel === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-earth-600 hover:bg-earth-100'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Mockup</span>
            </button>
            <button
              type="button"
              onClick={() => setChannel('sms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                channel === 'sms'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-earth-600 hover:bg-earth-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Standard SMS Mockup</span>
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-sm rounded-[36px] bg-earth-900 p-3 shadow-2xl border-4 border-earth-800 relative">
            {/* Speaker & camera notch */}
            <div className="w-24 h-4 bg-earth-950 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-earth-800"></span>
            </div>

            {/* Inner Phone Screen */}
            <div className={`rounded-[28px] overflow-hidden ${channel === 'whatsapp' ? 'bg-[#efeae2]' : 'bg-slate-100'} p-4 min-h-[440px] flex flex-col justify-between font-sans`}>
              {/* WhatsApp or SMS Header */}
              {channel === 'whatsapp' ? (
                <div className="bg-[#008069] -mx-4 -mt-4 p-3.5 text-white flex items-center gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                    V
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-tight">VARSHAA Kisan Agrinet</div>
                    <div className="text-[10px] text-emerald-100">Official Monsoon Alert Bot • Online</div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-200 -mx-4 -mt-4 p-3 text-slate-800 flex items-center justify-between border-b border-slate-300">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-bold">VK-VARSHA</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Kisan SMS</span>
                </div>
              )}

              {/* Message Bubble */}
              <div className="my-auto py-4">
                <div
                  className={`p-4 rounded-2xl shadow-sm text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                    channel === 'whatsapp'
                      ? 'bg-white text-earth-900 border border-emerald-100 rounded-tl-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  {currentText}
                  <div className="text-[10px] text-earth-400 text-right mt-2 flex items-center justify-end gap-1">
                    <span>11:42 AM</span>
                    {channel === 'whatsapp' && <span className="text-sky-500">✓✓</span>}
                  </div>
                </div>
              </div>

              {/* Audio Playback button right inside screen */}
              <div className="pt-2 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-md border border-earth-300 text-earth-800 text-xs font-bold hover:bg-white transition-all cursor-pointer"
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-monsoon-700 animate-bounce' : 'text-earth-600'}`} />
                  <span>{isSpeaking ? (isHindi ? 'ऑडियो बंद करें' : 'Stop Audio') : (isHindi ? 'ऑडियो सुनें' : 'Listen Alert Audio')}</span>
                </button>
              </div>

              {/* Simulated Input Field at bottom of screen */}
              <div className="mt-3 bg-white p-2 rounded-full border border-earth-200 flex items-center justify-between text-xs text-earth-400 px-3">
                <span className="text-[11px]">{isHindi ? 'संदेश टाइप करें...' : 'Message...'}</span>
                <Send className="w-3.5 h-3.5 text-monsoon-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
