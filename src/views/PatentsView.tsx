import React, { useState, useEffect } from 'react';
import { patentsApi } from '../services/api';
import { Patent } from '../types';
import PatentCard from '../components/PatentCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { BrainCircuit } from 'lucide-react';

export default function PatentsView() {
  const [loading, setLoading] = useState(true);
  const [patents, setPatents] = useState<Patent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filter conditions
  const [filters, setFilters] = useState<Record<string, any>>({
    search: '',
    domain: '',
    country: '',
    status: ''
  });

  const filterFields = [
    { id: 'search', label: 'Patent Reference / Title', type: 'text' as const, placeholder: 'Search patent numbers, titles...' },
    { 
      id: 'domain', 
      label: 'Technology Domain', 
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
      id: 'country', 
      label: 'Filing Registry', 
      type: 'select' as const, 
      options: [
        { label: 'US (United States)', value: 'US' },
        { label: 'EP (European Patent Office)', value: 'EP' },
        { label: 'WO (WIPO PCT filings)', value: 'WO' },
        { label: 'JP (Japan)', value: 'JP' }
      ] 
    },
    { 
      id: 'status', 
      label: 'Legal Status', 
      type: 'select' as const, 
      options: [
        { label: 'Granted Only', value: 'Granted' },
        { label: 'Pending Disclosures', value: 'Pending' },
        { label: 'Expired Filings', value: 'Expired' }
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
      domain: '',
      country: '',
      status: ''
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    async function loadPatents() {
      try {
        setLoading(true);
        const res = await patentsApi.list({
          page: currentPage,
          limit: 9,
          search: filters.search,
          domain: filters.domain,
          country: filters.country,
          status: filters.status || undefined
        });

        setPatents(res.data);
        setTotalPages(res.totalPages);
        setTotalItems(res.total);
      } catch (err) {
        console.error('Failed loading patents database:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPatents();
  }, [currentPage, filters]);

  return (
    <div className="space-y-6 select-text">
      {/* View Header */}
      <div>
        <div className="flex items-center space-x-2 text-[#FBBF24]">
          <BrainCircuit className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Intellectual Property</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight mt-1">
          Patent Innovation Registry
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Track {totalItems} global patent grants, assignee assets, and engineering claims.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Side Panel */}
        <div className="lg:col-span-1">
          <FilterPanel
            fields={filterFields}
            values={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Results grid */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <LoadingSkeleton type="card" count={6} />
          ) : patents.length === 0 ? (
            <EmptyState
              title="No Innovation Disclosures Found"
              description="No registered patents match your active filtering conditions. Try broadening your technology keyword, status, or jurisdiction."
              onAction={handleResetFilters}
              actionText="Reset Search Criteria"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {patents.map(pat => (
                  <PatentCard key={pat.id} patent={pat} />
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
