import React, { useState, useEffect } from 'react';
import { institutionsApi } from '../services/api';
import { Institution } from '../types';
import InstitutionCard from '../components/InstitutionCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Landmark } from 'lucide-react';

export default function InstitutionsView() {
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filters state
  const [filters, setFilters] = useState<Record<string, any>>({
    search: '',
    country: '',
    domain: ''
  });

  const filterFields = [
    { id: 'search', label: 'Institution Name', type: 'text' as const, placeholder: 'Search university, laboratory names...' },
    { 
      id: 'country', 
      label: 'Country/Region', 
      type: 'select' as const, 
      options: [
        { label: 'United States', value: 'United States' },
        { label: 'United Kingdom', value: 'United Kingdom' },
        { label: 'Switzerland', value: 'Switzerland' }
      ] 
    },
    { 
      id: 'domain', 
      label: 'Primary Specialization', 
      type: 'select' as const, 
      options: [
        { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
        { label: 'Quantum Computing', value: 'Quantum Computing' },
        { label: 'Biotechnology', value: 'Biotechnology' },
        { label: 'Renewable Energy', value: 'Renewable Energy' },
        { label: 'Material Science', value: 'Material Science' }
      ] 
    }
  ];

  const handleFilterChange = (id: string, value: any) => {
    setFilters(prev => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      country: '',
      domain: ''
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    async function loadInstitutions() {
      try {
        setLoading(true);
        const res = await institutionsApi.list({
          page: currentPage,
          limit: 9,
          search: filters.search,
          country: filters.country,
          domain: filters.domain
        });

        setInstitutions(res.data);
        setTotalPages(res.totalPages);
        setTotalItems(res.total);
      } catch (err) {
        console.error('Failed loading institutions catalog:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInstitutions();
  }, [currentPage, filters]);

  return (
    <div className="space-y-6 select-text">
      {/* View Header */}
      <div>
        <div className="flex items-center space-x-2 text-[#FBBF24]">
          <Landmark className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Top Institutions</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight mt-1">
          Research Institutions Catalog
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Model and audit performance indices for {totalItems} of the world's most innovative academic centers and research hubs.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filters Panel */}
        <div className="lg:col-span-1">
          <FilterPanel
            fields={filterFields}
            values={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Results list */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <LoadingSkeleton type="card" count={6} />
          ) : institutions.length === 0 ? (
            <EmptyState
              title="No Research Centers Discovered"
              description="No registered laboratory or academic center matches your selected country or specialty area."
              onAction={handleResetFilters}
              actionText="Reset Institution Search"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {institutions.map(inst => (
                  <InstitutionCard key={inst.id} institution={inst} />
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
