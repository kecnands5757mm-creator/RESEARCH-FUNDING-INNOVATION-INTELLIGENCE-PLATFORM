import React from 'react';
import { LucideIcon, Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon: Icon = Search,
  actionText,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-zinc-900 border border-zinc-800/80 max-w-lg mx-auto my-6">
      <div className="p-4 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500 mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-zinc-500 mt-1.5 max-w-xs leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black text-xs font-bold transition-all duration-200 shadow-md focus:outline-none"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
