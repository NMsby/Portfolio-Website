"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const navigationItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
]

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const activeSection = useScrollSpy(
        navigationItems.map(item => item.id)
    )

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            // Add a small buffer (10px) to prevent flickering
            setIsScrolled(window.scrollY > 10);
            setShowScrollTop(window.scrollY > 500);
        };

        // Add passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth Scroll function
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled || isMenuOpen 
                        ? 'bg-primary shadow-lg' 
                        : 'bg-primary bg-opacity-90 backdrop-blur-sm'
                }`}
            >
                <MaxWidthWrapper>
                    <nav className="flex items-center justify-between py-4">
                        {/* Logo Name */}
                        <a
                            href="#hero"
                            onClick={(e) => scrollToSection(e, '#hero')}
                            className="text-xl font-primary font-bold text-background relative z-50"
                        >
                            Nelson Masbayi Muyodi
                        </a>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-8">
                            {navigationItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className={`text-background transition-colors relative py-2 
                                            ${activeSection === item.id 
                                                ? 'text-interactive' 
                                                : 'hover:text-interactive'
                                            }
                                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full
                                            after:h-0.5 after:bg-interactive after:transition-all after:scale-x-0 
                                            after:origin-center hover:after:scale-x-100
                                            ${activeSection === item.id ? 'after:scale-x-100' : ''}
                                        `}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-background p-2 relative z-50"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </nav>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden absolute top-0 left-0 right-0 min-h-screen bg-primary">
                            <div className="pt-20 pb-8 px-4">
                                <ul className="space-y-6">
                                    {navigationItems.map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                onClick={(e) => scrollToSection(e, item.href)}
                                                className={`block text-xl transition-colors
                                                    ${activeSection === item.id 
                                                        ? 'text-background' 
                                                        : 'text-background hover:text-interactive'
                                                    }
                                                `}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </MaxWidthWrapper>
            </header>

            {/* Scroll to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-background 
                    shadow-lg transition-all duration-300 hover:scale-110 z-50 
                    ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
                `}
                aria-label="Scroll to top"
            >
                <ChevronUp size={24} />
            </button>
        </>
    );
};

export default Navbar;