import React from 'react';
import { SEED_PROVINCES, SEED_CITIES, SEED_VEHICLES, REGION_8_NOTICE } from '../data/seedData';
import { MapPin, ChevronRight, Car, ShieldCheck } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (route: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>Regional Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          ALBETH TRANSPORT Regional Sitemap
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          Browse our complete network of provinces and cities served exclusively across Region 8 (Eastern Visayas).
        </p>
      </div>

      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1" />
        <span>{REGION_8_NOTICE}</span>
      </div>

      {/* Grouped by Province > Cities */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 font-heading">
          Provinces & Covered Municipalities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_PROVINCES.map((prov) => {
            const citiesInProv = SEED_CITIES.filter((c) => c.provinceId === prov.id);

            return (
              <div
                key={prov.slug}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Province
                    </span>
                    <button
                      onClick={() => onNavigate(`/province/${prov.slug}`)}
                      className="text-base font-bold text-slate-900 hover:text-emerald-700 font-heading text-left"
                    >
                      {prov.name}
                    </button>
                  </div>
                  <button
                    onClick={() => onNavigate(`/province/${prov.slug}`)}
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    View
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 block">
                    Covered Cities ({citiesInProv.length}):
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {citiesInProv.map((c) => (
                      <li key={c.slug}>
                        <button
                          onClick={() => onNavigate(`/city/${c.slug}`)}
                          className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-0.5 text-left"
                        >
                          <ChevronRight className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{c.name}</span>
                          <span className="text-[10px] text-slate-400">({c.hubType})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fleet Catalog Links */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
          <Car className="w-5 h-5 text-emerald-600" />
          Fleet Units Directory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {SEED_VEHICLES.map((v) => (
            <button
              key={v.slug}
              onClick={() => onNavigate(`/vehicles/${v.slug}`)}
              className="text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition-all font-medium"
            >
              <span className="font-bold block">{v.name}</span>
              <span className="text-[10px] text-slate-500 capitalize">
                {v.type} • {v.transmission} • ₱{v.dailyRatePhp.toLocaleString()}/day
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
