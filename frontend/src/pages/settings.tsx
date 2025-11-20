import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CommonMenu } from '@/components/layout/CommonMenu';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'notifications'>('profile');

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
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Settings</h1>
          </div>
          
          <div className="nav-right">
            <button 
              className="save-btn"
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
              💾 Save Changes
            </button>
          </div>
        </div>

        <div className="settings-container" style={{
          display: 'grid',
          gridTemplateColumns: '250px 1fr',
          gap: '30px'
        }}>
          {/* Settings Sidebar */}
          <div className="settings-sidebar" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '500' }}>Settings</h3>
            <div className="settings-nav">
              <button 
                onClick={() => setActiveTab('profile')}
                style={{
                  ...settingsNavButtonStyle,
                  background: activeTab === 'profile' ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                }}
              >
                👤 Profile
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                style={{
                  ...settingsNavButtonStyle,
                  background: activeTab === 'preferences' ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                }}
              >
                ⚙️ Preferences
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                style={{
                  ...settingsNavButtonStyle,
                  background: activeTab === 'security' ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                }}
              >
                🔒 Security
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                style={{
                  ...settingsNavButtonStyle,
                  background: activeTab === 'notifications' ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                }}
              >
                🔔 Notifications
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="settings-content" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '30px'
          }}>
            {activeTab === 'profile' && (
              <div className="profile-settings">
                <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '500' }}>Profile Settings</h2>
                <form>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name"
                      defaultValue="John Doe"
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
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      defaultValue="john.doe@example.com"
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
                      Bio
                    </label>
                    <textarea 
                      placeholder="Tell us about yourself"
                      rows={4}
                      defaultValue="Web developer and designer passionate about creating amazing user experiences."
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
                </form>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="preferences-settings">
                <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '500' }}>Preferences</h2>
                
                <div className="preference-item" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: '500' }}>Theme</label>
                    <select 
                      value={theme}
                      onChange={(e) => {
                        const newTheme = e.target.value as 'light' | 'dark';
                        setTheme(newTheme);
                        document.documentElement.setAttribute('data-theme', newTheme);
                        try { localStorage.setItem('theme', newTheme); } catch {}
                      }}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        color: 'inherit',
                        fontSize: '14px'
                      }}
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Choose your preferred theme</p>
                </div>

                <div className="preference-item" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: '500' }}>Auto-save</label>
                    <input 
                      type="checkbox" 
                      defaultChecked
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#667eea'
                      }}
                    />
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Automatically save your work</p>
                </div>

                <div className="preference-item" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: '500' }}>Notifications</label>
                    <input 
                      type="checkbox" 
                      defaultChecked
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#667eea'
                      }}
                    />
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Receive notifications for updates</p>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="security-settings">
                <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '500' }}>Security Settings</h2>
                
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Current Password
                  </label>
                  <input 
                    type="password" 
                    placeholder="Enter current password"
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
                    New Password
                  </label>
                  <input 
                    type="password" 
                    placeholder="Enter new password"
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
                    Confirm New Password
                  </label>
                  <input 
                    type="password" 
                    placeholder="Confirm new password"
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

                <div className="security-options" style={{ marginTop: '30px' }}>
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: '500' }}>Two-Factor Authentication</h3>
                  <button style={{
                    padding: '10px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="notifications-settings">
                <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '500' }}>Notification Settings</h2>
                
                <div className="notification-item" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: '500' }}>Email Notifications</label>
                    <input 
                      type="checkbox" 
                      defaultChecked
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#667eea'
                      }}
                    />
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Receive notifications via email</p>
                </div>

                <div className="notification-item" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: '500' }}>Project Updates</label>
                    <input 
                      type="checkbox" 
                      defaultChecked
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#667eea'
                      }}
                    />
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Get notified about project changes</p>
                </div>

                <div className="notification-item" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: '500' }}>System Alerts</label>
                    <input 
                      type="checkbox" 
                      defaultChecked
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#667eea'
                      }}
                    />
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Receive system maintenance alerts</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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

const settingsNavButtonStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px 16px',
  background: 'transparent',
  border: 'none',
  borderRadius: '8px',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '14px',
  marginBottom: '8px',
  textAlign: 'left',
  transition: 'all 0.2s ease'
};
