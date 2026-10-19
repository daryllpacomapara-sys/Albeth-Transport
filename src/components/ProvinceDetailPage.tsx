import React from 'react';
import { SEED_PROVINCES, SEED_CITIES, SEED_VEHICLES, REGION_8_NOTICE } from '../data/seedData';
import { VehicleCard } from './VehicleCard';
import { ChevronRight, MapPin, AlertCircle, ArrowRight, Compass, Sparkles } from 'lucide-react';

interface ProvinceDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
  onSelectCity: (slug: string) => void;
  onBookVehicle: (slug: string) => void;
  onViewVehicle: (slug: string) => void;
}

export const ProvinceDetailPage: React.FC<ProvinceDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectCity,
  onBookVehicle,
  onViewVehicle,
}) => {
  const province = SEED_PROVINCES.find((p) => p.slug === slug);

  if (!province) {
    return (
      <div className="py-20 px-4 max-w-3xl mx-auto text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#0b2545] font-heading">
          Province Not Found in Region 8
        </h1>
        <p className="text-sm text-slate-600">
          ALBETH TRANSPORT strictly serves Region 8 (Eastern Visayas) provinces only: Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar.
        </p>
        <div className="p-3 bg-orange-50 text-[#0b2545] border border-[#e8871e]/30 rounded-xl text-xs font-semibold inline-block">
          {REGION_8_NOTICE}
        </div>
        <div className="pt-4">
          <button
            onClick={() => onNavigate('/')}
            className="px-5 py-2.5 bg-[#0b2545] text-white text-xs font-bold rounded-xl"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const citiesInProvince = SEED_CITIES.filter((c) => c.provinceId === province.id);
  const availableVehicles = SEED_VEHICLES;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Breadcrumbs (Home > Province) */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => onNavigate('/')} className="hover:text-[#e8871e]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#0b2545] font-bold">{province.name}</span>
      </nav>

      {/* Hero Header with Brand Colors and Authentic Scenic Image */}
      <div className="relative rounded-3xl overflow-hidden bg-[#06182e] text-white p-6 sm:p-10 border border-[#0b2545] shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src={province.imageUrl}
            alt={`Scenic attractions in ${province.name}`}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06182e] via-[#0b2545]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8871e]/20 text-[#f59e0b] border border-[#e8871e]/40 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#e8871e]" />
            <span>Region VIII (Eastern Visayas)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight">
            Car Rental in {province.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {province.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/book')}
              className="px-6 py-3 bg-gradient-to-r from-[#e8871e] to-[#f59e0b] hover:from-[#d37415] hover:to-[#e8871e] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg glow-orange transition-all"
            >
              Book Car in {province.name}
            </button>
          </div>
        </div>
      </div>

      {/* Famous Tourist Destinations */}
      {province.touristSpots && province.touristSpots.length > 0 && (
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#e8871e] uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#e8871e]" />
            <span>Popular Destinations</span>
          </div>
          <h2 className="text-xl font-bold text-[#0b2545] font-heading">
            Must-Visit Sights in {province.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {province.touristSpots.map((spot, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#e8871e]" />
                <span className="text-xs font-semibold text-[#0b2545]">{spot}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cities in Province Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-[#0b2545] font-heading">
          Cities and Municipalities Covered in {province.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {citiesInProvince.map((city) => (
            <div
              key={city.slug}
              onClick={() => onSelectCity(city.slug)}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#e8871e] hover:bg-orange-50/40 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#0b2545] text-sm group-hover:text-[#e8871e] font-heading">
                  {city.name}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#e8871e] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{city.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Available Vehicles */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0b2545] font-heading">
            Available Fleet for {province.name} Travel
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Reliable transportation for provincial highways, coastal roads, and mountain routes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.slug}
              vehicle={vehicle}
              onViewDetails={onViewVehicle}
              onBookNow={onBookVehicle}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
