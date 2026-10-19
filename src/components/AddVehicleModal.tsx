import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Car, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { VehicleCategory, TransmissionType, FuelType } from '../types';

export const AddVehicleModal: React.FC = () => {
  const {
    isAddVehicleModalOpen,
    setIsAddVehicleModalOpen,
    addVehicle,
    hubs,
    currentUser,
  } = useApp();

  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('Innova Cross');
  const [year, setYear] = useState(2024);
  const [category, setCategory] = useState<VehicleCategory>('MPV');
  const [transmission, setTransmission] = useState<TransmissionType>('Automatic');
  const [fuelType, setFuelType] = useState<FuelType>('Diesel');
  const [seats, setSeats] = useState(7);
  const [dailyRate, setDailyRate] = useState(2800);
  const [securityDeposit, setSecurityDeposit] = useState(4000);
  const [plateNumber, setPlateNumber] = useState('TAC 8901');
  const [hubId, setHubId] = useState(hubs[0]?.id || 'hub-tac-airport');
  const [primaryImage, setPrimaryImage] = useState(
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
  );
  const [instantBooking, setInstantBooking] = useState(true);
  const [withDriverAvailable, setWithDriverAvailable] = useState(true);
  const [withDriverDailyFee, setWithDriverDailyFee] = useState(850);

  if (!isAddVehicleModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addVehicle({
      make,
      model,
      year: Number(year),
      category,
      transmission,
      fuelType,
      seats: Number(seats),
      dailyRate: Number(dailyRate),
      securityDeposit: Number(securityDeposit),
      plateNumber: plateNumber.toUpperCase(),
      orCrVerified: true,
      insuranceType: 'Full Fleet Comprehensive',
      instantBooking,
      status: 'available',
      primaryImage,
      images: [primaryImage],
      features: [
        'Air Conditioning',
        'Bluetooth Audio',
        'Keyless Entry',
        'Dual Front Airbags',
        'Reverse Parking Camera',
      ],
      odometerKm: 15000,
      fuelCapacityLiters: 65,
      currentFuelLevelPercent: 100,
      batteryHealthPercent: 98,
      currentLocationHubId: hubId,
      currentLocationName: hubs.find((h) => h.id === hubId)?.name || 'Tacloban Hub',
      coordinates: hubs.find((h) => h.id === hubId)?.coordinates || { lat: 11.244, lng: 125.003 },
      telematics: {
        speedKmh: 0,
        engineStatus: 'off',
        lastPingTime: 'Just configured',
        isInsideRegion8: true,
        deviceImei: `IMEI-863920-${Math.floor(1000 + Math.random() * 9000)}`,
      },
      host: {
        name: currentUser.name || 'Leyte Horizon Fleet & Logistics',
        avatar: currentUser.avatar,
        rating: 5.0,
        totalTrips: 1,
        responseRate: '100%',
        isSuperHost: true,
        phone: currentUser.phone,
      },
      withDriverAvailable,
      withDriverDailyFee: Number(withDriverDailyFee),
    });

    setIsAddVehicleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading">Register Vehicle into Fleet</h2>
              <p className="text-xs text-slate-400">Region VIII Hub Inventory Deployment</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddVehicleModalOpen(false)}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Make / Brand</label>
              <input
                type="text"
                required
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="e.g. Toyota, Mitsubishi, Ford"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Model Name</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Hilux, Vios, Innova"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Model Year</label>
              <input
                type="number"
                required
                min={2018}
                max={2026}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Sedan">Sedan</option>
                <option value="Compact">Compact</option>
                <option value="SUV">SUV</option>
                <option value="Pickup 4x4">Pickup 4x4</option>
                <option value="Van">Van</option>
                <option value="MPV">MPV</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Diesel">Diesel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Seats (Passengers)</label>
              <input
                type="number"
                min={2}
                max={18}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Plate Number (LTO Standard)</label>
              <input
                type="text"
                required
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="e.g. HAH 4091"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono uppercase font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Daily Rental Rate (PHP ₱)</label>
              <input
                type="number"
                required
                min={1000}
                step={50}
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Security Deposit (PHP ₱)</label>
              <input
                type="number"
                required
                min={2000}
                step={500}
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Region 8 Home Staging Hub</label>
            <select
              value={hubId}
              onChange={(e) => setHubId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {hubs.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} ({hub.province})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Vehicle Image URL</label>
            <input
              type="url"
              value={primaryImage}
              onChange={(e) => setPrimaryImage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Instant Booking switch */}
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="font-bold text-slate-800 block">Instant Booking Enabled</span>
              <span className="text-[11px] text-slate-500">
                Allows verified renters to reserve instantly without waiting for manual host approval.
              </span>
            </div>
            <input
              type="checkbox"
              checked={instantBooking}
              onChange={(e) => setInstantBooking(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAddVehicleModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20"
            >
              Add Vehicle to Fleet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
