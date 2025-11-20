import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CommonMenu } from '@/components/layout/CommonMenu';

type Project = {
  id: number;
  project_name: string;
  description: string;
  technology_stack: string;
  category: string;
  active: boolean;
  created_on: string;
  updated_on: string;
};

type Module = {
  id: number;
  project_id: number;
  module_name: string;
  description: string;
  active: boolean;
};

export default function ProjectsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'new-project' | 'history'>('projects');

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

  // Mock data for now - will be replaced with API calls
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: 1,
        project_name: 'E-commerce Website',
        description: 'A modern e-commerce platform with shopping cart and payment integration',
        technology_stack: 'React, Node.js, PostgreSQL',
        category: 'E-commerce',
        active: true,
        created_on: '2024-01-15T10:30:00Z',
        updated_on: '2024-01-20T14:45:00Z'
      },
      {
        id: 2,
        project_name: 'Portfolio Website',
        description: 'Personal portfolio showcasing creative work and skills',
        technology_stack: 'React, CSS3, HTML5',
        category: 'Portfolio',
        active: true,
        created_on: '2024-01-10T09:15:00Z',
        updated_on: '2024-01-18T16:20:00Z'
      },
      {
        id: 3,
        project_name: 'Restaurant Management System',
        description: 'Complete restaurant management with menu, orders, and inventory',
        technology_stack: 'Angular, Python, MySQL',
        category: 'Business',
        active: true,
        created_on: '2024-01-05T11:00:00Z',
        updated_on: '2024-01-15T13:30:00Z'
      }
    ];
    
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const handleNewProject = () => {
    setActiveTab('new-project');
  };

  const handleProjectHistory = () => {
    setActiveTab('history');
  };

  const handleBackToProjects = () => {
    setActiveTab('projects');
  };

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
        {/* Top Navigation Bar */}
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
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Project Management</h1>
          </div>
          
          <div className="nav-right">
            <button 
              className="new-project-btn"
              onClick={handleNewProject}
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
              ➕ New Project
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'projects' && (
            <div className="projects-grid">
              <div className="section-header" style={{ marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>Your Projects</h2>
                <p style={{ margin: '8px 0 0 0', opacity: 0.7 }}>Manage and organize your website projects</p>
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
                  <p style={{ marginTop: '16px', opacity: 0.7 }}>Loading projects...</p>
                </div>
              ) : (
                <div className="projects-list" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: '20px'
                }}>
                  {projects.map(project => (
                    <div key={project.id} className="project-card" style={{
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
                      <div className="project-header" style={{ marginBottom: '15px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{project.project_name}</h3>
                        <span className="category-badge" style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          background: 'rgba(102, 126, 234, 0.2)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          marginTop: '8px'
                        }}>
                          {project.category}
                        </span>
                      </div>
                      
                      <p style={{ margin: '0 0 15px 0', opacity: 0.8, fontSize: '14px' }}>
                        {project.description}
                      </p>
                      
                      <div className="project-tech" style={{ marginBottom: '15px' }}>
                        <span style={{ fontSize: '12px', opacity: 0.6 }}>Tech Stack:</span>
                        <div style={{ marginTop: '4px', fontSize: '13px', opacity: 0.8 }}>
                          {project.technology_stack}
                        </div>
                      </div>
                      
                      <div className="project-actions" style={{
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
                          Open
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'new-project' && (
            <div className="new-project-form">
              <div className="section-header" style={{ marginBottom: '20px' }}>
                <button onClick={handleBackToProjects} style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ← Back to Projects
                </button>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>Create New Project</h2>
              </div>
              
              <div className="form-container" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '30px',
                maxWidth: '600px'
              }}>
                <form>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Project Name *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter project name"
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'inherit',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Description
                    </label>
                    <textarea 
                      placeholder="Describe your project"
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'inherit',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Technology Stack
                    </label>
                    <select style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'inherit',
                      fontSize: '14px'
                    }}>
                      <option value="">Select technology stack</option>
                      <option value="react">React + Node.js</option>
                      <option value="angular">Angular + Python</option>
                      <option value="vue">Vue.js + PHP</option>
                      <option value="custom">Custom Stack</option>
                    </select>
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Category
                    </label>
                    <select style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'inherit',
                      fontSize: '14px'
                    }}>
                      <option value="">Select category</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="portfolio">Portfolio</option>
                      <option value="business">Business</option>
                      <option value="blog">Blog</option>
                      <option value="landing">Landing Page</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-actions" style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'flex-end'
                  }}>
                    <button 
                      type="button" 
                      onClick={handleBackToProjects}
                      style={{
                        padding: '12px 24px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'inherit',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Create Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="project-history">
              <div className="section-header" style={{ marginBottom: '20px' }}>
                <button onClick={handleBackToProjects} style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ← Back to Projects
                </button>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>Project History</h2>
              </div>
              
              <div className="history-list" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <p style={{ textAlign: 'center', opacity: 0.7, padding: '40px' }}>
                  Project history and activity logs will be displayed here.
                </p>
              </div>
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
