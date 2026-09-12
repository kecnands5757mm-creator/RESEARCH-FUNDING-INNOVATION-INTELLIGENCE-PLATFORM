import React from 'react';
import { Publication } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Bookmark, FileText, ArrowUpRight, GraduationCap, Building2 } from 'lucide-react';

interface PublicationCardProps {
  publication: Publication;
  key?: any;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const { isSaved, toggleSave } = useApp();
  const { navigate } = useNavigation();

  const saved = isSaved('publication', publication.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave('publication', publication.id);
  };

  return (
    <div 
      onClick={() => navigate('publication-detail', { id: publication.id })}
      className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/60 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Domain Tag and Save button */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20 uppercase tracking-wider">
            {publication.research_domain}
          </span>
          <button
            onClick={handleSaveToggle}
            className={`p-1.5 rounded-lg border transition-all duration-200 focus:outline-none ${
              saved 
                ? 'bg-[#FBBF24]/10 border-[#FBBF24]/30 text-[#FBBF24] hover:bg-transparent hover:border-zinc-800' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'
            }`}
            title={saved ? "Remove bookmark" : "Save publication"}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#FBBF24]' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-[#FBBF24] transition-colors leading-snug tracking-tight">
          {publication.title}
        </h3>

        {/* Authors */}
        <p className="text-xs text-zinc-400 font-medium mt-1.5 flex items-center">
          <GraduationCap className="w-3.5 h-3.5 mr-1 text-zinc-500 shrink-0" />
          <span className="truncate">{publication.authors.join(', ')}</span>
        </p>

        {/* Excerpt */}
        <p className="text-xs text-zinc-500 mt-3 line-clamp-3 leading-relaxed">
          {publication.abstract_excerpt}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-500">
        <div className="flex items-center space-x-3.5">
          <span className="font-semibold text-zinc-400">
            {publication.publication_year}
          </span>
          <span>•</span>
          <span className="truncate max-w-[150px]" title={publication.journal}>
            {publication.journal}
          </span>
          <span>•</span>
          <span className="font-bold text-[#FBBF24]">
            {publication.citation_count} Citations
          </span>
        </div>

        <button 
          className="flex items-center space-x-1 text-[#FBBF24] hover:text-[#FBBF24]/80 font-semibold transition-colors focus:outline-none group/btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate('publication-detail', { id: publication.id });
          }}
        >
          <span>Intelligence Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
