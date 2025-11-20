import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'sidebar';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none';

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--gray-50)]',
    danger: 'bg-[var(--color-red-500)] hover:bg-[#dc2626] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    sidebar: 'btn-sidebar',
  } as const;

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  } as const;

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
    >
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};
