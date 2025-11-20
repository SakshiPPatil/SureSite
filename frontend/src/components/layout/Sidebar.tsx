import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Plus, Globe, Clock, Hammer, Upload, Link2, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewProject: () => void;
}

const QAItem: React.FC<{ icon: React.ElementType; label: string; onClick?: () => void }> = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="h-9 w-full rounded-xl px-3 text-sm flex items-center gap-2 justify-start border border-white/10 hover:bg-white/5">
    <Icon size={16} className="shrink-0" /> <span>{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ onTabChange, onNewProject }) => {
  return (
    <motion.aside
      className="sticky top-[var(--header-h,64px)] w-64 shrink-0 h-[calc(100dvh-var(--header-h,64px))] overflow-y-auto pb-6 bg-[var(--bg-secondary)]"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="px-3">
        {/* Logo */}
        <div className="flex flex-col items-center py-4">
          <div className="h-10 w-10 rounded-2xl bg-[var(--accent)] inline-grid place-items-center font-bold">S</div>
          <div className="mt-2 text-xl font-bold">SureSite</div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-text-secondary px-1">Quick Actions</div>
          <QAItem icon={Folder} label="Templates" onClick={() => onTabChange('templates')} />
          <QAItem icon={Plus} label="New Project" onClick={onNewProject} />
          <QAItem icon={Globe} label="Import from URL" />
          <QAItem icon={Clock} label="History" onClick={() => onTabChange('history')} />
          <QAItem icon={Hammer} label="Site Builder" onClick={() => onTabChange('builder')} />
          <QAItem icon={Upload} label="Export" />
          <QAItem icon={Link2} label="Share" />
          <QAItem icon={Settings} label="Settings" />
        </div>
      </div>
    </motion.aside>
  );
};
