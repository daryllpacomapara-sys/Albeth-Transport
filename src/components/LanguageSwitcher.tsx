import React from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'header' | 'mobile' | 'footer' | 'minimal';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'minimal') {
    return (
      <button
        onClick={() => setLanguage(language === 'en' ? 'fil' : 'en')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
          language === 'fil'
            ? 'bg-[#e8871e]/20 text-[#f59e0b] border-[#e8871e]/40'
            : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
        } ${className}`}
        aria-label="Toggle Language between English and Filipino"
        title="Toggle English / Filipino"
      >
        <Globe className="w-3.5 h-3.5 text-[#e8871e]" />
        <span>{language === 'en' ? 'English (EN)' : 'Filipino (FIL)'}</span>
      </button>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`p-3 bg-slate-50 border border-slate-200 rounded-2xl ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b2545]">
            <Globe className="w-3.5 h-3.5 text-[#e8871e]" />
            <span>Wika / Language</span>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            {language === 'fil' ? 'Naka-Filipino' : 'English Active'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              language === 'en'
                ? 'bg-[#0b2545] text-white border-[#0b2545] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🇺🇸</span>
            <span>English</span>
          </button>
          <button
            type="button"
            onClick={() => setLanguage('fil')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              language === 'fil'
                ? 'bg-[#e8871e] text-white border-[#e8871e] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🇵🇭</span>
            <span>Filipino</span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-slate-400 text-xs flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-[#e8871e]" />
          <span>Language / Wika:</span>
        </span>
        <div className="inline-flex items-center p-0.5 rounded-xl bg-[#0b2545] border border-slate-700">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              language === 'en'
                ? 'bg-white/20 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('fil')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              language === 'fil'
                ? 'bg-[#e8871e] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇵🇭</span>
            <span>Filipino</span>
          </button>
        </div>
      </div>
    );
  }

  // Default: 'header' segmented pill
  return (
    <div
      className={`inline-flex items-center p-1 rounded-2xl bg-slate-100/90 border border-slate-200 shadow-xs ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
          language === 'en'
            ? 'bg-[#0b2545] text-white shadow-xs'
            : 'text-slate-600 hover:text-[#0b2545] hover:bg-white/60'
        }`}
        title="Switch to English"
      >
        <span>EN</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('fil')}
        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
          language === 'fil'
            ? 'bg-gradient-to-r from-[#e8871e] to-[#f59e0b] text-white shadow-xs'
            : 'text-slate-600 hover:text-[#0b2545] hover:bg-white/60'
        }`}
        title="Lumipat sa Filipino"
      >
        <span>🇵🇭</span>
        <span>FIL</span>
      </button>
    </div>
  );
};
