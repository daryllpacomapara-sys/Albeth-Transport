import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-requirements',
    category: 'Requirements',
    question: 'What are the rental requirements for self-drive?',
    answer:
      'To rent a vehicle for self-drive in Region 8, you must present a valid Philippine Driver’s License (Professional or Non-Professional) or a valid International Driving Permit for foreign travelers, plus one secondary government-issued photo ID (Passport, UMID, Postal, or National ID). Drivers must be at least 21 years old.',
  },
  {
    id: 'faq-driver',
    category: 'Chauffeur / Driver',
    question: 'Can I rent a car or van with a professional driver?',
    answer:
      'Yes! We offer professional, courteous drivers familiar with Region 8 road conditions, including mountain passes and San Juanico Bridge crossings. Chauffeur services are available for +₱800/day for sedans, SUVs, and MPVs, and +₱900/day for the 15-seater Mitsubishi L300 FB van. Driver meal and accommodation allowances apply for overnight trips outside city centers.',
  },
  {
    id: 'faq-airport',
    category: 'Airport Delivery',
    question: 'Do you offer airport pickup at Tacloban Airport (TAC)?',
    answer:
      'Yes, we provide direct terminal curbside pickup and return at Daniel Z. Romualdez Airport (TAC) in Tacloban City with zero waiting time. Our dispatcher monitors your incoming flight schedule (Philippine Airlines, Cebu Pacific, AirAsia) to ensure your vehicle is staged and ready when you land. We also serve Ormoc Airport (OMC), Calbayog Airport (CYP), and Catarman Airport (CRM).',
  },
  {
    id: 'faq-payment',
    category: 'Payment & Deposit',
    question: 'What payment methods do you accept, and what is the security deposit?',
    answer:
      'We accept GCash, Maya (PayMaya), Bank Transfers (BDO, BPI, UnionBank), major credit cards, and cash upon hub vehicle handover. A refundable security deposit (₱3,000 for subcompacts, ₱4,000 for SUVs and Toyota Tamaraw, and ₱6,000 for the Mitsubishi L300 FB van) is held during the rental period and refunded upon return inspection.',
  },
  {
    id: 'faq-cancellation',
    category: 'Cancellation',
    question: 'What is your cancellation policy?',
    answer:
      'We offer free cancellations with 100% refund up to 24 hours prior to your scheduled pickup time. Cancellations made within 24 hours of pickup are subject to a nominal one-day rate booking fee. Trips affected by official Philippine Coast Guard storm signals or airline flight cancellations in Eastern Visayas qualify for free rescheduling or full refunds.',
  },
  {
    id: 'faq-service-area',
    category: 'Service Area',
    question: 'Can I drive the vehicle outside Region 8 (Eastern Visayas)?',
    answer:
      'No. ALBETH TRANSPORT strictly operates exclusively within Region 8 (Eastern Visayas) covering Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar. Vehicles are equipped with GPS telematics that enforce Region 8 boundaries. Boarding RORO ferries to Luzon (via Allen) or Mindanao (via Liloan) without prior written fleet management approval is prohibited.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-requirements');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-[#e8871e]/30 text-[#0b2545] text-xs font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#e8871e]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] font-heading">
            Everything you need to know about renting in Region 8
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Clear guidelines on requirements, chauffeur services, airport handovers, and policies.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-[#e8871e]/40"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#0b2545] text-sm font-heading">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#e8871e] text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
