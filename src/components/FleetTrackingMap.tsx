import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle } from '../types';
import {
  Navigation,
  Radio,
  Fuel,
  BatteryCharging,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ArrowRight,
  Gauge,
  MapPin,
  RefreshCw,
  Search,
} from 'lucide-react';

export const FleetTrackingMap: React.FC = () => {
  const { vehicles, hubs, openBookingModal } = useApp();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState<'all' | 'rented' | 'available' | 'maintenance'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // Geofence calculations
  const totalVehicles = vehicles.length;
  const inTransitCount = vehicles.filter((v) => v.status === 'rented').length;
  const readyCount = vehicles.filter((v) => v.status === 'available').length;
  const maintenanceCount = vehicles.filter((v) => v.status === 'maintenance').length;

  const filteredVehicles = vehicles.filter((v) => {
    if (filterStatus !== 'all' && v.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.plateNumber.toLowerCase().includes(q) ||
        v.currentLocationName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Map coordinate conversion: Region 8 bounds (Lat: 9.8°N to 12.8°N, Lng: 124.0°E to 126.0°E)
  const mapCoords = (lat: number, lng: number) => {
    // Map bounds
    const minLat = 9.8;
    const maxLat = 12.8;
    const minLng = 124.1;
    const maxLng = 126.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Invert Y because latitude goes north (up), while SVG Y goes down
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;

    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    };
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Region VIII Fleet Telematics & GPS Command</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Live Vehicle Tracking & Geo-Fence Radar
          </h2>
          <p className="text-sm text-slate-500">
            Real-time GPS coordination across Leyte, Samar, and Biliran island highways and transit hubs.
          </p>
        </div>

        {/* Quick telemetry KPI metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Total Fleet</span>
            <div className="text-lg font-extrabold text-slate-900">{totalVehicles}</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 shadow-xs">
            <span className="text-[10px] text-emerald-700 font-bold uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              On-Trip Moving
            </span>
            <div className="text-lg font-extrabold text-emerald-700">{inTransitCount}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 shadow-xs">
            <span className="text-[10px] text-blue-700 font-bold uppercase">Ready at Hubs</span>
            <div className="text-lg font-extrabold text-blue-700">{readyCount}</div>
          </div>
          <div className="bg-slate-900 text-white rounded-xl px-3 py-2 shadow-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Region 8 Lock</span>
            <div className="text-lg font-extrabold text-emerald-400">100% OK</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Fleet Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Region 8 SVG Map (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 sm:p-5 border border-slate-800 text-white flex flex-col justify-between relative shadow-xl overflow-hidden min-h-[540px]">
          {/* Map Controls Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 z-10 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Region VIII Satellite Telemetry
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">Pan-Philippine Hwy Corridor</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px]">
                GPS LIVE
              </span>
            </div>
          </div>

          {/* Interactive SVG Area */}
          <div className="relative w-full h-[400px] sm:h-[440px] my-4 rounded-xl overflow-hidden bg-radial from-slate-900 to-slate-950 border border-slate-800/60">
            {/* Ambient Grid Lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#64748b" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Stylized Eastern Visayas Landmass Outlines & Arteries */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full text-slate-800 pointer-events-none"
            >
              {/* Northern Samar & Samar Main Mass */}
              <path
                d="M 120,40 Q 220,20 300,50 Q 360,90 340,160 Q 320,230 270,260 Q 220,250 180,210 Q 140,150 120,40 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />
              {/* Eastern Samar Extension (Guiuan Peninsula) */}
              <path
                d="M 310,130 Q 380,180 390,270 Q 400,340 370,390 Q 350,380 330,320 Q 310,250 310,130 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />
              {/* Biliran Island */}
              <path
                d="M 120,200 Q 145,190 150,225 Q 135,245 115,230 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />
              {/* Leyte Main Island */}
              <path
                d="M 170,255 Q 230,260 250,290 Q 235,360 220,420 Q 180,450 150,390 Q 120,330 145,280 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />
              {/* Southern Leyte & Panaon */}
              <path
                d="M 205,420 Q 240,430 255,480 Q 225,495 195,470 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />

              {/* San Juanico Bridge Connector Line (Tacloban to Santa Rita Samar) */}
              <line
                x1="220"
                y1="272"
                x2="242"
                y2="265"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
              {/* Biliran Bridge Connector */}
              <line
                x1="140"
                y1="235"
                x2="155"
                y2="255"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="3 2"
              />

              {/* Regional Major Highway Network (Pan-Philippine AH26) */}
              <path
                d="M 160,50 L 210,130 L 240,200 L 235,268 L 225,320 L 210,380 L 225,450"
                fill="none"
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="2 3"
              />
              <path
                d="M 170,280 L 140,320 L 150,360 L 195,420"
                fill="none"
                stroke="#475569"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
            </svg>

            {/* Geographical Map Labels */}
            <div className="absolute top-4 left-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Northern Samar (Allen/Catarman)
            </div>
            <div className="absolute top-28 right-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Eastern Samar (Borongan/Guiuan)
            </div>
            <div className="absolute top-40 left-10 text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Biliran (Naval)
            </div>
            <div className="absolute top-52 left-32 text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest pointer-events-none">
              San Juanico Bridge
            </div>
            <div className="absolute bottom-28 left-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Ormoc City (West Coast)
            </div>
            <div className="absolute bottom-6 left-28 text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Southern Leyte (Maasin/Liloan)
            </div>

            {/* Render Location Hub Markers */}
            {hubs.map((hub) => {
              const { x, y } = mapCoords(hub.coordinates.lat, hub.coordinates.lng);
              return (
                <div
                  key={hub.id}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/hub cursor-default"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-500/80 border border-slate-300 group-hover/hub:scale-150 transition-transform" />
                  <div className="hidden group-hover/hub:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap z-30 pointer-events-none">
                    {hub.name}
                  </div>
                </div>
              );
            })}

            {/* Render Vehicle Markers */}
            {vehicles.map((vehicle) => {
              const { x, y } = mapCoords(vehicle.coordinates.lat, vehicle.coordinates.lng);
              const isSelected = vehicle.id === selectedVehicleId;
              const isMoving = vehicle.status === 'rented';

              return (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 z-20 group/marker cursor-pointer ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  {/* Ping effect for moving cars */}
                  {isMoving && (
                    <span className="absolute -inset-2 rounded-full bg-emerald-500/40 animate-ping" />
                  )}

                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shadow-lg border-2 transition-all ${
                      isSelected
                        ? 'bg-emerald-500 border-white text-slate-950 scale-110 ring-4 ring-emerald-500/30'
                        : isMoving
                        ? 'bg-emerald-600 border-emerald-300 text-white'
                        : vehicle.status === 'available'
                        ? 'bg-blue-600 border-blue-300 text-white'
                        : 'bg-amber-600 border-amber-300 text-white'
                    }`}
                  >
                    <Navigation
                      className={`w-3.5 h-3.5 ${
                        isMoving ? 'animate-bounce stroke-[2.5]' : ''
                      }`}
                    />
                  </div>

                  {/* Marker label pill */}
                  <div
                    className={`absolute top-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap border shadow-sm ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 border-white font-extrabold'
                        : 'bg-slate-900/90 text-slate-200 border-slate-700'
                    }`}
                  >
                    {vehicle.plateNumber}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-300">Active Trip (Moving)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-300">Stationed & Ready</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-300">Reserved / Inspection</span>
              </span>
            </div>

            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Eastern Visayas Geofence Enforced</span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Telematics & Vehicle Inspector (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Quick Vehicle Search & Status Filter */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by model, plate, or hub..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  filterStatus === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({vehicles.length})
              </button>
              <button
                onClick={() => setFilterStatus('rented')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  filterStatus === 'rented'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                On Trip ({inTransitCount})
              </button>
              <button
                onClick={() => setFilterStatus('available')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  filterStatus === 'available'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Available ({readyCount})
              </button>
            </div>
          </div>

          {/* Active Selected Vehicle Live Telematics Card */}
          {selectedVehicle && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                {/* Header with thumbnail & model */}
                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                  <img
                    src={selectedVehicle.primaryImage}
                    alt={selectedVehicle.model}
                    className="w-20 h-14 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        {selectedVehicle.plateNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          selectedVehicle.status === 'rented'
                            ? 'bg-emerald-100 text-emerald-800'
                            : selectedVehicle.status === 'available'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {selectedVehicle.status === 'rented' ? 'In Transit' : selectedVehicle.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mt-1 truncate font-heading">
                      {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})
                    </h3>
                    <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      {selectedVehicle.currentLocationName}
                    </p>
                  </div>
                </div>

                {/* Live Diagnostics Gauge Grid */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  {/* Speed */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span className="font-semibold flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                        Live Speed
                      </span>
                      <span className="text-[10px] text-slate-400">GPS Ping</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900 font-heading">
                        {selectedVehicle.telematics.speedKmh}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">km/h</span>
                    </div>
                  </div>

                  {/* Fuel Gauge */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span className="font-semibold flex items-center gap-1">
                        <Fuel className="w-3.5 h-3.5 text-teal-600" />
                        Fuel Level
                      </span>
                      <span className="text-[10px] text-slate-400">{selectedVehicle.fuelType}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900 font-heading">
                        {selectedVehicle.currentFuelLevelPercent}%
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        (~{Math.round((selectedVehicle.fuelCapacityLiters * selectedVehicle.currentFuelLevelPercent) / 100)}L)
                      </span>
                    </div>
                  </div>

                  {/* Battery Health */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span className="font-semibold flex items-center gap-1">
                        <BatteryCharging className="w-3.5 h-3.5 text-amber-600" />
                        12V Battery
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">Healthy</span>
                    </div>
                    <div className="text-lg font-extrabold text-slate-900 font-heading">
                      {selectedVehicle.batteryHealthPercent}% Health
                    </div>
                  </div>

                  {/* Odometer */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span className="font-semibold flex items-center gap-1">
                        <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                        Odometer
                      </span>
                      <span className="text-[10px] text-slate-400">Verified</span>
                    </div>
                    <div className="text-lg font-extrabold text-slate-900 font-heading">
                      {selectedVehicle.odometerKm.toLocaleString()} km
                    </div>
                  </div>
                </div>

                {/* Geo-fence compliance indicator */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 mb-4 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Eastern Visayas Boundary Checked
                    </span>
                    <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded font-mono">
                      COMPLIANT
                    </span>
                  </div>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    Vehicle is operating safely within Region 8 corridors. No illegal ferry exits detected at Allen Port or Liloan Terminal.
                  </p>
                </div>
              </div>

              {/* Bottom Reservation Trigger */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-extrabold text-slate-900 font-heading">
                    ₱{selectedVehicle.dailyRate.toLocaleString()} <span className="text-xs font-normal text-slate-500">/day</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Host: {selectedVehicle.host.name}
                  </span>
                </div>

                <button
                  onClick={() => openBookingModal(selectedVehicle)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Reserve This Car</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
