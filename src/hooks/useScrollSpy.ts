import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            const currentSection = sectionIds.find((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    const elementTop = top + window.pageYOffset;
                    const elementBottom = bottom + window.pageYOffset;
                    return scrollPosition >= elementTop && scrollPosition < elementBottom;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, {passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeSection;
};