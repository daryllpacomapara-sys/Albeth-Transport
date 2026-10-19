import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck,
  MapPin,
  Clock,
  ShieldCheck,
  QrCode,
  FileCheck,
  Navigation,
  XCircle,
  Car,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Booking } from '../types';

export const MyBookingsView: React.FC = () => {
  const {
    bookings,
    currentUser,
    cancelBooking,
    openInspectionModal,
    setActiveTab,
  } = useApp();

  // Filter bookings for current user (or show all in demo mode)
  const userBookings = bookings;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Renter Trips & Reservations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            My Region 8 Bookings
          </h2>
          <p className="text-sm text-slate-500">
            Access your active itineraries, digital QR boarding passes, and pre-trip condition reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl">
            Renter: <strong>{currentUser.name}</strong> ({currentUser.driversLicenseNo})
          </span>
        </div>
      </div>

      {/* Bookings List */}
      {userBookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Reservations Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            You don't have any reservations booked yet. Browse our Region 8 fleet to book your next trip.
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-emerald-700 transition-colors"
          >
            Explore Fleet
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userBookings.map((booking) => {
            const isConfirmed = booking.status === 'confirmed';
            const isActive = booking.status === 'active';
            const isCompleted = booking.status === 'completed';
            const isCancelled = booking.status === 'cancelled';

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Vehicle Image & Essential Details */}
                <div className="flex items-start gap-4">
                  <img
                    src={booking.vehicle.primaryImage}
                    alt={booking.vehicle.model}
                    className="w-28 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                  />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-black uppercase px-2 py-0.5 rounded bg-slate-900 text-white">
                        {booking.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          isConfirmed
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : isActive
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : isCompleted
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        {booking.vehicle.plateNumber}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base font-heading">
                      {booking.vehicle.make} {booking.vehicle.model} ({booking.vehicle.year})
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-[220px]">
                          <strong>Pickup:</strong> {booking.pickupLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>
                          {booking.startDate} ({booking.durationDays} {booking.durationDays === 1 ? 'day' : 'days'})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center: Financials & Coverage */}
                <div className="lg:border-l lg:border-r border-slate-100 lg:px-6 py-2 space-y-1 text-xs">
                  <div className="flex items-baseline justify-between lg:justify-start gap-2">
                    <span className="text-slate-400">Total Paid:</span>
                    <strong className="text-lg font-black text-slate-900 font-heading">
                      ₱{booking.totalAmount.toLocaleString()}
                    </strong>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Deposit: ₱{booking.securityDeposit.toLocaleString()} (Refundable)
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Plan: {booking.protectionPlan.toUpperCase()}</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap lg:flex-col items-center lg:items-end justify-end gap-2 shrink-0">
                  {/* Digital Inspection Button (doon.ph style) */}
                  {!isCancelled && !isCompleted && (
                    <button
                      onClick={() => openInspectionModal(booking)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        booking.inspectionCompleted
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm'
                      }`}
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>
                        {booking.inspectionCompleted
                          ? 'Inspection Verified ✓'
                          : 'Start Pre-Trip Inspection'}
                      </span>
                    </button>
                  )}

                  {/* Locate on Radar */}
                  <button
                    onClick={() => setActiveTab('fleet-tracking')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Locate Vehicle GPS</span>
                  </button>

                  {/* Cancel if confirmed */}
                  {isConfirmed && (
                    <button
                      onClick={() => {
                        if (confirm(`Cancel reservation ${booking.id}? Free cancellation policy applies.`)) {
                          cancelBooking(booking.id);
                        }
                      }}
                      className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 p-1"
                    >
                      <XCircle className="w-3 h-3" />
                      <span>Cancel Booking</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
