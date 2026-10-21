import React from 'react';
import { Phone, Mail, MessageSquare, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactCtaProps {
  onContactClick: () => void;
  onBookClick: () => void;
}

export const ContactCta: React.FC<ContactCtaProps> = ({ onContactClick, onBookClick }) => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-tr from-[#06182e] via-[#0b2545] to-[#123157] text-white relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8871e]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e4d79]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#f59e0b] block font-heading">
              {t('cta.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              {t('cta.subtitle')}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <a
                href="tel:+639178429912"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors backdrop-blur-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#e8871e]" />
                <span>+63 917 842 9912</span>
              </a>

              <a
                href="mailto:rentals@albethtransport.ph"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors backdrop-blur-xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>rentals@albethtransport.ph</span>
              </a>

              <span className="flex items-center gap-1.5 text-slate-300 px-2 py-2">
                <Clock className="w-3.5 h-3.5 text-[#e8871e]" />
                <span>24/7 Island Dispatch</span>
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={onBookClick}
              className="px-6 py-4 bg-gradient-to-r from-[#e8871e] via-[#f59e0b] to-[#e8871e] hover:from-[#d37415] hover:to-[#e8871e] text-white text-xs sm:text-sm font-black rounded-2xl shadow-xl glow-orange flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>
                {language === 'fil' ? 'Mag-book ng sasakyan online' : 'Book your vehicle online'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onContactClick}
              className="px-6 py-4 bg-[#0b2545]/80 hover:bg-[#0b2545] border border-white/15 text-white text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors backdrop-blur-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#e8871e]" />
              <span>
                {language === 'fil'
                  ? 'Magpadala ng katanungan sa biyahe'
                  : 'Send customized trip inquiry'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
