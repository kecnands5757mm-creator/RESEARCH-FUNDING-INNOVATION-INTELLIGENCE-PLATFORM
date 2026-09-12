import React, { useState, useEffect } from 'react';
import { fundingApi } from '../services/api';
import { FundingOpportunity } from '../types';
import FundingCard from '../components/FundingCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Award } from 'lucide-react';

export default function FundingView() {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filters state
  const [filters, setFilters] = useState<Record<string, any>>({
    search: '',
    domain: '',
    maxAmount: 15000000,
    eligibility: ''
  });

  const filterFields = [
    { id: 'search', label: 'Grant Title / Organization', type: 'text' as const, placeholder: 'Search grant names, sponsors...' },
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
    { id: 'maxAmount', label: 'Minimum Capital Value', type: 'range' as const, min: 50000, max: 15000000, step: 250000, unit: '$' },
    { 
      id: 'eligibility', 
      label: 'Sponsor Eligibility', 
      type: 'select' as const, 
      options: [
        { label: 'Academic Institutions Only', value: 'Academic Institutions' },
        { label: 'Open to All Researchers', value: 'All' },
        { label: 'Postdoctoral Fellows', value: 'Postdoctoral' }
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
      maxAmount: 15000000,
      eligibility: ''
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    async function loadOpportunities() {
      try {
        setLoading(true);
        const res = await fundingApi.list({
          page: currentPage,
          limit: 9,
          search: filters.search,
          domain: filters.domain,
          minAmount: filters.maxAmount > 50000 ? filters.maxAmount : undefined,
          status: filters.eligibility || undefined
        });

        setOpportunities(res.data);
        setTotalPages(res.totalPages);
        setTotalItems(res.total);
      } catch (err) {
        console.error('Failed loading active grants pipeline:', err);
      } finally {
        setLoading(false);
      }
    }

    loadOpportunities();
  }, [currentPage, filters]);

  return (
    <div className="space-y-6 select-text">
      {/* View Header */}
      <div>
        <div className="flex items-center space-x-2 text-[#FBBF24]">
          <Award className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Active Capital</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight mt-1">
          Funding Opportunities Pipeline
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Discover {totalItems} active federal, academic, and private R&D grants available for application.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Filters */}
        <div className="lg:col-span-1">
          <FilterPanel
            fields={filterFields}
            values={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Opportunities Grid */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <LoadingSkeleton type="card" count={6} />
          ) : opportunities.length === 0 ? (
            <EmptyState
              title="No Active Grants Found"
              description="No funding opportunities match your specific search criteria. Adjust the capital slider or research field to find more."
              onAction={handleResetFilters}
              actionText="Reset Grant Search"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {opportunities.map(opp => (
                  <FundingCard key={opp.id} opportunity={opp} />
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
