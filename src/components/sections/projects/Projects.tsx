"use client";

import React, { useRef, useState, useEffect } from 'react';
import PageSection from "@/components/layout/PageSection";
import SectionHeading from "@/components/layout/SectionHeading";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCardSkeleton from "@/components/sections/projects/ProjectCardSkeleton";

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

// Keyboard Interaction State
interface KeyboardState {
    left: boolean;
    right: boolean;
}

// Navigation Button Component
const NavButton: React.FC<{
    direction: 'left' | 'right',
    onClick: () => void,
    canScroll: boolean,
    isKeyPressed: boolean
}> = ({ direction, onClick, canScroll, isKeyPressed }) => (
    <button
        onClick={onClick}
        className={`absolute ${
            direction === 'left' ? 'left-4' : 'right-4'
        } top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg transform transition-all hover:scale-110 
        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4A4E69] disabled:opacity-0 
        disabled:cursor-default ${
            isKeyPressed ? 'scale-110 ring-2 ring-[#4A4E69] bg-gray-50' : ''
        }`}
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
        title: 'BomaCare',
        description: 'A Web-Based Platform Connecting Domestic Workers with Clients for Quality Homecare Services in Nairobi.',
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
        title: 'My Portfolio Website',
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
        title: 'PECMA Hardware Stores',
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
        title: 'eLinda',
        description: 'E-Linda is a chatbot for women’s safety, providing real-time tips, legal guidance, and emergency support. Accessible anytime, it offers location-based alerts and check-ins, helping women stay safe and empowered.',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: false
    },
    {
        id: '5',
        title: 'Malaika',
        description: 'A mobile application empowering university students to overcome mental health challenges and maintain sobriety.',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: false
    },
    {
        id: '6',
        title: 'Vauxible',
        description: 'A text-to-speech audiobook mobile application to assist users with visual impairment ',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: true
    },
    {
        id: '7',
        title: 'Ecommerce Platform',
        description: 'FullStack Ecommerce Web Application with Django REST API Framework and React',
        image: '/api/placeholder/600/400', // We'll replace with actual image later
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/yourusername/project',
        liveUrl: 'https://project-demo.com',
        featured: true
    },
    {
        id: '8',
        title: 'BrickBreaker Game',
        description: 'A text-to-speech audiobook mobile application to assist users with visual impairment ',
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
    const [currentPage] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [progress, setProgress] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [keyboardState, setKeyboardState] = useState<KeyboardState>({ left: false, right: false });
    const [projectCount, setProjectCount] = useState({ current: 1, total: projectData.length });
    const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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

            // Update current page number
            const currentProject = Math.floor((scrollLeft / (scrollWidth - clientWidth)) * projectData.length) + 1;
            setProjectCount(prev => ({ ...prev, current: currentProject }))

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
        setIsAutoScrollPaused(true);
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
            if (e.key === 'ArrowLeft' && canScrollLeft) {
                setKeyboardState(prev => ({...prev, left: true}));
                scroll('left');
            }
            if (e.key === 'ArrowRight' && canScrollRight) {
                setKeyboardState(prev => ({...prev, right: true}));
                scroll('right');
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                setKeyboardState(prev => ({ ...prev, left: false }));
            }
            if (e.key === 'ArrowRight') {
                setKeyboardState(prev => ({ ...prev, right: false }));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [canScrollLeft, canScrollRight]);

    // Simulate loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);       // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

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

            {/* Project Counter and Auto-scroll Status */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">
                    Project {projectCount.current} of {projectCount.total}
                </div>
                {isAutoScrollPaused && (
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                        Auto-scroll paused
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            {!isLoading && (
                <div className="w-full h-1 bg-gray-200 mb-4 rounded-full overflow-hidden">
                    <div
                        className="h-full transition-all duration-300 relative"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: '#4A4E69'
                        }}
                    >
                        <div className="absolute inset-0 bg-white bg-opacity-25 animate-pulse"></div>
                    </div>
                </div>
            )}


            {/* Projects Slider Container */}
            <div className="relative"
                 onMouseEnter={() => {
                     setIsHovering(true);
                     setIsAutoScrollPaused(true);
                 }}
                 onMouseLeave={() => {
                     setIsHovering(false);
                     setIsAutoScrollPaused(false);
                 }}
            >

                {/* Navigation Buttons */}
                {!isLoading && (
                    <>
                        <NavButton
                            direction="left"
                            onClick={() => scroll('left')}
                            canScroll={canScrollLeft}
                            isKeyPressed={keyboardState.left}
                        />
                        <NavButton
                            direction="right"
                            onClick={() => scroll('right')}
                            canScroll={canScrollRight}
                            isKeyPressed={keyboardState.right}
                        />
                    </>
                )}

                {/* Projects Slider */}
                <div
                    ref={sliderRef}
                    className="overflow-x-auto hide-scrollbar"
                    onScroll={!isLoading ? checkScroll : undefined}
                    onTouchStart={!isLoading ? handleTouchStart : undefined}
                    onTouchMove={!isLoading ? handleTouchMove : undefined}
                    onTouchEnd={!isLoading ? handleTouchEnd : undefined}
                    style={{
                        scrollSnapType: isLoading ? 'none' : 'x mandatory',
                        scrollBehavior: 'smooth',
                    }}
                >
                    <div className="flex gap-8 px-4">
                        {/* Project Content */}
                        {isLoading ? (
                            // Show skeletons while Loading
                            Array(3).fill(null).map((_, index) => (
                                <div
                                    key={`skeleton-${index}`}
                                    className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)]"
                                >
                                    <ProjectCardSkeleton />
                                </div>
                            ))
                        ) : (
                            // Show actual project cards
                            projectData.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)]"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    <ProjectCard {...project} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Pagination Indicators */}
            {!isLoading && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({length: totalPages}).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (sliderRef.current) {
                                    const scrollAmount = (sliderRef.current.clientWidth / 3) * 3 * index;
                                    sliderRef.current.scrollTo({left: scrollAmount, behavior: 'smooth'});
                                }
                            }}
                            className={`h-2 rounded-full transition-all ${
                                currentPage === index
                                    ? 'w-8 bg-primary md:w-12'
                                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            style={{
                                backgroundColor: currentPage === index ? '#4A4E69' : undefined
                            }}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </PageSection>
    );
};

export default Projects;