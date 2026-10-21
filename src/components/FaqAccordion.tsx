import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  questionEn: string;
  questionFil: string;
  answerEn: string;
  answerFil: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-requirements',
    category: 'Requirements',
    question: 'What are the rental requirements for self-drive?',
    answer:
      'To rent a vehicle for self-drive in Region 8, you must present a valid Philippine Driver’s License (Professional or Non-Professional) or a valid International Driving Permit for foreign travelers, plus one secondary government-issued photo ID (Passport, UMID, Postal, or National ID). Drivers must be at least 21 years old.',
    questionEn: 'What are the rental requirements for self-drive?',
    questionFil: 'Ano ang mga kailangan para sa self-drive (sariling pagmamaneho)?',
    answerEn:
      'To rent a vehicle for self-drive in Region 8, you must present a valid Philippine Driver’s License (Professional or Non-Professional) or a valid International Driving Permit for foreign travelers, plus one secondary government-issued photo ID (Passport, UMID, Postal, or National ID). Drivers must be at least 21 years old.',
    answerFil:
      'Upang mag-arkila para sa self-drive sa Rehiyon 8, kailangan magpakita ng valid Philippine Driver’s License o International Driving Permit, kasama ang isang valid government ID (Passport, UMID, Postal, o National ID). Dapat hindi bababa sa 21 taong gulang ang magmamaneho.',
  },
  {
    id: 'faq-driver',
    category: 'Chauffeur / Driver',
    question: 'Can I rent a car or van with a professional driver?',
    answer:
      'Yes! We offer professional, courteous drivers familiar with Region 8 road conditions, including mountain passes and San Juanico Bridge crossings. Chauffeur services are available for +₱800/day for sedans, SUVs, and MPVs, and +₱900/day for the 15-seater Mitsubishi L300 FB van. Driver meal and accommodation allowances apply for overnight trips outside city centers.',
    questionEn: 'Can I rent a car or van with a professional driver?',
    questionFil: 'Maaari ba akong mag-arkila ng kotse o van na may kasamang driver?',
    answerEn:
      'Yes! We offer professional, courteous drivers familiar with Region 8 road conditions, including mountain passes and San Juanico Bridge crossings. Chauffeur services are available for +₱800/day for sedans, SUVs, and MPVs, and +₱900/day for the 15-seater Mitsubishi L300 FB van. Driver meal and accommodation allowances apply for overnight trips outside city centers.',
    answerFil:
      'Oo! Nag-aalok kami ng propesyonal at magalang na mga tsuper na kabisado ang mga kalsada sa Rehiyon 8, kabilang ang mga bundok at San Juanico Bridge. Ang serbisyo ng driver ay +₱800/araw para sa sedan, SUV, at MPV, at +₱900/araw para sa 15-seater Mitsubishi L300 FB van.',
  },
  {
    id: 'faq-airport',
    category: 'Airport Delivery',
    question: 'Do you offer airport pickup at Tacloban Airport (TAC)?',
    answer:
      'Yes, we provide direct terminal curbside pickup and return at Daniel Z. Romualdez Airport (TAC) in Tacloban City with zero waiting time. Our dispatcher monitors your incoming flight schedule (Philippine Airlines, Cebu Pacific, AirAsia) to ensure your vehicle is staged and ready when you land. We also serve Ormoc Airport (OMC), Calbayog Airport (CYP), and Catarman Airport (CRM).',
    questionEn: 'Do you offer airport pickup at Tacloban Airport (TAC)?',
    questionFil: 'Mayroon ba kayong airport pickup sa Tacloban Airport (TAC)?',
    answerEn:
      'Yes, we provide direct terminal curbside pickup and return at Daniel Z. Romualdez Airport (TAC) in Tacloban City with zero waiting time. Our dispatcher monitors your incoming flight schedule (Philippine Airlines, Cebu Pacific, AirAsia) to ensure your vehicle is staged and ready when you land. We also serve Ormoc Airport (OMC), Calbayog Airport (CYP), and Catarman Airport (CRM).',
    answerFil:
      'Oo, nagbibigay kami ng direktang pagsundo at pagbalik sa terminal curbside ng Daniel Z. Romualdez Airport (TAC) sa Tacloban City. Binabantayan ng aming dispatch ang iskedyul ng iyong flight (PAL, Cebu Pacific, AirAsia) upang handa ang sasakyan paglapag mo.',
  },
  {
    id: 'faq-payment',
    category: 'Payment & Deposit',
    question: 'What payment methods do you accept, and what is the security deposit?',
    answer:
      'We accept GCash, Maya (PayMaya), Bank Transfers (BDO, BPI, UnionBank), major credit cards, and cash upon hub vehicle handover. A refundable security deposit (₱3,000 for subcompacts, ₱4,000 for SUVs and Toyota Tamaraw, and ₱6,000 for the Mitsubishi L300 FB van) is held during the rental period and refunded upon return inspection.',
    questionEn: 'What payment methods do you accept, and what is the security deposit?',
    questionFil: 'Ano ang mga paraan ng pagbabayad at magkano ang security deposit?',
    answerEn:
      'We accept GCash, Maya (PayMaya), Bank Transfers (BDO, BPI, UnionBank), major credit cards, and cash upon hub vehicle handover. A refundable security deposit (₱3,000 for subcompacts, ₱4,000 for SUVs and Toyota Tamaraw, and ₱6,000 for the Mitsubishi L300 FB van) is held during the rental period and refunded upon return inspection.',
    answerFil:
      'Tumatanggap kami ng GCash, Maya, Bank Transfer (BDO, BPI, UnionBank), credit cards, at cash sa pag-abot ng susi. May refundable security deposit (₱3,000 para sa Mirage, ₱4,000 para sa Ecosport at Tamaraw, at ₱6,000 para sa L300 FB) na ibinabalik pagkatapos ng inspeksyon sa pagbalik.',
  },
  {
    id: 'faq-cancellation',
    category: 'Cancellation',
    question: 'What is your cancellation policy?',
    answer:
      'We offer free cancellations with 100% refund up to 24 hours prior to your scheduled pickup time. Cancellations made within 24 hours of pickup are subject to a nominal one-day rate booking fee. Trips affected by official Philippine Coast Guard storm signals or airline flight cancellations in Eastern Visayas qualify for free rescheduling or full refunds.',
    questionEn: 'What is your cancellation policy?',
    questionFil: 'Ano ang inyong patakaran sa kanselasyon?',
    answerEn:
      'We offer free cancellations with 100% refund up to 24 hours prior to your scheduled pickup time. Cancellations made within 24 hours of pickup are subject to a nominal one-day rate booking fee. Trips affected by official Philippine Coast Guard storm signals or airline flight cancellations in Eastern Visayas qualify for free rescheduling or full refunds.',
    answerFil:
      'Libreng kanselasyon na may 100% refund hanggang 24 oras bago ang nakatakdang oras ng pagsundo. Ang mga biyaheng naapektuhan ng opisyal na babala ng bagyo ng Coast Guard o kanselasyon ng flight ay kuwalipikado sa libreng rescheduling o buong refund.',
  },
  {
    id: 'faq-service-area',
    category: 'Service Area',
    question: 'Can I drive the vehicle outside Region 8 (Eastern Visayas)?',
    answer:
      'No. ALBETH TRANSPORT strictly operates exclusively within Region 8 (Eastern Visayas) covering Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar. Vehicles are equipped with GPS telematics that enforce Region 8 boundaries. Boarding RORO ferries to Luzon (via Allen) or Mindanao (via Liloan) without prior written fleet management approval is prohibited.',
    questionEn: 'Can I drive the vehicle outside Region 8 (Eastern Visayas)?',
    questionFil: 'Maaari ko bang dalhin ang sasakyan sa labas ng Rehiyon 8 (Silangang Kabisayaan)?',
    answerEn:
      'No. ALBETH TRANSPORT strictly operates exclusively within Region 8 (Eastern Visayas) covering Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, and Northern Samar. Vehicles are equipped with GPS telematics that enforce Region 8 boundaries. Boarding RORO ferries to Luzon (via Allen) or Mindanao (via Liloan) without prior written fleet management approval is prohibited.',
    answerFil:
      'Hindi. Ang ALBETH TRANSPORT ay eksklusibong nagpapatakbo sa loob lamang ng Rehiyon 8 (Silangang Kabisayaan) na sumasakop sa Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, at Northern Samar. Ang mga sasakyan ay may GPS na nakapirmi sa Rehiyon 8. Mahigpit na ipinagbabawal ang pagsakay sa barko/RORO papuntang Luzon o Mindanao nang walang nakasulat na pahintulot.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-requirements');
  const { t, language } = useLanguage();

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-[#e8871e]/30 text-[#0b2545] text-xs font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#e8871e]" />
            <span>{t('faq.title')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] font-heading">
            {language === 'fil'
              ? 'Lahat ng kailangan mong malaman sa pagrenta sa Rehiyon 8'
              : 'Everything you need to know about renting in Region 8'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const questionText = language === 'fil' ? faq.questionFil : faq.questionEn;
            const answerText = language === 'fil' ? faq.answerFil : faq.answerEn;

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
                    {questionText}
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
                    {answerText}
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
