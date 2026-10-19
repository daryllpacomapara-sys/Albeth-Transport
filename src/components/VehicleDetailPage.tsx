import React from 'react';
import { SEED_VEHICLES, REGION_8_NOTICE } from '../data/seedData';
import {
  ChevronRight,
  Users,
  Sparkles,
  Fuel,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertCircle,
  Clock,
  Car,
  Gauge,
  Zap,
} from 'lucide-react';

interface VehicleDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
  onBookNow: (slug: string) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  slug,
  onNavigate,
  onBookNow,
}) => {
  const vehicle = SEED_VEHICLES.find((v) => v.slug === slug);

  if (!vehicle) {
    return (
      <div className="py-20 px-4 max-w-3xl mx-auto text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#0b2545] font-heading">Vehicle Not Found</h1>
        <p className="text-sm text-slate-600">The vehicle you requested does not exist in our Region 8 fleet.</p>
        <button
          onClick={() => onNavigate('/vehicles')}
          className="px-5 py-2.5 bg-[#0b2545] text-white text-xs font-bold rounded-xl"
        >
          View Fleet
        </button>
      </div>
    );
  }

  // JSON-LD Vehicle / Product schema
  const vehicleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: vehicle.name,
    vehicleConfiguration: `${vehicle.seats}-seater ${vehicle.transmission} ${vehicle.type}`,
    numberOfDoors: vehicle.type === 'van' ? 4 : 5,
    seatingCapacity: vehicle.seats,
    vehicleTransmission: vehicle.transmission,
    image: vehicle.imageUrl,
    offers: {
      '@type': 'Offer',
      price: vehicle.dailyRatePhp,
      priceCurrency: 'PHP',
      availability: 'https://schema.org/InStock',
      areaServed: 'Region 8, Eastern Visayas, Philippines',
    },
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Vehicle JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => onNavigate('/')} className="hover:text-[#e8871e]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button onClick={() => onNavigate('/vehicles')} className="hover:text-[#e8871e]">
          Vehicles
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#0b2545] font-bold">{vehicle.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery & Specs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#06182e]/90 text-[#f59e0b] border border-[#e8871e]/30">
                {vehicle.type}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/95 text-[#0b2545]">
                {vehicle.transmission === 'automatic' ? 'Automatic (AT)' : 'Manual (MT)'}
              </span>
            </div>
          </div>

          {/* Key Specs Matrix */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Users className="w-5 h-5 text-[#e8871e] mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Capacity</span>
              <strong className="text-xs text-[#0b2545]">{vehicle.seats} Passengers</strong>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Sparkles className="w-5 h-5 text-[#e8871e] mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Transmission</span>
              <strong className="text-xs text-[#0b2545] capitalize">{vehicle.transmission}</strong>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Fuel className="w-5 h-5 text-[#e8871e] mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Luggage</span>
              <strong className="text-xs text-[#0b2545]">{vehicle.luggageCapacity}</strong>
            </div>
          </div>

          {/* Technical Engineering Specifications Table */}
          {vehicle.specs && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-[#0b2545] text-sm font-heading flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#e8871e]" />
                Technical Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Engine</span>
                  <span className="font-bold text-[#0b2545]">{vehicle.specs.engine}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Max Output</span>
                  <span className="font-bold text-[#e8871e]">{vehicle.specs.power}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Max Torque</span>
                  <span className="font-bold text-[#0b2545]">{vehicle.specs.torque}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Gearbox</span>
                  <span className="font-bold text-[#0b2545]">{vehicle.specs.transmissionDetail}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Ground Clearance</span>
                  <span className="font-bold text-[#0b2545]">{vehicle.specs.groundClearance}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fuel Economy</span>
                  <span className="font-bold text-emerald-700">{vehicle.specs.fuelEconomy}</span>
                </div>
              </div>
            </div>
          )}

          {/* Features Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
            <h3 className="font-bold text-[#0b2545] text-sm font-heading">
              In-Car Equipment & Comfort Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {vehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#e8871e] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-orange-50/60 p-5 rounded-3xl border border-[#e8871e]/30 space-y-2">
              <span className="text-xs font-bold text-[#0b2545] uppercase tracking-wider block">
                Rental Inclusions
              </span>
              <ul className="space-y-1.5 text-xs text-[#0b2545]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e8871e]" />
                  <span>Comprehensive Insurance with CTPL</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e8871e]" />
                  <span>Unlimited Region 8 Highway Mileage</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e8871e]" />
                  <span>24/7 Island Dispatch Roadside Assist</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e8871e]" />
                  <span>Standard 12% Philippine EVAT</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Rental Exclusions
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Fuel (Same-to-same return policy)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Toll fees & parking terminal fees</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Driver overnight meal/hotel allowance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking Summary Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-6 sticky top-24">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e8871e] block mb-1">
              ALBETH TRANSPORT Fleet Unit
            </span>
            <h1 className="text-2xl font-black text-[#0b2545] font-heading">
              {vehicle.name}
            </h1>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-3xl font-black text-[#0b2545] font-heading">
                ₱{vehicle.dailyRatePhp.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-slate-500">/ day (PHP)</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-700">
              <span>Operational Area:</span>
              <strong className="text-[#0b2545] font-bold">Region 8 (Eastern Visayas)</strong>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Tacloban Airport (TAC):</span>
              <span className="font-semibold text-[#0b2545]">Direct Terminal Curbside Staging</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Security Deposit:</span>
              <span className="font-semibold text-[#0b2545]">
                ₱{vehicle.type === 'van' ? '6,000' : '4,000'} (Refundable)
              </span>
            </div>
          </div>

          <div className="p-3 bg-orange-50 border border-[#e8871e]/30 rounded-2xl text-[11px] text-[#0b2545] leading-relaxed font-medium">
            <ShieldCheck className="w-4 h-4 text-[#e8871e] inline mr-1" />
            <span>{REGION_8_NOTICE} Guaranteed LTO registration and zero cross-island ferry fees.</span>
          </div>

          <button
            onClick={() => onBookNow(vehicle.slug)}
            className="w-full py-4 bg-gradient-to-r from-[#e8871e] via-[#f59e0b] to-[#e8871e] hover:from-[#d37415] hover:to-[#e8871e] text-white font-black text-sm rounded-2xl shadow-xl glow-orange flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book This Vehicle Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
