import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';

interface FilterField {
  id: string;
  label: string;
  type: 'select' | 'checkbox' | 'range' | 'text';
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface FilterPanelProps {
  fields: FilterField[];
  values: Record<string, any>;
  onChange: (id: string, value: any) => void;
  onReset: () => void;
  className?: string;
}

export default function FilterPanel({
  fields,
  values,
  onChange,
  onReset,
  className = ''
}: FilterPanelProps) {
  return (
    <div className={`p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-md ${className}`}>
      <div className="flex items-center justify-between border-b border-zinc-800/50 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-[#FBBF24]" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Refine Intelligence</h3>
        </div>
        
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-[11px] font-bold text-zinc-500 hover:text-[#FBBF24] transition-colors focus:outline-none"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field) => {
          const val = values[field.id];

          return (
            <div key={field.id} className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide flex justify-between">
                <span>{field.label}</span>
                {field.type === 'range' && val !== undefined && (
                  <span className="text-[#FBBF24] font-mono">
                    {field.unit === '$' ? '$' : ''}
                    {typeof val === 'number' ? val.toLocaleString() : val}
                    {field.unit && field.unit !== '$' ? ` ${field.unit}` : ''}
                  </span>
                )}
              </label>

              {field.type === 'text' && (
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={val || ''}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    placeholder={field.placeholder || "Search keywords..."}
                    className="w-full pl-9 pr-4 py-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-xl placeholder-zinc-600 focus:outline-none focus:border-[#FBBF24] transition-colors"
                  />
                </div>
              )}

              {field.type === 'select' && (
                <select
                  value={val || ''}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="w-full px-3 py-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-[#FBBF24] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">All {field.label}s</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && (
                <button
                  type="button"
                  onClick={() => onChange(field.id, !val)}
                  className={`
                    w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all
                    ${val 
                      ? 'bg-[#FBBF24]/10 border-[#FBBF24]/30 text-white' 
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'}
                  `}
                >
                  <span className="text-xs font-semibold">{field.placeholder || "Enable filter"}</span>
                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${val ? 'bg-[#FBBF24] border-[#FBBF24] text-black' : 'border-zinc-700 bg-zinc-900'}`}>
                    {val && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              )}

              {field.type === 'range' && (
                <div className="pt-1">
                  <input
                    type="range"
                    min={field.min || 0}
                    max={field.max || 100}
                    step={field.step || 1}
                    value={val !== undefined ? val : (field.min || 0)}
                    onChange={(e) => onChange(field.id, Number(e.target.value))}
                    className="w-full accent-[#FBBF24] h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-medium mt-1 font-mono">
                    <span>{field.unit === '$' ? '$' : ''}{(field.min || 0).toLocaleString()}</span>
                    <span>{field.unit === '$' ? '$' : ''}{(field.max || 100).toLocaleString()}{field.unit && field.unit !== '$' ? ` ${field.unit}` : ''}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
