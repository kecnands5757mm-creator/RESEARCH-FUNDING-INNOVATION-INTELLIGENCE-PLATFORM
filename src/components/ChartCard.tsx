import React from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function ChartCard({
  title,
  description,
  loading = false,
  children,
  className = ''
}: ChartCardProps) {
  return (
    <div className={`p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md flex flex-col justify-between hover:border-zinc-700/50 transition-all duration-300 ${className}`}>
      <div>
        <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-zinc-500 mt-1">{description}</p>
        )}
      </div>

      <div className="mt-5 relative min-h-[220px] flex items-center justify-center">
        {loading ? (
          <div className="absolute inset-0 bg-[#121212]/40 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-6 h-6 border-2 border-[#FBBF24] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[10px] text-zinc-500 font-medium">Crunching metrics...</span>
            </div>
          </div>
        ) : null}
        
        <div className="w-full h-full flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
export const customTooltipStyle = {
  contentStyle: {
    backgroundColor: '#121212',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '8px 12px',
  },
  labelStyle: {
    color: '#a1a1aa',
    fontWeight: 'bold',
    fontSize: '11px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  itemStyle: {
    color: '#ffffff',
    fontSize: '12px',
  }
};
