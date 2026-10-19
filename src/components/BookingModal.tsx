import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Tag,
  CreditCard,
  QrCode,
  ArrowRight,
  User,
  Phone,
  FileText,
  Sparkles,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    vehicleForBooking,
    isBookingModalOpen,
    closeBookingModal,
    searchCriteria,
    currentUser,
    createBooking,
    getHubById,
    openInspectionModal,
  } = useApp();

  const [withDriver, setWithDriver] = useState(searchCriteria.withDriver);
  const [protectionPlan, setProtectionPlan] = useState<'basic' | 'comprehensive' | 'zero_excess'>('comprehensive');
  const [childSeat, setChildSeat] = useState(false);
  const [unlimitedMileage, setUnlimitedMileage] = useState(true);
  const [rfidTollTag, setRfidTollTag] = useState(true);
  const [actionCam, setActionCam] = useState(false);

  const [promoCodeInput, setPromoCodeInput] = useState('WARAY10');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('WARAY10');
  const [promoDiscountRate, setPromoDiscountRate] = useState<number>(0.10); // 10%
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'maya' | 'credit_card' | 'cash_on_pickup'>('gcash');

  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isBookingModalOpen || !vehicleForBooking) return null;

  const pickupHub = getHubById(searchCriteria.pickupHubId);
  const returnHub = getHubById(searchCriteria.returnHubId);

  // Compute duration
  const start = new Date(searchCriteria.startDate).getTime();
  const end = new Date(searchCriteria.endDate).getTime();
  const durationDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  // Pricing math
  const baseRate = vehicleForBooking.dailyRate;
  const driverDaily = withDriver ? vehicleForBooking.withDriverDailyFee || 850 : 0;
  const dailyTotal = baseRate + driverDaily;
  const rentalSubtotal = dailyTotal * durationDays;

  // Protection fees per day
  const protectionDaily =
    protectionPlan === 'comprehensive' ? 350 : protectionPlan === 'zero_excess' ? 650 : 0;
  const protectionTotal = protectionDaily * durationDays;

  // Add-ons
  const childSeatTotal = childSeat ? 150 * durationDays : 0;
  const unlimitedMileageTotal = unlimitedMileage ? 250 * durationDays : 0;
  const rfidTotal = rfidTollTag ? 100 * durationDays : 0;
  const actionCamTotal = actionCam ? 120 * durationDays : 0;
  const addonsTotal = childSeatTotal + unlimitedMileageTotal + rfidTotal + actionCamTotal;

  // Delivery fee
  const deliveryFee = (pickupHub?.deliveryFee || 0) + (returnHub?.deliveryFee || 0);

  // Promo Discount
  const discountAmount = appliedPromo ? Math.round(rentalSubtotal * promoDiscountRate) : 0;

  // VAT (12% of net taxable)
  const taxableAmount = rentalSubtotal - discountAmount + addonsTotal + protectionTotal;
  const vatTax = Math.round(taxableAmount * 0.12);

  // Grand total
  const totalAmount = taxableAmount + vatTax + deliveryFee;
  const securityDeposit = vehicleForBooking.securityDeposit;

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'WARAY10') {
      setAppliedPromo('WARAY10');
      setPromoDiscountRate(0.10);
    } else if (code === 'REGION8WELCOME') {
      setAppliedPromo('REGION8WELCOME');
      setPromoDiscountRate(0.15);
    } else {
      alert('Invalid Promo Code. Try WARAY10 for 10% off or REGION8WELCOME for 15% off.');
    }
  };

  const handleConfirmReservation = () => {
    const newBooking = createBooking({
      vehicleId: vehicleForBooking.id,
      vehicle: vehicleForBooking,
      userId: currentUser.id,
      renterName: currentUser.name,
      renterEmail: currentUser.email,
      renterPhone: currentUser.phone,
      renterLicenseNo: currentUser.driversLicenseNo,
      pickupHubId: searchCriteria.pickupHubId,
      pickupLocation: pickupHub ? `${pickupHub.name}, ${pickupHub.city}` : 'Tacloban Hub',
      returnHubId: searchCriteria.returnHubId,
      returnLocation: returnHub ? `${returnHub.name}, ${returnHub.city}` : 'Tacloban Hub',
      startDate: searchCriteria.startDate,
      startTime: searchCriteria.startTime,
      endDate: searchCriteria.endDate,
      endTime: searchCriteria.endTime,
      durationDays,
      withDriver,
      protectionPlan,
      protectionFee: protectionTotal,
      addons: {
        childSeat,
        unlimitedMileage,
        rfidTollTag,
        actionCam,
      },
      addonsTotal,
      dailyTotal,
      subtotal: rentalSubtotal,
      deliveryFeeTotal: deliveryFee,
      discount: discountAmount,
      promoCode: appliedPromo || undefined,
      vatTax,
      totalAmount,
      securityDeposit,
      paymentMethod,
      paymentStatus: 'paid',
    });

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }

    setConfirmedBookingId(newBooking.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading">
                {confirmedBookingId ? 'Reservation Confirmed!' : 'Instant Reservation Checkout'}
              </h2>
              <p className="text-xs text-slate-400">
                Region VIII Fleet Network • Insured & LTO Compliant
              </p>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* SUCCESS SCREEN */}
          {confirmedBookingId ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                  BOOKING CONFIRMED & DISPATCHED
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-heading">
                  Reservation Reference: {confirmedBookingId}
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
                  Your vehicle has been locked in the Region 8 inventory. A copy of the digital rental agreement and pickup QR code have been prepared.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {vehicleForBooking.make} {vehicleForBooking.model}
                    </h4>
                    <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
                      Plate: {vehicleForBooking.plateNumber}
                    </span>
                  </div>
                  <div className="p-2 bg-white border border-slate-200 rounded-xl">
                    <QrCode className="w-12 h-12 text-slate-900" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Pickup Hub
                    </span>
                    <span className="font-semibold text-slate-800">
                      {pickupHub?.name || 'Tacloban Hub'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Schedule
                    </span>
                    <span className="font-semibold text-slate-800">
                      {searchCriteria.startDate} @ {searchCriteria.startTime}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  <div className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Pickup Instructions:
                  </div>
                  <p className="text-[11px] mt-0.5 text-emerald-800">
                    Proceed to the designated WarayWheels concierge desk at {pickupHub?.name}. Present this digital pass and your Philippine driver's license.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={closeBookingModal}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Return to Fleet
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT SCREEN */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form Details (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Vehicle Header Mini */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                  <img
                    src={vehicleForBooking.primaryImage}
                    alt={vehicleForBooking.model}
                    className="w-20 h-14 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm font-heading">
                        {vehicleForBooking.make} {vehicleForBooking.model} ({vehicleForBooking.year})
                      </h3>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-700">
                        {vehicleForBooking.plateNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {vehicleForBooking.category} • {vehicleForBooking.transmission} • {vehicleForBooking.fuelType} • {vehicleForBooking.seats} Seats
                    </p>
                  </div>
                </div>

                {/* Pickup & Schedule Confirmation */}
                <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    Trip Itinerary (Region 8)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Pickup Location & Time
                      </span>
                      <strong className="text-slate-800 block truncate">
                        {pickupHub?.name || 'Tacloban Hub'}
                      </strong>
                      <span className="text-slate-500 font-medium text-[11px]">
                        {searchCriteria.startDate} @ {searchCriteria.startTime}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Return Location & Time
                      </span>
                      <strong className="text-slate-800 block truncate">
                        {returnHub?.name || 'Tacloban Hub'}
                      </strong>
                      <span className="text-slate-500 font-medium text-[11px]">
                        {searchCriteria.endDate} @ {searchCriteria.endTime} ({durationDays} {durationDays === 1 ? 'day' : 'days'})
                      </span>
                    </div>
                  </div>

                  {/* Driver Option */}
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={withDriver}
                        onChange={(e) => setWithDriver(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span className="font-semibold text-slate-700">
                        Include Professional Chauffeur / Driver (+₱{vehicleForBooking.withDriverDailyFee}/day)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Protection Plans (doon.ph style) */}
                <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Select Island Protection Plan
                    </h4>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Standard in Region 8
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Basic */}
                    <div
                      onClick={() => setProtectionPlan('basic')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        protectionPlan === 'basic'
                          ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          Basic CTPL & Third Party Protection
                        </span>
                        <span className="text-xs font-bold text-slate-900">Included (₱0)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Covers Compulsory Third Party Liability. Renter liability up to ₱20,000 for vehicle damage.
                      </p>
                    </div>

                    {/* Comprehensive */}
                    <div
                      onClick={() => setProtectionPlan('comprehensive')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        protectionPlan === 'comprehensive'
                          ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            Comprehensive Island Shield (Recommended)
                          </span>
                          <span className="text-[9px] font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded">
                            POPULAR
                          </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-700">+₱350 / day</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Own damage, typhoon/flood acts of God, theft. Max renter deductible capped at ₱5,000 only.
                      </p>
                    </div>

                    {/* Zero Excess */}
                    <div
                      onClick={() => setProtectionPlan('zero_excess')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        protectionPlan === 'zero_excess'
                          ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          Zero Excess Ultimate Peace of Mind
                        </span>
                        <span className="text-xs font-bold text-emerald-700">+₱650 / day</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        ₱0 liability deductible for scratches, minor dents, and stone chips on regional highways.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add-on options */}
                <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Optional Add-ons & Equipment
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                      <span className="font-medium text-slate-700">Unlimited Region 8 Mileage</span>
                      <input
                        type="checkbox"
                        checked={unlimitedMileage}
                        onChange={(e) => setUnlimitedMileage(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                      <span className="font-medium text-slate-700">FastPass RFID Tag (+₱100/day)</span>
                      <input
                        type="checkbox"
                        checked={rfidTollTag}
                        onChange={(e) => setRfidTollTag(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                      <span className="font-medium text-slate-700">Child Safety ISOFIX (+₱150/day)</span>
                      <input
                        type="checkbox"
                        checked={childSeat}
                        onChange={(e) => setChildSeat(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                      <span className="font-medium text-slate-700">HD Dual Dashcam (+₱120/day)</span>
                      <input
                        type="checkbox"
                        checked={actionCam}
                        onChange={(e) => setActionCam(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                    </label>
                  </div>
                </div>

                {/* Verified Renter Badge */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500"
                    />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <span>{currentUser.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-[11px] text-slate-500">
                        License: {currentUser.driversLicenseNo} (LTO Verified)
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase">
                    KYC APPROVED
                  </span>
                </div>
              </div>

              {/* Right Column: Pricing Breakdown & Payment (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm font-heading">
                    Price Summary ({durationDays} {durationDays === 1 ? 'Day' : 'Days'})
                  </h4>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Vehicle Rental (₱{baseRate.toLocaleString()} × {durationDays}d)</span>
                      <span className="font-semibold text-slate-800">
                        ₱{(baseRate * durationDays).toLocaleString()}
                      </span>
                    </div>

                    {withDriver && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Chauffeur Service (₱{driverDaily.toLocaleString()} × {durationDays}d)</span>
                        <span className="font-semibold">₱{(driverDaily * durationDays).toLocaleString()}</span>
                      </div>
                    )}

                    {protectionTotal > 0 && (
                      <div className="flex justify-between">
                        <span>Protection Plan ({protectionPlan})</span>
                        <span className="font-semibold text-slate-800">
                          ₱{protectionTotal.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {addonsTotal > 0 && (
                      <div className="flex justify-between">
                        <span>Optional Add-ons</span>
                        <span className="font-semibold text-slate-800">
                          ₱{addonsTotal.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {deliveryFee > 0 && (
                      <div className="flex justify-between">
                        <span>Hub Delivery / Port Transfer Fee</span>
                        <span className="font-semibold text-slate-800">
                          ₱{deliveryFee.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Promo Discount ({appliedPromo})</span>
                        <span>-₱{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Philippine EVAT (12%)</span>
                      <span>₱{vatTax.toLocaleString()}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
                      <span className="font-bold text-sm">Total Rental Fee</span>
                      <span className="text-xl font-extrabold text-emerald-700 font-heading">
                        ₱{totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        Refundable Security Deposit of <strong>₱{securityDeposit.toLocaleString()}</strong> will be pre-authorized upon vehicle handover and released at trip return.
                      </span>
                    </div>
                  </div>

                  {/* Promo Input */}
                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Have a Region 8 Promo Voucher?
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        placeholder="e.g. WARAY10"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono uppercase focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Payment Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'gcash', label: 'GCash e-Wallet' },
                        { id: 'maya', label: 'Maya (PayMaya)' },
                        { id: 'credit_card', label: 'Credit / Debit' },
                        { id: 'cash_on_pickup', label: 'Pay at Hub' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`p-2 rounded-xl border text-xs font-medium text-left transition-all ${
                            paymentMethod === m.id
                              ? 'border-emerald-600 bg-white font-bold text-slate-900 shadow-xs ring-1 ring-emerald-600'
                              : 'border-slate-200 bg-white/60 text-slate-600 hover:bg-white'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Trigger Button */}
                <button
                  type="button"
                  onClick={handleConfirmReservation}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Confirm (₱{totalAmount.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
