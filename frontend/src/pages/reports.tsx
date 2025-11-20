import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CommonMenu } from '@/components/layout/CommonMenu';

type Report = {
  id: number;
  report_name: string;
  description: string;
  report_type: string;
  query: string;
  active: boolean;
  created_on: string;
};

export default function ReportsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: 1,
        report_name: 'Sales Analytics Report',
        description: 'Comprehensive sales data analysis with charts and metrics',
        report_type: 'analytics',
        query: 'SELECT * FROM sales_data WHERE date >= CURRENT_DATE - INTERVAL 30 DAY',
        active: true,
        created_on: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        report_name: 'User Activity Report',
        description: 'Track user engagement and activity patterns',
        report_type: 'user_activity',
        query: 'SELECT user_id, action, timestamp FROM user_actions ORDER BY timestamp DESC',
        active: true,
        created_on: '2024-01-10T09:15:00Z'
      },
      {
        id: 3,
        report_name: 'Inventory Status Report',
        description: 'Current inventory levels and stock status',
        report_type: 'inventory',
        query: 'SELECT product_name, quantity, reorder_level FROM inventory WHERE quantity <= reorder_level',
        active: true,
        created_on: '2024-01-05T11:00:00Z'
      }
    ];
    
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="h-full" data-theme={theme}>
      <Header theme={theme} onThemeToggle={handleThemeToggle} onMenuToggle={() => setIsMenuOpen(v => !v)} />
      
      {/* Common Menu Component */}
      <CommonMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={(path) => (window.location.href = path)} 
      />
      
      <div className="main-content" style={{ margin: '0 auto', width: '90%', maxWidth: 1400, padding: '20px 0' }}>
        <div className="top-nav-bar" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px',
          padding: '15px 20px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="nav-left">
            <button 
              className="menu-btn" 
              onClick={() => setIsMenuOpen(v => !v)}
              style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ☰ Menu
            </button>
          </div>
          
          <div className="nav-center">
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Report Builder</h1>
          </div>
          
          <div className="nav-right">
            <button 
              className="new-report-btn"
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              ➕ New Report
            </button>
          </div>
        </div>

        <div className="content-area">
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>Your Reports</h2>
            <p style={{ margin: '8px 0 0 0', opacity: 0.7 }}>Create and manage data reports and analytics</p>
          </div>
          
          {loading ? (
            <div className="loading" style={{ textAlign: 'center', padding: '40px' }}>
              <div className="spinner" style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTop: '3px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}></div>
              <p style={{ marginTop: '16px', opacity: 0.7 }}>Loading reports...</p>
            </div>
          ) : (
            <div className="reports-list" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {reports.map(report => (
                <div key={report.id} className="report-card" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div className="report-header" style={{ marginBottom: '15px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{report.report_name}</h3>
                    <span className="report-type-badge" style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      background: 'rgba(102, 126, 234, 0.2)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      marginTop: '8px'
                    }}>
                      {report.report_type}
                    </span>
                  </div>
                  
                  <p style={{ margin: '0 0 15px 0', opacity: 0.8, fontSize: '14px' }}>
                    {report.description}
                  </p>
                  
                  <div className="report-query" style={{ 
                    marginBottom: '15px',
                    padding: '10px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    opacity: 0.7,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {report.query}
                  </div>
                  
                  <div className="report-actions" style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'flex-end'
                  }}>
                    <button style={{
                      padding: '6px 12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '6px',
                      color: 'inherit',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}>
                      Edit
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}>
                      Run
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const menuButtonStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '10px 15px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '14px',
  marginBottom: '8px',
  textAlign: 'left',
  transition: 'all 0.2s ease'
};
