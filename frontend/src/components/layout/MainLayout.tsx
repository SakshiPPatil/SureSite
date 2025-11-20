import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './Header';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { chatWithAI, geminiChat } from '../../services/api';
import { heroSections } from '@/data/sections';
import { pageTemplates } from '@/data/pages';
import { websiteTemplates } from '@/data/websites';
import { CommonMenu } from './CommonMenu';

type Template = {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  preview: string;
  gradient: string;
  icon: string;
  accentColor: string;
};

export const MainLayout: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<{ html: string; css: string; js: string } | null>(null);
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [prototypes, setPrototypes] = useState<Array<{ html: string; css: string; js: string }>>([]);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [leftWidth, setLeftWidth] = useState<number>(40); // percent for AI panel including left nav rail
  const [prototypeIndex, setPrototypeIndex] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [geminiKey] = useState<string>(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  // Debug log to check if the environment variable is loaded correctly
  useEffect(() => {
    console.log('Gemini API Key from env:', process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    console.log('Gemini API Key in state:', geminiKey);
  }, [geminiKey]);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const initial = (saved === 'light' || saved === 'dark') ? (saved as 'light' | 'dark') : 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  // Handle template loading from URL or localStorage
  useEffect(() => {
    const loadTemplate = () => {
      // Check if templates page sent direct code
      try {
        const direct = localStorage.getItem('selectedCode');
        if (direct) {
          const code = JSON.parse(direct);
          // Set both generated and htmlCode states
          setGenerated({ html: code.html || '', css: code.css || '', js: code.js || '' });
          setHtmlCode(code.html || '');
          setPrototypes(prev => {
            const next = [...prev, { html: code.html || '', css: code.css || '', js: code.js || '' }];
            setPrototypeIndex(next.length);
            return next;
          });
          setActiveTab('code');
          localStorage.removeItem('selectedCode');
          return;
        }
      } catch {}
      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search);
      const templateId = urlParams.get('template');
      
      if (templateId) {
        // Try to get template from localStorage
        const storedTemplate = localStorage.getItem('selectedTemplate');
        if (storedTemplate) {
          try {
            const template = JSON.parse(storedTemplate);
            setSelectedTemplate(template);
            
            // Generate a prompt based on the template
            const templatePrompt = `Create a ${template.title.toLowerCase()} website with the following characteristics: ${template.description}. Make it modern, professional, and include all necessary sections for a ${template.category} website.`;
            setPrompt(templatePrompt);
            
            // Clear the URL parameter and localStorage
            window.history.replaceState({}, document.title, window.location.pathname);
            localStorage.removeItem('selectedTemplate');
            
            // Auto-generate the website
            setTimeout(() => {
              onGenerateWithPrompt(templatePrompt);
            }, 100);
          } catch (error) {
            console.error('Error loading template:', error);
          }
        }
      }
    };

    loadTemplate();
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('theme', newTheme); } catch {}
  };

  const greeting = 'Welcome to SureStite';

  const onGenerateWithPrompt = async (customPrompt: string) => {
    if (!customPrompt.trim()) return;
    setLoading(true);
    try {
      // 1) Local quick analysis and template suggestion
      const suggestion = (() => {
        const text = customPrompt.toLowerCase();
        type Scored = { score: number; html?: string; css?: string; js?: string; label: string };
        const scores: Scored[] = [];
        heroSections.forEach(s => {
          const base = (s.name + ' ' + s.description + ' ' + s.tags.join(' ')).toLowerCase();
          let score = 0;
          s.tags.forEach(t => { if (text.includes(t)) score += 2; });
          if (text.includes(s.category)) score += 1.5;
          if (text.includes('hero') && s.category === 'hero') score += 1;
          if (text.includes(s.name.toLowerCase())) score += 2;
          if (base.includes('saas') && text.includes('saas')) score += 2.5;
          if (score > 0) scores.push({ score, html: s.html, css: s.css, js: s.js, label: `Section: ${s.name}` });
        });
        pageTemplates.forEach(p => {
          const base = (p.name + ' ' + p.description + ' ' + p.tags.join(' ')).toLowerCase();
          let score = 0;
          p.tags.forEach(t => { if (text.includes(t)) score += 2; });
          if (text.includes(p.category)) score += 1.5;
          if (text.includes(p.name.toLowerCase())) score += 2;
          if (base.includes('restaurant') && text.includes('restaurant')) score += 2.5;
          if (base.includes('app') && text.includes('app')) score += 2.0;
          if (base.includes('blog') && text.includes('blog')) score += 3.0;
          if (base.includes('portfolio') && (text.includes('portfolio') || text.includes('resume'))) score += 3.0;
          if (score > 0) scores.push({ score, html: p.html, css: p.css, js: p.js, label: `Page: ${p.name}` });
        });
        websiteTemplates.forEach(w => {
          const base = (w.name + ' ' + w.description + ' ' + w.tags.join(' ')).toLowerCase();
          let score = 0;
          w.tags.forEach(t => { if (text.includes(t)) score += 2; });
          if (text.includes(w.category)) score += 1.5;
          if (text.includes(w.name.toLowerCase())) score += 2;
          if (base.includes('agency') && text.includes('agency')) score += 2.5;
          if (base.includes('e-learning') && (text.includes('elearn') || text.includes('course'))) score += 2.5;
          if (score > 0) scores.push({ score, html: w.code?.html, css: w.code?.css, js: w.code?.js, label: `Website: ${w.name}` });
        });
        scores.sort((a,b) => b.score - a.score);
        // If user mentions portfolio or resume explicitly and we have a portfolio page, boost it
        const top = scores[0];
        return top;
      })();

      if (suggestion) {
        setGenerated({ html: suggestion.html || '', css: suggestion.css || '', js: suggestion.js || '' });
        setPrototypes(prev => {
          const next = [...prev, { html: suggestion.html || '', css: suggestion.css || '', js: suggestion.js || '' }];
          setPrototypeIndex(next.length);
          return next;
        });
        setActiveTab('preview');
        setChatHistory(h => [...h, { role: 'assistant', content: `Here’s a quick starting point based on your prompt → ${suggestion.label}. I opened a live preview on the right. Tell me if you want a different style or industry.` }]);
      }
      // Record user message first
      setChatHistory(h => [...h, { role: 'user', content: customPrompt }]);
      
      // 2) Gemini website generation (if key set), fallback to backend chat otherwise
      let geminiResponse: any = null;
      if (geminiKey) {
        try {
          const g = await geminiChat(customPrompt, chatHistory, geminiKey);
          geminiResponse = g;
        } catch (e: any) {
          console.error('Gemini error:', e);
          // Add detailed error message
          const errorMessage = e.message || 'Gemini API error. Falling back to default AI assistant.';
          setChatHistory(h => [...h, { role: 'assistant', content: errorMessage }]);
        }
      }

      // Handle Gemini HTML generation
      if (geminiResponse?.html) {
        setHtmlCode(geminiResponse.html);
        setActiveTab('code');
        setChatHistory(h => [...h, { 
          role: 'assistant', 
          content: geminiResponse.text || 'Complete HTML website generated! You can now edit the code and see live preview.' 
        }]);
      } else if (geminiResponse?.text) {
        // Regular text response from Gemini
        setChatHistory(h => [...h, { role: 'assistant', content: geminiResponse.text }]);
      } else {
        // Fallback to backend chat
        const res = await chatWithAI(customPrompt, chatHistory);
        
        if (res.status === 'planning') {
          const msg = res.message || 'Please provide more details.';
          setChatHistory(h => [...h, { role: 'assistant', content: msg }]);
        } else if (res.status === 'website_generated' && res.code) {
          const code = { html: res.code.html || '', css: res.code.css || '', js: res.code.js || '' };
          setGenerated(code);
          setPrototypes(prev => {
            const next = [...prev, code];
            setPrototypeIndex(next.length);
            return next;
          });
          setChatHistory(h => [...h, { role: 'assistant', content: 'Website generated. Preview updated.' }]);
        } else if (res.status === 'error') {
          setChatHistory(h => [...h, { role: 'assistant', content: res.message || 'Generation failed.' }]);
        }
      }
    } catch (e: any) {
      setChatHistory(h => [...h, { role: 'assistant', content: `Error: ${e?.message || e}` }]);
    } finally {
      setLoading(false);
    }
  };

  const onGenerate = async () => {
    if (!prompt.trim()) return;
    await onGenerateWithPrompt(prompt);
  };

  useEffect(() => {
    if (prototypes.length === 0) return;
    const idx = Math.min(Math.max(1, prototypeIndex), prototypes.length) - 1;
    setGenerated(prototypes[idx]);
  }, [prototypeIndex, prototypes]);

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startLeft = leftWidth;
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const container = document.querySelector('.main-content') as HTMLElement;
      if (!container) return;
      const containerWidth = container.getBoundingClientRect().width;
      const deltaPct = (dx / containerWidth) * 100;
      const next = Math.min(70, Math.max(20, startLeft + deltaPct));
      setLeftWidth(next);
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // Determine if we should show the split layout or full-width AI section
  const hasGeneratedContent = generated !== null || htmlCode !== '';
  const aiSectionWidth = hasGeneratedContent ? `${leftWidth}%` : '100%';

  // Add this test component to verify Tailwind CSS is working
  const TailwindTestComponent = () => (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
        <p className="font-bold">Tailwind CSS is working!</p>
        <p className="text-sm">This is a test component</p>
      </div>
    </div>
  );

  return (
    <div className="h-full" style={{ minWidth: 1200 }}>
      <Header theme={theme} onThemeToggle={handleThemeToggle} onMenuToggle={() => setIsMenuOpen(v => !v)} />
      
      {/* Common Menu Component */}
      <CommonMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={(path) => (window.location.href = path)} 
      />

      {/* Main content area with inline columns */}
      <div className="main-content" style={{ margin: '0 auto', width: '90%', maxWidth: 1400, display: 'flex', alignItems: 'stretch', height: 'calc(100vh - var(--header-h, 60px))', position: 'relative' }}>
        {/* Collapsible Menu Drawer */}
        {isMenuOpen && (
          <aside className="quick-actions inline-qa menu-popover" aria-label="Menu">
            <button className="templates-btn" onClick={() => (window.location.href = '/templates')}>🗂️ Templates</button>
            <button onClick={() => (window.location.href = '/projects')}>📁 Projects</button>
            <button onClick={onGenerate}>➕ New Project</button>
            <button>🔗 Import from URL</button>
            <button>🕘 Chat History</button>
            <button onClick={() => (window.location.href = '/wireframes')}>🏗️ Form Builder</button>
            <button onClick={() => (window.location.href = '/reports')}>📊 Reports</button>
            <button onClick={() => (window.location.href = '/dashboards')}>📈 Dashboards</button>
            <button>🔨 Site Builder</button>
            <button>📤 Export</button>
            <button>🔗 Share</button>
            <button onClick={() => (window.location.href = '/settings')}>⚙️ Settings</button>
          </aside>
        )}

        {/* AI Chat - restructured layout */}
        <section className={`content-section ai-section section-card ${!hasGeneratedContent ? 'full-width' : ''}`} style={{ height: '100%', width: aiSectionWidth, display: 'flex', flexDirection: 'column', minHeight: 0, transition: 'width 0.3s ease' }}>
          {/* Top horizontal bar */}
          <div className="ai-topbar">
            <button className="rail-btn" title="Menu" aria-label="Menu" onClick={() => setIsMenuOpen(v => !v)}>☰ Menu</button>
            <div style={{ flex: 1 }} />
            <button className="chat-history-btn" title="Chat History" aria-label="Chat History">🕘 Chat History</button>
          </div>
          <div className="ai-divider" />

          {/* Main content area below the bar */}
          <div className="ai-main" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>🤖 AI Assistant</h3>
            <AIAssistant
              messages={chatHistory as any}
              value={prompt}
              setValue={setPrompt}
              loading={loading}
              onSend={(text) => { setPrompt(text); onGenerateWithPrompt(text); }}
            />
          </div>
        </section>

        {/* Resizer - only show when there's generated content */}
        {hasGeneratedContent && (
          <div className="resizer" onMouseDown={startDrag} />
        )}

        {/* Preview/Code Tabbed Section - only show when there's generated content */}
        {hasGeneratedContent && (
          <section className={`content-section preview-code-section section-card ${isFullscreen ? 'fullscreen' : ''}`} style={{ height: '100%', width: `${100 - leftWidth}%`, display: 'flex', flexDirection: 'column', minHeight: 0, transition: 'width 0.3s ease' }}>
            <div className="toggle-buttons">
              <button className={`toggle-btn ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => setActiveTab('preview')} data-tab="preview">👀 Preview</button>
              <button className={`toggle-btn ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')} data-tab="code">💻 Code</button>
              <div className="proto-controls-wrap">
                <div className="proto-label">Prototype</div>
                <div className="proto-controls">
                  <button className="proto-btn" onClick={() => setPrototypeIndex(i => Math.max(1, i - 1))} disabled={prototypeIndex <= 1}>◀</button>
                  <div className="proto-current">{`Prototype ${prototypeIndex}${prototypes.length ? ` / ${prototypes.length}` : ''}`}</div>
                  <button className="proto-btn" onClick={() => setPrototypeIndex(i => (prototypes.length ? Math.min(prototypes.length, i + 1) : i))} disabled={prototypes.length === 0 || prototypeIndex >= prototypes.length}>▶</button>
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <button className="toggle-btn" onClick={() => setIsFullscreen(v => !v)}>{isFullscreen ? '⤢ Exit Fullscreen' : '⤢ Fullscreen'}</button>
            </div>
                         <div className="content-area" style={{ flex: 1, minHeight: 0 }}>
               <div className="preview-content" style={{ display: activeTab === 'preview' ? 'block' : 'none', height: '100%' }}>
                 {(htmlCode || generated) ? (
                   <iframe
                     title="Live Preview"
                     className="preview-frame"
                     srcDoc={`
                       <!DOCTYPE html>
                       <html lang="en">
                       <head>
                         <meta charset="UTF-8">
                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
                         <title>Live Preview</title>
                         <script src="https://cdn.tailwindcss.com"></script>
                         <style>${generated?.css || ''}</style>
                       </head>
                       <body>
                         ${htmlCode || generated?.html || ''}
                         <script>${generated?.js || ''}</script>
                       </body>
                       </html>
                     `}
                   />
                 ) : (
                   <div style={{ color: 'rgba(255,255,255,0.7)' }}>Your live preview will appear here</div>
                 )}
               </div>
               <div className="code-content" style={{ display: activeTab === 'code' ? 'block' : 'none', height: '100%' }}>
                 {htmlCode ? (
                   <div className="code-editor" style={{ position: 'relative', height: '100%' }}>
                     <div className="code-search">
                       <input className="search-input" placeholder="Search code..." onChange={() => {}} />
                     </div>
                     <textarea
                       className="code-textarea"
                       value={htmlCode}
                       onChange={(e) => setHtmlCode(e.target.value)}
                       style={{
                         width: '100%',
                         height: 'calc(100% - 50px)',
                         background: '#1e1e1e',
                         color: '#d4d4d4',
                         border: 'none',
                         outline: 'none',
                         fontFamily: 'monospace',
                         fontSize: '14px',
                         lineHeight: '1.5',
                         padding: '20px',
                         resize: 'none'
                       }}
                       placeholder="HTML code will appear here..."
                     />
                   </div>
                 ) : (
                   <div style={{ color: 'rgba(255,255,255,0.7)' }}>Generated code will appear here</div>
                 )}
               </div>
             </div>
          </section>
        )}
      </div>

      {/* Add the test component */}
      <TailwindTestComponent />
    </div>
  );
};
