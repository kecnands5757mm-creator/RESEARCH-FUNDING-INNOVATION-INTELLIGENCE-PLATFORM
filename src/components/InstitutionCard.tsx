import React from 'react';
import { Institution } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Bookmark, ArrowUpRight, MapPin, Landmark, FileText, BrainCircuit } from 'lucide-react';

interface InstitutionCardProps {
  institution: Institution;
  key?: any;
}

export default function InstitutionCard({ institution }: InstitutionCardProps) {
  const { isSaved, toggleSave } = useApp();
  const { navigate } = useNavigation();

  const saved = isSaved('institution', institution.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave('institution', institution.id);
  };

  return (
    <div 
      onClick={() => navigate('institution-profile', { id: institution.id })}
      className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/60 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Header Logo + Meta */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3.5">
            {institution.logo_url ? (
              <img 
                src={institution.logo_url} 
                alt={institution.name} 
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-xl border border-zinc-700/50 object-cover bg-zinc-950"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-[#FBBF24]">
                <Landmark className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white group-hover:text-[#FBBF24] transition-colors leading-tight mb-1">
                {institution.name}
              </h3>
              <p className="text-[11px] text-zinc-400 flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-zinc-500 shrink-0" />
                <span>{institution.country}</span>
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
            title={saved ? "Remove bookmark" : "Save institution"}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#FBBF24]' : ''}`} />
          </button>
        </div>

        {/* Areas list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {institution.research_domains.slice(0, 3).map((dom, idx) => (
            <span 
              key={idx} 
              className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 uppercase tracking-wider"
            >
              {dom}
            </span>
          ))}
          {institution.research_domains.length > 3 && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-950 text-zinc-500 border border-zinc-800 uppercase tracking-wider">
              +{institution.research_domains.length - 3} more
            </span>
          )}
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/40 mb-4 text-xs text-zinc-400">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-zinc-500" />
            <span>Publications: <strong className="text-white">{institution.publication_count.toLocaleString()}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-4 h-4 text-zinc-500" />
            <span>Patents: <strong className="text-white">{institution.patent_count.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Bio description */}
        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
          {institution.description}
        </p>
      </div>

      {/* Funding Activity Footer */}
      <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-3 text-[11px] text-zinc-500">
        <span className="truncate text-zinc-400">
          Budget: <strong className="text-zinc-200">{institution.funding_activity}</strong>
        </span>

        <button 
          className="flex items-center space-x-1 text-[#FBBF24] hover:text-[#FBBF24]/80 font-semibold transition-colors focus:outline-none shrink-0 group/btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate('institution-profile', { id: institution.id });
          }}
        >
          <span>Intel View</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
