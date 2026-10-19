import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  UserCheck,
  ShieldCheck,
  Phone,
  Mail,
  CreditCard,
  FileText,
  User,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    updateUserProfile,
    currentRole,
    switchRole,
    setActiveTab,
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [licenseNo, setLicenseNo] = useState(currentUser.driversLicenseNo);
  const [licenseExpiry, setLicenseExpiry] = useState(currentUser.licenseExpiry);
  const [emergencyName, setEmergencyName] = useState(currentUser.emergencyContact.name);
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser.emergencyContact.phone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      driversLicenseNo: licenseNo,
      licenseExpiry,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relationship: currentUser.emergencyContact.relationship,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    if (role === 'host') {
      setActiveTab('host-portal');
    } else {
      setActiveTab('catalog');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading">User Profile & LTO Verification</h2>
              <p className="text-xs text-slate-400">WarayWheels Identity & Access Security</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* User Badge Profile Summary */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 text-sm font-heading">
                    {currentUser.name}
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    LTO VERIFIED
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{currentUser.email}</p>
                <div className="text-[10px] text-slate-400 mt-1">
                  Member since {currentUser.joinedDate} • {currentUser.totalRentals} Completed Trips
                </div>
              </div>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
            <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
              Active Operational Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleRoleChange('renter')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  currentRole === 'renter'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <strong className="text-xs text-slate-900 block">Renter / Guest</strong>
                <span className="text-[10px] text-slate-500">
                  Book vehicles, radar tracking, view boarding passes
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('host')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  currentRole === 'host'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <strong className="text-xs text-slate-900 block">Host / Fleet Manager</strong>
                <span className="text-[10px] text-slate-500">
                  Manage inventory, set rates, fleet GPS dispatch
                </span>
              </button>
            </div>
          </div>

          {/* Profile Edit Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Philippine KYC Verification Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Contact (+63)</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Philippine Driver's License No.
                </label>
                <input
                  type="text"
                  required
                  value={licenseNo}
                  onChange={(e) => setLicenseNo(e.target.value)}
                  placeholder="e.g. N02-18-094821"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 uppercase font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">License Expiry Date</label>
                <input
                  type="date"
                  required
                  value={licenseExpiry}
                  onChange={(e) => setLicenseExpiry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  required
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Emergency Contact Phone
                </label>
                <input
                  type="text"
                  required
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {savedSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile details saved successfully.</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
