import React from 'react';

interface CityChipProps {
  name: string;
  slug: string;
  subtitle?: string;
  isActive?: boolean;
  onClick: (slug: string) => void;
}

export const CityChip: React.FC<CityChipProps> = ({
  name,
  slug,
  subtitle,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(slug)}
      className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
        isActive
          ? 'bg-[#0b2545] text-white border-[#0b2545] shadow-md'
          : 'bg-white text-[#0b2545] border-slate-200 hover:border-[#e8871e] hover:bg-orange-50/50 hover:text-[#e8871e] shadow-xs'
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isActive ? 'bg-[#f59e0b]' : 'bg-[#e8871e] group-hover:scale-125'
        } transition-transform`}
      />
      <span>{name}</span>
      {subtitle && (
        <span className="text-[10px] font-normal text-slate-400 group-hover:text-[#e8871e]">
          ({subtitle})
        </span>
      )}
    </button>
  );
};
