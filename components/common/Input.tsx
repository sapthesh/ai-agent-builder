import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, className, error, icon, ...props }) => {
  const baseClasses = `w-full p-3 bg-transparent border rounded-lg focus:outline-none focus:ring-0 transition-colors text-sm
    text-light-on-surface-variant dark:text-dark-on-surface-variant placeholder-light-on-surface-variant dark:placeholder-dark-on-surface-variant`;
  
  const errorClasses = error 
    ? 'border-light-error dark:border-dark-error focus:border-light-error dark:focus:border-dark-error focus:border-2' 
    : 'border-light-outline dark:border-dark-outline focus:border-light-primary dark:focus:border-dark-primary focus:border-2';
  
  return (
    <div className="relative">
      {label && (
        <label className="block text-xs font-medium text-light-on-surface-variant dark:text-dark-on-surface-variant mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-light-on-surface-variant dark:text-dark-on-surface-variant">
            {icon}
          </div>
        )}
        <input
          className={`${baseClasses} ${errorClasses} ${icon ? 'pl-9' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-light-error dark:text-dark-error">{error}</p>}
    </div>
  );
};

export default Input;