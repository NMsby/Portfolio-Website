"use client";

import React, {useState, useRef, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Building2,
    Calendar,
    MapPin
} from 'lucide-react';
import PageSection from '@/components/layout/PageSection';
import SectionHeading from '@/components/layout/SectionHeading';

// Metadata for SEO
export const metadata = {
    title: 'Experience - Your Portfolio',
    description: 'Professional experience and career timeline showcasing roles and achievements'
};

// Types
interface Experience {
    id: string;
    role: string;
    company: string;
    duration: {
        start: string;
        end: string; // "Present" for current role
    };
    location: string;
    description: string[];
    technologies: string[];
    type: 'full-time' | 'part-time' | 'internship' | 'freelance';
    companyUrl?: string;
}

// Animation Variants
const timelineVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex:0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

// Sample Data
const experiences: Experience[] = [
    {
        id: '1',
        role: 'Software Engineering Intern',
        company: 'Example Tech',
        duration: {
            start: 'Jun 2023',
            end: 'Present'
        },
        location: 'Nairobi, Kenya',
        description: [
            'Developed and maintained web applications using React and Node.js',
            'Implemented responsive designs and improved UI/UX',
            'Collaborated with team on agile development projects'
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'AWS'],
        type: 'internship',
        companyUrl: 'https://example.com'
    },
    {
        id: '2',
        role: 'Software Engineering Intern',
        company: 'Example Tech',
        duration: {
            start: 'Jun 2022',
            end: 'December 2023'
        },
        location: 'Nairobi, Kenya',
        description: [
            'Developed and maintained web applications using React and Node.js',
            'Implemented responsive designs and improved UI/UX',
            'Collaborated with team on agile development projects'
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'AWS'],
        type: 'internship',
        companyUrl: 'https://example.com'
    },
    {
        id: '3',
        role: 'Software Engineering Intern',
        company: 'Example Tech',
        duration: {
            start: 'Jan 2020',
            end: 'December 2022'
        },
        location: 'Nairobi, Kenya',
        description: [
            'Developed and maintained web applications using React and Node.js',
            'Implemented responsive designs and improved UI/UX',
            'Collaborated with team on agile development projects'
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'AWS'],
        type: 'internship',
        companyUrl: 'https://example.com'
    },
    {
        id: '4',
        role: 'Software Engineering Intern',
        company: 'Example Tech',
        duration: {
            start: 'February 2019',
            end: 'May 2019'
        },
        location: 'Nairobi, Kenya',
        description: [
            'Developed and maintained web applications using React and Node.js',
            'Implemented responsive designs and improved UI/UX',
            'Collaborated with team on agile development projects'
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'AWS'],
        type: 'internship',
        companyUrl: 'https://example.com'
    }
    // Add more experiences...
];

