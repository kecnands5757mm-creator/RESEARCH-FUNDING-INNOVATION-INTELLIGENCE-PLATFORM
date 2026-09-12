import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import { publicationsApi, researchersApi } from '../services/api';
import { Publication, Researcher } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { 
  ArrowLeft, Bookmark, Calendar, Award, ExternalLink, 
  FileText, Link, MessageSquare, Heart, Sparkles, Building2, Eye, GitPullRequest 
} from 'lucide-react';

export default function PublicationDetailView() {
  const { viewParams, navigate } = useNavigation();
  const { isSaved, toggleSave, addToast } = useApp();
  const pubId = viewParams?.id;

  const [loading, setLoading] = useState(true);
  const [publication, setPublication] = useState<Publication | null>(null);
  const [coAuthors, setCoAuthors] = useState<Researcher[]>([]);

  useEffect(() => {
    async function fetchDetails() {
      if (!pubId) return;
      try {
        setLoading(true);
        const data = await publicationsApi.get(pubId);
        setPublication(data);

        // Fetch researchers matching authors to show author profile previews
        const researchers = await researchersApi.list({ limit: 10 });
        const matched = researchers.data.filter(r => 
          data.authors.some(auth => r.name.toLowerCase().includes(auth.toLowerCase()) || auth.toLowerCase().includes(r.name.toLowerCase()))
        );
        setCoAuthors(matched);
      } catch (err) {
        console.error('Error loading publication details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [pubId]);

  if (loading) {
    return <LoadingSkeleton type="profile" />;
  }

  if (!publication) {
    return (
      <EmptyState
        title="Publication Not Found"
        description="The scientific publication you are trying to view does not exist or has been retracted."
        actionText="Back to Publications"
        onAction={() => navigate('publications')}
      />
    );
  }

  const saved = isSaved('publication', publication.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'DOI Clipboard Sync', 'The Digital Object Identifier (DOI) and URL are synchronized to your clipboard.');
  };

  return (
    <div className="space-y-6 select-text">
      {/* Back link */}
      <button
        onClick={() => navigate('publications')}
        className="flex items-center space-x-1.5 text-xs font-bold text-zinc-500 hover:text-white transition-colors focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Scholarly Directory</span>
      </button>

      {/* Main Header / Title Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3.5 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20 uppercase tracking-wider">
              {publication.research_domain}
            </span>
            {publication.open_access && (
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wider">
                Open Access
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleSave('publication', publication.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 focus:outline-none ${
                saved 
                  ? 'bg-[#FBBF24]/15 border-[#FBBF24]/30 text-[#FBBF24]' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-[#FBBF24]' : ''}`} />
              <span>{saved ? 'Saved to Workspace' : 'Save Paper'}</span>
            </button>
            
            <button
              onClick={handleShare}
              className="p-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
              title="Copy Reference Links"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="text-xl md:text-3xl font-black text-white tracking-tight leading-snug">
          {publication.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-y-2 items-center text-xs text-zinc-400">
          <span className="text-zinc-300 font-semibold">{publication.authors.join(', ')}</span>
          <span className="mx-3 text-zinc-700">•</span>
          <span className="italic">{publication.journal}</span>
          <span className="mx-3 text-zinc-700">•</span>
          <span>Vol. 14, No. 2, pp. 112–129 ({publication.publication_year})</span>
        </div>

        {/* DOI Block */}
        <div className="mt-5 p-3 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-between text-[11px] text-zinc-500 font-mono font-medium">
          <span>Digital Identifier (DOI): <strong>{publication.doi}</strong></span>
          <a 
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-[#FBBF24] hover:underline"
          >
            <span>External Library</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Grid: Abstract & Side Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Abstract Box */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-5 shadow-md">
          <div className="border-b border-zinc-800/60 pb-3">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Scientific Abstract</h2>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {publication.abstract}
          </p>

          <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
            <span>Keywords: <strong className="text-zinc-300 font-medium">Quantum, Deep Learning, Photonic, Scalability</strong></span>
            <span>Word Count: <strong>1,452 words</strong></span>
          </div>
        </div>

        {/* Co-Authors and Citation metrics */}
        <div className="space-y-6">
          {/* Quantitative Metrics */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2"> Scholarly Impact</h2>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-850/60">
                <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider mb-1">Citations</span>
                <span className="text-2xl font-black text-[#FBBF24]">{publication.citation_count}</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-850/60">
                <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider mb-1">Impact Factor</span>
                <span className="text-2xl font-black text-white">14.82</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-500 pt-1">
              <div className="flex justify-between">
                <span>Field Citation Rate:</span>
                <span className="text-zinc-300 font-mono font-medium">Top 0.5% (High Impact)</span>
              </div>
              <div className="flex justify-between">
                <span>Altmetric Attention Score:</span>
                <span className="text-zinc-300 font-mono font-medium">842</span>
              </div>
            </div>
          </div>

          {/* Connected Collaborator Profiles */}
          {coAuthors.length > 0 && (
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2">Academic Authors</h2>
              <div className="space-y-3">
                {coAuthors.map(auth => (
                  <div
                    key={auth.id}
                    onClick={() => navigate('researcher-profile', { id: auth.id })}
                    className="flex items-center space-x-3 p-2 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all cursor-pointer group"
                  >
                    <img 
                      src={auth.avatar_url} 
                      alt={auth.name} 
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-[#FBBF24] transition-colors truncate">{auth.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{auth.institution_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
