import React from 'react';
import { TripPlannerForm, TripPlannerValues } from './TripPlannerForm';
import { Sparkles, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onSearch: (values: TripPlannerValues) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-[#06182e] text-white pt-10 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Scenic Bridge Overview Photo with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/leyte_san_juanico_1792452719242.jpg"
          alt="Panoramic overview of San Juanico Bridge spanning Leyte to Samar across turquoise straits"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06182e]/85 via-[#0b2545]/75 to-[#06182e]/95" />
      </div>

      {/* Modern Background Effects UI: Glow Orbs & Light Mesh */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#e8871e]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#1e4d79]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#e8871e]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Hero Headings */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {/* Eyebrow with Brand Orange Accent */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8871e]/15 border border-[#e8871e]/40 text-[#f59e0b] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e8871e]" />
            <span>{t('hero.eyebrow')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading leading-tight">
            {t('hero.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#e8871e] to-[#f97316]">
              {t('hero.titleHighlight')}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Quick trust badges with Brand Colors */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300 pt-2">
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              <CheckCircle className="w-3.5 h-3.5 text-[#e8871e]" />
              <span>{t('hero.badgeAirport')}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              <CheckCircle className="w-3.5 h-3.5 text-[#e8871e]" />
              <span>{t('hero.badgeBridge')}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              <CheckCircle className="w-3.5 h-3.5 text-[#e8871e]" />
              <span>{t('hero.badgePricing')}</span>
            </span>
          </div>
        </div>

        {/* Embedded Trip Planner Card with Brand Styling */}
        <div className="max-w-4xl mx-auto text-slate-900">
          <TripPlannerForm onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};