// Main Component
const Experience = () => {
    const [activeExperience, setActiveExperience] = useState<string>(experiences[0].id);
    const [currentFocusIndex, setCurrentFocusIndex] = useState(0);
    const [[page, direction], setPage] = useState([0, 0]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingError] = useState<string | null>(null);
    const [touchStartX, setTouchStartX] = useState(0);
    const [isDragging] = useState(false);
    const [canScrollLeft] = useState(false);
    const [canScrollRight] = useState(true);

    // Refs
    const timelineRef = useRef<HTMLDivElement>(null);

    // Loading Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Keyboard navigation handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && currentFocusIndex > 0) {
                setCurrentFocusIndex(prev => prev - 1);
                setActiveExperience(experiences[currentFocusIndex - 1].id);
                setPage([page - 1, -1]);
            }
            if (e.key === 'ArrowRight' && currentFocusIndex < experiences.length - 1) {
                setCurrentFocusIndex(prev => prev + 1);
                setActiveExperience(experiences[currentFocusIndex + 1].id);
                setPage([page + 1, 1]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentFocusIndex, page]);

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!timelineRef.current) return;

        const touchCurrentX = e.touches[0].clientX;
        const diff = touchStartX - touchCurrentX;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentFocusIndex < experiences.length - 1) {
                setCurrentFocusIndex(prev => prev + 1);
                setActiveExperience(experiences[currentFocusIndex + 1].id);
                setPage([page + 1, 1]);
            } else if (diff < 0 && currentFocusIndex > 0) {
                setCurrentFocusIndex(prev => prev - 1);
                setActiveExperience(experiences[currentFocusIndex - 1].id);
                setPage([page - 1, -1]);
            }
            setTouchStartX(touchCurrentX);
        }
    };

    // Scroll Handler
    const scroll = (direction: 'left' | 'right') => {
        if (timelineRef.current) {
            const scrollAmount = timelineRef.current.offsetWidth / 2;
            timelineRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loadingError) {
        return (
            <div className="text-center text-red-500 p-4">
                {loadingError}
            </div>
        );
    }

    return (
        <PageSection
            id="experience"
            backgroundColor="background"
            containerWidth="default"
            className="py-4"
        >
            <SectionHeading
                title="Experience Timeline"
                subtitle="My professional journey"
                align="center"
            />

            {isLoading ? (
                // Loading Skeleton
                <div className="mt-8 space-y-4">
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse"/>
                    <div className="h-24 bg-gray-200 rounded-lg animate-pulse"/>
                </div>
            ) : (
                <>
                    {/* Timeline Navigation */}
                    <div className="relative mt-8 px-4 md:px-0">
                        <button
                            onClick={() => scroll('left')}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                            bg-white shadow-lg transition-all ${
                                canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-0 cursor-default'
                            }`}
                            disabled={!canScrollLeft}
                        >
                            <ChevronLeft size={24} style={{ color: '#22223B' }} />
                        </button>

                        {/* Timeline */}
                        <div
                            ref={timelineRef}
                            className="overflow-x-auto hide-scrollbar relative"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                        >
                            <div className="flex items-center gap-4 md:gap-8 p-4">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        className={`flex-none cursor-pointer relative px-3 md:px-6 py-2 
                                        md:py-3 rounded-lg transition-all ${
                                            activeExperience === exp.id
                                                ? 'bg-[#4A4E69] text-white'
                                                : 'hover:bg-gray-100'
                                        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            if (!isDragging) {
                                                setCurrentFocusIndex(index);
                                                setActiveExperience(exp.id);
                                                setPage([index, index > currentFocusIndex ? 1 : -1]);
                                            }
                                        }}
                                    >
                                        <div className="text-sm md:text-base whitespace-nowrap">
                                            <div className="font-medium">
                                                {exp.duration.start} - {exp.duration.end}
                                            </div>
                                        </div>

                                        {index < experiences.length - 1 && (
                                            <div
                                                className="absolute top-1/2 -right-4 md:-right-8 w-4
                                                md:w-8 h-px"
                                                style={{ backgroundColor: '#9A8C98' }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => scroll('right')}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                            bg-white shadow-lg transition-all ${
                                canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-0 cursor-default'
                            }`}
                            disabled={!canScrollRight}
                        >
                            <ChevronRight size={24} style={{ color: '#22223B' }} />
                        </button>

                        {/* Mobile Swipe Indicator */}
                        <div className="md:hidden text-center mt-2 text-sm text-[#9A8C98]">
                            <span>← Swipe to navigate →</span>
                        </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {experiences.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentFocusIndex
                                        ? 'w-8 bg-[#4A4E69]'
                                        : 'bg-gray-300'
                                }`}
                                onClick={() => {
                                    setCurrentFocusIndex(index);
                                    setActiveExperience(experiences[index].id);
                                    setPage([index, index > currentFocusIndex ? 1 : -1]);
                                }}
                                aria-label={`Go to experience ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Experience Details */}

                </>
            )}

            {/* Experience Details */}
            <AnimatePresence initial={false} custom={direction}>
                {experiences.map((exp) => (
                    exp.id === activeExperience && (
                        <motion.div
                            key={exp.id}
                            custom={direction}
                            variants={timelineVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="mt-8 bg-white rounded-lg shadow-lg p-6 overflow-hidden"
                        >
                            <motion.div
                                className="space-y-4"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                {/* Role and Company */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold"
                                            style={{ color: '#22223B' }}
                                        >
                                            {exp.role}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Building2 size={16} className="text-[#9A8C98]" />
                                            <span className="text-[#4A4E69]">
                                                {exp.company}
                                            </span>
                                            {exp.companyUrl && (
                                                <a
                                                    href={exp.companyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#4A4E69] hover:text-[#22223B]"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <span
                                        className="px-3 py-1 rounded-full text-sm"
                                        style={{
                                            backgroundColor: '#4A4E69',
                                            color: '#F2E9E4'
                                        }}
                                    >
                                        {exp.type}
                                    </span>
                                </div>

                                {/* Duration and Location */}
                                <div className="flex gap-4 text-sm text-[#9A8C98]">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>
                                            {exp.duration.start} - {exp.duration.end}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>{exp.location}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <ul className="space-y-2 list-disc list-inside text-[#4A4E69]">
                                    {exp.description.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>

                                {/* Technologies */}
                                <motion.div
                                    className="flex flex-wrap gap-2"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05
                                            }
                                        }
                                    }}
                                >
                                    {exp.technologies.map((tech, index) => (
                                        <motion.span
                                            key={index}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.8 },
                                                visible: { opacity: 1, scale: 1}
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{
                                                backgroundColor: 'rgba(74, 78, 105, 0.1)',
                                                color: '#4A4E69'
                                            }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                {/* Progress Indicator */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-1 bg-[#4A4E69]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 5 }}
                                />
                            </motion.div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>
        </PageSection>
    );
};

// Optimal Performance
export default dynamic(() => Promise.resolve(Experience), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-[#4A4E69]">Loading experience timeline...</div>
        </div>
    )
});