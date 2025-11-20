import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

type CodeItem = { label: string; language: 'html' | 'css' | 'js'; code?: string };

export const PreviewModal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  previewUrl?: string;
  liveHtml?: string;
  liveCss?: string;
  liveJs?: string;
  codes?: CodeItem[];
  defaultCodeTabIndex?: number;
}> = ({ open, onClose, title, previewUrl, liveHtml, liveCss, liveJs, codes = [], defaultCodeTabIndex = 0 }) => {
  const [active, setActive] = useState(defaultCodeTabIndex);
  React.useEffect(() => {
    setActive(defaultCodeTabIndex);
  }, [defaultCodeTabIndex, open]);
  if (!open) return null;
  const copy = async (text?: string) => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); } catch {}
  };
  const srcDoc = `<!DOCTYPE html><html><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>${liveCss ? `<style>${liveCss}</style>` : ''}<script src=\"https://cdn.tailwindcss.com\"><\/script></head><body>${liveHtml || ''}${liveJs ? `<script>${liveJs}<\/script>` : ''}</body></html>`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-bg rounded-xl shadow-2xl w-[92vw] h-[88vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="font-semibold">{title}</div>
          <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
          <div className="border-r border-border min-h-0">
            {previewUrl ? (
              <iframe title="preview" src={previewUrl} className="w-full h-full" />
            ) : (
              <iframe title="code-preview" className="w-full h-full" srcDoc={srcDoc} />
            )}
          </div>
          <div className="flex flex-col min-h-0">
            <div className="flex gap-2 p-2 border-b border-border">
              {codes.map((c, i) => (
                <button key={i} onClick={() => setActive(i)} className={`px-3 py-2 rounded-md text-sm ${active === i ? 'bg-accent text-white' : 'bg-bg-secondary text-text'}`}>{c.label}</button>
              ))}
              <div className="flex-1" />
              <Button variant="secondary" size="sm" onClick={() => copy(codes[active]?.code)}>Copy</Button>
            </div>
            <pre className="flex-1 overflow-auto p-4 text-sm"><code>{codes[active]?.code || ''}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};


