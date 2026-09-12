import React from 'react';
import { Researcher } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Bookmark, ArrowUpRight, Award, FileText, Sparkles, Building2 } from 'lucide-react';

interface ResearcherCardProps {
  researcher: Researcher;
  key?: any;
}

export default function ResearcherCard({ researcher }: ResearcherCardProps) {
  const { isSaved, toggleSave } = useApp();
  const { navigate } = useNavigation();

  const saved = isSaved('researcher', researcher.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave('researcher', researcher.id);
  };

  return (
    <div 
      onClick={() => navigate('researcher-profile', { id: researcher.id })}
      className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/60 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Header Photo + Meta */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3.5">
            <img 
              src={researcher.avatar_url} 
              alt={researcher.name} 
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full border border-zinc-700/60 object-cover bg-zinc-950"
            />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white group-hover:text-[#FBBF24] transition-colors leading-none mb-1">
                {researcher.name}
              </h3>
              <p className="text-[11px] text-zinc-400 flex items-center">
                <Building2 className="w-3 h-3 mr-1 text-zinc-500 shrink-0" />
                <span className="truncate max-w-[150px]">{researcher.institution_name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleSaveToggle}
            className={`p-1.5 rounded-lg border transition-all duration-200 focus:outline-none ${
              saved 
                ? 'bg-[#FBBF24]/10 border-[#FBBF24]/30 text-[#FBBF24] hover:bg-transparent hover:border-zinc-800' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'
            }`}
            title={saved ? "Remove bookmark" : "Save researcher profile"}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#FBBF24]' : ''}`} />
          </button>
        </div>

        {/* Domains list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {researcher.research_domains.map((dom, idx) => (
            <span 
              key={idx} 
              className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 uppercase tracking-wider"
            >
              {dom}
            </span>
          ))}
        </div>

        {/* Quantitative Metrics bar */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/50 mb-4 text-center">
          <div>
            <span className="text-[10px] text-zinc-500 block leading-none mb-1 font-medium">H-Index</span>
            <span className="text-sm font-extrabold text-white">{researcher.h_index}</span>
          </div>
          <div className="border-x border-zinc-800/60">
            <span className="text-[10px] text-zinc-500 block leading-none mb-1 font-medium">Citations</span>
            <span className="text-sm font-extrabold text-[#FBBF24]">{researcher.citation_count.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 block leading-none mb-1 font-medium">Publications</span>
            <span className="text-sm font-extrabold text-white">{researcher.publication_count}</span>
          </div>
        </div>

        {/* Biography excerpt */}
        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
          {researcher.bio}
        </p>
      </div>

      {/* Trending Topics Footer */}
      <div className="mt-5 pt-3.5 border-t border-zinc-800/60 flex items-center justify-between gap-3 text-[11px] text-zinc-500">
        <div className="flex items-center min-w-0 pr-4">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#FBBF24] shrink-0" />
          <span className="truncate text-zinc-400">
            Topic: <span className="text-zinc-300 font-semibold">{researcher.trending_topics[0]}</span>
          </span>
        </div>

        <button 
          className="flex items-center space-x-1 text-[#FBBF24] hover:text-[#FBBF24]/80 font-semibold transition-colors focus:outline-none shrink-0 group/btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate('researcher-profile', { id: researcher.id });
          }}
        >
          <span>Analysis</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
