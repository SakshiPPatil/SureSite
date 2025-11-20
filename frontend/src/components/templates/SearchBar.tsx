import React from 'react';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

export const SearchBar: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = 'Search templates...' }) => {
  return (
    <div className="flex-1">
      <Input value={value} onChange={onChange} placeholder={placeholder} icon={<Search className="w-4 h-4" />} />
    </div>
  );
};


