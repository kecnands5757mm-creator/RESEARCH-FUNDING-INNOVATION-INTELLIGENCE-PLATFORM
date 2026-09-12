import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import { researchersApi, publicationsApi, patentsApi } from '../services/api';
import { Researcher, Publication, Patent } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import PublicationCard from '../components/PublicationCard';
import PatentCard from '../components/PatentCard';
import { 
  ArrowLeft, Bookmark, Award, FileText, BrainCircuit, 
  ExternalLink, Sparkles, Building2, Globe, Mail, Link 
} from 'lucide-react';

export default function ResearcherProfileView() {
  const { viewParams, navigate } = useNavigation();
  const { isSaved, toggleSave, addToast } = useApp();
  const researcherId = viewParams?.id;

  const [loading, setLoading] = useState(true);
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [patents, setPatents] = useState<Patent[]>([]);
  const [coAuthors, setCoAuthors] = useState<Researcher[]>([]);

  useEffect(() => {
    async function loadProfile() {
      if (!researcherId) return;
      try {
        setLoading(true);
        const data = await researchersApi.get(researcherId);
        setResearcher(data);

        // Fetch related publications where author matches
        const allPubs = await publicationsApi.list({ limit: 40 });
        const matchedPubs = allPubs.data.filter(p => 
          p.authors.some(auth => auth.toLowerCase().includes(data.name.toLowerCase()) || data.name.toLowerCase().includes(auth.toLowerCase()))
        );
        setPubs(matchedPubs);

        // Fetch related patents
        const allPatents = await patentsApi.list({ limit: 40 });
        const matchedPatents = allPatents.data.filter(pat => 
          pat.inventors.some(inv => inv.toLowerCase().includes(data.name.toLowerCase()) || data.name.toLowerCase().includes(inv.toLowerCase()))
        );
        setPatents(matchedPatents);

        // Fetch coauthors
        const allResearchers = await researchersApi.list({ limit: 10 });
        const matchedCoauthors = allResearchers.data.filter(r => 
          r.id !== researcherId && 
          r.institution_name === data.institution_name
        );
        setCoAuthors(matchedCoauthors);
      } catch (err) {
        console.error('Error fetching researcher profile details:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [researcherId]);

  if (loading) {
    return <LoadingSkeleton type="profile" />;
  }

  if (!researcher) {
    return (
      <EmptyState
        title="Profile Not Found"
        description="The requested researcher profile does not exist or has been privatized."
        actionText="Back to Collaborators"
        onAction={() => navigate('researchers')}
      />
    );
  }

  const saved = isSaved('researcher', researcher.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'Profile URL Synced', 'The researcher profile reference link has been copied.');
  };

  return (
    <div className="space-y-6 select-text">
      {/* Return Link */}
      <button
        onClick={() => navigate('researchers')}
        className="flex items-center space-x-1.5 text-xs font-bold text-zinc-500 hover:text-white transition-colors focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Collaborators</span>
      </button>

      {/* Main Profile Cover Header Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img 
            src={researcher.avatar_url} 
            alt={researcher.name} 
            referrerPolicy="no-referrer"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-zinc-700/60 object-cover bg-zinc-950"
          />
          <div className="min-w-0 text-left">
            <h1 className="text-xl md:text-3xl font-black text-white tracking-tight leading-none mb-2">
              {researcher.name}
            </h1>
            <p className="text-sm text-zinc-400 font-medium flex items-center">
              <Building2 className="w-4 h-4 mr-1.5 text-zinc-500" />
              <span>{researcher.institution_name}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {researcher.research_domains.map((dom, idx) => (
                <span key={idx} className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 uppercase tracking-wider">
                  {dom}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Workspace Operations */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleSave('researcher', researcher.id)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 focus:outline-none ${
              saved 
                ? 'bg-[#FBBF24]/15 border-[#FBBF24]/30 text-[#FBBF24]' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-[#FBBF24]' : ''}`} />
            <span>{saved ? 'Tracking Profile' : 'Track Collaborator'}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
            title="Copy Profile Reference"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: Stats and publications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Quantitative Indexing & Biography */}
        <div className="space-y-6">
          {/* Scientific Index Metrics */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2"> Scholarly Impact</h2>
            
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850/60">
                <span className="text-[9px] text-zinc-500 font-bold block uppercase tracking-wider mb-1">H-Index</span>
                <span className="text-xl font-black text-white">{researcher.h_index}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850/60">
                <span className="text-[9px] text-zinc-500 font-bold block uppercase tracking-wider mb-1 font-sans">Citations</span>
                <span className="text-xl font-black text-[#FBBF24]">{researcher.citation_count.toLocaleString()}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850/60">
                <span className="text-[9px] text-zinc-500 font-bold block uppercase tracking-wider mb-1">Papers</span>
                <span className="text-xl font-black text-white">{researcher.publication_count}</span>
              </div>
            </div>

            {/* Verification IDs */}
            <div className="space-y-2 text-xs text-zinc-500 pt-1.5 border-t border-zinc-800/40">
              <div className="flex justify-between items-center">
                <span>ORCID ID:</span>
                <span className="text-zinc-300 font-mono font-bold select-all flex items-center hover:text-[#FBBF24] transition-colors cursor-pointer">
                  0000-0002-1825-0097 <ExternalLink className="w-3 h-3 ml-1 text-zinc-600" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Google Scholar:</span>
                <span className="text-[#FBBF24] font-medium flex items-center hover:underline cursor-pointer">
                  Verified Scholar Profile <ExternalLink className="w-3 h-3 ml-1 text-zinc-600" />
                </span>
              </div>
            </div>
          </div>

          {/* CV Bio */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-3.5 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2">Biography Summary</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {researcher.bio}
            </p>
          </div>

          {/* Coauthors at the same institution */}
          {coAuthors.length > 0 && (
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2">Institutional Peers</h2>
              <div className="space-y-3">
                {coAuthors.map(co => (
                  <div
                    key={co.id}
                    onClick={() => navigate('researcher-profile', { id: co.id })}
                    className="flex items-center space-x-3 p-2 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all cursor-pointer group"
                  >
                    <img src={co.avatar_url} alt={co.name} referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-[#FBBF24] transition-colors truncate">{co.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">H-Index: {co.h_index}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Publications and Patents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Related Publications */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-zinc-800/60 pb-2">
              <FileText className="w-4 h-4 text-[#FBBF24]" />
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Publications Under Authorship ({pubs.length})</h2>
            </div>
            {pubs.length === 0 ? (
              <div className="text-center py-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs text-zinc-500">
                No indexed publication matches this author currently.
              </div>
            ) : (
              <div className="space-y-4">
                {pubs.map(pub => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>
            )}
          </div>

          {/* Related Patents */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-zinc-800/60 pb-2">
              <BrainCircuit className="w-4 h-4 text-[#FBBF24]" />
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Disclosed Intellectual Patents ({patents.length})</h2>
            </div>
            {patents.length === 0 ? (
              <div className="text-center py-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs text-zinc-500">
                No active patent disclosures filed under this inventor's name.
              </div>
            ) : (
              <div className="space-y-4">
                {patents.map(pat => (
                  <PatentCard key={pat.id} patent={pat} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
