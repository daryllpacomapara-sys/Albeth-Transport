import React, { useState } from 'react';
import { Menu, X, ShieldCheck, UserCheck, Radio } from 'lucide-react';
import { REGION_8_NOTICE, ALBETH_LOGO_SRC } from '../data/seedData';

interface HeaderProps {
  onNavigate: (route: string) => void;
  activeRoute: string;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  user: { name: string; email: string } | null;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeRoute,
  onOpenAuth,
  user,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Vehicles', route: '/vehicles' },
    { label: 'Service areas', route: '/service-areas' },
    { label: 'Contact', route: '/contact' },
    { label: 'Sitemap', route: '/sitemap' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top Banner Notice: Region 8 Hard Rule with brand colors */}
      <div className="bg-[#0b2545] text-slate-200 text-xs px-4 py-1.5 flex items-center justify-between border-b border-[#06182e]">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#e8871e]/20 text-[#f59e0b] border border-[#e8871e]/40">
              SERVICE AREA: REGION 8 ONLY
            </span>
            <span className="text-[11px] font-medium text-slate-300 hidden sm:inline">
              {REGION_8_NOTICE}
            </span>
            <span className="text-[11px] font-medium text-slate-300 sm:hidden">
              Eastern Visayas Network
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-[#e8871e] animate-pulse" />
              <span className="hidden md:inline">24/7 Dispatch:</span>
              <strong className="text-white">+63 917 842 9912</strong>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-300 hidden lg:inline">Tacloban Airport (TAC) Curbside</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Homepage Logo: Bigger with clean transparent background */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer group py-1"
        >
          <img
            src={ALBETH_LOGO_SRC}
            alt="ALBETH Transport & Car Rental Logo"
            className="h-14 sm:h-18 md:h-20 w-auto object-contain transition-transform group-hover:scale-105 duration-200 drop-shadow-xs"
          />
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/80">
          {navLinks.map((link) => {
            const isActive = activeRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => onNavigate(link.route)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0b2545] text-white shadow-sm'
                    : 'text-[#0b2545]/80 hover:text-[#0b2545] hover:bg-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Auth controls */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-2xl">
              <div className="text-right">
                <span className="text-xs font-bold text-[#0b2545] block truncate max-w-[130px]">
                  {user.name}
                </span>
                <span className="text-[10px] text-[#e8871e] font-bold flex items-center gap-0.5 justify-end">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#e8871e]" />
                  Verified Renter
                </span>
              </div>
              <button
                onClick={onSignOut}
                className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-4 py-2 text-xs font-bold text-[#0b2545] hover:text-[#e8871e] hover:bg-slate-50 rounded-xl transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-5 py-2.5 bg-gradient-to-r from-[#e8871e] to-[#f59e0b] hover:from-[#d37415] hover:to-[#e8871e] text-white text-xs font-extrabold rounded-xl shadow-md glow-orange transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign up
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 text-[#0b2545]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  onNavigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold ${
                  activeRoute === link.route
                    ? 'bg-[#0b2545] text-white'
                    : 'text-[#0b2545] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            {user ? (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0b2545] block">{user.name}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Verified Renter</span>
                </div>
                <button
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-rose-600"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuth('signin');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 border border-slate-200 text-xs font-bold text-[#0b2545] rounded-xl"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 bg-gradient-to-r from-[#e8871e] to-[#f59e0b] text-white text-xs font-extrabold rounded-xl shadow-md glow-orange"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
