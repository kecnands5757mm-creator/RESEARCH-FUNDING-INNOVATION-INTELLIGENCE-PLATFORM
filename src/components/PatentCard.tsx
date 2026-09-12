import React from 'react';
import { Patent } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Bookmark, ArrowUpRight, Scale, Briefcase, FileCheck } from 'lucide-react';

interface PatentCardProps {
  patent: Patent;
  key?: any;
}

export default function PatentCard({ patent }: PatentCardProps) {
  const { isSaved, toggleSave } = useApp();
  const { navigate } = useNavigation();

  const saved = isSaved('patent', patent.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave('patent', patent.id);
  };

  const getStatusColor = (status: Patent['status']) => {
    switch (status) {
      case 'Granted': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Pending': return 'bg-yellow-500/10 text-[#FBBF24] border-yellow-500/20';
      case 'Expired': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div 
      onClick={() => navigate('patent-detail', { id: patent.id })}
      className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/60 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-950 text-zinc-400 border border-zinc-800 uppercase tracking-wider">
              {patent.technology_domain}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getStatusColor(patent.status)}`}>
              {patent.status}
            </span>
          </div>
          <button
            onClick={handleSaveToggle}
            className={`p-1.5 rounded-lg border transition-all duration-200 focus:outline-none ${
              saved 
                ? 'bg-[#FBBF24]/10 border-[#FBBF24]/30 text-[#FBBF24] hover:bg-transparent hover:border-zinc-800' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'
            }`}
            title={saved ? "Remove bookmark" : "Save patent"}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#FBBF24]' : ''}`} />
          </button>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-[#FBBF24] transition-colors leading-snug tracking-tight">
          {patent.title}
        </h3>

        <p className="text-[11px] text-zinc-500 font-mono font-semibold mt-1 flex items-center">
          <Scale className="w-3.5 h-3.5 mr-1 text-zinc-600 shrink-0" />
          <span>Patent Ref: {patent.patent_number} ({patent.country})</span>
        </p>

        <p className="text-xs text-zinc-400 font-medium mt-3 flex items-center">
          <Briefcase className="w-3.5 h-3.5 mr-1 text-zinc-600 shrink-0" />
          <span className="truncate">Assignee: <span className="text-zinc-300 font-semibold">{patent.assignee}</span></span>
        </p>

        <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
          {patent.abstract}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-500">
        <div className="flex items-center space-x-3.5">
          <span>Filed: <span className="text-zinc-400 font-semibold">{patent.filing_date}</span></span>
          <span>•</span>
          <span>Published: <span className="text-zinc-400 font-semibold">{patent.publication_date}</span></span>
        </div>

        <button 
          className="flex items-center space-x-1 text-[#FBBF24] hover:text-[#FBBF24]/80 font-semibold transition-colors focus:outline-none group/btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate('patent-detail', { id: patent.id });
          }}
        >
          <span>Patent Analytics</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
