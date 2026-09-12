import React, { useState, useEffect } from 'react';
import { researchersApi } from '../services/api';
import { Researcher } from '../types';
import ResearcherCard from '../components/ResearcherCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Users } from 'lucide-react';

export default function ResearchersView() {
  const [loading, setLoading] = useState(true);
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filters state
  const [filters, setFilters] = useState<Record<string, any>>({
    search: '',
    domain: '',
    minHIndex: 0
  });

  const filterFields = [
    { id: 'search', label: 'Researcher Name / Topic', type: 'text' as const, placeholder: 'Search scholar names, topics...' },
    { 
      id: 'domain', 
      label: 'Primary Domain', 
      type: 'select' as const, 
      options: [
        { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
        { label: 'Quantum Computing', value: 'Quantum Computing' },
        { label: 'Biotechnology', value: 'Biotechnology' },
        { label: 'Renewable Energy', value: 'Renewable Energy' },
        { label: 'Material Science', value: 'Material Science' }
      ] 
    },
    { id: 'minHIndex', label: 'Minimum H-Index Metric', type: 'range' as const, min: 10, max: 120, step: 5, unit: '' }
  ];

  const handleFilterChange = (id: string, value: any) => {
    setFilters(prev => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      domain: '',
      minHIndex: 0
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    async function loadResearchers() {
      try {
        setLoading(true);
        const res = await researchersApi.list({
          page: currentPage,
          limit: 9,
          search: filters.search,
          domain: filters.domain,
          minHIndex: filters.minHIndex > 0 ? filters.minHIndex : undefined
        });

        setResearchers(res.data);
        setTotalPages(res.totalPages);
        setTotalItems(res.total);
      } catch (err) {
        console.error('Failed loading researcher directory:', err);
      } finally {
        setLoading(false);
      }
    }

    loadResearchers();
  }, [currentPage, filters]);

  return (
    <div className="space-y-6 select-text">
      {/* View Header */}
      <div>
        <div className="flex items-center space-x-2 text-[#FBBF24]">
          <Users className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Expert Network</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight mt-1">
          Scholarly Collaborator Directory
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Model and explore profiles of {totalItems} world-class investigators, academic h-index scores, and co-authorships.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Filter Panel */}
        <div className="lg:col-span-1">
          <FilterPanel
            fields={filterFields}
            values={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Grid list */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <LoadingSkeleton type="card" count={6} />
          ) : researchers.length === 0 ? (
            <EmptyState
              title="No Collaborators Discovered"
              description="No registered scientists match your active filter settings. Consider relaxing your h-index requirement or widening your keyword search."
              onAction={handleResetFilters}
              actionText="Reset Collaborator Search"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {researchers.map(r => (
                  <ResearcherCard key={r.id} researcher={r} />
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
