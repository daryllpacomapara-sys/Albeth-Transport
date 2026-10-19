import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Zap,
  ArrowRightLeft,
  Search,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { VehicleCategory } from '../types';

export const HeroSearch: React.FC = () => {
  const {
    hubs,
    searchCriteria,
    setSearchCriteria,
    vehicles,
    checkAvailability,
  } = useApp();

  const [differentDropoff, setDifferentDropoff] = useState(
    searchCriteria.pickupHubId !== searchCriteria.returnHubId
  );

  const categories: (VehicleCategory | 'All')[] = [
    'All',
    'SUV',
    'Pickup 4x4',
    'Van',
    'MPV',
    'Sedan',
    'Compact',
  ];

  // Calculate live matching vehicles
  const matchingCount = vehicles.filter((v) => {
    if (searchCriteria.category !== 'All' && v.category !== searchCriteria.category) return false;
    if (searchCriteria.instantOnly && !v.instantBooking) return false;
    if (searchCriteria.withDriver && !v.withDriverAvailable) return false;
    return checkAvailability(v.id, searchCriteria.startDate, searchCriteria.endDate);
  }).length;

  const handlePickupChange = (hubId: string) => {
    setSearchCriteria((prev) => ({
      ...prev,
      pickupHubId: hubId,
      returnHubId: differentDropoff ? prev.returnHubId : hubId,
    }));
  };

  const handleToggleDifferentDropoff = () => {
    const nextState = !differentDropoff;
    setDifferentDropoff(nextState);
    if (!nextState) {
      setSearchCriteria((prev) => ({ ...prev, returnHubId: prev.pickupHubId }));
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Region VIII Eastern Visayas Unified Mobility Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 font-heading">
            Seamless Car Rental & Fleet Sharing in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Region 8
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time GPS fleet tracking and instant booking across <strong>Leyte, Samar, and Biliran</strong>.
            Zero airport wait times at Tacloban (TAC), Ormoc, Calbayog, Catarman, or seaport delivery.
          </p>
        </div>

        {/* The Search Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-800 border border-slate-100">
          {/* Driver & Delivery Mode Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchCriteria((prev) => ({ ...prev, withDriver: false }))}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !searchCriteria.withDriver
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Self-Drive</span>
                <span className="text-[10px] opacity-80">(Standard)</span>
              </button>

              <button
                type="button"
                onClick={() => setSearchCriteria((prev) => ({ ...prev, withDriver: true }))}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  searchCriteria.withDriver
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>With Chauffeur / Driver</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                  +₱800/day
                </span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button
                type="button"
                onClick={handleToggleDifferentDropoff}
                className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
                <span>{differentDropoff ? 'Return to same point' : 'Return to different Region 8 city'}</span>
              </button>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={searchCriteria.instantOnly}
                  onChange={(e) =>
                    setSearchCriteria((prev) => ({ ...prev, instantOnly: e.target.checked }))
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Instant Book Only
                </span>
              </label>
            </div>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pickup Location */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Region 8 Pickup Hub
              </label>
              <div className="relative">
                <select
                  value={searchCriteria.pickupHubId}
                  onChange={(e) => handlePickupChange(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                >
                  {hubs.map((hub) => (
                    <option key={hub.id} value={hub.id}>
                      {hub.name} ({hub.province})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Return Location (or Dropoff) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                Drop-Off Hub
              </label>
              <select
                disabled={!differentDropoff}
                value={searchCriteria.returnHubId}
                onChange={(e) =>
                  setSearchCriteria((prev) => ({ ...prev, returnHubId: e.target.value }))
                }
                className={`w-full pl-3 pr-8 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                  !differentDropoff
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-emerald-500'
                }`}
              >
                {hubs.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.name} ({hub.province})
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Date & Time */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Trip Start Date & Time
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="date"
                  value={searchCriteria.startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) =>
                    setSearchCriteria((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                  className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
                <div className="relative">
                  <input
                    type="time"
                    value={searchCriteria.startTime}
                    onChange={(e) =>
                      setSearchCriteria((prev) => ({ ...prev, startTime: e.target.value }))
                    }
                    className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                  <Clock className="w-3 h-3 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Return Date & Time */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                Trip Return Date & Time
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="date"
                  value={searchCriteria.endDate}
                  min={searchCriteria.startDate}
                  onChange={(e) =>
                    setSearchCriteria((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
                <div className="relative">
                  <input
                    type="time"
                    value={searchCriteria.endTime}
                    onChange={(e) =>
                      setSearchCriteria((prev) => ({ ...prev, endTime: e.target.value }))
                    }
                    className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                  <Clock className="w-3 h-3 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Quick Chips & Live Count */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-slate-400 mr-1 shrink-0">Type:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSearchCriteria((prev) => ({ ...prev, category: cat }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    searchCriteria.category === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  <strong>{matchingCount}</strong> vehicles ready in Region 8
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const elem = document.getElementById('vehicle-catalog-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>View Available Vehicles</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
