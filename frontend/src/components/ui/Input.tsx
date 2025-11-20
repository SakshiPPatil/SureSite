import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  autoFocus?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  icon,
  className = '',
  onKeyDown,
  autoFocus,
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-text placeholder-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent';
  const errorClasses = error ? 'border-error focus:ring-error focus:border-error' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const iconClasses = icon ? 'pl-12' : '';

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted">
          {icon}
        </div>
      )}
      <motion.input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseClasses} ${errorClasses} ${disabledClasses} ${iconClasses} ${className}`}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        whileFocus={{ scale: 1.01 }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-error"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
