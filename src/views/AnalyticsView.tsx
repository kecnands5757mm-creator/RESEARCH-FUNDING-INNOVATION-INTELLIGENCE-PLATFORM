import React, { useState } from 'react';
import ChartCard, { customTooltipStyle } from '../components/ChartCard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line
} from 'recharts';
import { BarChart3, TrendingUp, Sparkles, Filter, Award, BrainCircuit, Globe } from 'lucide-react';

export default function AnalyticsView() {
  const [activeSegment, setActiveSegment] = useState<'global' | 'ai' | 'quantum' | 'biotech'>('global');

  // Custom datasets
  const globalTrendData = [
    { year: '2020', publications: 3200, citations: 28400, patents: 840, funding: 120 },
    { year: '2021', publications: 4800, citations: 43200, patents: 1120, funding: 165 },
    { year: '2022', publications: 6500, citations: 61800, patents: 1450, funding: 210 },
    { year: '2023', publications: 9200, citations: 94100, patents: 1980, funding: 290 },
    { year: '2024', publications: 11500, citations: 128500, patents: 2540, funding: 420 },
    { year: '2025', publications: 13400, citations: 165200, patents: 3100, funding: 580 },
  ];

  const aiTrendData = [
    { year: '2020', publications: 1200, citations: 11400, patents: 340, funding: 45 },
    { year: '2021', publications: 1900, citations: 18200, patents: 510, funding: 70 },
    { year: '2022', publications: 2800, citations: 29800, patents: 750, funding: 95 },
    { year: '2023', publications: 4600, citations: 48100, patents: 1180, funding: 140 },
    { year: '2024', publications: 6500, citations: 72500, patents: 1640, funding: 220 },
    { year: '2025', publications: 8400, citations: 99200, patents: 2100, funding: 340 },
  ];

  const currentDataset = activeSegment === 'ai' ? aiTrendData : globalTrendData;

  const regionalIPData = [
    { name: 'USPTO (US)', value: 42 },
    { name: 'EPO (Europe)', value: 24 },
    { name: 'WIPO (PCT)', value: 18 },
    { name: 'JPO (Japan)', value: 10 },
    { name: 'Other registries', value: 6 }
  ];

  const fundingAllocation = [
    { category: 'Academia', amount: 340 },
    { category: 'Private Labs', amount: 280 },
    { category: 'Gov Research', amount: 410 },
    { category: 'Joint Ventures', amount: 150 }
  ];

  const PIE_COLORS = ['#FBBF24', '#F59E0B', '#D97706', '#B45309', '#78350F'];
  const BAR_COLORS = ['#3f3f46', '#71717a', '#FBBF24', '#a1a1aa'];

  return (
    <div className="space-y-6 select-text">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#FBBF24]">
            <BarChart3 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Predictive Trend Modeling</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Innovation Intelligence Analytics
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Model citations, technology growth vectors, global patent registries, and active capital allocations.
          </p>
        </div>

        {/* Filter Segment Selector */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800/80 w-fit">
          {(['global', 'ai'] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all focus:outline-none
                ${activeSegment === seg 
                  ? 'bg-[#FBBF24] text-black shadow' 
                  : 'text-zinc-400 hover:text-white'}
              `}
            >
              {seg === 'ai' ? 'Artificial Intelligence Core' : 'Global Aggregated Trends'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: 2 Top large charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Area Chart Scholarly curves */}
        <div className="lg:col-span-2">
          <ChartCard 
            title="Citation Velocity & Indexed Output" 
            description="Historical publication indexing rates mapped against scholarly citations"
          >
            <div className="w-full h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentDataset} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="citationsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                  <XAxis dataKey="year" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#71717a" fontSize={11} tickLine={false} />
                  <Tooltip {...customTooltipStyle} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area yAxisId="left" type="monotone" dataKey="citations" name="Aggregate Citations" stroke="#FBBF24" strokeWidth={2.5} fillOpacity={1} fill="url(#citationsGrad)" />
                  <Area yAxisId="right" type="monotone" dataKey="publications" name="Scholarly Publications" stroke="#a1a1aa" strokeWidth={1} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Chart 2: Regional IP filing share (Pie Chart) */}
        <div className="lg:col-span-1">
          <ChartCard 
            title="Intellectual Property Distribution" 
            description="Geographical distribution of active patents across major registries"
          >
            <div className="w-full h-64 mt-4 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionalIPData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {regionalIPData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip {...customTooltipStyle} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconSize={8}
                    formatter={(value, entry: any) => (
                      <span className="text-[10px] text-zinc-400 font-semibold uppercase">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Grid: Bottom metrics & line charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Capital expenditure bar chart */}
        <ChartCard 
          title="Grant Capital Expenditures" 
          description="Distribution of tracked capital grants across leading academic and corporate hubs"
        >
          <div className="w-full h-60 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fundingAllocation} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="category" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip {...customTooltipStyle} />
                <Bar dataKey="amount" name="Capital allocated ($M)" radius={[4, 4, 0, 0]}>
                  {fundingAllocation.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={BAR_COLORS[idx % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 4: Patent growth line chart */}
        <ChartCard 
          title="Patent Growth curves" 
          description="Annual intellectual property disclosures and pending applications"
        >
          <div className="w-full h-60 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentDataset} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="year" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip {...customTooltipStyle} />
                <Line type="monotone" dataKey="patents" name="IP Filings" stroke="#FBBF24" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="funding" name="Sponsor Grants ($M)" stroke="#a1a1aa" strokeWidth={1.5} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
