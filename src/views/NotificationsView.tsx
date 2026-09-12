import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Bell, Check, Trash2, ShieldCheck, Mail, Sparkles, Award, FileText, ChevronRight } from 'lucide-react';
import EmptyState from '../components/EmptyState';

export default function NotificationsView() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useApp();
  const { navigate } = useNavigation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (item: any) => {
    markAsRead(item.id);
    if (item.target_view && item.target_id) {
      navigate(item.target_view, { id: item.target_id });
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'funding_deadline': return Award;
      case 'new_publication': return FileText;
      case 'new_patent': return Sparkles;
      default: return Bell;
    }
  };

  const isEmpty = notifications.length === 0;

  return (
    <div className="space-y-6 select-text">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#FBBF24]">
            <Bell className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">System Alerts</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Notifications Center
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            You have {unreadCount} unread system notifications and trend updates.
          </p>
        </div>

        {!isEmpty && unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center space-x-1.5 px-4.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-all duration-200 focus:outline-none"
          >
            <Check className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* Notifications list layout */}
      <div className="max-w-3xl mx-auto space-y-3.5">
        {isEmpty ? (
          <EmptyState
            title="Clean Inbox"
            description="All caught up! We will alert you here of new research publications and imminent grant deadlines."
            icon={Bell}
          />
        ) : (
          notifications.map((item) => {
            const IconComponent = getIconForType(item.type);
            const dateStr = new Date(item.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`
                  p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-4 cursor-pointer group relative overflow-hidden
                  ${item.read 
                    ? 'bg-zinc-900/40 border-zinc-900 hover:border-zinc-850 text-zinc-400' 
                    : 'bg-zinc-900 border-zinc-800/80 hover:border-zinc-750 text-white'}
                `}
              >
                {/* Visual Unread Bar */}
                {!item.read && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#FBBF24]" />
                )}

                {/* Left icon wrapper */}
                <div className={`p-2.5 rounded-xl border shrink-0 ${
                  item.read 
                    ? 'bg-zinc-950 border-zinc-900 text-zinc-600' 
                    : 'bg-[#FBBF24]/10 border-[#FBBF24]/20 text-[#FBBF24]'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Content middle */}
                <div className="flex-1 min-w-0 pr-4 text-left">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-xs font-bold ${item.read ? 'text-zinc-400' : 'text-white'}`}>{item.title}</span>
                    <span className="text-[10px] text-zinc-500 font-mono font-medium">{dateStr}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                    {item.message}
                  </p>
                  
                  {item.target_view && (
                    <div className="mt-2.5 flex items-center space-x-1 text-[11px] font-bold text-[#FBBF24]/85 group-hover:text-[#FBBF24] transition-colors">
                      <span>View Intelligence Profile</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  )}
                </div>

                {/* Right delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors self-center focus:outline-none"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
