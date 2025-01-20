"use client";

import React, {useState, useEffect, useRef, JSX} from 'react';
import { Code, Terminal, Database, Github, LinkedinIcon, ArrowDown } from 'lucide-react';
import PageSection from '@/components/layout/PageSection';

// Types
interface SocialLink {
    platform: string;
    icon: React.ElementType;
    url: string;
    tooltip: string;
    label: string;
}

interface SkillCard {
    id: string;
    icon: JSX.Element;
    title: string;
    skills: string;
    color: string;
}

// Screen Reader Announcer Component
const Announcer: React.FC<{ message: string }> = ({ message }) => (
    <div className="sr-only" role="status" aria-live="polite">
        { message }
    </div>
);

const Hero = () => {
    // State Management
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false); // For fade-in animation
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
    const [announcement, setAnnouncement] = useState('');
    const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('desktop');

    // Refs
    const contentRef = useRef<HTMLDivElement>(null);

    // Data
    // Social Links
    const socialLinks: SocialLink[] = [
        {
            platform: 'Github',
            icon: Github,
            url: "https://github.com/NMsby",
            tooltip: "Visit my Github profile",
            label: "Github Profile"
        },
        {
            platform: 'LinkedIn',
            icon: LinkedinIcon,
            url: "https://www.linkedin.com/in/nmsby/",
            tooltip: "Connect on LinkedIn",
            label: "LinkedIn Profile"
        }
    ];

    // Skills Cards
    const skillCards: SkillCard[] = [
        {
            id: 'frontend',
            icon: <Code size={28} />,
            title: 'Frontend',
            skills: 'React, TypeScript, Tailwind',
            color: '#4A4E69'
        },
        {
            id: 'backend',
            icon: <Terminal size={28} />,
            title: 'Backend',
            skills: 'Node.js, Python, APIs',
            color: '#4A4E69'
        },
        {
            id: 'database',
            icon: <Database size={28} />,
            title: 'Database',
            skills: 'SQL, MongoDB, Redis',
            color: '#4A4E69'
        }
    ];

    // Effects
    useEffect(() => {
        setIsVisible(true);

        // Mobile detection
        const checkDeviceType = () => {
            setDeviceType(window.innerWidth < 768 ? 'mobile' : 'desktop');
        };

        checkDeviceType();
        window.addEventListener('resize', checkDeviceType);
        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);

    // Handlers
    const handleSocialClick = async (platform: string, url: string) => {
        setLoadingStates(prev => ({ ...prev, [platform]: true }));
        setAnnouncement(`Opening ${platform} in a new tab`);

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            window.open(url, '_blank', 'noopener,noreferrer');
        } finally {
            setLoadingStates(prev => ({ ...prev, [platform]: false }));
            setAnnouncement('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            callback();
        }
    };

    const handleTooltipToggle = (tooltip: string | null) => {
        setActiveTooltip(tooltip);
    };

    return (
        <PageSection
            id="hero"
            backgroundColor="primary"
            containerWidth="full"
            className="min-h-screen p-0 relative overflow-hidden"
        >
            {/* Announcer for Screen Readers */}
            <Announcer message={announcement} />

            {/* Background Pattern */}
            <div className="absolute inset-0 w-full h-full opacity-[0.03]">
                <div className="w-full h-full"
                     style={{
                         backgroundImage: 'linear-gradient(to right, #F2E924 1px, transparent 1px), linear-gradient(to bottom, #F2E924 1px, transparent 1px)',
                         backgroundSize: '50px 50px',
                         backgroundPosition: 'center',
                         backgroundRepeat: 'repeat',
                     }}
                />
            </div>


            {/* Main Content Container */}
            <div
                ref={contentRef}
                className={`relative h-full w-full z-10 transition-opacity duration-1000 ${ 
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="w-full max-w-6xl mx-auto px-4 h-full">
                    <div className="flex flex-col md:flex-row h-full">

                        {/* Left Content Side */}
                        <div className="flex-1 flex items-center justify-center px-4 py-2">
                            <div className="max-w-lg">
                                {/* Social Links */}
                                <div className="flex space-x-4 mb-4">
                                    {socialLinks.map((social)=> (
                                        <div
                                            key={social.platform}
                                            className="relative"
                                            onMouseEnter={() => handleTooltipToggle(social.tooltip)}
                                            onMouseLeave={() => handleTooltipToggle(null)}
                                        >
                                            <button
                                                className={`p - 1.5 rounded-lg transition-all ${ 
                                                    loadingStates[social.platform] 
                                                        ? 'opacity-50 cursor-wait' 
                                                        : 'hover:scale-110 hover:rotate-6' 
                                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9ADA7]`}
                                                style={{
                                                    backgroundColor: 'rgba(201, 173, 167, 0.1)',
                                                    color: '#C9ADA7'
                                                }}
                                                onClick={() => handleSocialClick(social.platform, social.url)}
                                                onKeyDown={(e) => handleKeyPress(e, () => handleSocialClick(social.platform, social.url))}
                                                disabled={loadingStates[social.platform]}
                                                aria-label={social.label}
                                                tabIndex={0}        // Make sure it's focusable
                                            >
                                                {loadingStates[social.platform] ? (
                                                    <div className="animate-spin w-6 h-6">
                                                        <div className="w-full h-full border-2 border-t-transparent rounded-full" />
                                                    </div>
                                                ) : (
                                                    <social.icon size={24} />
                                                )}
                                            </button>

                                            {/* Tooltip */}
                                            {activeTooltip === social.tooltip && (
                                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap bg-opacity-90 backdrop-blur-sm"
                                                    style={{
                                                        backgroundColor: '#4A4E69',
                                                        color: 'F2E9E4'
                                                    }}
                                                >
                                                    {social.tooltip}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Main Content */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2" style={{ color: '#9A8C98' }}>
                                        <span className="text-base animate-wave inline-block">👋</span>
                                        <span className="text-base">Hi there! I&apos;m</span>
                                    </div>
                                    <h1 className="text-4xl font-extrabold" style={{ color: '#F2E9E4' }}>
                                        Nelson Masbayi Muyodi
                                        <span className="block text-2xl mt-1" style={{ color: '#C9ADA7' }}>
                                            Software Engineer
                                        </span>
                                    </h1>

                                    {/* Bio */}
                                    <p className="text-base leading-relaxed" style={{ color: '#9A8C98' }}>
                                        A passionate Informatics & Computer Science student, transforming complex problems
                                        into elegant solutions through code.
                                    </p>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-wrap gap-3 pt-3">
                                        <button
                                            className="group px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9ADA7]"
                                            style={{
                                                backgroundColor: '#C9ADA7',
                                                color: '#22223B',
                                            }}
                                            tabIndex={0}
                                        >
                                            <span className="relative z-10">View Projects</span>
                                            <div
                                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                            />
                                        </button>
                                        <button
                                            className="group px-5 py-2 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9ADA7]"
                                            style={{
                                                borderColor: '#C9ADA7',
                                                color: '#F2E9E4',
                                            }}
                                            tabIndex={0}
                                        >
                                            <span className="relative z-10">Contact Me</span>
                                            <div
                                                className="absolute inset-0 bg-[#C9ADA7] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Skills Side */}
                        <div className="flex-1 flex items-center justify-center px-4">
                            <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                                {/* Skills Cards */}
                                {skillCards.map((card) => (
                                    <div
                                        key={card.id}
                                        role="button"
                                        tabIndex={0}
                                        className="p-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:rotate-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9ADA7]"
                                        style={{
                                            backgroundColor: '#2D2D45',
                                            boxShadow: hoveredCard === card.id
                                                ? '0 8px 28px 0 rgba(0, 0, 0, 0.2)'
                                                : '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                                            transform: `perspective(1000px) ${
                                                hoveredCard === card.id ? 'translateZ(20px)' : 'translateZ(0)'
                                            }`,
                                        }}
                                        onMouseEnter={() => setHoveredCard(card.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        onKeyDown={(e) => handleKeyPress(e, () => setHoveredCard(card.id))}
                                        aria-label={`${card.title} - ${card.skills}`}
                                    >
                                        <div className="transition-transform duration-300 transform group-hover:scale-110"
                                             style={{ color: '#F2E9E4' }}
                                        >
                                            {card.icon}
                                        </div>
                                        <h3 className="mt-4 font-semibold text-lg transition-colors duration-300"
                                            style={{ color: '#F2E9E4' }}
                                        >
                                            {card.title}
                                        </h3>
                                        <p className="mt-2 text-sm transition-colors duration-300"
                                           style={{ color: '#9A8C98' }}
                                        >
                                            {card.skills}
                                        </p>
                                    </div>
                                ))}

                                {/* Experience Card */}
                                <div
                                    className="p-6 rounded-lg flex flex-col justify-center transition-all duration-300 transform hover:scale-105"
                                    style={{
                                        backgroundColor: '#C9ADA7',
                                    }}
                                    onMouseEnter={() => setHoveredCard('experience')}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <span className="text-4xl font-bold" style={{ color: '#22223B' }}>2+</span>
                                    <span className="text-sm font-semibold mt-2" style={{ color: '#22223B' }}>
                                        Years of Coding Experience
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute mt-8 left-1/2 transform -translate-x-1/2">
                    <div className="animate-bounce-slow ml-10">
                        <ArrowDown size={24} className="text-[#C9ADA7] opacitty-75" />
                    </div>
                    <p className="text-sm text-[#C9ADA7] mt-4">Scroll to explore</p>
                </div>
            </div>
        </PageSection>
    );
};

export default Hero;