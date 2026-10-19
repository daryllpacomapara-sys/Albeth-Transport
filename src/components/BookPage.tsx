import React, { useState } from 'react';
import { SEED_CITIES, SEED_VEHICLES, REGION_8_NOTICE } from '../data/seedData';
import { TripPlannerValues } from './TripPlannerForm';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Car,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  ArrowRight,
  QrCode,
} from 'lucide-react';

interface BookPageProps {
  prefilledVehicleSlug?: string;
  prefilledCriteria?: Partial<TripPlannerValues>;
  onNavigateHome: () => void;
}

export const BookPage: React.FC<BookPageProps> = ({
  prefilledVehicleSlug,
  prefilledCriteria,
  onNavigateHome,
}) => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const fourDaysLater = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

  const [vehicleSlug, setVehicleSlug] = useState(
    prefilledVehicleSlug || SEED_VEHICLES[0].slug
  );
  const [pickupCity, setPickupCity] = useState(
    prefilledCriteria?.pickupCity || 'tacloban-city'
  );
  const [dropoffCity, setDropoffCity] = useState(
    prefilledCriteria?.dropoffCity || 'tacloban-city'
  );
  const [pickupDate, setPickupDate] = useState(
    prefilledCriteria?.pickupDate || tomorrow
  );
  const [dropoffDate, setDropoffDate] = useState(
    prefilledCriteria?.dropoffDate || fourDaysLater
  );
  const [pickupTime, setPickupTime] = useState(
    prefilledCriteria?.pickupTime || '09:00'
  );
  const [dropoffTime, setDropoffTime] = useState(
    prefilledCriteria?.dropoffTime || '17:00'
  );
  const [needDriver, setNeedDriver] = useState(
    prefilledCriteria?.needDriver || false
  );

  // Contact Details
  const [contactName, setContactName] = useState('Daryll Pacoma');
  const [contactEmail, setContactEmail] = useState('daryllpacomapara@gmail.com');
  const [contactPhone, setContactPhone] = useState('+63 917 554 9921');
  const [notes, setNotes] = useState('Arrival via Tacloban Airport (TAC) Terminal.');

  // Confirmation state
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const selectedVehicle =
    SEED_VEHICLES.find((v) => v.slug === vehicleSlug) || SEED_VEHICLES[0];
  const pickupCityObj =
    SEED_CITIES.find((c) => c.slug === pickupCity) || SEED_CITIES[0];
  const dropoffCityObj =
    SEED_CITIES.find((c) => c.slug === dropoffCity) || SEED_CITIES[0];

  // Duration
  const start = new Date(pickupDate).getTime();
  const end = new Date(dropoffDate).getTime();
  const durationDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  // Financials
  const driverDaily = needDriver ? 800 : 0;
  const dailyTotal = selectedVehicle.dailyRatePhp + driverDaily;
  const rentalSubtotal = dailyTotal * durationDays;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomRef = Math.floor(1000 + Math.random() * 9000);
    const newBookingRef = `ALB-REG8-2026-${randomRef}`;

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Confetti fallback
    }

    setConfirmedBookingId(newBookingRef);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {confirmedBookingId ? (
        /* Confirmation Screen with Brand Colors */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-orange-100 text-[#e8871e] rounded-full flex items-center justify-center mx-auto ring-8 ring-orange-50">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase px-3 py-1 bg-orange-100 text-[#e8871e] rounded-full border border-[#e8871e]/30">
              BOOKING REQUEST RECEIVED & PENDING DISPATCH
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-3 font-heading">
              Reference: {confirmedBookingId}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
              Thank you, <strong>{contactName}</strong>. A pending booking has been registered and a notification email has been dispatched to ALBETH TRANSPORT dispatch.
            </p>
          </div>

          {/* Digital Boarding Voucher Card */}
          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-[#0b2545] text-sm font-heading">
                  {selectedVehicle.name}
                </h3>
                <span className="text-xs text-slate-500 capitalize">
                  {selectedVehicle.type} • {selectedVehicle.transmission} • {selectedVehicle.seats} Seats
                </span>
              </div>
              <div className="p-1.5 bg-white border border-slate-200 rounded-xl">
                <QrCode className="w-10 h-10 text-[#0b2545]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Pickup Location
                </span>
                <strong className="text-[#0b2545] block truncate">{pickupCityObj.name}</strong>
                <span className="text-[11px] text-slate-500">{pickupDate} @ {pickupTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Dropoff Location
                </span>
                <strong className="text-[#0b2545] block truncate">{dropoffCityObj.name}</strong>
                <span className="text-[11px] text-slate-500">{dropoffDate} @ {dropoffTime}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-xs">
              <span className="font-bold text-slate-700">Estimated Total:</span>
              <strong className="text-lg font-black text-[#e8871e] font-heading">
                ₱{rentalSubtotal.toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 bg-[#0b2545] hover:bg-[#06182e] text-white text-xs font-bold rounded-xl transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      ) : (
        /* Booking Request Form */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#e8871e] uppercase tracking-wider mb-1">
              <Car className="w-4 h-4 text-[#e8871e]" />
              <span>Region 8 Reservation Request</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] font-heading">
              Complete Your Booking Request
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review your trip schedule and enter your contact details. Our dispatcher will confirm vehicle availability immediately.
            </p>
          </div>

          <div className="p-3 bg-orange-50 border border-[#e8871e]/30 rounded-2xl text-xs text-[#0b2545] font-medium shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#e8871e] inline mr-1" />
            <span>{REGION_8_NOTICE}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Vehicle & Route */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                1. Trip & Vehicle Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">Select Fleet Model</label>
                  <select
                    value={vehicleSlug}
                    onChange={(e) => setVehicleSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] cursor-pointer focus:ring-2 focus:ring-[#e8871e]"
                  >
                    {SEED_VEHICLES.map((v) => (
                      <option key={v.slug} value={v.slug}>
                        {v.name} (₱{v.dailyRatePhp.toLocaleString()}/day)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">Chauffeur / Driver Option</label>
                  <select
                    value={needDriver ? 'yes' : 'no'}
                    onChange={(e) => setNeedDriver(e.target.value === 'yes')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] cursor-pointer focus:ring-2 focus:ring-[#e8871e]"
                  >
                    <option value="no">Self-Drive</option>
                    <option value="yes">With Professional Driver (+₱800/day)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">
                    Pickup City (Region 8 Only)
                  </label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] cursor-pointer focus:ring-2 focus:ring-[#e8871e]"
                  >
                    {SEED_CITIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} ({c.provinceName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">
                    Dropoff City (Region 8 Only)
                  </label>
                  <select
                    value={dropoffCity}
                    onChange={(e) => setDropoffCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545] cursor-pointer focus:ring-2 focus:ring-[#e8871e]"
                  >
                    {SEED_CITIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} ({c.provinceName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">Pickup Schedule</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545]"
                    />
                    <input
                      type="time"
                      required
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">Dropoff Schedule</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      required
                      min={pickupDate}
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545]"
                    />
                    <input
                      type="time"
                      required
                      value={dropoffTime}
                      onChange={(e) => setDropoffTime(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Contact Details */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                2. Contact & Identification
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0b2545] block mb-1">Mobile Phone (+63)</label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0b2545]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b2545] block mb-1">
                  Trip Notes / Flight Details
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Flight PR2981 arriving 10:30am at Tacloban Airport (TAC)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
            </div>

            {/* Price Breakdown Footer with Brand Styling */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">
                  Duration: {durationDays} {durationDays === 1 ? 'day' : 'days'} • Rate: ₱{dailyTotal.toLocaleString()}/day
                </span>
                <div className="text-xl font-black text-[#0b2545] font-heading">
                  Estimated Total: <span className="text-[#e8871e]">₱{rentalSubtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="px-7 py-3.5 bg-gradient-to-r from-[#e8871e] via-[#f59e0b] to-[#e8871e] hover:from-[#d37415] hover:to-[#e8871e] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg glow-orange transition-all hover:scale-[1.02]"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
