/**
 * VARSHAA: Crop-Specific Agricultural Advisory Engine
 * Generates tailored agronomic advice based on downscaled monsoon hazard forecast,
 * crop physiology, and growth stage. Includes complete English and Hindi translations.
 */

const predictionEngine = require('./predictionEngine');

class AdvisoryEngine {
  /**
   * Generates advisory for a crop, stage, and location
   */
  generateAdvisory({ locationId = 'ghaziabad', crop = 'Rice', cropStage = 'Sowing', horizon = 7 }) {
    const forecast = predictionEngine.generateForecast(locationId, horizon);
    const location = forecast.location;
    const kpis = forecast.kpis;

    const drySpellProb = kpis.drySpellProb;
    const heavyRainProb = kpis.heavyRainProb;
    const expectedRainfall = kpis.expectedRainfall;
    const riskLevel = kpis.riskLevel;

    // Determine primary hazard
    let hazardCategory = 'NORMAL';
    if (drySpellProb >= 50) {
      hazardCategory = 'DRY_SPELL';
    } else if (heavyRainProb >= 30) {
      hazardCategory = 'HEAVY_RAIN';
    } else if (expectedRainfall >= 80) {
      hazardCategory = 'EXCESS_WATER';
    } else {
      hazardCategory = 'FAVORABLE';
    }

    // Agronomic advisory matrix
    const advisoryData = this.getAgronomicMatrix(crop, cropStage, hazardCategory, {
      drySpellProb,
      heavyRainProb,
      expectedRainfall,
      locationName: location.name,
      horizon
    });

    return {
      location: location,
      crop: crop,
      cropStage: cropStage,
      horizon: horizon,
      generatedAt: new Date().toISOString(),
      meteorologicalContext: {
        drySpellProb: `${drySpellProb}%`,
        heavyRainProb: `${heavyRainProb}%`,
        expectedRainfall: `${expectedRainfall} mm`,
        riskLevel: riskLevel,
        hazardCategory: hazardCategory
      },
      // English version
      en: {
        riskTitle: advisoryData.en.riskTitle,
        riskBadge: advisoryData.en.riskBadge,
        recommendedAction: advisoryData.en.recommendedAction,
        whyReasoning: advisoryData.en.whyReasoning,
        rainfallOutlook: advisoryData.en.rainfallOutlook,
        moistureRisk: advisoryData.en.moistureRisk,
        irrigationAdvice: advisoryData.en.irrigationAdvice,
        fertilizerAdvice: advisoryData.en.fertilizerAdvice,
        alertMessage: advisoryData.en.alertMessage,
        suitabilityScore: advisoryData.suitabilityScore
      },
      // Hindi version (किसान सलाह)
      hi: {
        riskTitle: advisoryData.hi.riskTitle,
        riskBadge: advisoryData.hi.riskBadge,
        recommendedAction: advisoryData.hi.recommendedAction,
        whyReasoning: advisoryData.hi.whyReasoning,
        rainfallOutlook: advisoryData.hi.rainfallOutlook,
        moistureRisk: advisoryData.hi.moistureRisk,
        irrigationAdvice: advisoryData.hi.irrigationAdvice,
        fertilizerAdvice: advisoryData.hi.fertilizerAdvice,
        alertMessage: advisoryData.hi.alertMessage,
        suitabilityScore: advisoryData.suitabilityScore
      }
    };
  }

