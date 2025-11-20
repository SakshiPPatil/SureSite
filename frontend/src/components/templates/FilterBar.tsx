import React from 'react';

export const FilterBar: React.FC<{
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
}> = ({ categories, selected, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 bg-bg-secondary border border-border rounded-lg text-sm"
      >
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
};


