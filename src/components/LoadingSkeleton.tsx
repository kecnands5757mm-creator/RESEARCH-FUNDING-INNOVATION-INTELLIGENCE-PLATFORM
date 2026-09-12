import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'metrics' | 'profile';
  count?: number;
}

export default function LoadingSkeleton({ type = 'card', count = 3 }: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (type === 'metrics') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {items.map((_, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-[#121212] border border-zinc-800 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
              <div className="w-8 h-8 bg-zinc-800 rounded-lg"></div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-6 bg-zinc-800 rounded w-1/3"></div>
              <div className="h-3 bg-zinc-800 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {items.map((_, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#121212] border border-zinc-850 animate-pulse flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
              <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
            </div>
            <div className="w-8 h-8 bg-zinc-850 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center space-x-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="w-16 h-16 bg-zinc-800 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-zinc-800 rounded w-1/4"></div>
            <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
            <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
            <div className="h-3 bg-zinc-800 rounded w-full"></div>
            <div className="h-3 bg-zinc-800 rounded w-4/5"></div>
          </div>
          <div className="md:col-span-2 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
            <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
            <div className="h-10 bg-zinc-800/50 rounded w-full"></div>
            <div className="h-10 bg-zinc-800/50 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((_, idx) => (
        <div key={idx} className="p-5 rounded-2xl bg-[#121212] border border-zinc-800 animate-pulse flex flex-col justify-between h-48">
          <div>
            <div className="flex items-center justify-between">
              <div className="h-3 bg-zinc-800 rounded w-1/4"></div>
              <div className="w-6 h-6 bg-zinc-800 rounded"></div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
              <div className="h-3 bg-zinc-800 rounded w-full"></div>
              <div className="h-3 bg-zinc-800 rounded w-5/6"></div>
            </div>
          </div>
          <div className="pt-3 border-t border-zinc-850 h-6 bg-zinc-800/30 rounded w-1/2 mt-4"></div>
        </div>
      ))}
    </div>
  );
}
