import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-light-surface-container-low dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-xl overflow-hidden">
      <div className="p-4">
        <h3 className="text-base font-medium text-light-on-surface-variant dark:text-dark-on-surface-variant">{title}</h3>
      </div>
      <div className="p-4 pt-0">
        {children}
      </div>
    </div>
  );
};

export default Card;