  getAgronomicMatrix(crop, stage, hazard, metrics) {
    const { drySpellProb, heavyRainProb, expectedRainfall, locationName, horizon } = metrics;
    const cropKey = (crop || 'Rice').toLowerCase();
    const stageKey = (stage || 'Sowing').toLowerCase();

    // Default template structure
    let result = {
      suitabilityScore: 78,
      en: {
        riskTitle: 'FAVORABLE MONSOON CONDITIONS',
        riskBadge: 'Low Risk',
        recommendedAction: 'Proceed with scheduled farm operations.',
        whyReasoning: `Expected rainfall is ${expectedRainfall} mm with balanced moisture conditions.`,
        rainfallOutlook: `${expectedRainfall} mm expected over next ${horizon} days.`,
        moistureRisk: 'Optimum root-zone moisture.',
        irrigationAdvice: 'Irrigate as per routine schedule.',
        fertilizerAdvice: 'Apply recommended basal doses without delay.',
        alertMessage: `VARSHAA ALERT for ${locationName}: Favorable monsoon outlook over next ${horizon} days. Good window for scheduled operations.`
      },
      hi: {
        riskTitle: 'अनुकूल मानसून परिस्थितियां',
        riskBadge: 'कम जोखिम',
        recommendedAction: 'योजनाबद्ध कृषि कार्य सामान्य रूप से जारी रखें।',
        whyReasoning: `अगले ${horizon} दिनों में ${expectedRainfall} मिमी संतुलित वर्षा और अनुकूल नमी का अनुमान है।`,
        rainfallOutlook: `अगले ${horizon} दिनों में ${expectedRainfall} मिमी बारिश की उम्मीद है।`,
        moistureRisk: 'जड़ क्षेत्र में पर्याप्त नमी उपलब्ध है।',
        irrigationAdvice: 'नियमित समय-सारणी के अनुसार ही सिंचाई करें।',
        fertilizerAdvice: 'अनुशंसित बेसल उर्वरक खुराक बिना देरी के डालें।',
        alertMessage: `वर्षा अलर्ट - ${locationName}: अगले ${horizon} दिनों में मौसम अनुकूल रहेगा। निर्धारित कृषि कार्य जारी रखें।`
      }
    };

    // Specific rules by Hazard Category:
    if (hazard === 'DRY_SPELL') {
      result.suitabilityScore = Math.max(30, 85 - drySpellProb);

      if (cropKey === 'rice' && stageKey === 'sowing') {
        result.en = {
          riskTitle: 'HIGH DRY-SPELL RISK',
          riskBadge: 'High Risk',
          recommendedAction: 'Consider delaying direct seeding or nursery transplanting by 4–6 days; ensure tubewell irrigation backup is operational.',
          whyReasoning: `Dry-spell probability is ${drySpellProb}% during the next ${horizon} days in ${locationName} block, which can cause severe desiccation of newly emerged seedlings.`,
          rainfallOutlook: `Deficit rainfall expected (${expectedRainfall} mm total), moisture loss due to elevated evaporation.`,
          moistureRisk: 'Critical moisture stress in top 10 cm seedbed layer.',
          irrigationAdvice: 'Maintain light standing water in paddy nursery (2-3 cm) through tubewell irrigation; avoid letting beds crack.',
          fertilizerAdvice: 'Postpone top-dressing of urea until rain resumption to avoid volatilization loss.',
          alertMessage: `⚠️ VARSHAA MONSOON ALERT (${locationName}): Dry-spell probability is ${drySpellProb}% over next ${horizon} days. Consider delaying paddy sowing/transplanting and keep irrigation arrangements ready.`
        };
        result.hi = {
          riskTitle: 'उच्च सूखा (ड्राई स्पेल) जोखिम',
          riskBadge: 'उच्च जोखिम',
          recommendedAction: 'धान की सीधी बुवाई या रोपाई को 4-6 दिन टालने पर विचार करें और ट्यूबवेल सिंचाई की व्यवस्था पूरी तरह तैयार रखें।',
          whyReasoning: `${locationName} ब्लॉक में अगले ${horizon} दिनों के दौरान सूखे की संभावना ${drySpellProb}% है, जिससे नए अंकुरित पौधों में नमी की गंभीर कमी हो सकती है।`,
          rainfallOutlook: `न्यूनतम बारिश का अनुमान (${expectedRainfall} मिमी), तेज धूप व वाष्पीकरण से नमी में कमी।`,
          moistureRisk: 'ऊपरी 10 सेमी मिट्टी की परत में गंभीर नमी तनाव।',
          irrigationAdvice: 'धान की नर्सरी में 2-3 सेमी हल्का पानी बनाए रखें; क्यारियों में दरारें न पड़ने दें।',
          fertilizerAdvice: 'यूरिया का छिड़काव बारिश लौटने तक स्थगित रखें ताकि खाद व्यर्थ न हो।',
          alertMessage: `⚠️ वर्षा मानसून चेतावनी (${locationName}): आपके क्षेत्र में अगले ${horizon} दिनों में सूखे (ड्राई स्पेल) की ${drySpellProb}% संभावना है। धान की बुवाई टालें और सिंचाई की व्यवस्था तैयार रखें।`
        };
      } else if (cropKey === 'rice' && (stageKey === 'vegetative' || stageKey === 'flowering')) {
        result.en = {
          riskTitle: 'DRY SPELL & MOISTURE STRESS',
          riskBadge: 'High Risk',
          recommendedAction: 'Provide life-saving supplemental irrigation to prevent panicle desiccation and maintain 3-5 cm ponding.',
          whyReasoning: `Extended dry interval (${drySpellProb}% probability) during critical vegetative/tillering phase directly reduces tillering capacity.`,
          rainfallOutlook: `Low rainfall expected (${expectedRainfall} mm); high temperature spikes possible.`,
          moistureRisk: 'Moderate to severe root-zone dehydration.',
          irrigationAdvice: 'Adopt Alternate Wetting and Drying (AWD) with guaranteed irrigation recharge.',
          fertilizerAdvice: 'Do not broadcast fertilizers without soil moisture.',
          alertMessage: `⚠️ VARSHAA CROP ALERT: High dry-spell risk (${drySpellProb}%) in ${locationName}. Apply supplemental irrigation to standing rice crop immediately.`
        };
        result.hi = {
          riskTitle: 'सूखा और नमी संकट',
          riskBadge: 'उच्च जोखिम',
          recommendedAction: 'धान की फसल में कल्ले फूटने और बालियां सूखने से बचाने के लिए जीवन-रक्षक सिंचाई तुरंत प्रदान करें।',
          whyReasoning: `${locationName} में ${drySpellProb}% सूखे की संभावना है, जिससे धान के विकास और कल्ले निकलने पर भारी असर पड़ सकता है।`,
          rainfallOutlook: `कम बारिश (${expectedRainfall} मिमी) का अनुमान, तापमान बढ़ने की आशंका।`,
          moistureRisk: 'जड़ क्षेत्र में मध्यम से गंभीर नमी की कमी।',
          irrigationAdvice: 'खेत में 3-5 सेमी पानी बनाए रखने के लिए वैकल्पिक सिंचाई का प्रबंध करें।',
          fertilizerAdvice: 'बिना पर्याप्त नमी के कोई भी रासायनिक खाद न डालें।',
          alertMessage: `⚠️ वर्षा फसल चेतावनी: ${locationName} में ${drySpellProb}% सूखे का जोखिम है। धान की खड़ी फसल को तत्काल जीवन-रक्षक सिंचाई दें।`
        };
      } else if (cropKey === 'maize' || cropKey === 'pulses') {
        result.en = {
          riskTitle: 'ELEVATED DRY-SPELL RISK',
          riskBadge: 'Moderate-High Risk',
          recommendedAction: 'Apply straw mulch between crop rows to conserve soil moisture; postpone sowing until monsoon trough stabilizes.',
          whyReasoning: `Dry spell probability is ${drySpellProb}%. ${crop} seedlings are sensitive to heat stress and soil moisture deficits.`,
          rainfallOutlook: `Scattered light showers only (${expectedRainfall} mm over ${horizon} days).`,
          moistureRisk: 'Rapid soil moisture depletion in sandy/alluvial soil.',
          irrigationAdvice: 'Provide light sprinkler or furrow irrigation in early morning hours.',
          fertilizerAdvice: 'Foliar spray of 1% potassium nitrate (KNO3) to induce drought resilience.',
          alertMessage: `⚠️ VARSHAA ALERT (${locationName}): Dry spell risk is ${drySpellProb}%. Mulch ${crop} fields and prepare light irrigation.`
        };
        result.hi = {
          riskTitle: 'सूखे का बढ़ता जोखिम',
          riskBadge: 'मध्यम-उच्च जोखिम',
          recommendedAction: 'खेत में नमी बचाने के लिए पंक्तियों के बीच पुआल की मल्चिंग करें; मानसून सामान्य होने तक बुवाई स्थगित रखें।',
          whyReasoning: `${drySpellProb}% सूखे की संभावना है। ${crop === 'Maize' ? 'मक्का' : 'दलहन'} के पौधे गर्मी और सूखे के प्रति अत्यधिक संवेदनशील होते हैं।`,
          rainfallOutlook: `केवल हल्की छिटपुट बारिश (${expectedRainfall} मिमी) की संभावना।`,
          moistureRisk: 'बलुई व दोमट मिट्टी में नमी तेजी से घट रही है।',
          irrigationAdvice: 'सुबह के समय हल्की स्प्रिंकलर या नालीदार सिंचाई करें।',
          fertilizerAdvice: 'सूखे से बचाव के लिए 1% पोटेशियम नाइट्रेट (KNO3) का पर्णीय छिड़काव करें।',
          alertMessage: `⚠️ वर्षा अलर्ट (${locationName}): ${drySpellProb}% सूखे की संभावना। ${crop === 'Maize' ? 'मक्का' : 'दालों'} में नमी संरक्षण हेतु मल्चिंग करें व सिंचाई तैयार रखें।`
        };
      } else {
        // Wheat / general dry spell
        result.en = {
          riskTitle: 'DRY SPELL WARNING',
          riskBadge: 'Moderate Risk',
          recommendedAction: 'Conserve available root moisture and plan alternate irrigation source.',
          whyReasoning: `Dry spell probability stands at ${drySpellProb}%. Moisture levels will deplete steadily.`,
          rainfallOutlook: `Below normal rainfall (${expectedRainfall} mm).`,
          moistureRisk: 'Moderate sub-soil deficit.',
          irrigationAdvice: 'Keep irrigation channels cleared for fast recharge.',
          fertilizerAdvice: 'Withhold nitrogen top-dressing till moisture returns.',
          alertMessage: `⚠️ VARSHAA ALERT: ${drySpellProb}% dry-spell probability in ${locationName}. Protect field moisture.`
        };
        result.hi = {
          riskTitle: 'सूखे की चेतावनी',
          riskBadge: 'मध्यम जोखिम',
          recommendedAction: 'मिट्टी की उपलब्ध नमी को संरक्षित करें और वैकल्पिक सिंचाई का प्रबंध रखें।',
          whyReasoning: `सूखे की संभावना ${drySpellProb}% है, जिससे मिट्टी की नमी धीरे-धीरे कम होगी।`,
          rainfallOutlook: `सामान्य से कम बारिश (${expectedRainfall} मिमी) का अनुमान।`,
          moistureRisk: 'उप-सतही नमी में मध्यम कमी।',
          irrigationAdvice: 'सिंचाई नालियों को तुरंत साफ रखें।',
          fertilizerAdvice: 'नमी लौटने तक यूरिया का छिड़काव रोक कर रखें।',
          alertMessage: `⚠️ वर्षा चेतावनी: ${locationName} में ${drySpellProb}% सूखे की आशंका। खेतों में नमी का ध्यान रखें।`
        };
      }
    } else if (hazard === 'HEAVY_RAIN' || hazard === 'EXCESS_WATER') {
      result.suitabilityScore = Math.max(25, 80 - heavyRainProb);

      if (stageKey === 'harvest') {
        result.en = {
          riskTitle: 'EXCESS RAIN / WATERLOGGING THREAT',
          riskBadge: 'Critical Risk',
          recommendedAction: 'Immediately expedite crop harvesting or threshing; cover harvested produce with tarpaulin sheets.',
          whyReasoning: `Heavy rainfall probability is ${heavyRainProb}% with expected rainfall of ${expectedRainfall} mm, causing grain lodging and sprouting.`,
          rainfallOutlook: `Intense localized showers (${expectedRainfall} mm) in short convective spells.`,
          moistureRisk: 'Water stagnation and root asphyxiation risk.',
          irrigationAdvice: 'Strictly stop all irrigation; create rapid drainage outlets.',
          fertilizerAdvice: 'Suspend all chemical spraying to prevent wash-off.',
          alertMessage: `🚨 VARSHAA CRITICAL ALERT (${locationName}): Heavy rain threat (${heavyRainProb}%, ~${expectedRainfall}mm). Harvested produce must be sheltered immediately.`
        };
        result.hi = {
          riskTitle: 'अत्यधिक बारिश / जलभराव का खतरा',
          riskBadge: 'गंभीर जोखिम',
          recommendedAction: 'फसल की कटाई या मड़ाई तुरंत पूरी करें; कटी हुई फसल को तिरपाल से सुरक्षित ढकें।',
          whyReasoning: `${locationName} में ${heavyRainProb}% भारी बारिश की संभावना है (${expectedRainfall} मिमी), जिससे फसल गिरने और दाने अंकुरित होने का खतरा है।`,
          rainfallOutlook: `अल्पकाल में तेज मूसलाधार बारिश (${expectedRainfall} मिमी) का अनुमान।`,
          moistureRisk: 'खेतों में जलभराव और जड़ों के सड़ने का भारी खतरा।',
          irrigationAdvice: 'सभी प्रकार की सिंचाई तुरंत बंद करें; जल निकासी नालियां खोलें।',
          fertilizerAdvice: 'दवा व खाद का छिड़काव पूरी तरह रोक दें, पानी के साथ बहने का खतरा है।',
          alertMessage: `🚨 वर्षा अति-चेतावनी (${locationName}): भारी बारिश का खतरा (${heavyRainProb}%, ~${expectedRainfall} मिमी)। कटी फसल को तुरंत सुरक्षित स्थान पर पहुंचाएं।`
        };
      } else {
        result.en = {
          riskTitle: 'HEAVY RAINFALL INUNDATION HAZARD',
          riskBadge: 'High Risk',
          recommendedAction: 'Open drainage channels immediately to prevent waterlogging; postpone fertilizer application.',
          whyReasoning: `Heavy rain probability is ${heavyRainProb}% (${expectedRainfall} mm forecast). Low-lying panchayats are prone to root rot.`,
          rainfallOutlook: `High convective rainfall (${expectedRainfall} mm over next ${horizon} days).`,
          moistureRisk: 'Soil saturation exceeding field capacity.',
          irrigationAdvice: 'Do not irrigate; clear drainage ditches around fields.',
          fertilizerAdvice: 'Withhold granular urea or pesticide sprays; high surface runoff expected.',
          alertMessage: `⚠️ VARSHAA ALERT (${locationName}): Heavy rain risk is ${heavyRainProb}%. Ensure drainage in ${crop} fields to prevent waterlogging.`
        };
        result.hi = {
          riskTitle: 'भारी बारिश और जलभराव का संकट',
          riskBadge: 'उच्च जोखिम',
          recommendedAction: 'खेतों में पानी भरने से रोकने के लिए तुरंत जल निकासी नालियां खोलें; खाद डालने का काम टालें।',
          whyReasoning: `${heavyRainProb}% भारी बारिश की संभावना है (${expectedRainfall} मिमी)। निचले इलाकों में जलभराव से पौधों की जड़ें सड़ सकती हैं।`,
          rainfallOutlook: `अगले ${horizon} दिनों में तीव्र बारिश (${expectedRainfall} मिमी) का अनुमान।`,
          moistureRisk: 'मिट्टी में अत्यधिक जलभराव की स्थिति।',
          irrigationAdvice: 'सिंचाई बिल्कुल न करें; मेड़ों से अतिरिक्त पानी निकालने का रास्ता बनाएं।',
          fertilizerAdvice: 'यूरिया व कीटनाशक छिड़काव रोक दें; पानी के बहाव से नुकसान होगा।',
          alertMessage: `⚠️ वर्षा चेतावनी (${locationName}): ${heavyRainProb}% भारी बारिश की संभावना। ${crop === 'Rice' ? 'धान' : crop} के खेतों में पानी निकासी सुनिश्चित करें।`
        };
      }
    } else {
      // FAVORABLE
      result.suitabilityScore = 88;
      result.en = {
        riskTitle: 'OPTIMAL ONSET & SOWING CONDITIONS',
        riskBadge: 'Low Risk',
        recommendedAction: 'Proceed with field preparation, nursery sowing, or transplanting during this favorable moisture window.',
        whyReasoning: `Moderate rainfall (${expectedRainfall} mm) and steady monsoon progression provide ideal soil moisture (60-70%).`,
        rainfallOutlook: `Normal monsoon showers (${expectedRainfall} mm across ${horizon} days).`,
        moistureRisk: 'Ideal field moisture; minimal stress.',
        irrigationAdvice: 'Rainfed moisture adequate; supplement only if surface dries.',
        fertilizerAdvice: 'Apply recommended basal NPK fertilizer mix before seedling placement.',
        alertMessage: `✅ VARSHAA ADVISORY (${locationName}): Favorable monsoon conditions. Ideal window for ${crop} field operations.`
      };
      result.hi = {
        riskTitle: 'उत्कृष्ट मानसून व बुवाई अनुकूलता',
        riskBadge: 'कम जोखिम',
        recommendedAction: 'इस अनुकूल नमी की अवधि में खेत की तैयारी, नर्सरी बुवाई या रोपाई का कार्य प्राथमिकता से पूरा करें।',
        whyReasoning: `संतुलित बारिश (${expectedRainfall} मिमी) और स्थिर मानसून से मिट्टी में अनुकूल नमी (60-70%) बनी हुई है।`,
        rainfallOutlook: `सामान्य मानसूनी बारिश (${expectedRainfall} मिमी) का पूर्वानुमान।`,
        moistureRisk: 'आदर्श खेत की नमी; सूखे या जलभराव का कोई खतरा नहीं।',
        irrigationAdvice: 'प्राकृतिक वर्षा पर्याप्त है; अतिरिक्त सिंचाई की आवश्यकता नहीं है।',
        fertilizerAdvice: 'बुवाई से पहले अनुशंसित NPK खाद का संतुलित मिश्रण खेत में मिलाएं।',
        alertMessage: `✅ वर्षा सलाह (${locationName}): मानसून अनुकूल है। ${crop === 'Rice' ? 'धान' : crop} के कृषि कार्यों के लिए उत्तम समय।`
      };
    }

    return result;
  }
}

module.exports = new AdvisoryEngine();
