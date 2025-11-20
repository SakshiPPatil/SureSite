import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { AIBuilder } from '@/components/builder/AIBuilder';
import { CommonMenu } from '@/components/layout/CommonMenu';

export default function BuilderPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className="h-full" style={{ minWidth: 1200 }}>
      <Header theme={theme} onThemeToggle={handleThemeToggle} onMenuToggle={() => setIsMenuOpen(v => !v)} />
      
      {/* Common Menu Component */}
      <CommonMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={(path) => (window.location.href = path)} 
      />
      
      <div className="main-content" style={{ margin: '0 auto', width: '90%', maxWidth: 1400, height: 'calc(100vh - var(--header-h, 60px))', display: 'flex', flexDirection: 'column' }}>
        {/* Menu Drawer */}
        {isMenuOpen && (
          <aside className="quick-actions inline-qa menu-popover" aria-label="Menu">
            <button onClick={() => (window.location.href = '/')}>🏠 Home</button>
            <button onClick={() => (window.location.href = '/templates')}>🗂️ Templates</button>
            <button onClick={() => (window.location.href = '/projects')}>📁 Projects</button>
            <button>➕ New Project</button>
            <button>🔗 Import from URL</button>
            <button>🕘 Chat History</button>
            <button onClick={() => (window.location.href = '/wireframes')}>🏗️ Form Builder</button>
            <button onClick={() => (window.location.href = '/reports')}>📊 Reports</button>
            <button onClick={() => (window.location.href = '/dashboards')}>📈 Dashboards</button>
            <button className="templates-btn">🔨 Site Builder</button>
            <button>📤 Export</button>
            <button>🔗 Share</button>
            <button onClick={() => (window.location.href = '/settings')}>⚙️ Settings</button>
          </aside>
        )}

        {/* Main content area */}
        <div className="flex-1 overflow-hidden">
          <AIBuilder onProjectSave={() => {}} />
        </div>
      </div>
    </div>
  );
}
