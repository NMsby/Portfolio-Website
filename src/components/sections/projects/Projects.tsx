"use client";

import React from 'react';
import PageSection from "@/components/layout/PageSection";
import SectionHeading from "@/components/layout/SectionHeading";
import ProjectCard from "@/components/sections/projects/ProjectCard";

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
    return (
        <PageSection
            id="projects"
            backgroundColor="background"
            containerWidth="default" // Using our predefined width
            className="py-8"
        >
            <SectionHeading
                title="Featured Projects"
                subtitle="A collection of my recent work and contributions."
                align="center"
            />

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectData.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </PageSection>
    );
};

export default Projects;