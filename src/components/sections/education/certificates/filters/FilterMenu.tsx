import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { FilterOptions } from '../types/certificate.types';

interface FilterProps {
    onFilterChange: (filters: FilterOptions) => void;
    currentFilters: FilterOptions;
}

export const FilterMenu: React.FC<FilterProps> = ({ onFilterChange, currentFilters }) => {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
                <Filter size={16} className="text-[#4A4E69]" />
                <span className="text-sm font-medium" style={{ color: '#22223B' }}>Filters:</span>
            </div>

            <select
                value={currentFilters.status || 'all'}
                onChange={(e) => onFilterChange({
                    ...currentFilters,
                    status: e.target.value as FilterOptions['status']
                })}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#4A4E69] focus:border-transparent"
            >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="expired">Expired</option>
            </select>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange({
                    ...currentFilters,
                    featured: !currentFilters.featured
                })}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                    currentFilters.featured
                        ? 'bg-[#4A4E69] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
                Featured Only
            </motion.button>
        </div>
    );
};