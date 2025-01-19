import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface Certificate {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    verificationLink: string;
    category: 'technical' | 'professional' | 'achievement';
    skills: string[];
    description?: string;
}

const certificatesData: Certificate[] = [
    {
        id: '1',
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services (AWS)',
        issueDate: 'December 2023',
        expiryDate: 'December 2026',
        verificationLink: 'https://aws.amazon.com/verify',
        category: 'technical',
        skills: ['Cloud Computing', 'AWS Services', 'Cloud Security']
    },
    // Add more certificates here
]

const CertificatesGrid: React.FC = () => {
    // State management
    const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'professional' | 'achievement'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [isVisible, setIsVisible] = useState(false);

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
    const filteredCertificates = certificatesData.filter(certificate => {
        const matchesCategory = activeCategory === 'all' || certificate.category === activeCategory;
        const matchesSearch = searchTerm === '' ||
            certificate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            certificate.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            certificate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Category buttons data
    const categories = [
        { id: 'all', label: 'All Certificates' },
        { id: 'technical', label: 'Technical' },
        { id: 'professional', label: 'Professional' },
        { id: 'achievement', label: 'Achievements' }
    ];

    // Modal backdrop click handler
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedCertificate(null);
        }
    }

    return (
        <div className="py-12">
            <h3 className="text-2xl font-semibold mb-8" style={{ color: '#22223B' }}>
                Certificates & Achievements
            </h3>

            {/* Search and Filter Bar */}
            <div className="mb-8 space-y-4">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
                            <X size={16} className="text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id as never)}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                activeCategory === category.id
                                    ? 'bg-[#4A4E69] text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    // Loading Skeletons
                    [...Array(6)].map((_, index) => (
                        <div
                            key={`skeleton-${index}`}
                            className="bg-white rounded-lg shadow-lg p-6 animate-pulse"
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
                ) : (
                    filteredCertificates.map((certificate) => (
                        <motion.div
                            key={certificate.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`group bg-white rounded-lg shadow-lg p-6 transition-all duration-500 hover:-translate-y-1 cursor-pointer`}
                            onClick={() => setSelectedCertificate(certificate)}
                        >
                            {/* Certificate Icon/Badge */}
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                <Award size={32} style={{ color: '#4A4E69' }} />
                            </div>

                            {/* Certificate Details */}
                            <h4 className="text-lg font-semibold mb-2" style={{ color: '#22223B' }}>
                                {certificate.name}
                            </h4>

                            <p className="text-sm mb-4" style={{ color: '#4A4E69' }}>
                                {certificate.issuer}
                            </p>

                            {/* Dates */}
                            <div className="text-sm mb-4" style={{ color: '#9A8C98' }}>
                                <p>Issued: {certificate.issueDate}</p>
                                {certificate.expiryDate && <p>Expires: {certificate.expiryDate}</p>}
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {certificate.skills.map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="text-xs px-2 py-1 rounded-full transform transition-all duration-300"
                                        style={{ backgroundColor: '#4A4E69', color: '#F2E9E4' }}
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
                                    style={{ color: '#4A4E69' }}
                                    onClick={(e) => e.stopPropagation()}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Verify Certificate
                                    <ExternalLink size={16} />
                                </motion.a>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {/* Certificate Details Model */}
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