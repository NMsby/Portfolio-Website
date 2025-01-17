import React from 'react';

interface SectionContainerProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    fullWidth?: boolean;
}

const SectionContainer = ({
    children,
    id,
    className = "",
    fullWidth = false
}: SectionContainerProps)=> {
    return (
        <section
            id={id}
            className={`py-20 ${className}`}
        >
            <div className={`mx-auto px-4 ${fullWidth ? 'w-full' : 'max-w-6xl'}`}>
                {children}
            </div>
        </section>
    );
};

export default SectionContainer;