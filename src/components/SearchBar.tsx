import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, X, FileText, BrainCircuit, Users, Award, Landmark, History, CornerDownLeft } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { searchApi } from '../services/api';
import { Publication, Patent, FundingOpportunity, Researcher, Institution } from '../types';

export default function SearchBar() {
  const { navigate } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'publications' | 'patents' | 'funding' | 'researchers' | 'institutions'>('all');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<{
    publications: Publication[];
    patents: Patent[];
    funding: FundingOpportunity[];
    researchers: Researcher[];
    institutions: Institution[];
  }>({
    publications: [],
    patents: [],
    funding: [],
    researchers: [],
    institutions: []
  });

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search history
  useEffect(() => {
    async function loadHistory() {
      try {
        const hist = await searchApi.getHistory();
        setRecentSearches(hist.map(h => h.query));
      } catch (err) {
        console.error('Error loading search history:', err);
      }
    }
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults({ publications: [], patents: [], funding: [], researchers: [], institutions: [] });
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const data = await searchApi.global(query);
        setResults(data);
      } catch (err) {
        console.error('Error conducting global search:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Handle outside click to close
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleSearchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    try {
      await searchApi.saveQuery(query);
      setRecentSearches(prev => [query, ...prev.filter(q => q !== query)].slice(0, 5));
    } catch (err) {
      console.error('Failed saving search query:', err);
    }
  };

  const selectResult = (view: any, id: string) => {
    handleSearchSubmit();
    setIsOpen(false);
    navigate(view, { id });
  };

  // Check if category has any results
  const hasResults = 
    results.publications.length > 0 || 
    results.patents.length > 0 || 
    results.funding.length > 0 || 
    results.researchers.length > 0 || 
    results.institutions.length > 0;

  return (
    <div className="relative flex-1 max-w-lg">
      {/* Search Input Bar (Header Trigger) */}
      <div 
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 cursor-pointer transition-all duration-200 select-none group"
      >
        <Search className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
        <span className="flex-1 text-sm text-zinc-500 text-left">Search publications, patents, funding...</span>
        <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 font-medium text-[10px]">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </div>

      {/* Spotlight Search Backdrop Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
          <div 
            ref={searchContainerRef}
            className="w-full max-w-2xl bg-[#121212] border border-zinc-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[70vh] animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Input Section */}
            <form onSubmit={handleSearchSubmit} className="flex items-center h-14 px-4 border-b border-zinc-800/80">
              <Search className="w-5 h-5 text-zinc-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search anything..."
                className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
              />
              {query && (
                <button 
                  type="button" 
                  onClick={() => setQuery('')}
                  className="p-1 text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Filter Chips */}
            <div className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-950/40 border-b border-zinc-800/45 overflow-x-auto scrollbar-none">
              {(['all', 'publications', 'patents', 'funding', 'researchers', 'institutions'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium border transition-all whitespace-nowrap capitalize
                    ${activeTab === tab 
                      ? 'bg-[#FBBF24] text-black border-[#FBBF24]' 
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Results Panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading && (
                <div className="space-y-3 py-4">
                  <div className="h-4 bg-zinc-900 rounded w-1/4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-10 bg-zinc-900/60 rounded animate-pulse"></div>
                    <div className="h-10 bg-zinc-900/60 rounded animate-pulse"></div>
                    <div className="h-10 bg-zinc-900/60 rounded animate-pulse"></div>
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {!query && recentSearches.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase mb-2">Recent Searches</h3>
                  <div className="space-y-1">
                    {recentSearches.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 text-left text-sm transition-all"
                      >
                        <History className="w-4 h-4 text-zinc-600" />
                        <span>{s}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions / Default Guide */}
              {!query && recentSearches.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                  <p className="text-sm font-medium text-zinc-400">Search the Research Platform</p>
                  <p className="text-xs text-zinc-600 mt-1">Discover publications, grants, patents, collaborators, and trends.</p>
                </div>
              )}

              {/* Results grouped by Category */}
              {query && !loading && !hasResults && (
                <div className="text-center py-10">
                  <Search className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                  <p className="text-sm font-medium text-zinc-400">No results found for "{query}"</p>
                  <p className="text-xs text-zinc-600 mt-1">Try refining your keyword or adjusting filters.</p>
                </div>
              )}

              {query && !loading && hasResults && (
                <div className="space-y-5">
                  {/* Publications */}
                  {(activeTab === 'all' || activeTab === 'publications') && results.publications.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-800/40 pb-1 mb-2">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase flex items-center">
                          <FileText className="w-3.5 h-3.5 mr-1.5 text-[#FBBF24]" /> PUBLICATIONS
                        </span>
                        <span className="text-[10px] text-zinc-600 font-medium">{results.publications.length} results</span>
                      </div>
                      <div className="space-y-1">
                        {results.publications.map(p => (
                          <div
                            key={p.id}
                            onClick={() => selectResult('publication-detail', p.id)}
                            className="group flex items-start justify-between p-2.5 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800/50 cursor-pointer transition-all"
                          >
                            <div className="flex-1 min-w-0 pr-4">
                              <p className="text-sm font-medium text-white group-hover:text-[#FBBF24] transition-colors truncate">{p.title}</p>
                              <p className="text-xs text-zinc-500 truncate mt-0.5">{p.authors.join(', ')} • {p.journal} ({p.publication_year})</p>
                            </div>
                            <CornerDownLeft className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 self-center transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Patents */}
                  {(activeTab === 'all' || activeTab === 'patents') && results.patents.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-800/40 pb-1 mb-2">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase flex items-center">
                          <BrainCircuit className="w-3.5 h-3.5 mr-1.5 text-[#FBBF24]" /> PATENTS
                        </span>
                        <span className="text-[10px] text-zinc-600 font-medium">{results.patents.length} results</span>
                      </div>
                      <div className="space-y-1">
                        {results.patents.map(pat => (
                          <div
                            key={pat.id}
                            onClick={() => selectResult('patent-detail', pat.id)}
                            className="group flex items-start justify-between p-2.5 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800/50 cursor-pointer transition-all"
                          >
                            <div className="flex-1 min-w-0 pr-4">
                              <p className="text-sm font-medium text-white group-hover:text-[#FBBF24] transition-colors truncate">{pat.title}</p>
                              <p className="text-xs text-zinc-500 truncate mt-0.5">{pat.patent_number} • {pat.assignee} ({pat.filing_date})</p>
                            </div>
                            <CornerDownLeft className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 self-center transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Funding Opportunities */}
                  {(activeTab === 'all' || activeTab === 'funding') && results.funding.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-800/40 pb-1 mb-2">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase flex items-center">
                          <Award className="w-3.5 h-3.5 mr-1.5 text-[#FBBF24]" /> FUNDING OPPORTUNITIES
                        </span>
                        <span className="text-[10px] text-zinc-600 font-medium">{results.funding.length} results</span>
                      </div>
                      <div className="space-y-1">
                        {results.funding.map(f => (
                          <div
                            key={f.id}
                            onClick={() => selectResult('funding-detail', f.id)}
                            className="group flex items-start justify-between p-2.5 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800/50 cursor-pointer transition-all"
                          >
                            <div className="flex-1 min-w-0 pr-4">
                              <p className="text-sm font-medium text-white group-hover:text-[#FBBF24] transition-colors truncate">{f.title}</p>
                              <p className="text-xs text-zinc-500 truncate mt-0.5">{f.organization} • {f.amount_formatted} • Deadline: {f.deadline}</p>
                            </div>
                            <CornerDownLeft className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 self-center transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Researchers */}
                  {(activeTab === 'all' || activeTab === 'researchers') && results.researchers.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-800/40 pb-1 mb-2">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase flex items-center">
                          <Users className="w-3.5 h-3.5 mr-1.5 text-[#FBBF24]" /> RESEARCHERS
                        </span>
                        <span className="text-[10px] text-zinc-600 font-medium">{results.researchers.length} results</span>
                      </div>
                      <div className="space-y-1">
                        {results.researchers.map(r => (
                          <div
                            key={r.id}
                            onClick={() => selectResult('researcher-profile', r.id)}
                            className="group flex items-start justify-between p-2.5 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800/50 cursor-pointer transition-all"
                          >
                            <div className="flex-1 min-w-0 pr-4 flex items-center space-x-3">
                              <img src={r.avatar_url} alt={r.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover bg-zinc-900 border border-zinc-800" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white group-hover:text-[#FBBF24] transition-colors truncate">{r.name}</p>
                                <p className="text-xs text-zinc-500 truncate">{r.institution_name} • h-index: {r.h_index}</p>
                              </div>
                            </div>
                            <CornerDownLeft className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 self-center transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Institutions */}
                  {(activeTab === 'all' || activeTab === 'institutions') && results.institutions.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-800/40 pb-1 mb-2">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase flex items-center">
                          <Landmark className="w-3.5 h-3.5 mr-1.5 text-[#FBBF24]" /> INSTITUTIONS
                        </span>
                        <span className="text-[10px] text-zinc-600 font-medium">{results.institutions.length} results</span>
                      </div>
                      <div className="space-y-1">
                        {results.institutions.map(inst => (
                          <div
                            key={inst.id}
                            onClick={() => selectResult('institution-profile', inst.id)}
                            className="group flex items-start justify-between p-2.5 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800/50 cursor-pointer transition-all"
                          >
                            <div className="flex-1 min-w-0 pr-4 flex items-center space-x-3">
                              <img src={inst.logo_url} alt={inst.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-lg object-cover bg-zinc-900 border border-zinc-800" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white group-hover:text-[#FBBF24] transition-colors truncate">{inst.name}</p>
                                <p className="text-xs text-zinc-500 truncate">{inst.country} • {inst.publication_count} Publications</p>
                              </div>
                            </div>
                            <CornerDownLeft className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 self-center transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="h-10 px-4 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-medium select-none">
              <span className="flex items-center"><CornerDownLeft className="w-3 h-3 mr-1" /> Select result</span>
              <span>ESC to cancel</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
