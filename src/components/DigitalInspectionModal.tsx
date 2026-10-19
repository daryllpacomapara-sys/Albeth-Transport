import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Camera,
  FileCheck,
  Gauge,
  Fuel,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export const DigitalInspectionModal: React.FC = () => {
  const {
    isInspectionModalOpen,
    closeInspectionModal,
    bookingForInspection,
    completeInspection,
    currentUser,
  } = useApp();

  const [fuelLevel, setFuelLevel] = useState(95);
  const [odometer, setOdometer] = useState(
    bookingForInspection ? bookingForInspection.vehicle.odometerKm : 18450
  );

  const [frontBumper, setFrontBumper] = useState(true);
  const [rearBumper, setRearBumper] = useState(true);
  const [windshield, setWindshield] = useState(true);
  const [leftSide, setLeftSide] = useState(true);
  const [rightSide, setRightSide] = useState(true);
  const [tiresRims, setTiresRims] = useState(true);
  const [spareTire, setSpareTire] = useState(true);

  const [acWorking, setAcWorking] = useState(true);
  const [infotainment, setInfotainment] = useState(true);
  const [toolsPresent, setToolsPresent] = useState(true);

  const [notes, setNotes] = useState('Clean handover at Regional Hub. No notable scratches.');
  const [signatureName, setSignatureName] = useState(currentUser.name);

  if (!isInspectionModalOpen || !bookingForInspection) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeInspection(bookingForInspection.id);
    closeInspectionModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading">Digital Handover Inspection</h2>
              <p className="text-xs text-slate-400">
                Booking: {bookingForInspection.id} • {bookingForInspection.vehicle.make}{' '}
                {bookingForInspection.vehicle.model}
              </p>
            </div>
          </div>
          <button
            onClick={closeInspectionModal}
            className="p-1.5 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Instructions banner */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2 text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>DOON & CarRental Standard:</strong> Verify fuel, odometer, and vehicle body integrity before starting your trip. Both renter and host agree on this condition benchmark.
            </div>
          </div>

          {/* Odometer & Fuel Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Fuel className="w-4 h-4 text-emerald-600" />
                Handover Fuel Level ({fuelLevel}%)
              </label>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={fuelLevel}
                onChange={(e) => setFuelLevel(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>E</span>
                <span>1/2</span>
                <span>Full (Same-to-Same)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-blue-600" />
                Odometer Reading (km)
              </label>
              <input
                type="number"
                value={odometer}
                onChange={(e) => setOdometer(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-mono text-sm font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400 block">
                Recorded via OBD-II GPS Telemetry
              </span>
            </div>
          </div>

          {/* Exterior Inspection Checkmarks */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Exterior 360° Walkaround Checklist
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={frontBumper}
                  onChange={(e) => setFrontBumper(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Front Bumper & Headlights OK</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rearBumper}
                  onChange={(e) => setRearBumper(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Rear Bumper & Taillights OK</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={windshield}
                  onChange={(e) => setWindshield(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Windshield & Glass (No Cracks)</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={leftSide}
                  onChange={(e) => setLeftSide(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Left Doors & Side Mirror OK</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rightSide}
                  onChange={(e) => setRightSide(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Right Doors & Side Mirror OK</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tiresRims}
                  onChange={(e) => setTiresRims(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Tires Tread & Alloy Rims Inspected</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={spareTire}
                  onChange={(e) => setSpareTire(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Spare Tire & Jack Toolkit Present</span>
              </label>
            </div>
          </div>

          {/* Cabin Condition */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Interior & Diagnostics Check
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acWorking}
                  onChange={(e) => setAcWorking(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Cold Air Conditioning</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={infotainment}
                  onChange={(e) => setInfotainment(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Reverse Camera / Dash</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={toolsPresent}
                  onChange={(e) => setToolsPresent(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>LTO Documents in Glovebox</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Handover Remarks / Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Digital Signature */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <label className="font-bold text-slate-800 block mb-1">
              Digital Signature of Renter
            </label>
            <input
              type="text"
              required
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-serif italic text-sm font-bold text-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              By typing your full legal name, you execute this digital handover report under Philippine E-Commerce Act (RA 8792).
            </span>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeInspectionModal}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20"
            >
              Complete Inspection & Start Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
