import React from 'react';
import { SEED_CITIES, SEED_PROVINCES, SEED_VEHICLES, REGION_8_NOTICE } from '../data/seedData';
import { VehicleCard } from './VehicleCard';
import {
  MapPin,
  ChevronRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface CityDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
  onBookVehicle: (slug: string) => void;
  onViewVehicle: (slug: string) => void;
}

export const CityDetailPage: React.FC<CityDetailPageProps> = ({
  slug,
  onNavigate,
  onBookVehicle,
  onViewVehicle,
}) => {
  const city = SEED_CITIES.find((c) => c.slug === slug);

  // Hard Rule: 404 for any slug outside Region 8
  if (!city) {
    return (
      <div className="py-20 px-4 max-w-3xl mx-auto text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#0b2545] font-heading">
          Location Not Found in Region 8
        </h1>
        <p className="text-sm text-slate-600">
          ALBETH TRANSPORT operates exclusively within Region 8 (Eastern Visayas). The requested location is outside our operational network.
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

  const province = SEED_PROVINCES.find((p) => p.id === city.provinceId);
  const nearbyCities = SEED_CITIES.filter((c) => c.provinceId === city.provinceId && c.id !== city.id);
  const availableVehicles = SEED_VEHICLES;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Breadcrumbs (Home > Province > City) */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => onNavigate('/')} className="hover:text-[#e8871e]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => onNavigate(`/province/${province?.slug || 'leyte'}`)}
          className="hover:text-[#e8871e]"
        >
          {city.provinceName}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#0b2545] font-bold">{city.name}</span>
      </nav>

      {/* Hero Header with Brand Colors */}
      <div className="relative rounded-3xl overflow-hidden bg-[#06182e] text-white p-6 sm:p-10 border border-[#0b2545] shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src={city.imageUrl}
            alt={`Car Rental in ${city.name}`}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06182e] via-[#0b2545]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8871e]/20 text-[#f59e0b] border border-[#e8871e]/40 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#e8871e]" />
            <span>{city.provinceName} • Region 8 Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight">
            Car Rental in {city.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {city.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate(`/book?city=${city.slug}`)}
              className="px-6 py-3 bg-gradient-to-r from-[#e8871e] to-[#f59e0b] hover:from-[#d37415] hover:to-[#e8871e] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg glow-orange transition-all"
            >
              Book Car in {city.name}
            </button>
            <span className="text-xs text-[#f59e0b] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#e8871e]" />
              <span>Door-to-door delivery available</span>
            </span>
          </div>
        </div>
      </div>

      {/* Local Destinations & Terminal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-bold text-[#0b2545] text-base font-heading flex items-center gap-2">
            <Building className="w-4 h-4 text-[#e8871e]" />
            Key Pickup & Dropoff Spots in {city.name}
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {city.popularDestinations.map((dest, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e8871e] shrink-0" />
                <span>{dest}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50/60 p-6 rounded-3xl border border-[#e8871e]/30 shadow-sm space-y-3 text-[#0b2545]">
          <h3 className="font-bold text-sm font-heading flex items-center gap-2 text-[#0b2545]">
            <ShieldCheck className="w-4 h-4 text-[#e8871e]" />
            Why rent in {city.name} with ALBETH TRANSPORT?
          </h3>
          <p className="text-xs text-[#0b2545] leading-relaxed">
            All vehicles dispatched to {city.name} include comprehensive insurance, same-to-same fuel policy, and 24/7 roadside assistance across Eastern Visayas.
          </p>
          <div className="text-[11px] font-bold text-[#e8871e]">
            {REGION_8_NOTICE}
          </div>
        </div>
      </div>

      {/* Available Fleet in this City */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0b2545] font-heading">
              Available Vehicles in {city.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant reservation with zero delivery delay at {city.name} hubs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/vehicles')}
            className="text-xs font-bold text-[#e8871e] hover:underline"
          >
            View all 4 fleet units
          </button>
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

      {/* Nearby Cities in the Same Province */}
      {nearbyCities.length > 0 && (
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Nearby Cities in {city.provinceName}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {nearbyCities.map((near) => (
              <button
                key={near.slug}
                onClick={() => onNavigate(`/city/${near.slug}`)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0b2545] hover:border-[#e8871e] hover:text-[#e8871e] shadow-xs transition-colors"
              >
                {near.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
