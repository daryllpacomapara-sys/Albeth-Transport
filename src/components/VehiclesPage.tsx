import React, { useState } from 'react';
import { SEED_VEHICLES, REGION_8_NOTICE } from '../data/seedData';
import { VehicleCard } from './VehicleCard';
import { Car, Filter, SlidersHorizontal, ShieldCheck } from 'lucide-react';

interface VehiclesPageProps {
  onViewVehicle: (slug: string) => void;
  onBookVehicle: (slug: string) => void;
}

export const VehiclesPage: React.FC<VehiclesPageProps> = ({ onViewVehicle, onBookVehicle }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedSeats, setSelectedSeats] = useState<string>('all');
  const [withDriverOnly, setWithDriverOnly] = useState<boolean>(false);

  const filteredVehicles = SEED_VEHICLES.filter((v) => {
    if (selectedType !== 'all' && v.type !== selectedType) return false;
    if (selectedTransmission !== 'all' && v.transmission !== selectedTransmission) return false;
    if (selectedSeats === '5' && v.seats !== 5) return false;
    if (selectedSeats === '7' && v.seats !== 7) return false;
    if (selectedSeats === '15' && v.seats !== 15) return false;
    if (withDriverOnly && !v.withDriverAvailable) return false;
    return true;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header with Brand Styling */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#e8871e] uppercase tracking-wider mb-1">
            <Car className="w-4 h-4 text-[#e8871e]" />
            <span>Region 8 Fleet Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] font-heading">
            Our 4 Fleet Models in Eastern Visayas
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Choose from the fuel-efficient Mitsubishi Mirage G4, agile Ford Ecosport Titanium, high-torque Toyota Tamaraw 7-seater, or the 15-seater Mitsubishi L300 FB van.
          </p>
        </div>

        <div className="p-3 bg-orange-50 border border-[#e8871e]/30 rounded-2xl text-xs text-[#0b2545] font-medium shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#e8871e] inline mr-1" />
          <span>{REGION_8_NOTICE}</span>
        </div>
      </div>

      {/* Filter Bar with Brand Elements */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Type */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-400 uppercase text-[10px]">Model Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-[#0b2545] cursor-pointer focus:ring-2 focus:ring-[#e8871e]"
            >
              <option value="all">All 4 Models</option>
              <option value="sedan">Sedan (Mirage G4)</option>
              <option value="suv">SUV (Ford Ecosport)</option>
              <option value="mpv">MPV (Toyota Tamaraw)</option>
              <option value="van">Van (Mitsubishi L300 FB)</option>
            </select>
          </div>

          {/* Transmission */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-400 uppercase text-[10px]">Transmission:</span>
            <select
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-[#0b2545] cursor-pointer focus:ring-2 focus:ring-[#e8871e]"
            >
              <option value="all">Any</option>
              <option value="automatic">Automatic Only (3 Models)</option>
              <option value="manual">Manual Only (L300 FB)</option>
            </select>
          </div>

          {/* Seats */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-400 uppercase text-[10px]">Seats:</span>
            <select
              value={selectedSeats}
              onChange={(e) => setSelectedSeats(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-[#0b2545] cursor-pointer focus:ring-2 focus:ring-[#e8871e]"
            >
              <option value="all">Any Seats</option>
              <option value="5">5 Seats (Mirage / Ecosport)</option>
              <option value="7">7 Seats (Toyota Tamaraw)</option>
              <option value="15">15 Seats (L300 FB Van)</option>
            </select>
          </div>
        </div>

        {/* Driver Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#0b2545]">
          <input
            type="checkbox"
            checked={withDriverOnly}
            onChange={(e) => setWithDriverOnly(e.target.checked)}
            className="w-4 h-4 rounded text-[#e8871e] focus:ring-[#e8871e] cursor-pointer accent-[#e8871e]"
          />
          <span>Chauffeur / Driver option</span>
        </label>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.slug}
            vehicle={vehicle}
            onViewDetails={onViewVehicle}
            onBookNow={onBookVehicle}
          />
        ))}
      </div>
    </div>
  );
};
