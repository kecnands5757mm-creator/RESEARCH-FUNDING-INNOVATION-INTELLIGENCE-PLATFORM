import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { 
  publicationsApi, patentsApi, fundingApi, researchersApi, institutionsApi 
} from '../services/api';
import DashboardCard from '../components/DashboardCard';
import ChartCard, { customTooltipStyle } from '../components/ChartCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PublicationCard from '../components/PublicationCard';
import FundingCard from '../components/FundingCard';
import { 
  FileText, BrainCircuit, Award, Users, TrendingUp, Landmark, 
  Calendar, ArrowRight, Sparkles, AlertTriangle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';

export default function Dashboard() {
  const { user } = useApp();
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pubCount: 0,
    patentCount: 0,
    fundingTotal: '$1.2B',
    researcherCount: 0,
    institutionCount: 0
  });

  const [recentPubs, setRecentPubs] = useState<any[]>([]);
  const [approachingGrants, setApproachingGrants] = useState<any[]>([]);

  // Seed chart data
  const citationTrendData = [
    { year: '2020', publications: 320, citations: 2800 },
    { year: '2021', publications: 480, citations: 4300 },
    { year: '2022', publications: 650, citations: 6100 },
    { year: '2023', publications: 920, citations: 9400 },
    { year: '2024', publications: 1150, citations: 12800 },
    { year: '2025', publications: 1340, citations: 16500 },
  ];

  const domainMarketShare = [
    { name: 'AI / Biotech', value: 34 },
    { name: 'Quantum Dev', value: 25 },
    { name: 'Renewables', value: 18 },
    { name: 'Robotics', value: 13 },
    { name: 'Material Sci', value: 10 }
  ];

  const BAR_COLORS = ['#FBBF24', '#F59E0B', '#D97706', '#B45309', '#78350F'];

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [pubs, patents, grants, researchers, institutions] = await Promise.all([
          publicationsApi.list({ limit: 4 }),
          patentsApi.list({ limit: 1 }),
          fundingApi.list({ limit: 4 }),
          researchersApi.list({ limit: 1 }),
          institutionsApi.list({ limit: 1 })
        ]);

        setStats({
          pubCount: pubs.total,
          patentCount: patents.total,
          fundingTotal: '$840M', // Summarized total
          researcherCount: researchers.total,
          institutionCount: institutions.total
        });

        setRecentPubs(pubs.data.slice(0, 2));
        setApproachingGrants(grants.data.slice(0, 2));
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-zinc-900 rounded w-1/4 animate-pulse"></div>
        <LoadingSkeleton type="metrics" count={5} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse"></div>
          <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Get current date representation
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6 select-text">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#FBBF24]">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">System Operational</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Welcome Back, {user?.full_name.split(' ')[0] || 'Researcher'}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">{formattedDate} • Platform session active</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('analytics')}
            className="px-4.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white text-zinc-300 text-xs font-bold transition-all duration-200"
          >
            Full Analytics View
          </button>
          <button
            onClick={() => navigate('saved')}
            className="px-4.5 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-bold transition-all duration-200 shadow-md shadow-[#FBBF24]/5"
          >
            My Saved Workspace
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <DashboardCard 
          title="Indexed Papers" 
          value={stats.pubCount} 
          icon={FileText} 
          change={14.8} 
          changeLabel="v. last month"
          description="Consolidated publications database" 
        />
        <DashboardCard 
          title="Active Patents" 
          value={stats.patentCount} 
          icon={BrainCircuit} 
          change={8.3} 
          changeLabel="v. last quarter"
          description="Inventions and tech disclosures" 
        />
        <DashboardCard 
          title="Active Funding" 
          value={stats.fundingTotal} 
          icon={Award} 
          change={21.5} 
          changeLabel="since last year"
          description="Tracked financial capital pipelines" 
        />
        <DashboardCard 
          title="Collaborators" 
          value={stats.researcherCount} 
          icon={Users} 
          description="Principal authors & inventors" 
        />
        <DashboardCard 
          title="Institutions" 
          value={stats.institutionCount} 
          icon={Landmark} 
          description="Top global laboratories & research centres" 
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Area chart showing citations and publications */}
        <ChartCard 
          title="Annual Citation Velocity & Output" 
          description="Global scholarly citing volume and indexing rates of connected records"
        >
          <div className="w-full h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={citationTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCitations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="year" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip {...customTooltipStyle} />
                <Area yAxisId="left" type="monotone" dataKey="citations" name="Citation Count" stroke="#FBBF24" strokeWidth={2} fillOpacity={1} fill="url(#colorCitations)" />
                <Area yAxisId="right" type="monotone" dataKey="publications" name="Indexed Papers" stroke="#a1a1aa" strokeWidth={1} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 2: Bar chart showing patent breakdown by domains */}
        <ChartCard 
          title="Emerging Technology Distribution" 
          description="Active intellectual property disclosures classified under leading technological domains"
        >
          <div className="w-full h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainMarketShare} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip {...customTooltipStyle} />
                <Bar dataKey="value" name="IP Disclosures (%)" radius={[4, 4, 0, 0]}>
                  {domainMarketShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Two-Column Details Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Recent Publications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#FBBF24]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Scholarly Papers Feed</h2>
            </div>
            <button
              onClick={() => navigate('publications')}
              className="flex items-center space-x-1 text-xs font-bold text-zinc-500 hover:text-[#FBBF24] transition-colors"
            >
              <span>Browse All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {recentPubs.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </div>

        {/* Right Column: Impending Funding Deadlines */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#FBBF24]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Critical Funding pipelines</h2>
            </div>
            <button
              onClick={() => navigate('funding')}
              className="flex items-center space-x-1 text-xs font-bold text-zinc-500 hover:text-[#FBBF24] transition-colors"
            >
              <span>Explore Grants</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {approachingGrants.map((grant) => (
              <FundingCard key={grant.id} opportunity={grant} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
