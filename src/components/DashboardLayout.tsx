import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-[#09090b] overflow-hidden font-sans select-none">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#0c0c0e]">
        {/* Top Header */}
        <TopNavbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Dynamic Screen Content Wrapper */}
        <main className="flex-1 overflow-y-auto px-6 py-6 md:px-8 select-text">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
