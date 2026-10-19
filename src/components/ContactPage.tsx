import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { REGION_8_NOTICE } from '../data/seedData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Contact ALBETH TRANSPORT
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          We are ready to assist you with airport pickups, family vacations, corporate rentals, and wedding convoys across Eastern Visayas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Inquiry Received</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you, {name}. A member of our Tacloban dispatch team will review your message and reach out via phone or email within 30 minutes.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="font-bold text-slate-900 text-base font-heading">
                Send an Inquiry or Quote Request
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. juan@gmail.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number (+63)</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +63 917 123 4567"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Trip Details / Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your dates, destination within Region 8, and vehicle requirements..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                <span>{REGION_8_NOTICE}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors text-xs sm:text-sm"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-white text-base font-heading">
              Office & Contact Information
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Tacloban Main Office:</strong>
                  <span>San Jose Highway, Tacloban City, 6500 Leyte</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">24/7 Telephone:</strong>
                  <span>+63 917 842 9912</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email Dispatch:</strong>
                  <span>rentals@albethtransport.ph</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Operating Hours:</strong>
                  <span>24 Hours Daily / 7 Days a Week</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <a
                href="https://wa.me/639178429912"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                WhatsApp Direct
              </a>
              <a
                href="https://m.me/albethtransport"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                Facebook Messenger
              </a>
            </div>
          </div>

          {/* Map Placeholder centered on Tacloban */}
          <div className="bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative aspect-[16/10] flex items-center justify-center p-4">
            <div className="text-center space-y-1">
              <MapPin className="w-8 h-8 text-emerald-600 mx-auto" />
              <strong className="text-xs font-bold text-slate-800 block">
                Tacloban Central Operations Hub
              </strong>
              <span className="text-[10px] text-slate-500 block">
                Lat 11.2272° N, Lng 125.0275° E (TAC Airport & San Juanico Gateway)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
