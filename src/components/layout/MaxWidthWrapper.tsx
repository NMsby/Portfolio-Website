import React from 'react';

interface MaxWidthWrapperProps {
    children: React.ReactNode;
    className?: string;
    size?: 'small' | 'default' | 'large' | 'full';
}

const MaxWidthWrapper = ({
    children,
    className = '',
    size = 'default'
}: MaxWidthWrapperProps) => {
    const sizeClasses = {
        small: 'max-w-4xl',
        default: 'max-w-6xl',
        large: 'max-w-7xl',
        full: 'w-full',
    };

    return (
        <div className={`mx-auto px-4 ${sizeClasses[size]} ${className}`}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;