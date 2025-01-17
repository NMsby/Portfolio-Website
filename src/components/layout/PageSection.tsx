import React from 'react'
import { theme } from '@/theme';

interface PageSectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    backgroundColor?: keyof typeof theme.colors;
    containerWidth?: 'default' | 'wide' | 'narrow' | 'full';
}

const PageSection = ({
    children,
    id,
    className = "",
    backgroundColor = 'background',
    containerWidth = 'default'
}: PageSectionProps) => {
    const containerClasses = {
        default: 'max-w-6xl',
        wide: 'max-w-7xl',
        narrow: 'max-w-4xl',
        full: 'w-full',
    };

    return (
        <section
            id={id}
            className={`relative py-20 ${className}`}
            style={{ backgroundColor: theme.colors[backgroundColor] }}
        >
            <div className={`mx-auto px-4 ${containerClasses[containerWidth]}`}>
                {children}
            </div>
        </section>
    );
};

export default PageSection;