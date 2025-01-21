"use client";

//
import React, { useState, JSX, useRef} from 'react';
import { motion } from 'framer-motion';
import {
    Book,
    ChevronLeft,
    ChevronRight,
    Code,
    MountainSnow,
    Music,
} from 'lucide-react';
import PageSection from "@/components/layout/PageSection";
import SectionHeading from "@/components/layout/SectionHeading";

// Type Definitions
interface Language {
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

interface Interest {
    name: string;
    icon: JSX.Element;
}

interface VoluntaryWork {
    id: string;
    organization: string;
    role: string;
    duration: {
        start: string;
        end: string;
    };
    description: string;
}

interface AboutData {
    profileImage: string;
    quote: string;
    languages: Language[];
    interests: Interest[];
    voluntaryWork: VoluntaryWork[];
}

// Sample data - replace with your actual data
const aboutData: AboutData = {
    profileImage: "https://placehold.co/400x400", // Replace with your image path
    quote: "The only way to do great work is to love what you do",
    languages: [
        { name: "English", proficiency: "Fluent" },
        { name: "Swahili", proficiency: "Native" },
        { name: "French", proficiency: "Basic" }
    ],
    interests: [
        {
            name: "Game Development",
            icon: <Code size={24} />
        },
        {
            name: "Violin",
            icon: <Music size={24} />
        },
        {
            name: "Hiking",
            icon: <MountainSnow size={24} />
        },
        {
            name: "Reading",
            icon: <Book size={24} />
        },
    ],
    voluntaryWork: [
        {
            id: "1",
            organization: "Example Organization",
            role: "Volunteer Developer",
            duration: {
                start: "Jan 2023",
                end: "Present"
            },
            description: "Developed and maintained the organization's website..."
        }
        // Add more voluntary work
    ]
};

const About = () => {
    // State Management
    const [imageLoaded, setImageLoaded] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    // Refs
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Handlers
    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStart) return;

        const currentTouch = e.touches[0].clientX;
        const diff = touchStart - currentTouch;

        if (Math.abs(diff) > 5) {
            scrollContainerRef.current?.scrollBy({ left: diff });
        }
    };

    return (
        <PageSection
            id="about"
            backgroundColor="background"
            containerWidth="default"
            className="min-h-screen py-3"
        >
            <SectionHeading
                title="About Me"
                subtitle="Get to know me better"
                align="center"
            />

            {/* Main Content Grid */}
            <div className="mt-1 space-y-6">
                {/* Top Grid: Image, Languages and Interests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Profile Image */}
                    <div className="md:col-span-1">
                        <div className="relative aspect-square rounded-lg overflow-hidden">
                            {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                            )}
                            <motion.img
                                src={aboutData.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onLoad={() => setImageLoaded(true)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: imageLoaded ? 1 : 0 }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Languages and Interests */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Languages Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-lg"
                            style={{ backgroundColor: '#2D2D45' }}
                        >
                            <h3 className="text-lg font-semibold mb-4" style={{color: '#F2E9E4'}}>
                                Languages
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {aboutData.languages.map((language, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm"
                                        style={{
                                            backgroundColor: 'rgba(201, 173, 167, 0.1)',
                                            color: '#C9ADA7'
                                        }}
                                    >
                                        {language.name} • {language.proficiency}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Interests Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-lg"
                            style={{ backgroundColor: '#2D2D45' }}
                        >
                            <h3 className="text-lg font-semibold mb-4" style={{ color: '#F2E9E4' }}>
                                Interests & Hobbies
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
                                {aboutData.interests.map((interest, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{scale: 1.05}}
                                        className="flex items-center gap-2 p-3 md:p-4 rounded-lg touch-target"
                                        style={{ backgroundColor: 'rgba(201, 173, 167, 0.1)' }}
                                    >
                                        <span className="text-[#C9ADA7]">{interest.icon}</span>
                                        <span className="text-sm" style={{ color: '#F2E9E4' }}>
                                            {interest.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center italic"
                    style={{ color: '#9A8C98' }}
                >
                    &ldquo;{aboutData.quote}&ldquo;
                </motion.div>

                {/* Voluntary Work Section */}
                <div className="-mt-2">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.5}}
                        className="relative"
                    >
                        <h3 className="text-lg font-semibold mb-4" style={{color: '#F2E9E4'}}>
                            Voluntary Work
                        </h3>

                        {/* Scroll Buttons */}
                        <motion.button
                            initial={{opacity: 0}}
                            animate={{opacity: canScrollLeft ? 1 : 0}}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg"
                            onClick={() => scrollContainerRef.current?.scrollBy({left: -300, behavior: 'smooth'})}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} style={{color: '#22223B'}}/>
                        </motion.button>

                        <motion.button
                            initial={{opacity: 0}}
                            animate={{opacity: canScrollRight ? 1 : 0}}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg"
                            onClick={() => scrollContainerRef.current?.scrollBy({left: 300, behavior: 'smooth'})}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} style={{color: '#22223B'}}/>
                        </motion.button>

                        {/* Scrollable Container */}
                        <div
                            className="relative overflow-x-auto hide-scrollbar"
                            ref={scrollContainerRef}
                            role="region"
                            aria-label="Voluntary Work Experience"
                            tabIndex={0}
                            onScroll={checkScroll}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={() => setTouchStart(null)}
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowRight') {
                                    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
                                }
                                if (e.key === 'ArrowLeft') {
                                    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
                                }
                            }}
                        >
                            <div className="flex gap-6 px-4 pb-4">
                                {aboutData.voluntaryWork.map((work, index) => (
                                    <motion.div
                                        key={work.id}
                                        initial={{opacity: 0, x: 20}}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            transition: {delay: 0.2 * index}
                                        }}
                                        className="flex-none w-[300px] p-6 rounded-lg"
                                        style={{backgroundColor: '#2D2D45'}}
                                    >
                                        <div className="space-y-4">
                                            {/* Organization and Role */}
                                            <div>
                                                <h4 className="font-semibold" style={{color: '#F2E9E4'}}>
                                                    {work.organization}
                                                </h4>
                                                <p className="text-sm" style={{color: '#C9ADA7'}}>
                                                    {work.role}
                                                </p>
                                            </div>

                                            {/* Duration */}
                                            <div className="text-sm" style={{color: '#9A8C98'}}>
                                                {work.duration.start} - {work.duration.end}
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm" style={{color: '#F2E9E4'}}>
                                                {work.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Scroll Indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-full">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{backgroundColor: '#C9ADA7'}}
                                    initial={{width: '0%'}}
                                    animate={{width: '100%'}}
                                    transition={{duration: 2, ease: 'easeInOut'}}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </PageSection>
    );
};

export default About;