import React from 'react';
import { SeedProvince, SEED_CITIES } from '../data/seedData';
import { MapPin, ArrowRight, Compass, Sparkles } from 'lucide-react';

interface ProvinceCardProps {
  province: SeedProvince;
  onSelectProvince: (slug: string) => void;
  onSelectCity: (slug: string) => void;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({
  province,
  onSelectProvince,
  onSelectCity,
}) => {
  const citiesInProvince = SEED_CITIES.filter((c) => c.provinceId === province.id);

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-[#e8871e]/50">
      {/* Province Header Photo with Authentic Scenic Landmark */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={province.imageUrl}
          alt={`Scenic tourist destinations in ${province.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06182e]/90 via-[#0b2545]/30 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#06182e]/80 text-[#f59e0b] border border-[#e8871e]/30 flex items-center gap-1 backdrop-blur-xs">
            <Sparkles className="w-2.5 h-2.5 text-[#e8871e]" />
            Region VIII
          </span>
        </div>

        <div className="absolute bottom-3.5 left-4 right-4 text-white">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#f59e0b] block">
            Province Gateway
          </span>
          <h3 className="text-xl font-bold font-heading">{province.name}</h3>
        </div>
      </div>

      {/* Body: Covered Cities & Tourist Spots */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {province.description}
          </p>

          {/* Key Tourist Destinations Highlights */}
          {province.touristSpots && province.touristSpots.length > 0 && (
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-[#e8871e] uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#e8871e]" />
                Popular Attractions:
              </span>
              <p className="text-[11px] text-[#0b2545] font-semibold truncate">
                {province.touristSpots.slice(0, 3).join(' • ')}
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Covered Municipalities ({citiesInProvince.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {citiesInProvince.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => onSelectCity(city.slug)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-[#0b2545] hover:bg-orange-50 hover:text-[#e8871e] transition-colors"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onSelectProvince(province.slug)}
            className="text-xs font-bold text-[#e8871e] hover:text-[#d37415] flex items-center gap-1 group/btn"
          >
            <span>Explore {province.name} Rentals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <span className="text-[10px] text-slate-400 font-medium">Self-Drive & Driver</span>
        </div>
      </div>
    </div>
  );
};
