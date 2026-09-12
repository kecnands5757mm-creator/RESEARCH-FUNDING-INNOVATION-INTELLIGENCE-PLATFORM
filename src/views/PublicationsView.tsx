import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { publicationsApi } from '../services/api';
import { Publication } from '../types';
import PublicationCard from '../components/PublicationCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { FileText, Sparkles, AlertCircle } from 'lucide-react';

export default function PublicationsView() {
  const [loading, setLoading] = useState(true);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filters state
  const [filters, setFilters] = useState<Record<string, any>>({
    search: '',
    domain: '',
    year: '',
    minCitations: 0,
    openAccess: false
  });

  const filterFields = [
    { id: 'search', label: 'Scholarly Keyword', type: 'text' as const, placeholder: 'Search titles, abstracts...' },
    { 
      id: 'domain', 
      label: 'Research Domain', 
      type: 'select' as const, 
      options: [
        { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
        { label: 'Quantum Computing', value: 'Quantum Computing' },
        { label: 'Biotechnology', value: 'Biotechnology' },
        { label: 'Renewable Energy', value: 'Renewable Energy' },
        { label: 'Material Science', value: 'Material Science' }
      ] 
    },
    { 
      id: 'year', 
      label: 'Publication Year', 
      type: 'select' as const, 
      options: [
        { label: '2026', value: '2026' },
        { label: '2025', value: '2025' },
        { label: '2024', value: '2024' },
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' }
      ] 
    },
    { id: 'minCitations', label: 'Minimum Citations', type: 'range' as const, min: 0, max: 2000, step: 20, unit: '' },
    { id: 'openAccess', label: 'Open Access Exclusive', type: 'checkbox' as const, placeholder: 'Filter Open Access only' }
  ];

  const handleFilterChange = (id: string, value: any) => {
    setFilters(prev => ({ ...prev, [id]: value }));
    setCurrentPage(1); // Reset page on filter changes
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      domain: '',
      year: '',
      minCitations: 0,
      openAccess: false
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    async function loadPublications() {
      try {
        setLoading(true);
        const res = await publicationsApi.list({
          page: currentPage,
          limit: 9,
          search: filters.search,
          domain: filters.domain,
          year: filters.year || undefined,
          open_access: filters.openAccess || undefined
        });

        setPublications(res.data);
        setTotalPages(res.totalPages);
        setTotalItems(res.total);
      } catch (err) {
        console.error('Failed loading publications:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPublications();
  }, [currentPage, filters]);

  return (
    <div className="space-y-6 select-text">
      {/* View Header */}
      <div>
        <div className="flex items-center space-x-2 text-[#FBBF24]">
          <FileText className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Connected Analytics</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight mt-1">
          Publications Directory
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Explore {totalItems} peer-reviewed research papers and citation trends.
        </p>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Filter Panel */}
        <div className="lg:col-span-1">
          <FilterPanel
            fields={filterFields}
            values={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Side: Publications Grid */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <LoadingSkeleton type="card" count={6} />
          ) : publications.length === 0 ? (
            <EmptyState
              title="No Publications Found"
              description="No scholarly papers match your specific filters. Try adjusting your keyword, citation range, or open-access flags."
              onAction={handleResetFilters}
              actionText="Reset Search Parameters"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {publications.map(pub => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
