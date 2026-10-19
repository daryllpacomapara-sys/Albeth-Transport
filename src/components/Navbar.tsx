import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  MapPin,
  CalendarCheck,
  ShieldCheck,
  Sliders,
  UserCheck,
  Radio,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    switchRole,
    currentUser,
    bookings,
    setIsAuthModalOpen,
  } = useApp();

  const activeBookingsCount = bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'active'
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Region 8 Notice Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            REGION VIII EXCLUSIVE
          </span>
          <span className="hidden sm:inline text-slate-400">
            Serving Leyte • Southern Leyte • Samar • Eastern Samar • Northern Samar • Biliran
          </span>
          <span className="sm:hidden text-slate-400">Eastern Visayas Network</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="hidden md:inline">24/7 Island Dispatch:</span>
            <strong className="text-white">+63 917 842 9912</strong>
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline text-slate-400">
            LTO Registered • P2P Insured
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('catalog')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Car className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                Waray<span className="text-emerald-600">Wheels</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                Region 8
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Fleet Tracking & Instant Booking
            </p>
          </div>
        </div>

        {/* Center Nav tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'catalog'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Browse Fleet</span>
          </button>

          <button
            onClick={() => setActiveTab('fleet-tracking')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'fleet-tracking'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <MapPin className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <span>Live Fleet Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
              activeTab === 'my-bookings'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>My Bookings</span>
            {activeBookingsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('host-portal')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'host-portal'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Fleet Inventory</span>
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher */}
          <div className="relative">
            <div className="flex items-center text-xs bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => switchRole('renter')}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                  currentRole === 'renter'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Renter view (Search, Instant Reserve, Trips)"
              >
                Renter
              </button>
              <button
                onClick={() => {
                  switchRole('host');
                  setActiveTab('host-portal');
                }}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                  currentRole === 'host'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Host/Fleet Manager (Manage vehicles, rates, telematics)"
              >
                Host / Fleet
              </button>
            </div>
          </div>

          {/* User Profile Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <ShieldCheck className="w-2 h-2 text-white stroke-[3]" />
              </span>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                <UserCheck className="w-2.5 h-2.5" />
                LTO Verified
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile sub-navigation tabs */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-white px-2 py-1.5 text-xs">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center py-1 px-2 font-medium ${
            activeTab === 'catalog' ? 'text-emerald-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Car className="w-4 h-4 mb-0.5" />
          <span>Fleet</span>
        </button>
        <button
          onClick={() => setActiveTab('fleet-tracking')}
          className={`flex flex-col items-center py-1 px-2 font-medium ${
            activeTab === 'fleet-tracking' ? 'text-emerald-600 font-bold' : 'text-slate-500'
          }`}
        >
          <MapPin className="w-4 h-4 mb-0.5 text-emerald-600" />
          <span>Radar</span>
        </button>
        <button
          onClick={() => setActiveTab('my-bookings')}
          className={`flex flex-col items-center py-1 px-2 font-medium relative ${
            activeTab === 'my-bookings' ? 'text-emerald-600 font-bold' : 'text-slate-500'
          }`}
        >
          <CalendarCheck className="w-4 h-4 mb-0.5" />
          <span>Bookings</span>
          {activeBookingsCount > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('host-portal')}
          className={`flex flex-col items-center py-1 px-2 font-medium ${
            activeTab === 'host-portal' ? 'text-emerald-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Sliders className="w-4 h-4 mb-0.5" />
          <span>Inventory</span>
        </button>
      </div>
    </header>
  );
};
