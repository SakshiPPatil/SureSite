import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Wand2, 
  Monitor, 
  Smartphone, 
  Tablet,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  Copy,
  Check,
  Plus,
  Link,
  GitBranch
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { generateSite, updatePage, forkSite, getSite } from '../../services/api';

interface AIBuilderProps {
  onProjectSave: (project: any) => void;
}

const examplePrompts = [
  "Modern SaaS landing page with hero section, features, and pricing",
  "Elegant portfolio for a freelance designer with case studies",
  "Restaurant website with menu, reservations, and location",
  "E-commerce store for handmade jewelry with product gallery",
  "Tech startup homepage with product demo and team section",
  "Personal blog with clean typography and dark theme"
];

const templates = [
  { name: 'SaaS Landing', category: 'Business', features: ['Hero', 'Logos', 'Features', 'Pricing', 'CTA'] },
  { name: 'Portfolio', category: 'Personal', features: ['Intro', 'Case Studies', 'Testimonials', 'Contact'] },
  { name: 'Restaurant', category: 'Food', features: ['Hero', 'Menu', 'Gallery', 'Reservations', 'Map'] },
  { name: 'E-commerce', category: 'Business', features: ['Hero', 'Product Grid', 'Filters', 'Cart', 'FAQ'] },
  { name: 'Blog', category: 'Content', features: ['Hero', 'Posts Grid', 'Categories', 'Newsletter'] },
  { name: 'Agency', category: 'Business', features: ['Hero', 'Services', 'Work', 'Team', 'Contact'] },
  { name: 'Developer', category: 'Personal', features: ['Hero', 'Projects', 'Open Source', 'Blog', 'Contact'] },
  { name: 'Consulting', category: 'Business', features: ['Offerings', 'Case Studies', 'Process', 'CTA'] },
];

