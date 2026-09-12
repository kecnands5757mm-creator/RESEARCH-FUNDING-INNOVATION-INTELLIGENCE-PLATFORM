import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Bell, Menu, Settings, LogOut, User } from 'lucide-react';
import SearchBar from './SearchBar';

interface TopNavbarProps {
  onToggleSidebar: () => void;
}

export default function TopNavbar({ onToggleSidebar }: TopNavbarProps) {
  const { user, logout, notifications } = useApp();
  const { navigate } = useNavigation();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-zinc-800/80 bg-[#121212]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Left section: Hamburger (Mobile) and Logo (Mobile) */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors lg:hidden focus:outline-none"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Short Mobile Brand Logo */}
        <div 
          onClick={() => navigate('dashboard')}
          className="flex items-center space-x-2 lg:hidden cursor-pointer"
        >
          <div className="w-7 h-7 rounded bg-[#FBBF24] flex items-center justify-center font-black text-black text-xs">
            RI
          </div>
          <span className="font-semibold text-white tracking-tight text-xs">RI Platform</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-xl mx-4 hidden sm:block">
        <SearchBar />
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center space-x-3.5">
        {/* Mobile Search Button Fallback */}
        <div className="sm:hidden">
          <SearchBar />
        </div>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => navigate('notifications')}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-all duration-200 relative focus:outline-none group"
          title="Platform Notifications"
        >
          <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FBBF24] ring-2 ring-[#121212]" />
          )}
        </button>

        {/* Vertical divider */}
        <div className="h-5 w-[1px] bg-zinc-800 hidden sm:block" />

        {/* User profile dropdown trigger */}
        {user && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('settings')}
              className="flex items-center space-x-2 focus:outline-none group"
              title="Profile Settings"
            >
              <img 
                src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.full_name)}`} 
                alt={user.full_name} 
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border border-zinc-700/80 object-cover bg-zinc-900 group-hover:border-[#FBBF24] transition-colors"
              />
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors hidden md:block">
                {user.full_name.split(' ')[0]}
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
