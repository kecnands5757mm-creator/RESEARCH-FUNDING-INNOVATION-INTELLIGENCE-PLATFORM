import React from 'react';
import { useNavigation, PageView } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, FileText, Landmark, Search, 
  Settings, Bookmark, Bell, Users, Award, LogOut, Menu, X, BrainCircuit 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { currentView, navigate } = useNavigation();
  const { user, logout, notifications, savedItems } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;
  const savedCount = savedItems.length;

  const menuItems = [
    { view: 'dashboard' as PageView, label: 'Dashboard', icon: LayoutDashboard },
    { view: 'publications' as PageView, label: 'Publications', icon: FileText },
    { view: 'patents' as PageView, label: 'Patents', icon: BrainCircuit },
    { view: 'funding' as PageView, label: 'Funding', icon: Award },
    { view: 'researchers' as PageView, label: 'Researchers', icon: Users },
    { view: 'institutions' as PageView, label: 'Institutions', icon: Landmark },
    { view: 'analytics' as PageView, label: 'Analytics', icon: Search }, // Fits trends search
    { view: 'saved' as PageView, label: 'Saved Items', icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined },
    { view: 'notifications' as PageView, label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { view: 'settings' as PageView, label: 'Settings', icon: Settings },
  ];

  const handleNav = (view: PageView) => {
    navigate(view);
    onClose();
  };

  const activeClasses = "bg-[#FBBF24]/10 text-[#FBBF24] border-r-2 border-[#FBBF24]";
  const inactiveClasses = "text-zinc-400 hover:text-white hover:bg-zinc-800/50";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-[#121212] border-r border-zinc-800/80 z-50 flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Header Branding */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800/80">
            <div 
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => handleNav('dashboard')}
            >
              {/* Custom RI Logo */}
              <div className="w-8 h-8 rounded-lg bg-[#FBBF24] flex items-center justify-center font-bold text-black select-none text-sm tracking-tighter">
                RI
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white tracking-tight leading-none text-sm">Research</span>
                <span className="text-[10px] text-[#FBBF24] font-medium tracking-widest uppercase">Intelligence</span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Preview */}
          {user && (
            <div className="px-5 py-4 border-b border-zinc-800/50">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.full_name)}`} 
                  alt={user.full_name} 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border border-zinc-700/80 object-cover bg-zinc-900"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate leading-none mb-1">{user.full_name}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{user.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Check active status
              const isActive = currentView === item.view || 
                (item.view === 'publications' && currentView === 'publication-detail') ||
                (item.view === 'patents' && currentView === 'patent-detail') ||
                (item.view === 'funding' && currentView === 'funding-detail') ||
                (item.view === 'researchers' && currentView === 'researcher-profile') ||
                (item.view === 'institutions' && currentView === 'institution-profile');

              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium 
                    transition-all duration-200 group relative
                    ${isActive ? activeClasses : inactiveClasses}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-105 ${isActive ? 'text-[#FBBF24]' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`
                      text-[10px] px-2 py-0.5 rounded-full font-bold
                      ${isActive ? 'bg-[#FBBF24] text-black' : 'bg-zinc-800 text-[#FBBF24]'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-zinc-800/80">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
