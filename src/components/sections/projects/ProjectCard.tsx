import React from 'react';
import {ExternalLink, Github} from "lucide-react";

// Types
interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: string;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    image,
    technologies,
    category,
    githubUrl,
    liveUrl,
    featured
}) => {
    return (
        <article className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#4A4E69]"
            tabIndex={0}
        >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden group">
                <img
                    src={image}
                    alt={`Screenshot of ${title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = '/pi/placeholder/600/400';        // Add fallback image
                        e.currentTarget.alt = 'Project thumbnail placeholder';       // Add fallback alt text
                    }}
                />
                {/* Overlay with Links */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C9ADA7] group/link relative"
                            aria-label={`View ${title} source code on Github`}
                        >
                            <Github size={20} style={{ color: '#22223B' }} />
                            <span
                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs text-center opacity-0 group-hover/link:opacity-100 transition-opacity whitespace-nowrap"
                                style={{backgroundColor: '#4A4E69', color: '#F2E9E4'}}
                            >
                                Code
                            </span>
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C9ADA7] group/link relative"
                            aria-label={`View ${title} live demo`}
                        >
                            <ExternalLink size={20} style={{color: '##22223B'}}/>
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs text-center opacity-0 group-hover/link:opacity-100 transition-opacity whitespace-nowrap"
                                  style={{backgroundColor: '#4A4E69', color: '#F2E9E4'}}
                            >
                                Demo
                            </span>
                        </a>
                    )}
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6 space-y-4">
                {/* Category Tag */}
                <div className={"flex justify-between items-start gap-4"}>
                    <h3 className="text-xl font-semibold" style={{color: '#22223B'}}>
                        {title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                          style={{backgroundColor: '#4A4E69', color: '#F2E9E4'}}
                    >
                        {category}
                    </span>
                </div>

                <p
                    className="text-sm line-clamp-3"
                    style={{color: '#4A4E69'}}
                    title={description}
                >
                    {description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs transition-transform hover:scale-105"
                            style={{backgroundColor: '#9A8C98', color: '#F2E9E4'}}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Featured Badge */}
            {featured && (
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium"
                    style={{backgroundColor: '#C9ADA7', color: '#22223B'}}
                >
                    Featured
                </div>
            )}
        </article>
    );
};

export default ProjectCard;