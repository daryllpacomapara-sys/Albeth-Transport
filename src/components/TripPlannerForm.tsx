import React, { useState } from 'react';
import { z } from 'zod';
import { SEED_CITIES, REGION_8_NOTICE } from '../data/seedData';
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

// Extract valid city slugs
const validCitySlugs = SEED_CITIES.map((c) => c.slug) as [string, ...string[]];

export const tripPlannerSchema = z.object({
  pickupCity: z.enum(validCitySlugs, {
    message: 'Pickup location must be within Region 8 (Eastern Visayas).',
  }),
  dropoffCity: z.enum(validCitySlugs, {
    message: 'Dropoff location must be within Region 8 (Eastern Visayas).',
  }),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  dropoffDate: z.string().min(1, 'Dropoff date is required'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  dropoffTime: z.string().min(1, 'Dropoff time is required'),
  vehicleType: z.enum(['all', 'sedan', 'suv', 'van', 'pickup', 'mpv']),
  minSeats: z.coerce.number().min(2).max(15),
  transmission: z.enum(['all', 'manual', 'automatic']),
  needDriver: z.boolean(),
}).refine((data) => {
  const start = new Date(data.pickupDate).getTime();
  const end = new Date(data.dropoffDate).getTime();
  return end >= start;
}, {
  message: 'Dropoff date cannot be earlier than pickup date.',
  path: ['dropoffDate'],
});

export type TripPlannerValues = z.infer<typeof tripPlannerSchema>;

interface TripPlannerFormProps {
  onSearch: (values: TripPlannerValues) => void;
  initialValues?: Partial<TripPlannerValues>;
}

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ onSearch, initialValues }) => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const fourDaysLater = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

  const [pickupCity, setPickupCity] = useState(initialValues?.pickupCity || 'tacloban-city');
  const [dropoffCity, setDropoffCity] = useState(initialValues?.dropoffCity || 'tacloban-city');
  const [pickupDate, setPickupDate] = useState(initialValues?.pickupDate || tomorrow);
  const [dropoffDate, setDropoffDate] = useState(initialValues?.dropoffDate || fourDaysLater);
  const [pickupTime, setPickupTime] = useState(initialValues?.pickupTime || '09:00');
  const [dropoffTime, setDropoffTime] = useState(initialValues?.dropoffTime || '17:00');
  const [vehicleType, setVehicleType] = useState<TripPlannerValues['vehicleType']>(
    initialValues?.vehicleType || 'all'
  );
  const [minSeats, setMinSeats] = useState<number>(initialValues?.minSeats || 5);
  const [transmission, setTransmission] = useState<TripPlannerValues['transmission']>(
    initialValues?.transmission || 'all'
  );
  const [needDriver, setNeedDriver] = useState<boolean>(initialValues?.needDriver ?? false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = tripPlannerSchema.safeParse({
      pickupCity,
      dropoffCity,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime,
      vehicleType,
      minSeats,
      transmission,
      needDriver,
    });

    if (!result.success) {
      setErrorMessage(result.error.issues[0]?.message || 'Please check your trip parameters.');
      return;
    }

    onSearch(result.data);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5 sm:p-7 relative overflow-hidden backdrop-blur-md">
      {/* Region 8 Hard Requirement Badge with brand colors */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e8871e] animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b2545] font-heading">
            Start Your Trip Plan
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-[#e8871e]/30 text-[#0b2545] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#e8871e]" />
          <span>{REGION_8_NOTICE}</span>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Pickup & Dropoff Cities (Region 8 Only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#e8871e]" />
              Pickup City (Region 8 Only)
            </label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e] focus:outline-none cursor-pointer"
            >
              {SEED_CITIES.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name} ({city.provinceName})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#1e4d79]" />
              Dropoff City (Region 8 Only)
            </label>
            <select
              value={dropoffCity}
              onChange={(e) => setDropoffCity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e] focus:outline-none cursor-pointer"
            >
              {SEED_CITIES.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name} ({city.provinceName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Dates and Times */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#e8871e]" />
              Pickup Date
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#e8871e]" />
              Pickup Time
            </label>
            <input
              type="time"
              required
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#1e4d79]" />
              Dropoff Date
            </label>
            <input
              type="date"
              required
              min={pickupDate}
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#1e4d79]" />
              Dropoff Time
            </label>
            <input
              type="time"
              required
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e]"
            />
          </div>
        </div>

        {/* Row 3: Vehicle Preferences & Driver option */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-500" />
              Vehicle Model
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e] cursor-pointer"
            >
              <option value="all">All Available Models (4 Units)</option>
              <option value="sedan">Mitsubishi Mirage G4 (AT) - Sedan</option>
              <option value="suv">Ford Ecosport Titanium 1.5 (AT) - SUV</option>
              <option value="mpv">Toyota Tamaraw 2.4 GL (AT) - MPV 7-Seater</option>
              <option value="van">Mitsubishi L300 FB (MT) - 15-Seater Van</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              Minimum Seats
            </label>
            <select
              value={minSeats}
              onChange={(e) => setMinSeats(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e] cursor-pointer"
            >
              <option value={2}>Any (2-15 Passengers)</option>
              <option value={5}>5 Seats (Mirage G4 / Ecosport)</option>
              <option value={7}>7 Seats (Toyota Tamaraw 2.4 GL)</option>
              <option value={15}>15 Seats (Mitsubishi L300 FB Van)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-slate-500" />
              Transmission
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] focus:ring-2 focus:ring-[#e8871e] cursor-pointer"
            >
              <option value="all">Any Transmission</option>
              <option value="automatic">Automatic Only (Mirage, Ecosport, Tamaraw)</option>
              <option value="manual">Manual Only (L300 FB Van)</option>
            </select>
          </div>
        </div>

        {/* Row 4: Driver Toggle & Search Submit */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={needDriver}
              onChange={(e) => setNeedDriver(e.target.checked)}
              className="w-4 h-4 rounded text-[#e8871e] focus:ring-[#e8871e] cursor-pointer accent-[#e8871e]"
            />
            <span className="text-xs font-semibold text-[#0b2545]">
              Need a professional chauffeur / driver (+₱800/day)
            </span>
          </label>

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-[#e8871e] via-[#f59e0b] to-[#e8871e] hover:from-[#d37415] hover:to-[#e8871e] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg glow-orange flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Search options</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
