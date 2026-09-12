import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import { patentsApi, researchersApi } from '../services/api';
import { Patent, Researcher } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { 
  ArrowLeft, Bookmark, Calendar, Scale, ExternalLink, 
  BrainCircuit, ShieldCheck, Users, Sparkles, Building2, Link 
} from 'lucide-react';

export default function PatentDetailView() {
  const { viewParams, navigate } = useNavigation();
  const { isSaved, toggleSave, addToast } = useApp();
  const patentId = viewParams?.id;

  const [loading, setLoading] = useState(true);
  const [patent, setPatent] = useState<Patent | null>(null);
  const [relatedInventors, setRelatedInventors] = useState<Researcher[]>([]);

  useEffect(() => {
    async function fetchPatent() {
      if (!patentId) return;
      try {
        setLoading(true);
        const data = await patentsApi.get(patentId);
        setPatent(data);

        // Fetch researchers matching inventors to show inventor profiles
        const researchers = await researchersApi.list({ limit: 10 });
        const matched = researchers.data.filter(r => 
          data.inventors.some(inv => r.name.toLowerCase().includes(inv.toLowerCase()) || inv.toLowerCase().includes(r.name.toLowerCase()))
        );
        setRelatedInventors(matched);
      } catch (err) {
        console.error('Error loading patent details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPatent();
  }, [patentId]);

  if (loading) {
    return <LoadingSkeleton type="profile" />;
  }

  if (!patent) {
    return (
      <EmptyState
        title="Patent Record Not Found"
        description="The intellectual property disclosure you are searching for is unavailable or invalid."
        actionText="Back to Patent Registry"
        onAction={() => navigate('patents')}
      />
    );
  }

  const saved = isSaved('patent', patent.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'Patent Reference Copied', 'We synchronized the patent reference link to your clipboard.');
  };

  const getStatusColor = (status: Patent['status']) => {
    switch (status) {
      case 'Granted': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Pending': return 'bg-yellow-500/10 text-[#FBBF24] border-yellow-500/20';
      case 'Expired': return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  return (
    <div className="space-y-6 select-text">
      {/* Back link */}
      <button
        onClick={() => navigate('patents')}
        className="flex items-center space-x-1.5 text-xs font-bold text-zinc-500 hover:text-white transition-colors focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Patent Registry</span>
      </button>

      {/* Header Container */}
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3.5 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-zinc-950 text-zinc-400 border border-zinc-850 uppercase tracking-wider">
              {patent.technology_domain}
            </span>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${getStatusColor(patent.status)}`}>
              {patent.status}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleSave('patent', patent.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 focus:outline-none ${
                saved 
                  ? 'bg-[#FBBF24]/15 border-[#FBBF24]/30 text-[#FBBF24]' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-[#FBBF24]' : ''}`} />
              <span>{saved ? 'Saved to Workspace' : 'Save Reference'}</span>
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
          {patent.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-y-2 items-center text-xs text-zinc-400">
          <span>Assignee: <strong className="text-zinc-200">{patent.assignee}</strong></span>
          <span className="mx-3 text-zinc-700">•</span>
          <span>Inventors: <strong className="text-zinc-300 font-medium">{patent.inventors.join(', ')}</strong></span>
        </div>

        {/* Patent Info block */}
        <div className="mt-5 p-3 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-between text-[11px] text-zinc-500 font-mono font-medium">
          <span>Patent reference ID: <strong>{patent.patent_number} ({patent.country})</strong></span>
          <button className="flex items-center space-x-1 text-[#FBBF24] hover:underline focus:outline-none">
            <span>Official Patent Registry</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Abstract & Claims */}
        <div className="lg:col-span-2 space-y-6">
          {/* Abstract */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-3">Technical Description</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {patent.abstract}
            </p>
          </div>

          {/* Patent Claims representing engineering depth */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-3">Structured Patent Claims</h2>
            <div className="space-y-4 text-xs leading-relaxed text-zinc-400">
              <div className="flex items-start space-x-3.5">
                <span className="font-mono text-[#FBBF24] font-bold shrink-0">Claim 1.</span>
                <p>
                  A scalable, interconnected computing matrix architecture integrated with local non-volatile photonic memory systems, comprising a dynamic bus configured to synchronize signal buffers across multi-threaded computational streams.
                </p>
              </div>
              <div className="flex items-start space-x-3.5">
                <span className="font-mono text-[#FBBF24] font-bold shrink-0">Claim 2.</span>
                <p>
                  The system of Claim 1, wherein the local non-volatile memory incorporates a phase-change material coupled to the waveguide, enabling discrete logical state transitions without electrical heating bias.
                </p>
              </div>
              <div className="flex items-start space-x-3.5">
                <span className="font-mono text-[#FBBF24] font-bold shrink-0">Claim 3.</span>
                <p>
                  The system of Claim 2, further comprising an array of digital signal converters configured to receive optic phase transitions and write corresponding floating-point values directly to an on-chip tensor register.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: IP Meta & Inventors */}
        <div className="space-y-6">
          {/* Timeline block */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2"> IP Filing History</h2>
            
            <div className="space-y-3.5 text-xs text-zinc-400">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Jurisdiction Country:</span>
                <span className="text-zinc-300 font-semibold">{patent.country}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Date of Filing:</span>
                <span className="text-zinc-300 font-mono font-medium">{patent.filing_date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Date of Publication:</span>
                <span className="text-zinc-300 font-mono font-medium">{patent.publication_date}</span>
              </div>
            </div>
          </div>

          {/* Inventors */}
          {relatedInventors.length > 0 && (
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2">Academic Inventors</h2>
              <div className="space-y-3">
                {relatedInventors.map(inv => (
                  <div
                    key={inv.id}
                    onClick={() => navigate('researcher-profile', { id: inv.id })}
                    className="flex items-center space-x-3 p-2 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all cursor-pointer group"
                  >
                    <img src={inv.avatar_url} alt={inv.name} referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-[#FBBF24] transition-colors truncate">{inv.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{inv.institution_name}</p>
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
