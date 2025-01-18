"use client";

import React, { useRef, useState, useEffect } from 'react';
import PageSection from "@/components/layout/PageSection";
import SectionHeading from "@/components/layout/SectionHeading";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: string;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
}

// Navigation Button Component
const NavButton: React.FC<{
    direction: 'left' | 'right',
    onClick: () => void,
    canScroll: boolean
}> = ({ direction, onClick, canScroll }) => (
    <button
        onClick={onClick}
        className={`absolute ${
            direction === 'left' ? 'left-4' : 'right-4'
        } top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg transform transition-all hover:scale-110 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4A4E69] disabled:opacity-0 disabled:cursor-default`}
        style={{ color: '#22223B' }}
        disabled={!canScroll}
        aria-label={`${ direction === 'left' ? 'Previous' : 'Next'} projects`}
    >
        { direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} /> }
    </button>
)

// Sample Project Data
const projectData: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management and secure payment processing.',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: true
    },
    // Add more projects...
    {
        id: '2',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management and secure payment processing.',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: true
    },
    {
        id: '3',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management and secure payment processing.',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: false
    },
    {
        id: '4',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management and secure payment processing.',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: false
    },
    {
        id: '5',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management and secure payment processing.',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: false
    },
    {
        id: '6',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management and secure payment processing.',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: true
    },
];

const Projects = () => {
    // State
    const [currentPage, setCurrentPage] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [progress, setProgress] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    //Refs
    const sliderRef = useRef<HTMLDivElement>(null);

    // Compute total pages
    const totalPages = Math.ceil(projectData.length / 3);

    // Check scroll position
    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth -10); // Subtract 10 for buffer

            // Update current page
            const newPage = Math.round(scrollLeft / clientWidth);
            setCurrentPage(newPage);

            // Update progress
            const maxScroll = scrollWidth - clientWidth;
            const currentProgress = (scrollLeft / maxScroll) * 100;
            setProgress(currentProgress);
        }
    };

    // Scroll Handler
    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left'
                ? -sliderRef.current.clientWidth
                : sliderRef.current.clientWidth;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Touch Handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && canScrollRight) {
            scroll('right');
        }
        if (isRightSwipe && canScrollLeft) {
            scroll('left');
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    // Auto-scroll effect
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isHovering && sliderRef.current) {
            interval = setInterval(() => {
                const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current!;

                if (scrollLeft >= scrollWidth - clientWidth) {
                    sliderRef.current!.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scroll('right');
                }
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [isHovering]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && canScrollLeft) scroll('left');
            if (e.key === 'ArrowRight' && canScrollRight) scroll('right');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canScrollLeft, canScrollRight]);

    return (
        <PageSection
            id="projects"
            backgroundColor="background"
            containerWidth="default" // Using our predefined width
            className="py-4"
        >
            <SectionHeading
                title="Featured Projects"
                subtitle="A collection of my recent work and contributions."
                align="center"
            />

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 mb-4 rounded-full overflow-hidden">
                <div
                    className="h-full transition-all duration-300"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: '#4A4E69'
                    }}
                />
            </div>

            {/* Projects Slider Container */}
            <div className="relative"
                 onMouseEnter={() => setIsHovering(true)}
                 onMouseLeave={() => setIsHovering(false)}
            >
                {/* Navigation Buttons */}
                <NavButton direction="left" onClick={() => scroll('left')} canScroll={canScrollLeft} />
                <NavButton direction="right" onClick={() => scroll('right')} canScroll={canScrollRight} />

                {/* Projects Slider */}
                <div
                    ref={sliderRef}
                    className="overflow-x-auto hide-scrollbar"
                    onScroll={checkScroll}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: 'smooth',
                    }}
                >
                    <div className="flex gap-8 px-4">
                        {/* Project Content */}
                        {projectData.map((project) => (
                            <div
                                key={project.id}
                                className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)]"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                <ProjectCard {...project} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (sliderRef.current) {
                                const scrollAmount = (sliderRef.current.clientWidth / 3) * 3 * index;
                                sliderRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                            }
                        }}
                        className={`h-2 rounded-full transition-all ${
                            currentPage === index
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        style={{
                            backgroundColor: currentPage === index ? '#4A4E69' : undefined
                        }}
                        aria-label={`Go to page ${index + 1}`}
                    />
                ))}
            </div>
        </PageSection>
    );
};

export default Projects;