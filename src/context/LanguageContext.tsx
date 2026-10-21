import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fil';

export interface Translations {
  [key: string]: string;
}

const enTranslations: Translations = {
  // Brand & Hard Rule
  'brand.name': 'ALBETH TRANSPORT & CAR RENTAL',
  'notice.serviceAreaOnly': 'SERVICE AREA: REGION 8 ONLY',
  'notice.hardRule': 'We currently serve Region 8 (Eastern Visayas) only: Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar.',
  'notice.network': 'Eastern Visayas Network',
  'notice.dispatch': '24/7 Dispatch',
  'notice.airportCurbside': 'Tacloban Airport (TAC) Curbside',

  // Navigation
  'nav.home': 'Home',
  'nav.vehicles': 'Vehicles',
  'nav.serviceAreas': 'Service areas',
  'nav.contact': 'Contact',
  'nav.sitemap': 'Sitemap',
  'nav.signin': 'Sign in',
  'nav.signup': 'Sign up',
  'nav.signout': 'Sign out',
  'nav.verifiedRenter': 'Verified Renter',
  'nav.language': 'Language',

  // Hero
  'hero.eyebrow': 'Eastern Visayas Car Rental',
  'hero.title1': 'Drive across Eastern Visayas',
  'hero.titleHighlight': 'with confidence',
  'hero.subtitle': 'Book reliable cars, vans, and SUVs with or without a driver. Serving Leyte, Samar, and Biliran.',
  'hero.badgeAirport': 'Tacloban Airport (TAC) Terminal Pickup',
  'hero.badgeBridge': 'San Juanico Bridge Corridor Ready',
  'hero.badgePricing': 'Transparent Rates in PHP (₱)',

  // Trip Planner Form
  'trip.startPlan': 'Start Your Trip Plan',
  'trip.pickupCity': 'Pickup City (Region 8 only)',
  'trip.dropoffCity': 'Dropoff City (Region 8 only)',
  'trip.pickupDate': 'Pickup Date',
  'trip.dropoffDate': 'Dropoff Date',
  'trip.pickupTime': 'Pickup Time',
  'trip.dropoffTime': 'Dropoff Time',
  'trip.vehicleType': 'Vehicle Type',
  'trip.minSeats': 'Minimum Seats',
  'trip.transmission': 'Transmission',
  'trip.needDriver': 'Need a professional driver?',
  'trip.driverDesc': 'Local chauffeur familiar with Region 8 terrain (+₱800-₱900/day)',
  'trip.searchButton': 'Search options',
  'trip.allTypes': 'All Vehicle Types (Sedan, SUV, Van, MPV)',
  'trip.sedan': 'Sedan (Fuel Efficient)',
  'trip.suv': 'Compact SUV (Ground Clearance)',
  'trip.mpv': 'MPV / 7-Seater',
  'trip.van': 'Van / Passenger Commercial (Up to 15 Seats)',
  'trip.allTransmissions': 'All (Manual / Automatic)',
  'trip.manualOnly': 'Manual Transmission (MT)',
  'trip.autoOnly': 'Automatic Transmission (AT)',
  'trip.seatsLabel': 'seats',
  'trip.passengers': 'passengers',
  'trip.errorPickupOutside': 'Pickup location must be within Region 8 (Eastern Visayas).',
  'trip.errorDropoffOutside': 'Dropoff location must be within Region 8 (Eastern Visayas).',
  'trip.errorDateOrder': 'Dropoff date cannot be earlier than pickup date.',

  // Service Areas
  'areas.badge': 'Strictly Region 8 Coverage',
  'areas.title': 'Our Service Areas in Eastern Visayas',
  'areas.subtitle': 'Authentic local coverage across all 6 provinces. From San Juanico Bridge and Kalanggaman in Leyte, to Sambawan in Biliran, and Biri Rock Formations in Northern Samar.',
  'areas.policyBadge': 'Hard Service Area Policy:',
  'areas.viewCities': 'View Covered Cities',
  'areas.citiesCount': 'Cities Covered',

  // Featured Cities
  'cities.badge': 'Key Transport & Tourism Hubs',
  'cities.title': 'Featured Rental Locations in Region 8',
  'cities.subtitle': 'Click any city to view local pickup points, airport delivery, and available fleet units.',

  // Fleet Section
  'fleet.badge': 'Available Fleet',
  'fleet.title': 'Our Fleet in Eastern Visayas',
  'fleet.subtitle': 'Tailored fleet units for city driving, rugged provincial roads, high-torque mountain passes, and large group tours.',
  'fleet.viewAll': 'View All Fleet Models',
  'fleet.from': 'from',
  'fleet.perDay': '/day',
  'fleet.viewDetails': 'View details',
  'fleet.bookNow': 'Book now',
  'fleet.withDriverAvailable': 'Driver Available',
  'fleet.selfDrive': 'Self-Drive Ready',
  'fleet.automatic': 'Automatic (AT)',
  'fleet.manual': 'Manual (MT)',
  'fleet.passengersCount': 'Passengers',

  // How it works (3 Steps)
  'steps.badge': 'Simple 3-Step Process',
  'steps.title': 'How it works',
  'steps.subtitle': 'Seamless car and van rental from inquiry to key handover across Eastern Visayas.',
  'steps.step1Number': '01',
  'steps.step1Title': 'Choose your trip',
  'steps.step1Desc': 'Select your pickup and dropoff city anywhere within Region 8 (Leyte, Samar, Biliran). Choose self-drive or with a licensed professional driver.',
  'steps.step2Number': '02',
  'steps.step2Title': 'Request a quote',
  'steps.step2Desc': 'Pick from our 4 specialized vehicles: Mirage G4, Ford Ecosport, Toyota Tamaraw 7-seater, or Mitsubishi L300 FB van. Transparent PHP rates with zero hidden fees.',
  'steps.step3Number': '03',
  'steps.step3Title': 'Confirm and drive',
  'steps.step3Desc': 'Receive immediate reservation confirmation. Pick up your vehicle at Tacloban Airport (TAC), local seaports, or have it delivered to your hotel.',
  'steps.stepIndicator': 'Step',
  'steps.ofThree': 'of 03',

  // FAQ
  'faq.badge': 'Rental Knowledge Base',
  'faq.title': 'Frequently Asked Questions',
  'faq.subtitle': 'Everything you need to know about booking, driving, and exploring Region 8 with ALBETH TRANSPORT.',

  // Contact CTA
  'cta.badge': 'Immediate Reservation Support',
  'cta.title': 'Ready to explore Eastern Visayas?',
  'cta.subtitle': 'Book online in 2 minutes or speak directly with our Tacloban fleet coordinator for custom itineraries.',
  'cta.bookButton': 'Book a Vehicle Now',
  'cta.contactButton': 'Contact Regional Office',
  'cta.callDirect': 'Or call our 24/7 hotline:',

  // Footer
  'footer.brandDesc': 'Premier car and van rental service operating exclusively within Region 8 (Eastern Visayas), Philippines. Providing dependable self-drive and chauffeur rentals across Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar.',
  'footer.limitationHeading': 'SERVICE AREA LIMITATION:',
  'footer.limitationText': 'All vehicles are GPS geo-fenced to Eastern Visayas. Crossing to Luzon or Mindanao via ferry is prohibited without written clearance.',
  'footer.regionalOffice': 'Regional Office: San Jose Highway, Tacloban City, 6500 Leyte',
  'footer.copyright': 'Copyright 2026 ALBETH TRANSPORT. All rights reserved.',
  'footer.disclaimer': 'We currently serve Region 8 (Eastern Visayas) only.',
  'footer.switchLanguage': 'Switch Language / Magpalit ng Wika',
};

