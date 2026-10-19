import React from 'react';
import { Compass, FileText, KeyRound, ArrowRight } from 'lucide-react';

export const StepsSection: React.FC<{ onStartTrip: () => void }> = ({ onStartTrip }) => {
  const steps = [
    {
      step: '01',
      title: 'Choose your trip',
      description:
        'Select your pickup and dropoff city anywhere within Region 8 (Leyte, Samar, Biliran). Choose self-drive or with a licensed professional driver.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Request a quote',
      description:
        'Pick from our 4 specialized vehicles: Mirage G4, Ford Ecosport, Toyota Tamaraw 7-seater, or Mitsubishi L300 FB van. Transparent PHP rates with zero hidden fees.',
      icon: FileText,
    },
    {
      step: '03',
      title: 'Confirm and drive',
      description:
        'Receive immediate reservation confirmation. Pick up your vehicle at Tacloban Airport (TAC), local seaports, or have it delivered to your hotel.',
      icon: KeyRound,
    },
  ];

  return (
    <section className="py-16 bg-[#06182e] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#e8871e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f59e0b] block mb-2 font-heading">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading">
            How it works
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Seamless car and van rental from inquiry to key handover across Eastern Visayas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-[#0b2545]/60 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#e8871e]/50 transition-colors backdrop-blur-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#e8871e]/15 border border-[#e8871e]/30 text-[#f59e0b] flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-3xl font-black text-slate-600 font-heading">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#f59e0b] font-semibold">
                  <span>Step {item.step} of 03</span>
                  {index < 2 && <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartTrip}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#e8871e] via-[#f59e0b] to-[#e8871e] hover:from-[#d37415] hover:to-[#e8871e] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl glow-orange transition-all hover:scale-[1.02]"
          >
            <span>Start your trip plan now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
