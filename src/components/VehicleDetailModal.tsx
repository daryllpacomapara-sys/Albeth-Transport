import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Users,
  Fuel,
  Sparkles,
  Zap,
  Phone,
  AlertTriangle,
  FileCheck,
  Info,
  Calendar,
} from 'lucide-react';

export const VehicleDetailModal: React.FC = () => {
  const { selectedVehicle, setSelectedVehicle, openBookingModal } = useApp();

  if (!selectedVehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-slate-900">
          <img
            src={selectedVehicle.primaryImage}
            alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedVehicle(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Bottom Overlay Title */}
          <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500 text-slate-950">
                  {selectedVehicle.category}
                </span>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-black/60 border border-white/20">
                  {selectedVehicle.plateNumber}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
                {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})
              </h2>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {selectedVehicle.currentLocationName}
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400 font-heading">
                ₱{selectedVehicle.dailyRate.toLocaleString()}
              </span>
              <span className="text-xs text-slate-300 block">per day</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Transmission</span>
              <strong className="text-xs text-slate-800">{selectedVehicle.transmission}</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Fuel & Tank</span>
              <strong className="text-xs text-slate-800">
                {selectedVehicle.fuelType} ({selectedVehicle.fuelCapacityLiters}L)
              </strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Capacity</span>
              <strong className="text-xs text-slate-800">{selectedVehicle.seats} Passengers</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Insurance</span>
              <strong className="text-xs text-emerald-700">{selectedVehicle.insuranceType}</strong>
            </div>
          </div>

          {/* Features Checklist */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Vehicle Equipment & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedVehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host & Fleet Operator Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedVehicle.host.avatar}
                alt={selectedVehicle.host.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 text-sm font-heading">
                    {selectedVehicle.host.name}
                  </h4>
                  {selectedVehicle.host.isSuperHost && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                      SUPERHOST
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 text-slate-800 font-semibold">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {selectedVehicle.host.rating}
                  </span>
                  <span>•</span>
                  <span>{selectedVehicle.host.totalTrips} Region 8 trips completed</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${selectedVehicle.host.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Contact Host</span>
              </a>
            </div>
          </div>

          {/* Region 8 Specific Rental Rules */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Region 8 Rental Guidelines & Policies
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">1. Required Documents:</span>
                <span>Valid Philippine Driver's License + 1 secondary government photo ID (Passport / UMID / SSS).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">2. Geo-Fence Boundary:</span>
                <span>Travel is strictly restricted to Region VIII (Leyte, Southern Leyte, Samar, Eastern Samar, Northern Samar, Biliran). Ferry transit to Luzon or Mindanao requires advance fleet written consent.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">3. Fuel Policy:</span>
                <span>Same-to-same policy. Receive full or verified tank, return at the exact same level.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">4. Security Deposit:</span>
                <span>₱{selectedVehicle.securityDeposit.toLocaleString()} refundable deposit verified upon vehicle release.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-xl font-black text-slate-900 font-heading">
              ₱{selectedVehicle.dailyRate.toLocaleString()}{' '}
              <span className="text-xs font-normal text-slate-500">/ day</span>
            </div>
            <span className="text-[11px] text-slate-500">
              Deposit: ₱{selectedVehicle.securityDeposit.toLocaleString()} (Refundable)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                const vehicle = selectedVehicle;
                setSelectedVehicle(null);
                openBookingModal(vehicle);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Reserve</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
