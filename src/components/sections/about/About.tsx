"use client";

import React, {JSX} from 'react';
import { Book, Code2, Coffee, Globe, Headphones, Heart } from 'lucide-react';
import PageSection from '@/components/layout/PageSection';
import SectionHeading from '@/components/layout/SectionHeading';
import { motion } from 'framer-motion';

// Types
interface Interest {
    icon: JSX.Element;
    label: string;
    description: string;
}

interface Language {
    name: string;
    proficiency: string;
    flag: string;
}

// Data
const interests: Interest[] = [
    {
        icon: <Code2 size={24} />,
        label: 'Coding',
        description: 'Building and creating through code'
    },
    {
        icon: <Book size={24} />,
        label: 'Reading',
        description: 'Tech blogs and sci-fi novels'
    },
    {
        icon: <Coffee size={24} />,
        label: 'Coffee',
        description: 'Exploring different coffee flavors'
    },
    {
        icon: <Headphones size={24} />,
        label: 'Music',
        description: 'Rock and electronic music'
    },
];

const languages: Language[] = [
    {
        name: 'English',
        proficiency: 'Fluent',
        flag: '🇬🇧'
    },
    {
        name: 'Swahili',
        proficiency: 'Native',
        flag: '🇰🇪'
    },
    // Add more languages
];

const About = () => {
    return (
        <PageSection
            id="about"
            backgroundColor="background"
            containerWidth="default"
            className="py-4 min-h-[60vh]"
        >
            <SectionHeading
                title="About Me"
                subtitle="Get to know me better"
                align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Left Column: Image and Quote */}
                <div className="space-y-6">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden"
                    >
                        <img
                            src="https://placehold.co/400x400"  // Replace with your image
                            alt="Profile"
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                        />
                    </motion.div>

                    {/* Quote Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#2D2D45] p-4 rounded-lg"
                    >
                        <blockquote className="text-lg italic" style={{ color: '#F2E9E4' }}>
                            &ldquo;Your inspirational quote here...&ldquo;
                            <footer className="mt-2 text-sm" style={{ color: '#9A8C98' }}>
                                - Your Name
                            </footer>
                        </blockquote>
                    </motion.div>
                </div>

                {/* Right Column: Interests and Languages */}
                <div className="space-y-6">
                    {/* Interests & Hobbies */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#2D2D45] p-4 rounded-lg"
                    >
                        <h3 className="text-lg font-semibold mb-4" style={{ color: '#F2E9E4' }}>
                            Interests & Hobbies
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {interests.map((interest, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-3 rounded-lg"
                                    style={{ backgroundColor: 'rgba(201, 173, 167, 0.1)' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div style={{ color: '#C9ADA7' }}>
                                            {interest.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-medium" style={{ color: '#F2E9E4' }}>
                                                {interest.label}
                                            </h4>
                                            <p className="text-sm" style={{ color: '#9A8C98' }}>
                                                {interest.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Languages */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#2D2D45] p-4 rounded-lg"
                    >
                        <h3 className="text-lg font-semibold mb-4" style={{ color: '#F2E9E4' }}>
                            Languages
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {languages.map((language, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center gap-3 p-2 rounded-lg"
                                    style={{ backgroundColor: 'rgba(201, 173, 167, 0.1)' }}
                                >
                                    <span className="text-2xl">{language.flag}</span>
                                    <div>
                                        <h4 className="font-medium" style={{ color: '#F2E9E4' }}>
                                            {language.name}
                                        </h4>
                                        <p className="text-sm" style={{ color: '#9A8C98' }}>
                                            {language.proficiency}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageSection>
    );
};

export default About;