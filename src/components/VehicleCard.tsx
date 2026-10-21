import React from 'react';
import { SeedVehicle } from '../data/seedData';
import { Users, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VehicleCardProps {
  vehicle: SeedVehicle;
  onViewDetails: (slug: string) => void;
  onBookNow: (slug: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onViewDetails,
  onBookNow,
}) => {
  const { t, language } = useLanguage();

  const transmissionLabel =
    vehicle.transmission === 'automatic'
      ? t('fleet.automatic')
      : t('fleet.manual');

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-[#e8871e]/50">
      {/* Vehicle Photo with badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06182e]/85 via-transparent to-transparent opacity-75" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#06182e]/90 backdrop-blur-xs text-[#f59e0b] border border-[#e8871e]/30">
            {vehicle.type}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/95 backdrop-blur-xs text-[#0b2545]">
            {transmissionLabel}
          </span>
        </div>

        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-baseline justify-between text-white">
          <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8871e]" />
            Region 8 Fleet
          </span>
          <div className="text-right">
            <span className="text-xs font-normal text-slate-300">{t('fleet.from')} </span>
            <span className="text-xl font-black text-[#f59e0b] font-heading">
              ₱{vehicle.dailyRatePhp.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-300">{t('fleet.perDay')}</span>
          </div>
        </div>
      </div>

      {/* Body: Specs & Inclusions */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-[#0b2545] text-base font-heading group-hover:text-[#e8871e] transition-colors leading-snug">
            {vehicle.name}
          </h3>

          {/* Quick Specs Pill Row */}
          <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-semibold text-[#0b2545]">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#e8871e]" />
              <span>
                {vehicle.seats} {language === 'fil' ? 'Pasahero' : 'Passengers'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 capitalize">
              <Sparkles className="w-4 h-4 text-[#e8871e]" />
              <span>{transmissionLabel}</span>
            </div>
          </div>

          {/* Key Engineering Spec (Engine & Power) */}
          {vehicle.specs && (
            <div className="mb-3 px-3 py-2 bg-orange-50/50 rounded-xl border border-[#e8871e]/20 text-[11px] text-[#0b2545] flex items-center justify-between">
              <span className="font-semibold truncate max-w-[170px]">
                {vehicle.specs.engine}
              </span>
              <span className="font-bold text-[#e8871e] font-mono text-[10px]">
                {vehicle.specs.power}
              </span>
            </div>
          )}

          {/* Feature Bullets */}
          <ul className="space-y-1 text-xs text-slate-600 mb-2">
            {vehicle.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                <Check className="w-3.5 h-3.5 text-[#e8871e] shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => onViewDetails(vehicle.slug)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-[#0b2545] hover:bg-slate-50 transition-colors text-center"
          >
            {t('fleet.viewDetails')}
          </button>
          <button
            onClick={() => onBookNow(vehicle.slug)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#e8871e] to-[#f59e0b] hover:from-[#d37415] hover:to-[#e8871e] text-white text-xs font-extrabold transition-all shadow-md glow-orange text-center hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('fleet.bookNow')}
          </button>
        </div>
      </div>
    </div>
  );
};
