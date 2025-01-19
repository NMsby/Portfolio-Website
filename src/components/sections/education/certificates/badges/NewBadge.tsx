import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface NewBadgeProps {
    dateAdded: string;
    daysToShow?: number;
}

export const NewBadge: React.FC<NewBadgeProps> = ({ dateAdded, daysToShow = 30 }) => {
    const isNew = () => {
        const addedDate = new Date(dateAdded);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - addedDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= daysToShow;
    };

    if (!isNew()) return null;

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 -right-2 bg-[#F59E0B] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"
        >
            <Sparkles size={12} />
            NEW
        </motion.div>
    );
};