const filTranslations: Translations = {
  // Brand & Hard Rule
  'brand.name': 'ALBETH TRANSPORT & CAR RENTAL',
  'notice.serviceAreaOnly': 'LUGAR NG SERBISYO: REHIYON 8 LAMANG',
  'notice.hardRule': 'Kasalukuyan kaming nagseserbisyo sa Rehiyon 8 (Silangang Kabisayaan) lamang: Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, at Northern Samar.',
  'notice.network': 'Network ng Silangang Kabisayaan',
  'notice.dispatch': '24/7 Dispatch',
  'notice.airportCurbside': 'Pagsundo sa Tacloban Airport (TAC)',

  // Navigation
  'nav.home': 'Tahanan',
  'nav.vehicles': 'Mga Sasakyan',
  'nav.serviceAreas': 'Mga Lugar ng Serbisyo',
  'nav.contact': 'Makipag-ugnayan',
  'nav.sitemap': 'Mapa ng Site',
  'nav.signin': 'Mag-sign in',
  'nav.signup': 'Mag-sign up',
  'nav.signout': 'Mag-sign out',
  'nav.verifiedRenter': 'Beripikadong Renter',
  'nav.language': 'Wika',

  // Hero
  'hero.eyebrow': 'Pagrenta ng Sasakyan sa Silangang Kabisayaan',
  'hero.title1': 'Maglakbay sa Buong Silangang Kabisayaan',
  'hero.titleHighlight': 'nang may tiwala',
  'hero.subtitle': 'Mag-book ng maaasahang kotse, van, at SUV nang may driver o self-drive. Nagseserbisyo sa Leyte, Samar, at Biliran.',
  'hero.badgeAirport': 'Pagsundo sa Terminal ng Tacloban Airport (TAC)',
  'hero.badgeBridge': 'Handa sa Koridor ng San Juanico Bridge',
  'hero.badgePricing': 'Malinaw na Presyo sa PHP (₱)',

  // Trip Planner Form
  'trip.startPlan': 'Simulan ang Iyong Plano sa Biyahe',
  'trip.pickupCity': 'Lungsod ng Pagsundo (Rehiyon 8 lamang)',
  'trip.dropoffCity': 'Lungsod ng Pagbaba (Rehiyon 8 lamang)',
  'trip.pickupDate': 'Petsa ng Pagsundo',
  'trip.dropoffDate': 'Petsa ng Pagbaba',
  'trip.pickupTime': 'Oras ng Pagsundo',
  'trip.dropoffTime': 'Oras ng Pagbaba',
  'trip.vehicleType': 'Uri ng Sasakyan',
  'trip.minSeats': 'Minimum na Upuan',
  'trip.transmission': 'Transmisyon',
  'trip.needDriver': 'Kailangan ng propesyonal na driver?',
  'trip.driverDesc': 'Lokal na tsuper na bihasa sa mga kalsada ng Rehiyon 8 (+₱800-₱900/araw)',
  'trip.searchButton': 'Maghanap ng Sasakyan',
  'trip.allTypes': 'Lahat ng Uri ng Sasakyan (Sedan, SUV, Van, MPV)',
  'trip.sedan': 'Sedan (Matipid sa Gasolina)',
  'trip.suv': 'Compact SUV (Mataas ang Clearance)',
  'trip.mpv': 'MPV / 7-Seater',
  'trip.van': 'Van / Pangsakay (Hanggang 15 Upuan)',
  'trip.allTransmissions': 'Lahat (Manual / Automatic)',
  'trip.manualOnly': 'Manual Transmission (MT)',
  'trip.autoOnly': 'Automatic Transmission (AT)',
  'trip.seatsLabel': 'upuan',
  'trip.passengers': 'pasahero',
  'trip.errorPickupOutside': 'Ang lokasyon ng pagsundo ay dapat nasa loob ng Rehiyon 8 (Silangang Kabisayaan).',
  'trip.errorDropoffOutside': 'Ang lokasyon ng pagbaba ay dapat nasa loob ng Rehiyon 8 (Silangang Kabisayaan).',
  'trip.errorDateOrder': 'Ang petsa ng pagbaba ay hindi maaaring mas maaga kaysa sa petsa ng pagsundo.',

  // Service Areas
  'areas.badge': 'Saklaw Lamang ng Rehiyon 8',
  'areas.title': 'Mga Lugar ng Aming Serbisyo sa Silangang Kabisayaan',
  'areas.subtitle': 'Tunay na lokal na saklaw sa lahat ng 6 na lalawigan. Mula San Juanico Bridge at Kalanggaman sa Leyte, hanggang Sambawan sa Biliran, at Biri Rock Formations sa Northern Samar.',
  'areas.policyBadge': 'Mahigpit na Patakaran sa Serbisyo:',
  'areas.viewCities': 'Tingnan ang mga Lungsod',
  'areas.citiesCount': 'Lungsod na Sakop',

  // Featured Cities
  'cities.badge': 'Pangunahing Hub ng Byahe at Turismo',
  'cities.title': 'Mga Tampok na Lokasyon sa Rehiyon 8',
  'cities.subtitle': 'Pindutin ang anumang lungsod upang makita ang mga punto ng pagsundo, paghatid sa airport, at magagamit na sasakyan.',

  // Fleet Section
  'fleet.badge': 'Magagamit na Fleet',
  'fleet.title': 'Ang Aming Fleet sa Silangang Kabisayaan',
  'fleet.subtitle': 'Mga piling sasakyan para sa lungsod, magaspang na kalsada sa probinsya, matatarik na bundok, at malalaking grupo.',
  'fleet.viewAll': 'Tingnan ang Lahat ng Sasakyan',
  'fleet.from': 'mula',
  'fleet.perDay': '/araw',
  'fleet.viewDetails': 'Tingnan ang detalye',
  'fleet.bookNow': 'Mag-book na',
  'fleet.withDriverAvailable': 'May Opsyon na Driver',
  'fleet.selfDrive': 'Handa sa Self-Drive',
  'fleet.automatic': 'Automatic (AT)',
  'fleet.manual': 'Manual (MT)',
  'fleet.passengersCount': 'Pasahero',

  // How it works (3 Steps)
  'steps.badge': 'Simpleng 3 Hakbang',
  'steps.title': 'Paano ito gumagana',
  'steps.subtitle': 'Madaling pagrenta ng kotse at van mula sa pagtatanong hanggang sa pag-abot ng susi sa Silangang Kabisayaan.',
  'steps.step1Number': '01',
  'steps.step1Title': 'Piliin ang iyong biyahe',
  'steps.step1Desc': 'Piliin ang lungsod ng pagsundo at pagbaba saanman sa Rehiyon 8 (Leyte, Samar, Biliran). Piliin kung self-drive o may lisensyadong propesyonal na tsuper.',
  'steps.step2Number': '02',
  'steps.step2Title': 'Humiling ng quote',
  'steps.step2Desc': 'Pumili sa aming 4 na sasakyan: Mirage G4, Ford Ecosport, Toyota Tamaraw 7-seater, o Mitsubishi L300 FB van. Malinaw na presyo sa PHP na walang tagong singil.',
  'steps.step3Number': '03',
  'steps.step3Title': 'Kumpirmahin at magmaneho',
  'steps.step3Desc': 'Tanggapin agad ang kumpirmasyon ng reserbasyon. Kunin ang sasakyan sa Tacloban Airport (TAC), mga daungan, o ipahatid sa iyong hotel.',
  'steps.stepIndicator': 'Hakbang',
  'steps.ofThree': 'ng 03',

  // FAQ
  'faq.badge': 'Kabatiran sa Pagrenta',
  'faq.title': 'Mga Madalas Itanong (FAQ)',
  'faq.subtitle': 'Lahat ng kailangan mong malaman tungkol sa pag-book, pagmamaneho, at paglibot sa Rehiyon 8 kasama ang ALBETH TRANSPORT.',

  // Contact CTA
  'cta.badge': 'Mabilisang Suporta sa Reserbasyon',
  'cta.title': 'Handa ka na bang tuklasin ang Silangang Kabisayaan?',
  'cta.subtitle': 'Mag-book online sa loob ng 2 minuto o makipag-ugnayan agad sa aming Tacloban fleet coordinator para sa pasadyang biyahe.',
  'cta.bookButton': 'Mag-book ng Sasakyan Ngayon',
  'cta.contactButton': 'Makipag-ugnayan sa Tanggapan',
  'cta.callDirect': 'O tumawag sa aming 24/7 hotline:',

  // Footer
  'footer.brandDesc': 'Pangunahing serbisyo sa pagrenta ng kotse at van na eksklusibong nagpapatakbo sa Rehiyon 8 (Silangang Kabisayaan), Pilipinas. Nagbibigay ng maaasahang self-drive at may tsuper sa buong Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, at Northern Samar.',
  'footer.limitationHeading': 'LIMITASYON SA LUGAR NG SERBISYO:',
  'footer.limitationText': 'Lahat ng sasakyan ay may GPS geo-fence sa Silangang Kabisayaan lamang. Mahigpit na ipinagbabawal ang pagtawid sa Luzon o Mindanao sakay ng barko nang walang nakasulat na pahintulot.',
  'footer.regionalOffice': 'Panrehiyong Tanggapan: San Jose Highway, Tacloban City, 6500 Leyte',
  'footer.copyright': 'Copyright 2026 ALBETH TRANSPORT. Lahat ng karapatan ay nakareserba.',
  'footer.disclaimer': 'Paunawa: Kasalukuyan kaming nagseserbisyo sa Rehiyon 8 (Silangang Kabisayaan) lamang.',
  'footer.switchLanguage': 'Magpalit ng Wika / Switch Language',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('albeth_language');
      if (stored === 'en' || stored === 'fil') {
        return stored;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('albeth_language', lang);
      document.documentElement.lang = lang === 'fil' ? 'tl' : 'en';
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fil' : 'en');
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language === 'fil' ? 'tl' : 'en';
    } catch {
      // ignore
    }
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const dict = language === 'fil' ? filTranslations : enTranslations;
    if (dict[key]) {
      return dict[key];
    }
    if (enTranslations[key]) {
      return enTranslations[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
