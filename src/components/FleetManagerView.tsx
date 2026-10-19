import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  Plus,
  Zap,
  TrendingUp,
  Sliders,
  DollarSign,
  Fuel,
  RefreshCw,
  Trash2,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { VehicleStatus } from '../types';

export const FleetManagerView: React.FC = () => {
  const {
    vehicles,
    bookings,
    updateVehicleStatus,
    updateVehicleRate,
    toggleInstantBooking,
    deleteVehicle,
    setIsAddVehicleModalOpen,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | VehicleStatus>('all');
  const [editingRateId, setEditingRateId] = useState<string | null>(null);
  const [tempRate, setTempRate] = useState<number>(0);

  // Financial calculations
  const totalRevenue = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.totalAmount : sum), 0);
  const activeRentals = bookings.filter((b) => b.status === 'confirmed' || b.status === 'active').length;
  const utilizationRate = Math.round((vehicles.filter((v) => v.status === 'rented').length / Math.max(1, vehicles.length)) * 100);

  const filteredVehicles = vehicles.filter((v) => {
    if (statusFilter !== 'all' && v.status !== statusFilter) return false;
    return true;
  });

  const handleStartEditRate = (vehicleId: string, currentRate: number) => {
    setEditingRateId(vehicleId);
    setTempRate(currentRate);
  };

  const handleSaveRate = (vehicleId: string) => {
    if (tempRate > 500) {
      updateVehicleRate(vehicleId, tempRate);
    }
    setEditingRateId(null);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>Region VIII Fleet Operator Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Vehicle Inventory & Dispatch Management
          </h2>
          <p className="text-sm text-slate-500">
            Control fleet pricing, GPS telematics, instant reservation policies, and maintenance across Eastern Visayas.
          </p>
        </div>

        <button
          onClick={() => setIsAddVehicleModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle to Fleet</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-bold uppercase tracking-wider">Fleet Inventory</span>
            <Car className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">
            {vehicles.length} Units
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            100% LTO & P2P Registered
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-bold uppercase tracking-wider">Active Bookings</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">
            {activeRentals} Active
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Across Leyte & Samar hubs
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-bold uppercase tracking-wider">Fleet Utilization</span>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">
            {utilizationRate}%
          </div>
          <span className="text-[11px] text-teal-600 font-medium mt-1 block">
            High seasonal tourist demand
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-bold uppercase tracking-wider">Gross Bookings</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-heading">
            ₱{totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Lifetime Region 8 rentals
          </span>
        </div>
      </div>

      {/* Inventory Table & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-2 uppercase">Status:</span>
            {(['all', 'available', 'rented', 'maintenance', 'reserved'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500">
            Showing <strong>{filteredVehicles.length}</strong> vehicles in fleet
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Vehicle / Plate</th>
                <th className="px-4 py-3">Category & Hub</th>
                <th className="px-4 py-3">Daily Rate</th>
                <th className="px-4 py-3">Instant Book</th>
                <th className="px-4 py-3">Operational Status</th>
                <th className="px-4 py-3">GPS Telemetry</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVehicles.map((vehicle) => {
                const isEditingThisRate = editingRateId === vehicle.id;

                return (
                  <tr key={vehicle.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Vehicle / Plate */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={vehicle.primaryImage}
                          alt={vehicle.model}
                          className="w-12 h-9 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xs font-heading">
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {vehicle.plateNumber}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {vehicle.transmission} • {vehicle.fuelType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Hub */}
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-slate-800 block">{vehicle.category}</span>
                      <span className="text-[11px] text-slate-500 truncate max-w-[160px] block">
                        {vehicle.currentLocationName}
                      </span>
                    </td>

                    {/* Daily Rate with inline edit */}
                    <td className="px-4 py-3.5">
                      {isEditingThisRate ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={tempRate}
                            onChange={(e) => setTempRate(Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-emerald-500 rounded text-xs font-bold focus:outline-none"
                          />
                          <button
                            onClick={() => handleSaveRate(vehicle.id)}
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleStartEditRate(vehicle.id, vehicle.dailyRate)}
                          className="cursor-pointer group flex items-center gap-1"
                          title="Click to edit rate"
                        >
                          <span className="font-extrabold text-slate-900 text-xs font-heading">
                            ₱{vehicle.dailyRate.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 group-hover:text-emerald-600">
                            ✎
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Instant Book Switch */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleInstantBooking(vehicle.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          vehicle.instantBooking
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>{vehicle.instantBooking ? 'Enabled' : 'Host Review'}</span>
                      </button>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-4 py-3.5">
                      <select
                        value={vehicle.status}
                        onChange={(e) =>
                          updateVehicleStatus(vehicle.id, e.target.value as VehicleStatus)
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          vehicle.status === 'available'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : vehicle.status === 'rented'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : vehicle.status === 'maintenance'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="available">Available (Hub)</option>
                        <option value="rented">On Trip (Rented)</option>
                        <option value="reserved">Reserved (Staged)</option>
                        <option value="maintenance">In Maintenance</option>
                      </select>
                    </td>

                    {/* GPS Telemetry status */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            vehicle.status === 'rented'
                              ? 'bg-emerald-500 animate-ping'
                              : 'bg-blue-500'
                          }`}
                        />
                        <span className="font-semibold text-slate-700">
                          {vehicle.telematics.speedKmh} km/h • {vehicle.currentFuelLevelPercent}% fuel
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {vehicle.telematics.deviceImei}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Retire ${vehicle.make} ${vehicle.model} (${vehicle.plateNumber}) from fleet?`)) {
                            deleteVehicle(vehicle.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete vehicle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
