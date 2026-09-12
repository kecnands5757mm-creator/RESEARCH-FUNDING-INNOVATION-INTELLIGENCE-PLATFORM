import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { 
  FileText, BrainCircuit, Users, Award, BarChart3, 
  Search, ArrowRight, ArrowUpRight, CheckCircle2, TrendingUp, Landmark, ShieldCheck 
} from 'lucide-react';

export default function Landing() {
  const { navigate } = useNavigation();

  const stats = [
    { value: '45.8M+', label: 'Indexed Publications', description: 'Cross-disciplinary articles & preprints' },
    { value: '12.4M+', label: 'Registered Patents', description: 'Global intellectual property claims' },
    { value: '$420B+', label: 'Tracked Funding opportunities', description: 'Active government and private grants' },
    { value: '8.2M+', label: 'Inventor Profiles', description: 'Collaborative academic directory' }
  ];

  const features = [
    {
      title: "Research Discovery & Intelligence",
      description: "Search across millions of connected papers, analyze citations, and explore multi-generational citation trees.",
      icon: FileText
    },
    {
      title: "Patent Innovation Intelligence",
      description: "Track global patent disclosures, identify inventors, and monitor technological assignees in real-time.",
      icon: BrainCircuit
    },
    {
      title: "Grant Funding Pipelines",
      description: "Discover active federal, academic, and VC research capital matching your unique discipline with smart deadline tracking.",
      icon: Award
    },
    {
      title: "Collaborator Discovery",
      description: "Model global academic co-authorship networks, calculate h-indices, and identify key opinion leaders.",
      icon: Users
    },
    {
      title: "Predictive Trend Analytics",
      description: "Identify emerging tech vectors (e.g. LLM hardware, mRNA) months before they trigger explosive academic volumes.",
      icon: BarChart3
    },
    {
      title: "Institutional Research Audits",
      description: "Inspect performance metrics, active funding budgets, and physical patents of world-class universities.",
      icon: Landmark
    }
  ];

  const steps = [
    { step: "01", name: "Create Your Intel Profile", text: "Register your research background, institution, and areas of scientific inquiry." },
    { step: "02", name: "Configure Saved Topics", text: "Monitor key topics (e.g., Quantum dots, CRISPR) and receive email/app digests." },
    { step: "03", name: "Discover Funding & Assets", text: "Discover high-value grants, browse global patents, and unlock new research frontiers." }
  ];

  return (
    <div className="bg-[#09090b] text-white min-h-screen selection:bg-[#FBBF24] selection:text-black font-sans overflow-x-hidden">
      {/* Landing Navbar */}
      <nav className="h-20 border-b border-zinc-900/60 flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 select-none">
          <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center font-black text-black text-base tracking-tighter shadow-md shadow-[#FBBF24]/10">
            RI
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight leading-none text-sm">Research</span>
            <span className="text-[10px] text-[#FBBF24] font-medium tracking-widest uppercase">Intelligence</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('login')}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors focus:outline-none"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('signup')}
            className="px-4.5 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-bold transition-all duration-200 shadow-lg shadow-[#FBBF24]/10 focus:outline-none"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#FBBF24]/5 blur-[120px] pointer-events-none" />

        {/* Small badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-6 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse" />
          <span>Next-Generation Academic Data Hub</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none max-w-3xl">
          Turn Research Data <br />
          <span className="text-[#FBBF24] bg-clip-text">Into Intelligence.</span>
        </h1>

        {/* Supporting text */}
        <p className="text-sm md:text-base text-zinc-400 mt-6 max-w-2xl leading-relaxed">
          Discover publications, patents, funding opportunities, researchers, and emerging innovation trends from one intelligent research intelligence platform.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={() => navigate('signup')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FBBF24] hover:bg-[#FBBF24]/95 text-black text-xs font-extrabold tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#FBBF24]/10 focus:outline-none"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>
          <button
            onClick={() => navigate('login')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 text-white text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1 focus:outline-none"
          >
            <span>Explore Research Data</span>
          </button>
        </div>

        {/* Visual representation of Platform Dashboard */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl border border-zinc-800/80 bg-zinc-950 p-3.5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FBBF24]/20 to-transparent" />
          
          {/* Inner Mock Dashboard Wireframe */}
          <div className="rounded-xl border border-zinc-850 bg-[#121212] overflow-hidden flex flex-col">
            {/* Topbar Mock */}
            <div className="h-11 border-b border-zinc-850 px-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <div className="w-40 h-5 bg-zinc-900 rounded-lg border border-zinc-800/60" />
              <div className="w-6 h-6 rounded-full bg-zinc-800" />
            </div>

            {/* Main content Mock */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-left">
                <div className="h-3 bg-zinc-800 rounded w-1/2 mb-3"></div>
                <div className="h-7 bg-zinc-900 rounded w-1/3 mb-2"></div>
                <div className="h-2 bg-[#FBBF24]/20 rounded w-3/4"></div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-left">
                <div className="h-3 bg-zinc-800 rounded w-1/2 mb-3"></div>
                <div className="h-7 bg-zinc-900 rounded w-1/3 mb-2"></div>
                <div className="h-2 bg-[#FBBF24]/20 rounded w-3/4"></div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-left">
                <div className="h-3 bg-zinc-800 rounded w-1/2 mb-3"></div>
                <div className="h-7 bg-zinc-900 rounded w-1/3 mb-2"></div>
                <div className="h-2 bg-[#FBBF24]/20 rounded w-3/4"></div>
              </div>

              {/* Chart representation */}
              <div className="col-span-1 md:col-span-2 p-4 rounded-xl bg-zinc-950 border border-zinc-900 h-44 text-left flex flex-col justify-between">
                <div className="h-3 bg-zinc-800 rounded w-1/4"></div>
                <div className="flex items-end justify-between h-24 pt-4 px-2">
                  <div className="w-8 bg-[#FBBF24]/10 border border-[#FBBF24]/30 h-1/3 rounded-t-sm" />
                  <div className="w-8 bg-[#FBBF24]/20 border border-[#FBBF24]/40 h-2/3 rounded-t-sm" />
                  <div className="w-8 bg-[#FBBF24]/30 border border-[#FBBF24]/50 h-1/2 rounded-t-sm" />
                  <div className="w-8 bg-[#FBBF24] h-full rounded-t-sm shadow-md" />
                  <div className="w-8 bg-[#FBBF24]/40 border border-[#FBBF24]/50 h-3/4 rounded-t-sm" />
                </div>
              </div>

              {/* List representation */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 h-44 text-left flex flex-col justify-between">
                <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                <div className="space-y-2 mt-3">
                  <div className="h-2 bg-zinc-900 rounded w-full"></div>
                  <div className="h-2 bg-zinc-900 rounded w-full"></div>
                  <div className="h-2 bg-zinc-900 rounded w-4/5"></div>
                  <div className="h-2 bg-zinc-900 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats Section */}
      <section className="border-y border-zinc-900 bg-zinc-950/60 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">{s.value}</h4>
              <p className="text-xs font-bold text-[#FBBF24] uppercase tracking-wide">{s.label}</p>
              <p className="text-[11px] text-zinc-500 mt-1">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Intelligence Discoveries */}
      <section className="px-6 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-[#FBBF24] tracking-widest uppercase">Intelligent Architecture</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1.5">
            Decentralized Intelligence Modules
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            Every layer of Research Intelligence works collaboratively to connect the dots of scientific breakthroughs and private capital flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/60 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/60 text-[#FBBF24] w-fit mb-5 group-hover:bg-[#FBBF24]/10 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#FBBF24] transition-colors tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 bg-zinc-950/40 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-[#FBBF24] tracking-widest uppercase">Workflow</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1.5">
              Three Steps To Innovation Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, idx) => (
              <div key={idx} className="relative text-left">
                <span className="text-4xl font-extrabold text-zinc-800/80 font-mono tracking-tighter block mb-3">{st.step}</span>
                <h3 className="text-base font-bold text-white tracking-tight mb-2">{st.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 my-16">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FBBF24]/20 to-transparent" />
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">
          Accelerate Your Academic Research Today
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
          Join thousands of principal investigators, laboratory directors, and VC innovation directors tracking emerging trends with Research Intelligence.
        </p>
        <button
          onClick={() => navigate('signup')}
          className="px-6 py-3 rounded-xl bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-extrabold tracking-wider transition-all duration-200 shadow-xl shadow-[#FBBF24]/10 focus:outline-none"
        >
          Create Free Platform Profile
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-xs">
          <div className="flex items-center space-x-3 select-none">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-extrabold text-[#FBBF24] text-xs">
              RI
            </div>
            <span className="font-semibold text-zinc-300">Research Intelligence</span>
          </div>

          <div className="flex items-center space-x-6 text-zinc-400">
            <button className="hover:text-[#FBBF24] transition-colors focus:outline-none">Privacy Policy</button>
            <button className="hover:text-[#FBBF24] transition-colors focus:outline-none">Terms of Service</button>
            <button className="hover:text-[#FBBF24] transition-colors focus:outline-none">Contact Analyst Support</button>
          </div>

          <p>© 2026 Research Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