export const AIBuilder: React.FC<AIBuilderProps> = ({ onProjectSave }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prototype, setPrototype] = useState<any | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview'|'code'|'editor'>('preview');
  const previewRef = useRef<HTMLIFrameElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const grapesRef = useRef<any>(null);

  useEffect(() => {
    if (activeTab === 'editor' && editorRef.current && currentPage) {
      (async () => {
        const gjsMod = await import('grapesjs');
        const gjs = gjsMod.default || (gjsMod as any);
        if (grapesRef.current) {
          // Update content if already initialized
          grapesRef.current.setComponents(currentPage.html || '');
          grapesRef.current.setStyle(currentPage.css || '');
          return;
        }
        grapesRef.current = gjs.init({
          container: editorRef.current as unknown as string,
          fromElement: false,
          height: '100%',
          storageManager: { type: null },
        });
        grapesRef.current.setComponents(currentPage.html || '');
        grapesRef.current.setStyle(currentPage.css || '');
      })();
    }
  }, [activeTab, currentPageId]);

  const viewportSizes = {
    desktop: { width: 1200, height: 800 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 },
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const proto = await generateSite(prompt);
      setPrototype(proto);
      const firstPage = proto.pages?.[0];
      setCurrentPageId(firstPage?.id || null);
      onProjectSave({ id: proto.id, name: proto.label || `Prototype ${proto.version}`, prompt, createdAt: new Date().toISOString() });
      
      // Show pagebuilder button after successful generation
      setShowPageBuilderButton(true);
    } catch (err: any) {
      setError(err.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (templateName: string) => {
    setPrompt(`${templateName} website with modern design, responsive layout, and smooth animations`);
  };

  const handleExampleSelect = (example: string) => {
    setPrompt(example);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const currentPage = prototype?.pages?.find((p: any) => p.id === currentPageId);

  const srcDoc = currentPage ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>${currentPage.css || ''}</style>
    </head>
    <body>${currentPage.html || ''}
      <script>${currentPage.js || ''}</script>
    </body>
    </html>
  ` : '';

  // Add new state for pagebuilder integration
  const [showPageBuilderButton, setShowPageBuilderButton] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Export to pagebuilder function
  const exportToPageBuilder = async () => {
    if (!currentPage) return;
    
    try {
      setIsExporting(true);
      const response = await fetch('http://localhost:8002/api/export-to-pagebuilder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: currentPage.name || 'Exported Page',
          path: currentPage.path || '/',
          html: currentPage.html,
          css: currentPage.css || '',
          js: currentPage.js || ''
        }),
      });
      
      if (response.ok) {
        // Open pagebuilder in new tab (now running on port 5173)
        window.open('http://localhost:5173', '_blank');
      } else {
        throw new Error('Failed to export');
      }
    } catch (error) {
      console.error('Export error:', error);
      setError('Failed to export to pagebuilder.');
    } finally {
      setIsExporting(false);
    }
  };

  // Add function to open Gemini-generated website in new tab
  const openGeminiWebsite = () => {
    if (!currentPage) return;
    
    // Create a complete HTML document
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${currentPage.name || 'Generated Website'}</title>
        <style>${currentPage.css || ''}</style>
      </head>
      <body>
        ${currentPage.html || ''}
        <script>${currentPage.js || ''}</script>
      </body>
      </html>
    `;
    
    // Open in new tab
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      setError('Failed to open website in new tab. Please check your popup blocker.');
    }
  };

  // Add function to open editable website in new tab
  const openEditableWebsite = async () => {
    if (!currentPage) return;
    
    try {
      // Create a complete HTML document with inline editor
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${currentPage.name || 'Editable Website'}</title>
          <style>
            ${currentPage.css || ''}
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            .editor-toolbar {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              background: #333;
              color: white;
              padding: 10px;
              display: flex;
              gap: 10px;
              z-index: 1000;
            }
            .editor-toolbar button {
              background: #555;
              color: white;
              border: none;
              padding: 5px 10px;
              cursor: pointer;
              border-radius: 3px;
            }
            .editor-toolbar button:hover {
              background: #777;
            }
            .content-wrapper {
              margin-top: 50px;
            }
            [contenteditable] {
              outline: 2px dashed #ccc;
              padding: 10px;
              min-height: 50px;
            }
            [contenteditable]:focus {
              outline: 2px solid #007bff;
            }
          </style>
        </head>
        <body>
          <div class="editor-toolbar">
            <button onclick="saveChanges()">Save Changes</button>
            <button onclick="exportToPageBuilder()">Export to PageBuilder</button>
            <span id="status">Ready</span>
          </div>
          <div class="content-wrapper">
            ${currentPage.html || '<div>Welcome to your editable website</div>'}
          </div>
          <script>
            // Make all elements with text content editable
            document.querySelectorAll('*').forEach(el => {
              if (el.children.length === 0 && el.textContent.trim() !== '') {
                el.contentEditable = true;
              }
            });
            
            // Save changes function
            window.saveChanges = async function() {
              const status = document.getElementById('status');
              status.textContent = 'Saving...';
              
              try {
                // Get updated content
                const updatedHtml = document.querySelector('.content-wrapper').innerHTML;
                
                // Send to backend to save
                const response = await fetch('http://localhost:8002/api/save-website', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    pageId: '${currentPage.id}',
                    html: updatedHtml,
                    css: \`${currentPage.css || ''}\`,
                    js: \`${currentPage.js || ''}\`
                  }),
                });
                
                if (response.ok) {
                  status.textContent = 'Saved successfully!';
                  setTimeout(() => {
                    status.textContent = 'Ready';
                  }, 2000);
                } else {
                  throw new Error('Failed to save');
                }
              } catch (error) {
                console.error('Save error:', error);
                status.textContent = 'Save failed!';
              }
            };
            
            // Export to PageBuilder function
            window.exportToPageBuilder = async function() {
              const status = document.getElementById('status');
              status.textContent = 'Exporting...';
              
              try {
                // Get current content
                const updatedHtml = document.querySelector('.content-wrapper').innerHTML;
                
                // Send to backend to export to pagebuilder
                const response = await fetch('http://localhost:8002/api/export-to-pagebuilder', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    title: '${currentPage.name || 'Exported Page'}',
                    path: '${currentPage.path || '/'}',
                    html: updatedHtml,
                    css: \`${currentPage.css || ''}\`,
                    js: \`${currentPage.js || ''}\`
                  }),
                });
                
                if (response.ok) {
                  status.textContent = 'Exported successfully!';
                  // Open pagebuilder in new tab
                  window.open('http://localhost:3001', '_blank');
                  setTimeout(() => {
                    status.textContent = 'Ready';
                  }, 2000);
                } else {
                  throw new Error('Failed to export');
                }
              } catch (error) {
                console.error('Export error:', error);
                status.textContent = 'Export failed!';
              }
            };
            
            ${currentPage.js || ''}
          </script>
        </body>
        </html>
      `;
      
      // Open in new tab
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
      } else {
        setError('Failed to open website in new tab. Please check your popup blocker.');
      }
    } catch (err) {
      console.error('Error opening editable website:', err);
      setError('Failed to open editable website.');
    }
  };

  // Add function to open advanced editable website in new tab
  const openAdvancedEditableWebsite = async () => {
    if (!currentPage) return;
    
    try {
      // Create a complete HTML document with advanced inline editor
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${currentPage.name || 'Editable Website'}</title>
          <style>
            ${currentPage.css || ''}
            body { 
              margin: 0; 
              padding: 0; 
              font-family: Arial, sans-serif; 
              position: relative;
            }
            .editor-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              height: 50px;
              background: rgba(0, 0, 0, 0.8);
              color: white;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 20px;
              z-index: 10000;
              box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            }
            .editor-toolbar {
              display: flex;
              gap: 10px;
            }
            .editor-toolbar button {
              background: #4a4a4a;
              color: white;
              border: none;
              padding: 8px 15px;
              cursor: pointer;
              border-radius: 4px;
              font-size: 14px;
              transition: background 0.2s;
            }
            .editor-toolbar button:hover {
              background: #6a6a6a;
            }
            .editor-toolbar button.primary {
              background: #007bff;
            }
            .editor-toolbar button.primary:hover {
              background: #0056b3;
            }
            .editor-toolbar button.success {
              background: #28a745;
            }
            .editor-toolbar button.success:hover {
              background: #1e7e34;
            }
            .status-message {
              padding: 0 15px;
              font-size: 14px;
            }
            .editable-element {
              position: relative;
              outline: 2px dashed transparent;
              transition: outline 0.2s;
            }
            .editable-element:hover {
              outline: 2px dashed #007bff;
              cursor: pointer;
            }
            .editable-element.selected {
              outline: 2px solid #28a745 !important;
              background-color: rgba(40, 167, 69, 0.1);
            }
            .element-editor {
              position: fixed;
              top: 70px;
              right: 20px;
              width: 350px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 5px 15px rgba(0,0,0,0.3);
              z-index: 9999;
              padding: 20px;
              max-height: calc(100vh - 100px);
              overflow-y: auto;
            }
            .element-editor h3 {
              margin-top: 0;
              color: #333;
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
            }
            .element-editor textarea {
              width: 100%;
              min-height: 100px;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-family: monospace;
              font-size: 13px;
              resize: vertical;
            }
            .element-editor .form-group {
              margin-bottom: 15px;
            }
            .element-editor label {
              display: block;
              margin-bottom: 5px;
              font-weight: bold;
              color: #555;
            }
            .element-editor button {
              padding: 8px 15px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              margin-right: 10px;
            }
            .element-editor .btn-save {
              background: #28a745;
              color: white;
            }
            .element-editor .btn-cancel {
              background: #6c757d;
              color: white;
            }
            .content-wrapper {
              padding-top: 50px;
            }
          </style>
        </head>
        <body>
          <div class="editor-overlay">
            <div class="editor-title">Website Editor - ${currentPage.name || 'Untitled'}</div>
            <div class="editor-toolbar">
              <button class="primary" onclick="saveAllChanges()">Save All Changes</button>
              <button class="success" onclick="exportToPageBuilder()">Export to PageBuilder</button>
            </div>
            <div class="status-message" id="status">Ready</div>
          </div>
          
          <div class="content-wrapper">
            ${currentPage.html || '<div>Welcome to your editable website</div>'}
          </div>
          
          <div class="element-editor" id="elementEditor" style="display: none;">
            <h3>Edit Element</h3>
            <div class="form-group">
              <label>Content:</label>
              <textarea id="elementContent"></textarea>
            </div>
            <div class="form-group">
              <label>Element Type:</label>
              <input type="text" id="elementType" readonly style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button class="btn-save" onclick="saveElementChanges()">Save Changes</button>
            <button class="btn-cancel" onclick="closeElementEditor()">Cancel</button>
          </div>
          
          <script>
            let selectedElement = null;
            let originalContent = '';
          
            // Make all text elements editable
            document.addEventListener('DOMContentLoaded', function() {
              const elements = document.querySelectorAll('*');
              elements.forEach(el => {
                // Only make elements with text content editable
                if (el.children.length === 0 && el.textContent.trim() !== '' && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
                  el.classList.add('editable-element');
                
                  el.addEventListener('click', function(e) {
                    e.stopPropagation();
                    selectElement(this);
                  });
                }
            });
            
            // Close editor when clicking elsewhere
            document.addEventListener('click', function(e) {
              if (!e.target.closest('.element-editor') && !e.target.classList.contains('editable-element')) {
                closeElementEditor();
              }
            });
          });
          
          // Select an element for editing
          function selectElement(element) {
            // Remove selection from previously selected element
            if (selectedElement) {
              selectedElement.classList.remove('selected');
            }
            
            // Select new element
            selectedElement = element;
            element.classList.add('selected');
            originalContent = element.innerHTML;
            
            // Show editor panel
            document.getElementById('elementEditor').style.display = 'block';
            document.getElementById('elementContent').value = element.innerHTML;
            document.getElementById('elementType').value = element.tagName;
          }
          
          // Close element editor
          function closeElementEditor() {
            if (selectedElement) {
              selectedElement.classList.remove('selected');
              selectedElement = null;
            }
            document.getElementById('elementEditor').style.display = 'none';
          }
          
          // Save element changes
          function saveElementChanges() {
            if (selectedElement) {
              const newContent = document.getElementById('elementContent').value;
              selectedElement.innerHTML = newContent;
              closeElementEditor();
              updateStatus('Element updated', 'success');
            }
          }
          
          // Save all changes function
          window.saveAllChanges = async function() {
            const status = document.getElementById('status');
            status.textContent = 'Saving...';
            
            try {
              // Get updated content
              const updatedHtml = document.querySelector('.content-wrapper').innerHTML;
              
              // Send to backend to save
              const response = await fetch('http://localhost:8002/api/save-website', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  pageId: '${currentPage.id}',
                  html: updatedHtml,
                  css: \`${currentPage.css || ''}\`,
                  js: \`${currentPage.js || ''}\`
                }),
              });
              
              if (response.ok) {
                status.textContent = 'All changes saved successfully!';
                setTimeout(() => {
                  status.textContent = 'Ready';
                }, 2000);
              } else {
                throw new Error('Failed to save');
              }
            } catch (error) {
              console.error('Save error:', error);
              status.textContent = 'Save failed!';
              setTimeout(() => {
                status.textContent = 'Ready';
              }, 2000);
            }
          };
          
          // Export to PageBuilder function
          window.exportToPageBuilder = async function() {
            const status = document.getElementById('status');
            status.textContent = 'Exporting...';
            
            try {
              // Get current content
              const updatedHtml = document.querySelector('.content-wrapper').innerHTML;
              
              // Send to backend to export to pagebuilder
              const response = await fetch('http://localhost:8002/api/export-to-pagebuilder', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: '${currentPage.name || 'Exported Page'}',
                  path: '${currentPage.path || '/'}',
                  html: updatedHtml,
                  css: \`${currentPage.css || ''}\`,
                  js: \`${currentPage.js || ''}\`
                }),
              });
              
              if (response.ok) {
                status.textContent = 'Exported successfully!';
                // Open pagebuilder in new tab (now running on port 5173)
                window.open('http://localhost:5173', '_blank');
                setTimeout(() => {
                  status.textContent = 'Ready';
                }, 2000);
              } else {
                throw new Error('Failed to export');
              }
            } catch (error) {
              console.error('Export error:', error);
              status.textContent = 'Export failed!';
              setTimeout(() => {
                status.textContent = 'Ready';
              }, 2000);
            }
          };
          
          // Update status message
          function updateStatus(message, type = 'info') {
            const status = document.getElementById('status');
            status.textContent = message;
            status.style.color = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#ffffff';
            
            if (type !== 'info') {
              setTimeout(() => {
                status.textContent = 'Ready';
                status.style.color = '#ffffff';
              }, 2000);
            }
          }
          
          ${currentPage.js || ''}
        </script>
      </body>
      </html>
    `;
    
    // Open in new tab
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      setError('Failed to open website in new tab. Please check your popup blocker.');
    }
  } catch (err) {
    console.error('Error opening editable website:', err);
    setError('Failed to open editable website.');
  }
};

  return (
    <div className="builder-layout h-full ai-builder">
      {/* Left Panel - Project Tree / Controls (300px) */}
      <div style={{ gridArea: 'tree' }} className="w-[300px] h-full bg-[var(--color-gray-50)] border-r border-border overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Quick actions vertical */}
          <Card className="space-y-2">
            <Button variant="sidebar" className="w-full" icon={<Plus className="w-4 h-4" />}>New Project</Button>
            <Button variant="secondary" className="w-full" icon={<Link className="w-4 h-4" />}>Import from URL</Button>
            {prototype && (
              <Button variant="secondary" className="w-full" icon={<GitBranch className="w-4 h-4" />} onClick={async () => {
                const forked = await forkSite(prototype.id);
                setPrototype(forked);
                setCurrentPageId(forked.pages?.[0]?.id || null);
              }}>Fork to new prototype</Button>
            )}
          </Card>

          {/* Project Tree */}
          <Card className="space-y-2">
            <h3 className="text-base font-semibold">Project Tree</h3>
            {!prototype ? (
              <div className="text-sm text-[var(--color-gray-700)]">Add pages and structure here</div>
            ) : (
              <div className="space-y-1 text-sm">
                <div className="px-2 py-1 text-xs text-[var(--color-gray-700)]">{`Prototype v${prototype.version}`} {prototype.label ? `- ${prototype.label}` : ''}</div>
                {prototype.pages?.map((p: any) => (
                  <div key={p.id}
                       onClick={() => setCurrentPageId(p.id)}
                       className={`px-2 py-1 rounded cursor-pointer ${currentPageId===p.id ? 'bg-white' : 'hover:bg-white'}`}>/
                    <span className="ml-2 text-[var(--color-gray-700)]">{p.name}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* AI Prompt Input */}
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold">AI Builder</h2>
            </div>
            <p className="text-xs text-text-secondary">Describe your website clearly (purpose, sections, tone). We’ll generate a live preview to the right.</p>
            <div className="space-y-3">
              <Input
                value={prompt}
                onChange={setPrompt}
                placeholder="e.g. A sleek portfolio for a freelance designer with case studies"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                autoFocus
              />
              <Button onClick={handleGenerate} loading={loading} disabled={!prompt.trim()} className="w-full" icon={<Wand2 className="w-4 h-4" />}>{loading ? 'Generating...' : 'Generate Website'}</Button>
            </div>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">{error}</motion.div>
            )}
          </Card>

          {/* Templates */}
          <Card>
            <h3 className="text-base font-semibold mb-4">Templates</h3>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <motion.button key={template.name} onClick={() => setPrompt(`${template.name} website with modern design, responsive layout, and smooth animations`)} className="p-3 bg-bg-tertiary border border-border rounded-lg text-left hover:border-accent transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <div className="w-full h-20 rounded mb-2 flex items-center justify-center" style={{ background: 'radial-gradient(120px 80px at 20% 20%, rgba(59,130,246,0.25), transparent), radial-gradient(160px 100px at 80% 30%, rgba(139,92,246,0.25), transparent), linear-gradient(135deg, rgba(15,23,42,0.8), rgba(2,6,23,0.8))' }}>
                    <span className="text-xs font-medium">{template.name}</span>
                  </div>
                  <div className="text-[11px] text-text-secondary mb-1">{template.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0,4).map(f => (
                      <span key={f} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-text-secondary">{f}</span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Examples */}
          <Card>
            <h3 className="text-base font-semibold mb-4">Examples</h3>
            <div className="space-y-2">
              {examplePrompts.map((example, index) => (
                <motion.button key={index} onClick={() => setPrompt(example)} className="w-full p-3 text-left text-sm text-text-secondary hover:text-text hover:bg-bg-tertiary rounded-lg transition-colors" whileHover={{ x: 4 }}>
                  {example}
                </motion.button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Center - Editor/Preview */}
      <div style={{ gridArea: 'editor' }} className="flex-1 h-full flex flex-col">
        {/* Preview Controls */}
        <div className="h-16 bg-bg-secondary border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Preview:</span>
              <div className="flex bg-bg-tertiary rounded-lg p-1">
                {(['desktop', 'tablet', 'mobile'] as const).map((size) => {
                  const Icon = size === 'desktop' ? Monitor : size === 'tablet' ? Tablet : Smartphone;
                  return (
                    <button key={size} onClick={() => setViewport(size)} className={`p-2 rounded transition-colors ${viewport === size ? 'bg-accent text-white' : 'text-text-secondary hover:text-text'}`}>
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className={`px-3 py-1 rounded ${activeTab==='preview'?'bg-accent text-white':'text-text-secondary hover:text-text'}`} onClick={()=>setActiveTab('preview')}>Preview</button>
              <button className={`px-3 py-1 rounded ${activeTab==='code'?'bg-accent text-white':'text-text-secondary hover:text-text'}`} onClick={()=>setActiveTab('code')}>Code</button>
              <button className={`px-3 py-1 rounded ${activeTab==='editor'?'bg-accent text-white':'text-text-secondary hover:text-text'}`} onClick={()=>setActiveTab('editor')}>Editor</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentPage && (
              <>
                <Button variant="secondary" size="sm" icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} onClick={() => copyToClipboard((currentPage.html||'') + '\n' + (currentPage.css||'') + '\n' + (currentPage.js||''))}>{copied ? 'Copied!' : 'Copy Code'}</Button>
                <Button variant="secondary" size="sm" icon={<Download className="w-4 h-4" />}>Export</Button>
                <Button variant="secondary" size="sm" icon={<Share2 className="w-4 h-4" />}>Share</Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={openGeminiWebsite}
                >
                  Open Website
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={openAdvancedEditableWebsite}
                >
                  Edit Website
                </Button>
                {showPageBuilderButton && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={exportToPageBuilder}
                  >
                    Edit in PageBuilder
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-bg-tertiary p-6 overflow-auto">
          <div className="h-full w-full flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-border" style={{ width: viewportSizes[viewport].width, height: viewportSizes[viewport].height, maxWidth: '100%', maxHeight: '100%' }}>
              {loading ? (
                <div className="w-full h-full flex items-center justify-center"><div className="text-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-text-secondary">Generating your website...</p></div></div>
              ) : activeTab==='preview' && currentPage ? (
                <iframe ref={previewRef} srcDoc={srcDoc} className="w-full h-full border-0" title="Website Preview" />
              ) : activeTab==='editor' ? (
                <div ref={editorRef} className="w-full h-full" />
              ) : (
                <div className="w-full h-full p-4 overflow-auto text-sm">
                  {currentPage ? (
                    <>
                      <div className="mb-2 font-semibold">HTML</div>
                      <pre className="bg-bg-secondary p-3 rounded overflow-auto whitespace-pre-wrap">{currentPage.html}</pre>
                      <div className="mt-4 mb-2 font-semibold">CSS</div>
                      <pre className="bg-bg-secondary p-3 rounded overflow-auto whitespace-pre-wrap">{currentPage.css || ''}</pre>
                      <div className="mt-4 mb-2 font-semibold">JS</div>
                      <pre className="bg-bg-secondary p-3 rounded overflow-auto whitespace-pre-wrap">{currentPage.js || ''}</pre>
                    </>
                  ) : (
                    <div className="text-text-secondary">Nothing to show.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Properties (320px) */}
      <div style={{ gridArea: 'properties' }} className="w-[320px] h-full bg-white border-l border-border overflow-y-auto p-6">
        <h3 className="text-base font-semibold mb-4">Properties</h3>
        {currentPage ? (
          <div className="space-y-3">
            <label className="text-sm text-[var(--color-gray-700)]">Page Title
              <input className="form-input w-full mt-1" value={currentPage.name} onChange={(e) => setPrototype({ ...prototype, pages: prototype.pages.map((p:any)=> p.id===currentPage.id?{...p, name:e.target.value}:p) })} />
            </label>
            <label className="text-sm text-[var(--color-gray-700)]">Path
              <input className="form-input w-full mt-1" value={currentPage.path} onChange={(e) => setPrototype({ ...prototype, pages: prototype.pages.map((p:any)=> p.id===currentPage.id?{...p, path:e.target.value}:p) })} />
            </label>
            <label className="text-sm text-[var(--color-gray-700)]">HTML
              <textarea className="form-textarea w-full mt-1 h-32" value={currentPage.html} onChange={(e) => setPrototype({ ...prototype, pages: prototype.pages.map((p:any)=> p.id===currentPage.id?{...p, html:e.target.value}:p) })} />
            </label>
            <label className="text-sm text-[var(--color-gray-700)]">CSS
              <textarea className="form-textarea w-full mt-1 h-24" value={currentPage.css || ''} onChange={(e) => setPrototype({ ...prototype, pages: prototype.pages.map((p:any)=> p.id===currentPage.id?{...p, css:e.target.value}:p) })} />
            </label>
            <label className="text-sm text-[var(--color-gray-700)]">JS
              <textarea className="form-textarea w-full mt-1 h-24" value={currentPage.js || ''} onChange={(e) => setPrototype({ ...prototype, pages: prototype.pages.map((p:any)=> p.id===currentPage.id?{...p, js:e.target.value}:p) })} />
            </label>
            <Button className="w-full" onClick={async () => { if (!prototype || !currentPage) return; if (activeTab==='editor' && grapesRef.current) { const html = grapesRef.current.getHtml(); const css = grapesRef.current.getCss(); setPrototype({ ...prototype, pages: prototype.pages.map((p:any)=> p.id===currentPage.id?{...p, html, css}:p) }); } const saved = await updatePage(prototype.id, currentPage.id, { name: currentPage.name, path: currentPage.path, html: currentPage.html, css: currentPage.css, js: currentPage.js }); setPrototype({ ...prototype, pages: prototype.pages.map((p:any)=> p.id===currentPage.id?saved:p) }); }}>Save Changes</Button>
          </div>
        ) : (
          <div className="text-sm text-[var(--color-gray-700)]">Select a page to edit</div>
        )}
      </div>
    </div>
  );
};
