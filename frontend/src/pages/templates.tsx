import React, { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Tabs } from '@/components/templates/Tabs';
import { SearchBar } from '@/components/templates/SearchBar';
import { FilterBar } from '@/components/templates/FilterBar';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { PreviewModal } from '@/components/templates/PreviewModal';
import { heroSections, sectionCategories } from '@/data/sections';
import { pageTemplates } from '@/data/pages';
import { websiteTemplates } from '@/data/websites';
import { CommonMenu } from '@/components/layout/CommonMenu';

type ActiveTab = 'sections' | 'pages' | 'websites';

export default function TemplatesPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState<ActiveTab>('sections');
  const [preview, setPreview] = useState<{ title: string; html?: string; css?: string; js?: string; codeTabIndex?: number } | null>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const initial = (saved === 'light' || saved === 'dark') ? (saved as 'light' | 'dark') : 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('theme', newTheme); } catch {}
  };

  const sectionsFiltered = useMemo(() => {
    const q = query.toLowerCase();
    const pool = category === 'All' ? heroSections : heroSections.filter(s => s.category.toLowerCase() === category.toLowerCase());
    return pool.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }, [query, category]);

  const pagesFiltered = useMemo(() => {
    const q = query.toLowerCase();
    const pool = category === 'All' ? pageTemplates : pageTemplates.filter(p => p.category.toLowerCase() === category.toLowerCase());
    return pool.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
  }, [query, category]);

  const websitesFiltered = useMemo(() => {
    const q = query.toLowerCase();
    const pool = category === 'All' ? websiteTemplates : websiteTemplates.filter(w => w.category.toLowerCase() === category.toLowerCase());
    return pool.filter(w => w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q) || w.tags.some(t => t.toLowerCase().includes(q)));
  }, [query, category]);

  const previewSection = (id: string) => {
    const s = heroSections.find(x => x.id === id);
    if (!s) return;
    setPreview({ title: s.name, html: s.html, css: s.css, js: s.js });
  };

  const useCode = (code: { html?: string; css?: string; js?: string }) => {
    try {
      const payload = { html: code.html || '', css: code.css || '', js: code.js || '' };
      localStorage.setItem('selectedCode', JSON.stringify(payload));
      window.location.href = '/';
    } catch {}
  };

  // Reset category when switching tabs
  useEffect(() => {
    setCategory('All');
  }, [active]);

  const categoriesForActive = useMemo(() => {
    if (active === 'sections') {
      const caps = sectionCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1));
      return ['All', ...caps];
    }
    if (active === 'pages') {
      const set = Array.from(new Set(pageTemplates.map(p => p.category)));
      const caps = set.map(c => c.charAt(0).toUpperCase() + c.slice(1));
      return ['All', ...caps];
    }
    const set = Array.from(new Set(websiteTemplates.map(w => w.category)));
    const caps = set.map(c => c.charAt(0).toUpperCase() + c.slice(1));
    return ['All', ...caps];
  }, [active]);

  return (
    <div className="h-full" style={{ minWidth: 1200 }}>
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      
      {/* Common Menu Component */}
      <CommonMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={(path) => (window.location.href = path)} 
      />

      <div className="templates-container" style={{ margin: '0 auto', width: '90%', maxWidth: 1400, height: 'calc(100vh - var(--header-h, 60px))', display: 'flex', flexDirection: 'column' }}>
        <div className="p-4 flex items-center gap-4">
          <button className="rail-btn" title="Menu" aria-label="Menu" onClick={() => setIsMenuOpen(v => !v)}>☰ Menu</button>
          <SearchBar value={query} onChange={setQuery} />
          <FilterBar categories={categoriesForActive} selected={category} onChange={setCategory} />
        </div>
        <div className="ai-divider" />
        <Tabs active={active} onChange={setActive} />

        <main className="templates-main" style={{ flex: 1, minHeight: 0, padding: '20px 0' }}>
          {active === 'sections' && (
            <div className="templates-grid">
              {sectionsFiltered.map(s => (
                <TemplateCard key={s.id} title={s.name} description={s.description} tags={s.tags} preview={s.preview} onPreview={() => previewSection(s.id)} onUse={() => useCode({ html: s.html, css: s.css, js: s.js })} />
              ))}
            </div>
          )}
          {active === 'pages' && (
            <div className="templates-grid">
              {pagesFiltered.map(p => (
                <TemplateCard key={p.id} title={p.name} description={p.description} tags={p.tags} preview={p.preview} onPreview={() => setPreview({ title: p.name, html: p.html, css: p.css, js: p.js })} onUse={() => useCode({ html: p.html, css: p.css, js: p.js })} />
              ))}
            </div>
          )}
          {active === 'websites' && (
            <div className="templates-grid">
              {websitesFiltered.map(w => (
                <TemplateCard key={w.id} title={w.name} description={w.description} tags={w.tags} preview={w.preview} onPreview={() => setPreview({ title: w.name, html: w.code?.html, css: w.code?.css, js: w.code?.js })} onUse={() => useCode({ html: w.code?.html, css: w.code?.css, js: w.code?.js })} />
              ))}
            </div>
          )}
        </main>
        {!!preview && (
          <PreviewModal
            open={!!preview}
            onClose={() => setPreview(null)}
            title={preview.title}
            liveHtml={preview.html}
            liveCss={preview.css}
            liveJs={preview.js}
            defaultCodeTabIndex={preview.codeTabIndex ?? 0}
            codes={[
              { label: 'HTML', language: 'html' as const, code: preview.html },
              { label: 'CSS', language: 'css' as const, code: preview.css },
              { label: 'JS', language: 'js' as const, code: preview.js },
            ].filter(c => !!c.code)}
          />
        )}
      </div>
    </div>
  );
}


