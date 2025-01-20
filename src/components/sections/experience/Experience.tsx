"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Building2, Calendar, MapPin } from 'lucide-react';
import PageSection from '@/components/layout/PageSection';
import SectionHeading from '@/components/layout/SectionHeading';

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
        id: '3',
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
        id: '4',
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
    }
    // Add more experiences...
];

const Experience = () => {
    const [activeExperience, setActiveExperience] = useState<string>(experiences[0].id);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Timeline Navigation
    const scroll = (direction: 'left' | 'right') => {
        if (timelineRef.current) {
            const scrollAmount = timelineRef.current.offsetWidth / 2;
            timelineRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

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

            {/* Timeline Navigation */}
            <div className="relative mt-8">
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg transition-all 
                    ${canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-0 cursor-default'}`}
                    disabled={!canScrollLeft}
                >
                    <ChevronLeft size={24} style={{ color: '#22223B' }} />
                </button>

                {/* Timeline */}
                <div
                    ref={timelineRef}
                    className="overflow-x-auto hide-scrollbar relative"
                >
                    <div className="flex items-center gap-8 p-4">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                className={`flex-none cursor-pointer relative px-6 py-3 rounded-lg transition-all
                                    ${activeExperience === exp.id ? 'bg-[#4A4E69] text-white' : 'hover:bg-gray-100'}`}
                                onClick={() => setActiveExperience(exp.id)}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                        {exp.duration.start} - {exp.duration.end}
                                    </div>
                                </div>
                                {/* Connection Line */}
                                {index < experiences.length - 1 && (
                                    <div
                                        className="absolute top-1/2 -right-8 w-8 h-px"
                                        style={{ backgroundColor: '#9A8C98' }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => scroll('right')}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg transition-all
                    ${canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-0 cursor-default'}`}
                    disabled={!canScrollRight}
                >
                    <ChevronRight size={24} style={{ color: '#22223B' }} />
                </button>
            </div>

            {/* Experience Details */}
            <AnimatePresence mode="wait">
                {experiences.map((exp) => (
                    exp.id === activeExperience && (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-8 bg-white rounded-lg shadow-lg p-6"
                        >
                            <div className="space-y-4">
                                {/* Role and Company */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold" style={{ color: '#22223B' }}>
                                            {exp.role}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Building2 size={16} className="text-[#9A8C98]" />
                                            <span className="text-[#4A4E69]">{exp.company}</span>
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
                                        style={{ backgroundColor: '#4A4E69', color: '#F2E9E4' }}
                                    >
                                        {exp.type}
                                    </span>
                                </div>

                                {/* Duration and Location */}
                                <div className="flex gap-4 text-sm text-[#9A8C98]">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>{exp.duration.start} - {exp.duration.end}</span>
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
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{
                                                backgroundColor: 'rgba(74, 78, 105, 0.1)',
                                                color: '#4A4E69'
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>
        </PageSection>
    );
};

export default Experience;