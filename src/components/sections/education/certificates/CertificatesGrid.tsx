import React, {useState, useEffect, useRef} from 'react';
import {Award, ChevronLeft, ChevronRight, ExternalLink, Search, SearchX, X} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Import Components
import { StatusBadge } from './badges/StatusBadge';
import { NewBadge } from './badges/NewBadge';
import { FeaturedBadge } from './badges/FeaturedBadge';
import { FilterMenu } from './filters/FilterMenu';
import { Certificate, FilterOptions } from './types/certificate.types';

// Empty State Component
const EmptyState: React.FC<{ searchTerm: string }> = ({ searchTerm }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 px-4"
    >
        <SearchX size={48} className="mb-4" style={{ color: '#9A8C98' }} />
        <h4 className="text-xl font-semibold mb-2" style={{ color: '#22223B' }}>
            No certificates found
        </h4>
        {searchTerm ? (
            <p className="text-center" style={{ color: '#4A4E69' }}>
                No results found for &ldquo;<span className="font-medium">{searchTerm}</span>&ldquo;.<br />
                Try adjusting your search or filter criteria.
            </p>
        ) : (
            <p className="text-center" style={{ color: '#4A4E69' }}>
                No certificates available for the selected category.
            </p>
        )}
    </motion.div>
);

// Nav Button Component
const NavButton: React.FC<{
    direction: 'left' | 'right',
    onClick: () => void,
    canScroll: boolean,
    isKeyPressed?: boolean
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
        aria-label={`${direction === 'left' ? 'Previous' : 'Next'} certificates`}
    >
        {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </button>
);

const certificatesData: Certificate[] = [
    {
        id: '1',
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services (AWS)',
        issueDate: 'December 2023',
        expiryDate: 'December 2026',
        verificationLink: 'https://aws.amazon.com/verify',
        category: 'technical',
        skills: ['Cloud Computing', 'AWS Services', 'Cloud Security'],
        status: 'completed',
        featured: true,
        dateAdded: '2024-01-15'
    },
    {
        id: '2',
        name: 'Google IT Support Professional Certificate',
        issuer: 'Google',
        issueDate: 'June 2022',
        expiryDate: undefined,
        verificationLink: 'https://grow.google/it-support',
        category: 'technical',
        skills: ['IT Support', 'Networking', 'Troubleshooting'],
        status: 'completed',
        featured: true,
        dateAdded: '2022-06-15'
    },
    {
        id: '3',
        name: 'Certified ScrumMaster (CSM)',
        issuer: 'Scrum Alliance',
        issueDate: 'March 2023',
        expiryDate: undefined,
        verificationLink: 'https://www.scrumalliance.org/verify',
        category: 'professional',
        skills: ['Agile Methodologies', 'Scrum Framework', 'Team Collaboration'],
        status: 'completed',
        featured: false,
        dateAdded: '2023-03-15'
    },
    {
        id: '4',
        name: 'Certified Information Systems Security Professional (CISSP)',
        issuer: 'International Information System Security Certification Consortium (ISC)²',
        issueDate: 'August 2024',
        expiryDate: 'August 2027',
        verificationLink: 'https://www.isc2.org/verify',
        category: 'professional',
        skills: ['Information Security', 'Risk Management', 'Security Architecture'],
        status: 'in-progress',
        featured: false,
        dateAdded: '2024-08-15'
    },
    {
        id: '5',
        name: 'Google Cloud Professional Data Engineer',
        issuer: 'Google',
        issueDate: 'January 2023',
        expiryDate: 'January 2026',
        verificationLink: 'https://cloud.google.com/certification/verify',
        category: 'technical',
        skills: ['Data Engineering', 'Big Data', 'Machine Learning'],
        status: 'completed',
        featured: true,
        dateAdded: '2023-01-15'
    },
    {
        id: '6',
        name: 'CompTIA Security+',
        issuer: 'CompTIA',
        issueDate: 'November 2023',
        expiryDate: 'November 2026',
        verificationLink: 'https://www.comptia.org/verify',
        category: 'technical',
        skills: ['Network Security', 'Threat Management', 'Cryptography'],
        status: 'completed',
        featured: false,
        dateAdded: '2023-11-15'
    },
    {
        id: '7',
        name: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'Cloud Native Computing Foundation (CNCF)',
        issueDate: 'April 2024',
        expiryDate: 'April 2027',
        verificationLink: 'https://www.cncf.io/verify',
        category: 'technical',
        skills: ['Kubernetes', 'Container Orchestration', 'Microservices'],
        status: 'in-progress',
        featured: false,
        dateAdded: '2024-04-15'
    }
    // Add more certificates here
]

const CertificatesGrid: React.FC = () => {
    // State management
    const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'professional' | 'achievement'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [, setIsVisible] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        status: 'all',
        featured: false
    });
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [keyboardState, setKeyboardState] = useState({ left: false, right: false });
    const [currentPage, setCurrentPage] = useState(0);

    // Calculate category counts
    const categoryCounts = {
        all: certificatesData.length,
        technical: certificatesData.filter(cert => cert.category === 'technical').length,
        professional: certificatesData.filter(cert => cert.category === 'professional').length,
        achievement: certificatesData.filter(cert => cert.category === 'achievement').length
    };

    // Category buttons data
    const categories = [
        { id: 'all', label: 'All Certificates' },
        { id: 'technical', label: 'Technical' },
        { id: 'professional', label: 'Professional' },
        { id: 'achievement', label: 'Achievements' }
    ] as const;

    // Handle ESC key for modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedCertificate(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Simulate loading
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setIsVisible(true);
        }, 1000);
    }, []);

    // Filter certificates based on category and search term
    const filteredCertificates = certificatesData.filter(cert => {
        const matchesCategory = activeCategory === 'all' || cert.category === activeCategory;
        const matchesSearch = searchTerm === '' ||
            cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filters.status === 'all' || cert.status === filters.status;
        const matchesFeatured = !filters.featured || cert.featured;

        return matchesCategory && matchesSearch && matchesStatus && matchesFeatured;
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredCertificates.length / 3); // 3 certificates per view

    // Update current page on scroll
    const updateCurrentPage = () => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const newPage = Math.round(scrollLeft / clientWidth);
            setCurrentPage(newPage);
        }
    };

    // Check Scroll Position
    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // Subtract 10 for buffer
            updateCurrentPage();
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

    // Modal backdrop click handler
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedCertificate(null);
        }
    };

    // Touch Handler functions
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
        };
    }, [canScrollLeft, canScrollRight]);

    // Maintain scroll position on resize
    useEffect(() => {
        if (sliderRef.current) {
            const handleResize = () => {
                // Maintain current page position on resize
                const scrollAmount = currentPage * sliderRef.current!.clientWidth;
                sliderRef.current!.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [currentPage]);

    return (
        <div className="py-8">
            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#22223B' }}>
                Certificates & Achievements
            </h3>

            {/* Search and Filter Bar */}
            <div className="mb-2 space-y-4">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                    <input
                        type="text"
                        placeholder="Search certificates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#4A4E69] focus:border-transparent"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <X size={16} className="text-gray-400 hover:text-gray-600"/>
                        </button>
                    )}
                </div>

                {/* Category Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Left Side: Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                                    activeCategory === category.id
                                        ? 'bg-[#4A4E69] text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                <span>{category.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-sm ${
                                    activeCategory === category.id
                                        ? 'bg-white text-[#4A4E69]'
                                        : 'bg-[#4A4E69] text-white bg-opacity-90'
                                }`}>
                                    {categoryCounts[category.id]}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right Side: Filter Menu */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center mt-6">
                            <FilterMenu
                                onFilterChange={setFilters}
                                currentFilters={filters}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificates Slider */}
            <div className="relative"
                 onMouseEnter={() => setIsHovering(true)}
                 onMouseLeave={() => setIsHovering(false)}
            >
                {/* Navigation Buttons */}
                {!isLoading && filteredCertificates.length > 0 && (
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

                {/* Certificates Slider Container */}
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
                        {isLoading ? (
                            // Show skeletons while loading
                            Array(3).fill(null).map((_, index) => (
                                <div
                                    key={`skeleton-${index}`}
                                    className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)]"
                                >
                                    <div className="w-8 h-8 bg-gray-200 rounded-full mb-4"/>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"/>
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"/>
                                    <div className="h-2 bg-gray-200 rounded w-1/4 mb-2"/>
                                    <div className="h-2 bg-gray-200 rounded w-1/3 mb-4"/>
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-6 bg-gray-200 rounded w-16"/>
                                        <div className="h-6 bg-gray-200 rounded w-16"/>
                                    </div>
                                </div>
                            ))
                        ) : filteredCertificates.length > 0 ? (
                            filteredCertificates.map((certificate) => (
                                <motion.div
                                    key={certificate.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)]"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    <motion.div
                                        key={certificate.id}
                                        layout
                                        initial={{opacity: 0, scale: 0.95}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.95}}
                                        className="group bg-white rounded-lg shadow-lg p-6 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                                        onClick={() => setSelectedCertificate(certificate)}
                                    >
                                        {/* Top Row: Icon, Badges, and NEW tag */}
                                        <div className="flex items-center gap-2 mb-4">
                                            {/* Certificate Icon/Badge */}
                                            <div className="transform group-hover:scale-110 transition-transform duration-300">
                                                <Award size={32} style={{ color: '#4A4E69' }} />
                                            </div>

                                            {/* Badges */}
                                            <div className="flex items-center gap-2 flex-wrap flex-1">
                                                {certificate.featured && <FeaturedBadge />}
                                                <StatusBadge status={certificate.status} />
                                            </div>

                                            {/* NEW Badge */}
                                            <NewBadge dateAdded={certificate.dateAdded} />
                                        </div>

                                        {/* Certificate Title */}
                                        <h4 className="text-lg font-semibold mb-2" style={{color: '#22223B'}}>
                                            {certificate.name}
                                        </h4>

                                        {/* Issuer */}
                                        <p className="text-sm mb-4" style={{color: '#4A4E69'}}>
                                            {certificate.issuer}
                                        </p>

                                        {/* Date Issued and Expiry */}
                                        <div className="text-sm mb-4" style={{color: '#9A8C98'}}>
                                            <p>Issued: {certificate.issueDate}</p>
                                            {certificate.expiryDate && <p>Expires: {certificate.expiryDate}</p>}
                                        </div>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {certificate.skills.map((skill, index) => (
                                                <motion.span
                                                    key={index}
                                                    whileHover={{scale: 1.05}}
                                                    className="text-xs px-2 py-1 rounded-full"
                                                    style={{backgroundColor: '#4A4E69', color: '#F2E9E4'}}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>

                                        {/* Verification Link */}
                                        {certificate.verificationLink && (
                                            <motion.a
                                                href={certificate.verificationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm hover:underline"
                                                style={{color: '#4A4E69'}}
                                                onClick={(e) => e.stopPropagation()}
                                                whileHover={{scale: 1.05}}
                                            >
                                                Verify Certificate
                                                <ExternalLink size={16} />
                                            </motion.a>
                                        )}
                                    </motion.div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full">
                                <EmptyState searchTerm={searchTerm}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Pagination Indicators */}
            {!isLoading && filteredCertificates.length > 0 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => {
                                if (sliderRef.current) {
                                    const scrollAmount = (sliderRef.current.clientWidth) * index;
                                    sliderRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                                }
                            }}
                            className={`h-2 rounded-full transition-all ${
                                currentPage === index
                                    ? 'w-8 bg-[#4A4E69]'
                                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Go to page ${index + 1}`}
                            aria-current={currentPage === index ? 'page' : undefined}
                        />
                    ))}
                </div>
            )}

            {/* Certificate Details Modal */}
            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative p-6">
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedCertificate(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} style={{color: '#4A4E69'}}/>
                                </button>

                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <Award size={64} style={{ color: '#4A4E69' }}/>
                                    </div>
                                    <div className="flex-grow pr-8">
                                        <h2 className="text-2xl font-semibold mb-2" style={{color: '#22223B'}}>
                                            {selectedCertificate.name}
                                        </h2>
                                        <p className="text-lg mb-4" style={{color: '#4A4E69'}}>
                                            {selectedCertificate.issuer}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <h3 className="font-semibold mb-2" style={{color: '#22223B'}}>
                                                    Issue Date
                                                </h3>
                                                <p style={{color: '#9A8C98'}}>{selectedCertificate.issueDate}</p>
                                            </div>
                                            {selectedCertificate.expiryDate && (
                                                <div>
                                                    <h3 className="font-semibold mb-2" style={{color: '#22223B'}}>
                                                        Expiry Date
                                                    </h3>
                                                    <p style={{color: '#9A8C98'}}>{selectedCertificate.expiryDate}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="font-semibold mb-2" style={{color: '#22223B'}}>Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCertificate.skills.map((skill, index) => (
                                                    <motion.span
                                                        key={index}
                                                        whileHover={{scale: 1.05}}
                                                        className="text-sm px-3 py-1 rounded-full"
                                                        style={{backgroundColor: '#4A4E69', color: '#F2E9E4'}}
                                                    >
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedCertificate.description && (
                                            <div className="mb-6">
                                                <h3 className="font-semibold mb-2" style={{ color: '#22223B' }}>Description</h3>
                                                <p style={{ color: '#4A4E69' }}>{selectedCertificate.description}</p>
                                            </div>
                                        )}

                                        {selectedCertificate.verificationLink && (
                                            <motion.a
                                                href={selectedCertificate.verificationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
                                                style={{ backgroundColor: '#4A4E69', color: '#F2E9E4' }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Verify Certificate
                                                <ExternalLink size={16} />
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    )}
            </AnimatePresence>
        </div>
    );
};

export default CertificatesGrid;