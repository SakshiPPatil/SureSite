import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Eye, Download, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  tags: string[];
  likes: number;
  downloads: number;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Modern SaaS Landing',
    category: 'Business',
    description: 'Clean and modern SaaS landing page with hero section, features, and pricing',
    preview: '/api/placeholder/400/300',
    tags: ['SaaS', 'Landing Page', 'Modern'],
    likes: 124,
    downloads: 89,
  },
  {
    id: '2',
    name: 'Portfolio Showcase',
    category: 'Personal',
    description: 'Elegant portfolio for designers and developers with project showcase',
    preview: '/api/placeholder/400/300',
    tags: ['Portfolio', 'Showcase', 'Creative'],
    likes: 98,
    downloads: 67,
  },
  {
    id: '3',
    name: 'Restaurant Website',
    category: 'Food',
    description: 'Beautiful restaurant website with menu, reservations, and location',
    preview: '/api/placeholder/400/300',
    tags: ['Restaurant', 'Food', 'Menu'],
    likes: 156,
    downloads: 112,
  },
  {
    id: '4',
    name: 'E-commerce Store',
    category: 'Business',
    description: 'Modern e-commerce store with product gallery and shopping cart',
    preview: '/api/placeholder/400/300',
    tags: ['E-commerce', 'Store', 'Products'],
    likes: 203,
    downloads: 145,
  },
  {
    id: '5',
    name: 'Tech Blog',
    category: 'Content',
    description: 'Clean blog design for tech articles and tutorials',
    preview: '/api/placeholder/400/300',
    tags: ['Blog', 'Tech', 'Articles'],
    likes: 87,
    downloads: 54,
  },
  {
    id: '6',
    name: 'Agency Website',
    category: 'Business',
    description: 'Professional agency website with services and team section',
    preview: '/api/placeholder/400/300',
    tags: ['Agency', 'Services', 'Professional'],
    likes: 134,
    downloads: 92,
  },
];


const categories = ['All', 'Business', 'Personal', 'Food', 'Content', 'E-commerce'];

interface TemplateGalleryProps {
  onTemplateSelect: (template: Template) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onTemplateSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedTemplates, setLikedTemplates] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'sections'|'pages'|'websites'>('websites');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSections: any[] = [];
  const filteredPages: any[] = [];

  const handleLike = (templateId: string) => {
    setLikedTemplates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Template Gallery</h1>
            <p className="text-text-secondary">Choose from our collection of professionally designed templates</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<Grid className="w-4 h-4" />}
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-accent text-white' : ''}
            />
            <Button
              variant="secondary"
              size="sm"
              icon={<List className="w-4 h-4" />}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-accent text-white' : ''}
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search templates..."
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-bg-secondary border border-border rounded-lg text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs placeholder (websites only in this build) */}

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'sections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSections.map((sec) => (
              <motion.div key={sec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="template-card">
                  <div className="template-thumbnail" dangerouslySetInnerHTML={{ __html: sec.previewHtml }} />
                  <div className="template-content">
                    <h3 className="template-title">{sec.name}</h3>
                    <p className="template-description">{sec.description}</p>
                    <div className="template-meta">
                      <Button size="sm" onClick={() => {/* TODO: insert section into current page */}}>Use Section</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((pg) => (
              <motion.div key={pg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="template-card">
                  <div className="template-thumbnail" dangerouslySetInnerHTML={{ __html: pg.previewHtml }} />
                  <div className="template-content">
                    <h3 className="template-title">{pg.name}</h3>
                    <p className="template-description">{pg.description}</p>
                    <div className="template-meta">
                      <Button size="sm" onClick={() => {/* TODO: add page prototype */}}>Use Page</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'websites' && (
          viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="template-card" onClick={() => onTemplateSelect(template)}>
                  <div className="template-thumbnail">
                    <span className="text-lg font-medium text-text-secondary relative z-10">{template.name}</span>
                  </div>
                  <div className="template-content">
                    <h3 className="template-title">{template.name}</h3>
                    <p className="template-description">{template.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-bg-tertiary text-xs rounded-full text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="template-meta">
                      <div className="template-stats">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(template.id);
                          }}
                          className={`template-stat ${likedTemplates.has(template.id) ? 'text-pink' : 'hover:text-pink'}`}
                        >
                          <Heart className={`w-4 h-4 ${likedTemplates.has(template.id) ? 'fill-current' : ''}`} />
                          {template.likes}
                        </button>
                        <div className="template-stat">
                          <Download className="w-4 h-4" />
                          {template.downloads}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTemplateSelect(template);
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          ) : (
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="template-card flex items-center gap-4 p-4" onClick={() => onTemplateSelect(template)}>
                  <div className="w-24 h-16 bg-gradient-to-br from-accent/20 to-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-text-secondary">{template.name}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="template-title mb-1">{template.name}</h3>
                    <p className="text-sm text-text-secondary mb-2">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-bg-tertiary text-xs rounded-full text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(template.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        likedTemplates.has(template.id) ? 'text-pink bg-pink/10' : 'text-text-secondary hover:text-pink'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedTemplates.has(template.id) ? 'fill-current' : ''}`} />
                    </button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTemplateSelect(template);
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-text-secondary opacity-50" />
            <p className="text-lg font-medium mb-2">No templates found</p>
            <p className="text-text-secondary">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
