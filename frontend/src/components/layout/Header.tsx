import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle, onMenuToggle }) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--header-h', '60px');
  }, []);

  return (
    <motion.header
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ margin: '0 auto', width: '90%', maxWidth: 1400 }} className="w-full flex items-center justify-between">
        {/* Left: brand text only */}
        <div className="flex items-center gap-3">
          <a href="#" className="logo-section">
            <span>SureStite</span>
          </a>
        </div>

        {/* Center title */}
        <div className="center-title">SureStite - The AI Website Builder</div>

        {/* Right actions: Login → Theme → Notifications → Menu */}
        <div className="flex items-center">
          <button className="header-button" title="Login">👤</button>
          <button aria-label="Toggle theme" onClick={onThemeToggle} className="header-button theme-toggle" title="Toggle theme">
            <span className="toggle-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>
          <button aria-label="Notifications" className="header-button" title="Notifications">🔔</button>
          <button aria-label="Menu" className="header-button" title="Menu">☰</button>
        </div>
      </div>
    </motion.header>
  );
};
