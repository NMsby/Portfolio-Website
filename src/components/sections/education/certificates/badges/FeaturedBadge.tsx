import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const FeaturedBadge: React.FC = () => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
        style={{
            backgroundColor: '#F59E0B15',
            color: '#F59E0B'
        }}
    >
        <Star size={12} />
        <span>Featured</span>
    </motion.div>
);