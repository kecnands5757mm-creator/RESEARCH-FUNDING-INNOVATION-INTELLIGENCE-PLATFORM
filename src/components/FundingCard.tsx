import React from 'react';
import { FundingOpportunity } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Bookmark, ArrowUpRight, Calendar, DollarSign, AlertTriangle } from 'lucide-react';

interface FundingCardProps {
  opportunity: FundingOpportunity;
  key?: any;
}

export default function FundingCard({ opportunity }: FundingCardProps) {
  const { isSaved, toggleSave } = useApp();
  const { navigate } = useNavigation();

  const saved = isSaved('funding', opportunity.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave('funding', opportunity.id);
  };

  // Determine if deadline is approaching (less than 30 days)
  const isApproaching = (() => {
    const deadlineDate = new Date(opportunity.deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 45; // Flexible 45-day window for research proposal cycles
  })();

  return (
    <div 
      onClick={() => navigate('funding-detail', { id: opportunity.id })}
      className={`
        p-5 rounded-2xl bg-[#121212] border shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between
        ${isApproaching 
          ? 'border-yellow-500/25 hover:border-yellow-500/40 bg-zinc-900/40' 
          : 'border-zinc-800/85 hover:border-zinc-700/60 bg-zinc-900'}
      `}
    >
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20 uppercase tracking-wider">
              {opportunity.research_domain}
            </span>
            {isApproaching && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-[#FBBF24] border border-yellow-500/25 uppercase tracking-wider flex items-center animate-pulse">
                <AlertTriangle className="w-3 h-3 mr-1" /> Deadline Approaching
              </span>
            )}
          </div>
          <button
            onClick={handleSaveToggle}
            className={`p-1.5 rounded-lg border transition-all duration-200 focus:outline-none ${
              saved 
                ? 'bg-[#FBBF24]/10 border-[#FBBF24]/30 text-[#FBBF24] hover:bg-transparent hover:border-zinc-800' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'
            }`}
            title={saved ? "Remove bookmark" : "Save grant opportunity"}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#FBBF24]' : ''}`} />
          </button>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-[#FBBF24] transition-colors leading-snug tracking-tight">
          {opportunity.title}
        </h3>

        <p className="text-xs text-zinc-400 font-semibold mt-1">
          Sponsor: <span className="text-zinc-300">{opportunity.organization}</span> ({opportunity.country_region})
        </p>

        {/* Financial Amount */}
        <div className="mt-4 flex items-center space-x-2 text-white">
          <div className="p-1.5 rounded-lg bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/25">
            <DollarSign className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">{opportunity.amount_formatted}</span>
          <span className="text-[11px] text-zinc-500 font-medium">available funding</span>
        </div>

        <p className="text-xs text-zinc-500 mt-3 line-clamp-2 leading-relaxed">
          {opportunity.description}
        </p>

        <div className="mt-3.5 bg-zinc-950/45 border border-zinc-800/40 p-2.5 rounded-lg text-[11px] text-zinc-400">
          <span className="font-semibold text-zinc-500 block mb-0.5 uppercase tracking-wider">Eligibility:</span>
          <span className="line-clamp-1">{opportunity.eligibility}</span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-500">
        <div className="flex items-center space-x-2 text-zinc-400 font-medium">
          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
          <span>Deadline: <span className={isApproaching ? 'text-[#FBBF24] font-bold' : 'text-zinc-300 font-semibold'}>{opportunity.deadline}</span></span>
        </div>

        <button 
          className="flex items-center space-x-1 text-[#FBBF24] hover:text-[#FBBF24]/80 font-semibold transition-colors focus:outline-none group/btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate('funding-detail', { id: opportunity.id });
          }}
        >
          <span>Grant Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
