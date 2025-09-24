import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'filled-tonal';
  size?: 'sm' | 'md';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'filled', size = 'md', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-full focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variantStyles = {
    filled: `bg-light-primary text-light-on-primary
             dark:bg-dark-primary dark:text-dark-on-primary
             hover:shadow-lg hover:bg-light-primary/90 dark:hover:bg-dark-primary/90
             disabled:bg-light-on-surface/10 disabled:text-light-on-surface/30
             dark:disabled:bg-dark-on-surface/10 dark:disabled:text-dark-on-surface/30`,
    'filled-tonal': `bg-light-secondary-container text-light-on-secondary-container
                     dark:bg-dark-secondary-container dark:text-dark-on-secondary-container
                     hover:shadow-md hover:bg-light-secondary-container/80 dark:hover:bg-dark-secondary-container/80
                     disabled:bg-light-on-surface/10 disabled:text-light-on-surface/30
                     dark:disabled:bg-dark-on-surface/10 dark:disabled:text-dark-on-surface/30`,
    outlined: `border border-light-outline dark:border-dark-outline 
               text-light-primary dark:text-dark-primary
               hover:bg-light-primary/5 dark:hover:bg-dark-primary/5
               disabled:border-light-on-surface/10 disabled:text-light-on-surface/30
               dark:disabled:border-dark-on-surface/10 dark:disabled:text-dark-on-surface/30`,
    text: `bg-transparent text-light-primary dark:text-dark-primary
           hover:bg-light-primary/5 dark:hover:bg-dark-primary/5
           disabled:text-light-on-surface/30 dark:disabled:text-dark-on-surface/30`,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2 text-sm tracking-wide',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;