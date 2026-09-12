import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { 
  publicationsApi, patentsApi, fundingApi, researchersApi, institutionsApi 
} from '../services/api';
import PublicationCard from '../components/PublicationCard';
import PatentCard from '../components/PatentCard';
import FundingCard from '../components/FundingCard';
import ResearcherCard from '../components/ResearcherCard';
import InstitutionCard from '../components/InstitutionCard';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Bookmark, FileText, BrainCircuit, Award, Users, Landmark, Trash2 } from 'lucide-react';

type TabType = 'all' | 'publication' | 'patent' | 'funding' | 'researcher' | 'institution';

export default function SavedView() {
  const { savedItems, clearAllSaved, addToast } = useApp();
  const { navigate } = useNavigation();

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [loading, setLoading] = useState(false);
  const [itemsData, setItemsData] = useState<{
    publications: any[];
    patents: any[];
    funding: any[];
    researchers: any[];
    institutions: any[];
  }>({
    publications: [],
    patents: [],
    funding: [],
    researchers: [],
    institutions: []
  });

  // Pull detailed records for each saved item
  useEffect(() => {
    async function loadSavedDetails() {
      if (savedItems.length === 0) {
        setItemsData({ publications: [], patents: [], funding: [], researchers: [], institutions: [] });
        return;
      }

      try {
        setLoading(true);
        // We'll query our directories to find matched items
        const [pubs, patents, funding, researchers, institutions] = await Promise.all([
          publicationsApi.list({ limit: 100 }),
          patentsApi.list({ limit: 100 }),
          fundingApi.list({ limit: 100 }),
          researchersApi.list({ limit: 100 }),
          institutionsApi.list({ limit: 100 })
        ]);

        const savedPubIds = savedItems.filter(s => s.item_type === 'publication').map(s => s.item_id);
        const savedPatentIds = savedItems.filter(s => s.item_type === 'patent').map(s => s.item_id);
        const savedFundingIds = savedItems.filter(s => s.item_type === 'funding').map(s => s.item_id);
        const savedResIds = savedItems.filter(s => s.item_type === 'researcher').map(s => s.item_id);
        const savedInstIds = savedItems.filter(s => s.item_type === 'institution').map(s => s.item_id);

        setItemsData({
          publications: pubs.data.filter(p => savedPubIds.includes(p.id)),
          patents: patents.data.filter(pat => savedPatentIds.includes(pat.id)),
          funding: funding.data.filter(f => savedFundingIds.includes(f.id)),
          researchers: researchers.data.filter(r => savedResIds.includes(r.id)),
          institutions: institutions.data.filter(i => savedInstIds.includes(i.id))
        });
      } catch (err) {
        console.error('Failed querying saved items detail:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSavedDetails();
  }, [savedItems]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your saved workspace?')) {
      clearAllSaved();
    }
  };

  const getFilteredCounts = (type: TabType) => {
    switch (type) {
      case 'publication': return itemsData.publications.length;
      case 'patent': return itemsData.patents.length;
      case 'funding': return itemsData.funding.length;
      case 'researcher': return itemsData.researchers.length;
      case 'institution': return itemsData.institutions.length;
      default: return savedItems.length;
    }
  };

  const tabs: { type: TabType; label: string; count: number }[] = [
    { type: 'all', label: 'All Items', count: savedItems.length },
    { type: 'publication', label: 'Publications', count: itemsData.publications.length },
    { type: 'patent', label: 'Patents', count: itemsData.patents.length },
    { type: 'funding', label: 'Funding', count: itemsData.funding.length },
    { type: 'researcher', label: 'Researchers', count: itemsData.researchers.length },
    { type: 'institution', label: 'Institutions', count: itemsData.institutions.length },
  ];

  const isEmpty = savedItems.length === 0;

  return (
    <div className="space-y-6 select-text">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#FBBF24]">
            <Bookmark className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Saved Workspace</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            My Saved Intelligence
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Organize tracked research papers, grant opportunities, patent filings, and co-authors.
          </p>
        </div>

        {!isEmpty && (
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-1.5 px-4.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 hover:border-red-500/30 text-red-400 text-xs font-bold transition-all duration-200 focus:outline-none"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Workspace</span>
          </button>
        )}
      </div>

      {/* Tabs list */}
      <div className="border-b border-zinc-800/80 flex items-center space-x-1.5 overflow-x-auto pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type)}
            className={`
              px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all relative focus:outline-none
              ${activeTab === tab.type 
                ? 'text-[#FBBF24] border-[#FBBF24]' 
                : 'text-zinc-500 border-transparent hover:text-white'}
            `}
          >
            <span className="mr-1.5">{tab.label}</span>
            {tab.count > 0 && (
              <span className={`
                text-[9px] px-1.5 py-0.5 rounded-full font-black
                ${activeTab === tab.type ? 'bg-[#FBBF24] text-black' : 'bg-zinc-800 text-zinc-400'}
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Workspace Area */}
      <div>
        {loading ? (
          <LoadingSkeleton type="card" count={4} />
        ) : isEmpty ? (
          <EmptyState
            title="Workspace Empty"
            description="You haven't bookmarked any records yet. Click the save icon on any Publication, Patent, or Grant card to begin tracking."
            onAction={() => navigate('publications')}
            actionText="Browse Scholarly Papers"
          />
        ) : (
          <div className="space-y-8">
            {/* Publications */}
            {(activeTab === 'all' || activeTab === 'publication') && itemsData.publications.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3.5 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-[#FBBF24]" /> Saved Scholarly Papers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {itemsData.publications.map(pub => (
                    <PublicationCard key={pub.id} publication={pub} />
                  ))}
                </div>
              </div>
            )}

            {/* Patents */}
            {(activeTab === 'all' || activeTab === 'patent') && itemsData.patents.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3.5 flex items-center">
                  <BrainCircuit className="w-4 h-4 mr-2 text-[#FBBF24]" /> Saved Patents & Inventions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {itemsData.patents.map(pat => (
                    <PatentCard key={pat.id} patent={pat} />
                  ))}
                </div>
              </div>
            )}

            {/* Funding */}
            {(activeTab === 'all' || activeTab === 'funding') && itemsData.funding.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3.5 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-[#FBBF24]" /> Tracked Grants & Funding
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {itemsData.funding.map(opp => (
                    <FundingCard key={opp.id} opportunity={opp} />
                  ))}
                </div>
              </div>
            )}

            {/* Researchers */}
            {(activeTab === 'all' || activeTab === 'researcher') && itemsData.researchers.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3.5 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-[#FBBF24]" /> Tracked Scientists
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {itemsData.researchers.map(res => (
                    <ResearcherCard key={res.id} researcher={res} />
                  ))}
                </div>
              </div>
            )}

            {/* Institutions */}
            {(activeTab === 'all' || activeTab === 'institution') && itemsData.institutions.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3.5 flex items-center">
                  <Landmark className="w-4 h-4 mr-2 text-[#FBBF24]" /> Tracked Laboratories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {itemsData.institutions.map(inst => (
                    <InstitutionCard key={inst.id} institution={inst} />
                  ))}
                </div>
              </div>
            )}

            {/* Tab specific empty feedback */}
            {activeTab !== 'all' && getFilteredCounts(activeTab) === 0 && (
              <EmptyState
                title="No saved items in this category"
                description={`You do not have any saved ${activeTab}s currently.`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
