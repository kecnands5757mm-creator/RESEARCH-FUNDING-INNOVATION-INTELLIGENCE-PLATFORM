import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number; // e.g. +12.4% or -2.1%
  changeLabel?: string; // e.g. "from last quarter"
  description?: string;
  className?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  change,
  changeLabel = 'since last year',
  description,
  className = ''
}: DashboardCardProps) {
  const isPositive = change !== undefined ? change >= 0 : true;

  return (
    <div className={`p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/60 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between group ${className}`}>
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{title}</span>
        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/60 text-[#FBBF24] group-hover:bg-[#FBBF24]/10 transition-all duration-300">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-white tracking-tight leading-none">{value}</h3>
        
        {change !== undefined && (
          <div className="flex items-center space-x-1.5 mt-2.5">
            <span className={`flex items-center text-xs font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">{changeLabel}</span>
          </div>
        )}

        {description && (
          <p className="text-xs text-zinc-400 mt-2 line-clamp-1">{description}</p>
        )}
      </div>
    </div>
  );
}
