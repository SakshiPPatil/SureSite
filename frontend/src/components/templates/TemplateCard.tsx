import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const TemplateCard: React.FC<{
  title: string;
  description: string;
  tags: string[];
  preview?: string;
  onPreview?: () => void;
  onUse?: () => void;
  metaRight?: React.ReactNode;
}> = ({ title, description, tags, preview, onPreview, onUse, metaRight }) => {
  const [imgError, setImgError] = React.useState(false);
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  ];
  const hash = Array.from(title).reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = gradients[hash % gradients.length];
  return (
    <Card className="template-card">
      <div className="template-thumbnail" style={{ background: bg }}>
        {preview && !imgError ? (
          <img src={preview} alt={title} className="w-full h-full object-cover rounded-lg" onError={() => setImgError(true)} />
        ) : null}
      </div>
      <div className="template-content">
        <h3 className="template-title">{title}</h3>
        <p className="template-description">{description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-bg-tertiary text-xs rounded-full text-text-secondary">{tag}</span>
          ))}
        </div>
        <div className="template-meta">
          <div className="template-stats">{metaRight}</div>
          <div className="flex gap-2">
            {onPreview && <Button size="sm" variant="secondary" onClick={onPreview}>Preview</Button>}
            {onUse && <Button size="sm" onClick={onUse}>Use</Button>}
          </div>
        </div>
      </div>
    </Card>
  );
};


