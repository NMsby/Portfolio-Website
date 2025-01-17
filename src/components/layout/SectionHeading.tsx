import React from 'react';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

const SectionHeading = ({
    title,
    subtitle,
    align = 'left',
    className = ""
}: SectionHeadingProps) => {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <div className={`mb-12 ${alignmentClasses[align]} ${className}`}>
            <h2 className="font-primary text-3xl md:text-4xl font-bold text-primary mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="font-secondary text-lg text-secondary">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;