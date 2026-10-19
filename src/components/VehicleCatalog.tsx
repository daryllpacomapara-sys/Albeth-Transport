import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle, TransmissionType, FuelType } from '../types';
import {
  Users,
  Fuel,
  Zap,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle,
  Eye,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

export const VehicleCatalog: React.FC = () => {
  const {
    vehicles,
    searchCriteria,
    setSearchCriteria,
    openBookingModal,
    setSelectedVehicle,
    checkAvailability,
    getHubById,
  } = useApp();

  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [filterTransmission, setFilterTransmission] = useState<TransmissionType | 'All'>('All');
  const [filterFuel, setFilterFuel] = useState<FuelType | 'All'>('All');
  const [filterSeats, setFilterSeats] = useState<string>('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Compute trip duration in days
  const start = new Date(searchCriteria.startDate).getTime();
  const end = new Date(searchCriteria.endDate).getTime();
  const durationDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  // Filter and sort
  const filteredVehicles = vehicles
    .filter((v) => {
      // Category filter
      if (searchCriteria.category !== 'All' && v.category !== searchCriteria.category) {
        return false;
      }
      // Instant only
      if (searchCriteria.instantOnly && !v.instantBooking) {
        return false;
      }
      // Transmission
      if (filterTransmission !== 'All' && v.transmission !== filterTransmission) {
        return false;
      }
      // Fuel
      if (filterFuel !== 'All' && v.fuelType !== filterFuel) {
        return false;
      }
      // Seats
      if (filterSeats === '5' && v.seats !== 5) return false;
      if (filterSeats === '7' && v.seats !== 7 && v.seats !== 8) return false;
      if (filterSeats === '10+' && v.seats < 10) return false;

      // With driver check
      if (searchCriteria.withDriver && !v.withDriverAvailable) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price-desc') return b.dailyRate - a.dailyRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // Recommended
    });

  const pickupHub = getHubById(searchCriteria.pickupHubId);

  return (
    <section id="vehicle-catalog-section" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Region 8 Active Fleet
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Verified Vehicles in {pickupHub ? pickupHub.province : 'Eastern Visayas'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Displaying {filteredVehicles.length} vehicles available for your selected dates (
            <strong>{durationDays} {durationDays === 1 ? 'day' : 'days'}</strong>)
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showAdvancedFilters
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="recommended">Sort: Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filter drawer */}
      {showAdvancedFilters && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Transmission
            </label>
            <div className="flex items-center gap-1">
              {(['All', 'Automatic', 'Manual'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterTransmission(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    filterTransmission === t
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Fuel Type
            </label>
            <div className="flex items-center gap-1">
              {(['All', 'Diesel', 'Gasoline'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterFuel(f as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    filterFuel === f
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Passenger Capacity
            </label>
            <div className="flex items-center gap-1">
              {[
                { id: 'All', label: 'Any' },
                { id: '5', label: '5 Seats' },
                { id: '7', label: '7-8 Seats' },
                { id: '10+', label: '10-15 Seats' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFilterSeats(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    filterSeats === s.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid of Vehicles */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No vehicles match your current filter</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-5">
            Try adjusting transmission, category, or passenger requirements to view other Region 8 fleet vehicles.
          </p>
          <button
            onClick={() => {
              setSearchCriteria((prev) => ({
                ...prev,
                category: 'All',
                instantOnly: false,
                withDriver: false,
              }));
              setFilterTransmission('All');
              setFilterFuel('All');
              setFilterSeats('All');
            }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const isAvailable = checkAvailability(
              vehicle.id,
              searchCriteria.startDate,
              searchCriteria.endDate
            );
            const totalTripEstimated = vehicle.dailyRate * durationDays;

            return (
              <div
                key={vehicle.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={vehicle.primaryImage}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {vehicle.instantBooking ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
                          <Zap className="w-3 h-3 fill-slate-950" />
                          Instant Book
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 backdrop-blur-xs text-white">
                          Host Approval
                        </span>
                      )}

                      <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-slate-800 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        OR/CR Verified
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-xs text-emerald-400">
                      {vehicle.category}
                    </span>
                  </div>

                  {/* Bottom Image Overlay: Hub Location & Plate */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[190px] font-medium">
                        {vehicle.currentLocationName}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] bg-black/50 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-slate-300">
                      {vehicle.plateNumber}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Make / Model / Year & Rating */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition-colors font-heading">
                          {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-xs text-slate-500">Year {vehicle.year}</p>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-slate-800">{vehicle.rating}</span>
                        <span className="text-[10px] text-slate-400">({vehicle.reviewCount})</span>
                      </div>
                    </div>

                    {/* Quick Specs Pill Row */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 px-3 my-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] font-medium text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fuel className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vehicle.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vehicle.seats} Seats</span>
                      </div>
                    </div>

                    {/* Host & Telemetry Note */}
                    <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <img
                          src={vehicle.host.avatar}
                          alt={vehicle.host.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-slate-600 font-medium truncate max-w-[130px]">
                          {vehicle.host.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>GPS Live Tracking</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-4 mt-3">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                            ₱{vehicle.dailyRate.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">/ day</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">
                          ₱{totalTripEstimated.toLocaleString()} est. for {durationDays} {durationDays === 1 ? 'day' : 'days'}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Free cancellation
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Deposit: ₱{vehicle.securityDeposit.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>

                      <button
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => openBookingModal(vehicle)}
                        className={`flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                          isAvailable
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <span>{isAvailable ? 'Instant Reserve' : 'Unavailable'}</span>
                        {isAvailable && <ArrowRight className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
