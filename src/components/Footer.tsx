import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Radio } from 'lucide-react';
import { REGION_8_NOTICE, ALBETH_LOGO_SRC, SEED_PROVINCES, SEED_CITIES } from '../data/seedData';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#06182e] text-slate-400 text-xs border-t border-[#0b2545] relative overflow-hidden">
      {/* Background ambient glow effect */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e8871e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col with Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('/')}
              className="cursor-pointer inline-block group"
            >
              <div className="bg-white/95 p-3 rounded-2xl inline-block shadow-lg transition-transform group-hover:scale-105">
                <img
                  src={ALBETH_LOGO_SRC}
                  alt="ALBETH Transport & Car Rental Logo"
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-xs"
                />
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Premier car and van rental service operating exclusively within Region 8 (Eastern Visayas), Philippines.
              Providing dependable self-drive and chauffeur rentals across Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar.
            </p>

            {/* Hard rule notice callout */}
            <div className="p-3 bg-[#0b2545] border border-[#e8871e]/30 rounded-2xl text-[11px] text-slate-300">
              <span className="font-bold text-[#f59e0b] block mb-0.5">SERVICE AREA LIMITATION:</span>
              {REGION_8_NOTICE} All vehicles are GPS geo-fenced to Eastern Visayas.
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#e8871e] animate-pulse" />
                <span>24/7 Dispatch: <strong>+63 917 842 9912</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Regional Office: San Jose Highway, Tacloban City, 6500 Leyte</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Leyte & Southern Leyte */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-heading text-[#f59e0b]">
              Leyte & Southern Leyte
            </h4>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li>
                <button
                  onClick={() => onNavigate('/city/tacloban-city')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Tacloban City (Airport TAC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/ormoc-city')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Ormoc City (Port & Ferry)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/baybay-city')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Baybay City (VSU Corridor)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/palo')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Palo (MacArthur Park)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/carigara')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Carigara Bayfront
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/maasin-city')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Maasin City (Southern Leyte)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Samar & Biliran */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-heading text-[#f59e0b]">
              Samar & Biliran
            </h4>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li>
                <button
                  onClick={() => onNavigate('/city/catbalogan-city')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Catbalogan City (Capitol)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/calbayog-city')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Calbayog City (Airport CYP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/borongan-city')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Borongan City (Eastern Samar)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/catarman')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Catarman (Northern Samar)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/city/naval')}
                  className="hover:text-[#e8871e] transition-colors"
                >
                  Naval (Biliran Seaport)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/sitemap')}
                  className="text-[#e8871e] font-semibold hover:underline"
                >
                  View Full Regional Sitemap
                </button>
              </li>
            </ul>
          </div>

          {/* Fleet Catalog Links for the 4 cars */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-heading text-[#f59e0b]">
              Our 4 Fleet Models
            </h4>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li>
                <button
                  onClick={() => onNavigate('/vehicles/mitsubishi-mirage-g4-at')}
                  className="hover:text-[#e8871e] transition-colors text-left"
                >
                  Mitsubishi Mirage G4 (AT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/vehicles/ford-ecosport-titanium-at')}
                  className="hover:text-[#e8871e] transition-colors text-left"
                >
                  Ford Ecosport Titanium 1.5 (AT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/vehicles/toyota-tamaraw-2-4-gl-at')}
                  className="hover:text-[#e8871e] transition-colors text-left"
                >
                  Toyota Tamaraw 2.4 GL (AT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/vehicles/mitsubishi-l300-fb-mt')}
                  className="hover:text-[#e8871e] transition-colors text-left"
                >
                  Mitsubishi L300 FB (MT) 15-Seater
                </button>
              </li>
              <li className="pt-2 text-[#f59e0b] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>LTO & P2P Certified Fleet</span>
              </li>
              <li>Same-to-Same Fuel Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            Copyright 2026 ALBETH TRANSPORT & CAR RENTAL. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/')} className="hover:text-slate-300">
              Home
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/vehicles')} className="hover:text-slate-300">
              Fleet
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/contact')} className="hover:text-slate-300">
              Contact
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/sitemap')} className="hover:text-slate-300">
              Sitemap
            </button>
            <span>•</span>
            <span className="text-[#e8871e] font-semibold">Region 8 Exclusive</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
