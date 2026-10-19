import React, { useState } from 'react';
import { TripPlannerValues } from './TripPlannerForm';
import { SEED_CITIES, SEED_VEHICLES, REGION_8_NOTICE, SeedVehicle } from '../data/seedData';
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface SearchPageProps {
  initialCriteria: TripPlannerValues;
  onBookVehicle: (vehicleSlug: string, criteria: TripPlannerValues) => void;
  onViewVehicle: (slug: string) => void;
  onModifySearch: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  initialCriteria,
  onBookVehicle,
  onViewVehicle,
  onModifySearch,
}) => {
  const [criteria, setCriteria] = useState<TripPlannerValues>(initialCriteria);

  // Strict Region 8 City validation
  const pickupCityObj = SEED_CITIES.find((c) => c.slug === criteria.pickupCity);
  const dropoffCityObj = SEED_CITIES.find((c) => c.slug === criteria.dropoffCity);

  const isInvalidCity = !pickupCityObj || !dropoffCityObj;

  // Calculate duration in days
  const start = new Date(criteria.pickupDate).getTime();
  const end = new Date(criteria.dropoffDate).getTime();
  const durationDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  // Filter fleet matching parameters
  const matchingVehicles = SEED_VEHICLES.filter((v) => {
    if (v.status !== 'available') return false;
    if (criteria.vehicleType !== 'all' && v.type !== criteria.vehicleType) return false;
    if (criteria.transmission !== 'all' && v.transmission !== criteria.transmission) return false;
    if (v.seats < criteria.minSeats) return false;
    if (criteria.needDriver && !v.withDriverAvailable) return false;
    return true;
  });

  if (isInvalidCity) {
    return (
      <div className="py-16 px-4 max-w-2xl mx-auto text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#0b2545] font-heading">
          Invalid Service Location
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          The selected location is outside our operational network. ALBETH TRANSPORT only operates within Region 8 (Eastern Visayas).
        </p>
        <div className="p-3 bg-orange-50 text-[#0b2545] border border-[#e8871e]/30 rounded-xl text-xs font-semibold inline-block">
          {REGION_8_NOTICE}
        </div>
        <div className="pt-2">
          <button
            onClick={onModifySearch}
            className="px-5 py-2.5 bg-[#0b2545] text-white text-xs font-bold rounded-xl"
          >
            Modify Search Options
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Search Query Parameter Summary Bar */}
      <div className="bg-[#0b2545] text-white rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#06182e]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e8871e] animate-ping" />
            <span className="text-xs uppercase font-bold text-[#f59e0b] font-heading">
              Trip Planner Results
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-heading flex flex-wrap items-center gap-2">
            <span>{pickupCityObj.name}</span>
            <span className="text-[#f59e0b]">→</span>
            <span>{dropoffCityObj.name}</span>
            <span className="text-xs font-normal text-slate-300">
              ({durationDays} {durationDays === 1 ? 'Day' : 'Days'})
            </span>
          </h1>
          <p className="text-xs text-slate-300">
            {criteria.pickupDate} ({criteria.pickupTime}) to {criteria.dropoffDate} ({criteria.dropoffTime}) •{' '}
            {criteria.needDriver ? 'With Professional Driver' : 'Self-Drive'}
          </p>
        </div>

        <button
          onClick={onModifySearch}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors"
        >
          Modify Trip Options
        </button>
      </div>

      {/* Notice Banner */}
      <div className="p-3.5 bg-orange-50 border border-[#e8871e]/30 rounded-2xl flex items-center justify-between text-xs text-[#0b2545] font-medium shadow-xs">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#e8871e] shrink-0" />
          <span>{REGION_8_NOTICE} All quotes include 12% EVAT and comprehensive insurance.</span>
        </span>
        <span className="font-bold text-[#e8871e] hidden sm:inline">
          {matchingVehicles.length} of 4 fleet models available
        </span>
      </div>

      {/* Results Grid with Estimated Total Price */}
      {matchingVehicles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Car className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#0b2545]">No Vehicles Match Your Criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting seat requirements or vehicle model to find available fleet options in Eastern Visayas.
          </p>
          <button
            onClick={onModifySearch}
            className="px-4 py-2 bg-[#0b2545] text-white text-xs font-bold rounded-xl"
          >
            Adjust Filter Parameters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchingVehicles.map((vehicle) => {
            const driverDaily = criteria.needDriver ? 800 : 0;
            const dailyRate = vehicle.dailyRatePhp + driverDaily;
            const estimatedTotal = dailyRate * durationDays;

            return (
              <div
                key={vehicle.slug}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-[#e8871e]/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#06182e]/90 text-[#f59e0b] border border-[#e8871e]/30">
                      {vehicle.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/90 text-[#0b2545]">
                      {vehicle.transmission === 'automatic' ? 'AT' : 'MT'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-[#0b2545] text-base font-heading">
                      {vehicle.name}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <span>{vehicle.seats} Seats</span>
                      <span>•</span>
                      <span>{criteria.needDriver ? 'With Driver' : 'Self-Drive'}</span>
                    </div>

                    <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Daily Rate:</span>
                        <span className="font-semibold text-[#0b2545]">₱{dailyRate.toLocaleString()} / day</span>
                      </div>
                      <div className="flex justify-between text-[#0b2545] font-bold pt-1 border-t border-slate-200">
                        <span>Est. Trip Total ({durationDays}d):</span>
                        <span className="text-[#e8871e] text-sm font-heading font-black">
                          ₱{estimatedTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onViewVehicle(vehicle.slug)}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-[#0b2545] hover:bg-slate-50"
                    >
                      View details
                    </button>
                    <button
                      onClick={() => onBookVehicle(vehicle.slug, criteria)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#e8871e] to-[#f59e0b] hover:from-[#d37415] hover:to-[#e8871e] text-white text-xs font-extrabold shadow-md glow-orange"
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
