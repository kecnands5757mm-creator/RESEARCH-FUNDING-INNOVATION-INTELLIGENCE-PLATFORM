import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import { fundingApi } from '../services/api';
import { FundingOpportunity } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { 
  ArrowLeft, Bookmark, Calendar, DollarSign, ExternalLink, 
  Award, Briefcase, FileText, CheckCircle, Clock, Link, ShieldCheck 
} from 'lucide-react';

export default function FundingDetailView() {
  const { viewParams, navigate } = useNavigation();
  const { isSaved, toggleSave, addToast } = useApp();
  const grantId = viewParams?.id;

  const [loading, setLoading] = useState(true);
  const [opportunity, setOpportunity] = useState<FundingOpportunity | null>(null);

  useEffect(() => {
    async function fetchGrant() {
      if (!grantId) return;
      try {
        setLoading(true);
        const data = await fundingApi.get(grantId);
        setOpportunity(data);
      } catch (err) {
        console.error('Error loading grant details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGrant();
  }, [grantId]);

  if (loading) {
    return <LoadingSkeleton type="profile" />;
  }

  if (!opportunity) {
    return (
      <EmptyState
        title="Funding Opportunity Unavailable"
        description="The R&D grant opportunity you are searching for does not exist or has expired."
        actionText="Back to Grants Pipeline"
        onAction={() => navigate('funding')}
      />
    );
  }

  const saved = isSaved('funding', opportunity.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'Grant Link Copied', 'The RFP reference details have been synchronized to your clipboard.');
  };

  // Determine remaining days
  const daysLeft = (() => {
    const deadlineDate = new Date(opportunity.deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  })();

  return (
    <div className="space-y-6 select-text">
      {/* Back button */}
      <button
        onClick={() => navigate('funding')}
        className="flex items-center space-x-1.5 text-xs font-bold text-zinc-500 hover:text-white transition-colors focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Grants Pipeline</span>
      </button>

      {/* Title Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3.5 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20 uppercase tracking-wider">
              {opportunity.research_domain}
            </span>
            {daysLeft > 0 && daysLeft <= 45 && (
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-yellow-500/10 text-[#FBBF24] border border-yellow-500/20 uppercase tracking-wider flex items-center animate-pulse">
                <Clock className="w-3 h-3 mr-1" /> {daysLeft} Days Remaining
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleSave('funding', opportunity.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 focus:outline-none ${
                saved 
                  ? 'bg-[#FBBF24]/15 border-[#FBBF24]/30 text-[#FBBF24]' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-[#FBBF24]' : ''}`} />
              <span>{saved ? 'Saved to Pipeline' : 'Track Opportunity'}</span>
            </button>
            
            <button
              onClick={handleShare}
              className="p-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
              title="Copy Proposal Links"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="text-xl md:text-3xl font-black text-white tracking-tight leading-snug">
          {opportunity.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-y-2 items-center text-xs text-zinc-400">
          <span>Sponsor: <strong className="text-zinc-200">{opportunity.organization}</strong></span>
          <span className="mx-3 text-zinc-700">•</span>
          <span>Jurisdiction: <strong className="text-zinc-300 font-medium">{opportunity.country_region}</strong></span>
        </div>
      </div>

      {/* Grid: Description & RFP Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Core content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed description */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-3">RFP Description & Goals</h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              {opportunity.description}
            </p>
          </div>

          {/* Proposal checklist representing rich features */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-3">Submission Checklist & Criteria</h2>
            <div className="space-y-3.5">
              <div className="flex items-start space-x-3 text-xs text-zinc-400">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Abstract of Proposed Research</strong>
                  <p>A structured 500-word synopsis of academic novelty, methodology, and direct industrial impacts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs text-zinc-400">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Principal Investigator (PI) Biographical Sketches</strong>
                  <p>Curriculum vitae highlighting h-indices, past federal grants, and corresponding publications from the past 5 years.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs text-zinc-400">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">R&D Direct and Indirect Budget Breakdown</strong>
                  <p>Full itemization of equipment expenditures, institutional overhead fees, and research analyst salaries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Funding Details, Eligibility, Deadlines */}
        <div className="space-y-6">
          {/* Grant Financial Value */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2"> Grant Capitalization</h2>
            
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-zinc-950 border border-zinc-850">
              <div className="p-2.5 rounded-lg bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/25 shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">Available Budget</span>
                <span className="text-xl font-black text-white">{opportunity.amount_formatted}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-400 pt-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Proposal Cycle:</span>
                <span className="text-zinc-300 font-medium">Annual RFP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Submission Date:</span>
                <span className="text-zinc-300 font-mono font-medium">{opportunity.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Remaining Period:</span>
                <span className={daysLeft <= 45 ? 'text-[#FBBF24] font-bold font-mono' : 'text-zinc-300 font-mono'}>{daysLeft} days left</span>
              </div>
            </div>
          </div>

          {/* Eligibility specifications */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-4 shadow-md">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-zinc-800/60 pb-2">Institutional Eligibility</h2>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-xs text-zinc-300 font-medium leading-relaxed">
              {opportunity.eligibility}
            </div>
          </div>

          {/* Contact Support */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 space-y-3 shadow-md text-center">
            <p className="text-xs text-zinc-400 leading-normal">Need assistance preparing your proposal?</p>
            <button className="w-full py-2.5 rounded-xl bg-zinc-950 border border-zinc-850 text-xs font-bold text-white hover:border-[#FBBF24] hover:text-[#FBBF24] transition-all focus:outline-none">
              Contact Institution Office
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
