import React from 'react';

type TabKey = 'sections' | 'pages' | 'websites';

export const Tabs: React.FC<{
  active: TabKey;
  onChange: (key: TabKey) => void;
}> = ({ active, onChange }) => {
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'sections', label: 'Sections' },
    { key: 'pages', label: 'Pages' },
    { key: 'websites', label: 'Websites' },
  ];
  return (
    <div className="flex gap-2 border-b border-border px-6">
      {tabs.map(t => (
        <button
          key={t.key}
          className={`px-4 py-3 -mb-px border-b-2 transition-colors ${active === t.key ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-text'}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};


