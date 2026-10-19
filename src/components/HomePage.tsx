import React from 'react';
import { Hero } from './Hero';
import { ProvinceCard } from './ProvinceCard';
import { CityChip } from './CityChip';
import { VehicleCard } from './VehicleCard';
import { StepsSection } from './StepsSection';
import { FaqAccordion, FAQS } from './FaqAccordion';
import { ContactCta } from './ContactCta';
import {
  SEED_PROVINCES,
  SEED_CITIES,
  SEED_VEHICLES,
  REGION_8_NOTICE,
  ALBETH_LOGO_SRC,
} from '../data/seedData';
import { TripPlannerValues } from './TripPlannerForm';
import { ArrowRight, Sparkles, MapPin, ShieldCheck, Car } from 'lucide-react';

interface HomePageProps {
  onSearch: (values: TripPlannerValues) => void;
  onNavigate: (route: string) => void;
  onSelectCity: (slug: string) => void;
  onSelectProvince: (slug: string) => void;
  onSelectVehicle: (slug: string) => void;
  onBookVehicle: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSearch,
  onNavigate,
  onSelectCity,
  onSelectProvince,
  onSelectVehicle,
  onBookVehicle,
}) => {
  // Featured cities as requested: Tacloban, Ormoc, Maasin, Catbalogan, Calbayog, Borongan
  const featuredCitySlugs = [
    'tacloban-city',
    'ormoc-city',
    'maasin-city',
    'catbalogan-city',
    'calbayog-city',
    'borongan-city',
  ];

  const featuredCities = SEED_CITIES.filter((c) => featuredCitySlugs.includes(c.slug));

  // The 4 verified fleet vehicles
  const homepageFleet = SEED_VEHICLES;

  // Structured Data (JSON-LD) for LocalBusiness/AutoRental & FAQPage
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoRental',
        '@id': 'https://albethtransport.ph/#autorental',
        name: 'ALBETH TRANSPORT & CAR RENTAL',
        logo: ALBETH_LOGO_SRC,
        description:
          'Premier car and van rental service operating exclusively in Region 8 (Eastern Visayas), Philippines. Serving Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar.',
        url: 'https://albethtransport.ph',
        telephone: '+63-917-842-9912',
        email: 'rentals@albethtransport.ph',
        priceRange: '₱1650 - ₱3500 per day',
        areaServed: SEED_PROVINCES.map((p) => ({
          '@type': 'AdministrativeArea',
          name: `${p.name}, Region 8, Philippines`,
        })),
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'San Jose Highway',
          addressLocality: 'Tacloban City',
          addressRegion: 'Leyte, Region 8',
          postalCode: '6500',
          addressCountry: 'PH',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 11.2272,
          longitude: 125.0275,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="space-y-0 bg-mesh-light">
      {/* JSON-LD Script tag for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 1, 2, 3: Hero & Trip Planner (includes scenic San Juanico photo, headings, Region 8 rule) */}
      <Hero onSearch={onSearch} />

      {/* 4. "Service areas" grid of 6 image cards with authentic destination images */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#e8871e] uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-[#e8871e]" />
              <span>Strictly Region 8 Coverage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b2545] font-heading">
              Our Service Areas in Eastern Visayas
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Authentic local coverage across all 6 provinces. From San Juanico Bridge and Kalanggaman in Leyte, to Sambawan in Biliran, and Biri Rock Formations in Northern Samar.
            </p>
          </div>

          <div className="p-3 bg-orange-50/80 border border-[#e8871e]/30 rounded-2xl text-xs text-[#0b2545] font-medium max-w-xs shadow-xs">
            <span className="font-bold text-[#e8871e] block">Hard Service Area Policy:</span>
            {REGION_8_NOTICE}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_PROVINCES.map((province) => (
            <ProvinceCard
              key={province.slug}
              province={province}
              onSelectProvince={onSelectProvince}
              onSelectCity={onSelectCity}
            />
          ))}
        </div>
      </section>

      {/* 5. "Featured cities" chip list: Tacloban, Ormoc, Maasin, Catbalogan, Calbayog, Borongan */}
      <section className="py-12 bg-white/90 backdrop-blur-md border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#e8871e] block mb-1">
              Key Transport & Tourism Hubs
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0b2545] font-heading">
              Featured Rental Locations in Region 8
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Click any city to view local pickup points, airport delivery, and available fleet units.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {featuredCities.map((city) => (
              <CityChip
                key={city.slug}
                name={city.name}
                slug={city.slug}
                subtitle={city.provinceName}
                onClick={onSelectCity}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. "Our fleet" grid of 4 specialized vehicle cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#e8871e] uppercase tracking-wider mb-1">
              <Car className="w-4 h-4 text-[#e8871e]" />
              <span>Available Fleet</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b2545] font-heading">
              Our Fleet in Eastern Visayas
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Tailored fleet units for city driving, rugged provincial roads, high-torque mountain passes, and large group tours.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/vehicles')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0b2545] hover:bg-slate-50 transition-colors"
          >
            <span>View All Fleet Models</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#e8871e]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homepageFleet.map((vehicle) => (
            <VehicleCard
              key={vehicle.slug}
              vehicle={vehicle}
              onViewDetails={onSelectVehicle}
              onBookNow={onBookVehicle}
            />
          ))}
        </div>
      </section>

      {/* 7. "How it works" in 3 steps */}
      <StepsSection onStartTrip={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* 8. FAQ Accordion */}
      <FaqAccordion />

      {/* 9. Contact CTA */}
      <ContactCta
        onContactClick={() => onNavigate('/contact')}
        onBookClick={() => onNavigate('/book')}
      />
    </div>
  );
};
