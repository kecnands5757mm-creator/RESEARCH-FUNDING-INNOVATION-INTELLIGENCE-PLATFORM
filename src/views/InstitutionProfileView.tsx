import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import { institutionsApi, researchersApi, publicationsApi, patentsApi } from '../services/api';
import { Institution, Researcher, Publication, Patent } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import PublicationCard from '../components/PublicationCard';
import PatentCard from '../components/PatentCard';
import { 
  ArrowLeft, Bookmark, Landmark, MapPin, Award, 
  FileText, BrainCircuit, Users, ExternalLink, Globe, Link 
} from 'lucide-react';

export default function InstitutionProfileView() {
  const { viewParams, navigate } = useNavigation();
  const { isSaved, toggleSave, addToast } = useApp();
  const instId = viewParams?.id;

  const [loading, setLoading] = useState(true);
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [faculty, setFaculty] = useState<Researcher[]>([]);
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [patents, setPatents] = useState<Patent[]>([]);

  useEffect(() => {
    async function loadInstitutionDetails() {
      if (!instId) return;
      try {
        setLoading(true);
        const data = await institutionsApi.get(instId);
        setInstitution(data);

        // Fetch researchers under this institution
        const allResearchers = await researchersApi.list({ limit: 40 });
        const matchedFaculty = allResearchers.data.filter(r => r.institution_name.toLowerCase().includes(data.name.toLowerCase()) || data.name.toLowerCase().includes(r.institution_name.toLowerCase()));
        setFaculty(matchedFaculty);

        // Fetch publications of matched faculty members
        const allPubs = await publicationsApi.list({ limit: 40 });
        const matchedPubs = allPubs.data.filter(p => 
          matchedFaculty.some(f => p.authors.some(auth => auth.toLowerCase().includes(f.name.toLowerCase()) || f.name.toLowerCase().includes(auth.toLowerCase())))
        );
        setPubs(matchedPubs);

        // Fetch patents of matched faculty inventors
        const allPatents = await patentsApi.list({ limit: 40 });
        const matchedPatents = allPatents.data.filter(pat => 
          matchedFaculty.some(f => pat.inventors.some(inv => inv.toLowerCase().includes(f.name.toLowerCase()) || f.name.toLowerCase().includes(inv.toLowerCase())))
        );
        setPatents(matchedPatents);
      } catch (err) {
        console.error('Error fetching institution details:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInstitutionDetails();
  }, [instId]);

  if (loading) {
    return <LoadingSkeleton type="profile" />;
  }

  if (!institution) {
    return (
      <EmptyState
        title="Institution Not Discovered"
        description="The requested research center profile does not exist or has been archived."
        actionText="Back to Catalog"
        onAction={() => navigate('institutions')}
      />
    );
  }

  const saved = isSaved('institution', institution.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'Intel Link Copied', 'The institution profile URL has been saved to your clipboard.');
  };

  return (
    <div className="space-y-6 select-text">
      {/* Return link */}
      <button
        onClick={() => navigate('institutions')}
        className="flex items-center space-x-1.5 text-xs font-bold text-zinc-500 hover:text-white transition-colors focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Catalog</span>
      </button>

      {/* Profile Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          {institution.logo_url ? (
            <img 
              src={institution.logo_url} 
              alt={institution.name} 
              referrerPolicy="no-referrer"
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-zinc-700/60 object-cover bg-zinc-950"
            />
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-850 border border-zinc-700/60 flex items-center justify-center text-[#FBBF24]">
              <Landmark className="w-8 h-8" />
            </div>
          )}
          <div className="min-w-0 text-left">
            <h1 className="text-xl md:text-3xl font-black text-white tracking-tight leading-none mb-2">
              {institution.name}
            </h1>
            <p className="text-sm text-zinc-400 font-medium flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-zinc-500" />
              <span>{institution.country}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {institution.research_domains.map((dom, idx) => (
                <span key={idx} className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-[#FBBF24]/10 uppercase tracking-wider">
                  {dom}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleSave('institution', institution.id)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 focus:outline-none ${
              saved 
                ? 'bg-[#FBBF24]/15 border-[#FBBF24]/30 text-[#FBBF24]' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-[#FBBF24]' : ''}`} />
            <span>{saved ? 'Tracking Profile' : 'Track Institution'}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
            title="Copy Institution Profile Reference"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Stats & Faculty */}
        <div className="space-y-6">
          {/* Institution Audits */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2">Institutional Audit</h2>
            
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span className="text-zinc-500">Indexed Papers:</span>
                <span className="text-white font-bold">{institution.publication_count.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Registered Patents:</span>
                <span className="text-white font-bold">{institution.patent_count.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Annual R&D Budget:</span>
                <span className="text-[#FBBF24] font-extrabold">{institution.funding_activity}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/40 space-y-2 text-xs text-zinc-500">
              <div className="flex items-center justify-between">
                <span>Primary Website:</span>
                <a href="https://example.edu" target="_blank" rel="noreferrer" className="text-[#FBBF24] flex items-center hover:underline">
                  Go to portal <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Connected Faculty List */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2">Academic Faculty ({faculty.length})</h2>
            {faculty.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-4">No registered faculty found at this institution.</p>
            ) : (
              <div className="space-y-3">
                {faculty.map(f => (
                  <div
                    key={f.id}
                    onClick={() => navigate('researcher-profile', { id: f.id })}
                    className="flex items-center space-x-3 p-2 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all cursor-pointer group"
                  >
                    <img src={f.avatar_url} alt={f.name} referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-[#FBBF24] transition-colors truncate">{f.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">H-Index: {f.h_index} • Citations: {f.citation_count.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Publications and Patents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Institutional Publications */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-zinc-800/60 pb-2">
              <FileText className="w-4 h-4 text-[#FBBF24]" />
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Associated Publications ({pubs.length})</h2>
            </div>
            {pubs.length === 0 ? (
              <div className="text-center py-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs text-zinc-500">
                No indexed publication currently matches this academic institution.
              </div>
            ) : (
              <div className="space-y-4">
                {pubs.map(pub => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>
            )}
          </div>

          {/* Institutional Patents */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-zinc-800/60 pb-2">
              <BrainCircuit className="w-4 h-4 text-[#FBBF24]" />
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Associated Patents ({patents.length})</h2>
            </div>
            {patents.length === 0 ? (
              <div className="text-center py-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs text-zinc-500">
                No active patent disclosures currently filed under this academic institution.
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
