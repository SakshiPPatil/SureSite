import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  onClick,
  padding = 'md',
}) => {
  const baseClasses = 'relume-card border transition-all duration-200';
  const hoverClasses = hover ? '' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    none: '',
  };

  const classes = `${baseClasses} ${hoverClasses} ${clickableClasses} ${paddingClasses[padding]} ${className}`;

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
