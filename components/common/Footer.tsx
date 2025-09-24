import React from 'react';

interface FooterProps {
    onNavigate: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="w-full bg-light-surface-container dark:bg-dark-surface-container border-t border-light-outline-variant dark:border-dark-outline-variant py-4 mt-auto">
            <div className="container mx-auto text-center text-light-on-surface-variant dark:text-dark-on-surface-variant text-sm space-y-2">
                <p>
                    Need help building your agent?{' '}
                    <button onClick={onNavigate} className="text-light-primary dark:text-dark-primary hover:underline font-medium transition-colors">
                        Read our detailed guide
                    </button>
                    .
                </p>
                <p>
                    Copyright 2025 - AI Agent Buiilder -{' '}
                    <a 
                        href="https://github.com/sapthesh" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-light-primary dark:text-dark-primary hover:underline font-medium transition-colors"
                    >
                        Github
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;