import React from 'react';

interface CommonMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const CommonMenu: React.FC<CommonMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: '🏠 Home', path: '/' },
    { id: 'templates', label: '🗂️ Templates', path: '/templates' },
    { id: 'projects', label: '📁 Projects', path: '/projects' },
    { id: 'new-project', label: '➕ New Project', path: '/projects' },
    { id: 'import', label: '🔗 Import from URL', path: '/projects' },
    { id: 'history', label: '🕘 Chat History', path: '/projects' },
    { id: 'wireframes', label: '🏗️ Form Builder', path: '/wireframes' },
    { id: 'reports', label: '📊 Reports', path: '/reports' },
    { id: 'dashboards', label: '📈 Dashboards', path: '/dashboards' },
    { id: 'builder', label: '🔨 Site Builder', path: '/builder' },
    { id: 'export', label: '📤 Export', path: '/projects' },
    { id: 'share', label: '🔗 Share', path: '/projects' },
    { id: 'settings', label: '⚙️ Settings', path: '/settings' },
  ];

  return (
    <aside 
      className="menu-drawer" 
      style={{
        position: 'fixed',
        top: '80px',
        left: '20px',
        background: 'rgba(42, 42, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        zIndex: 1000,
        minWidth: '200px'
      }}
    >
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            onNavigate(item.path);
            onClose();
          }}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px 15px',
            margin: '5px 0',
            background: 'transparent',
            border: 'none',
            borderRadius: '8px',
            color: 'inherit',
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
};