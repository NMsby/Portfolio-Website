import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
    status: 'completed' | 'in-progress' | 'expired';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusConfig = {
        completed: {
            icon: CheckCircle,
            color: '#10B981',
            text: 'Completed'
        },
        'in-progress': {
            icon: Clock,
            color: '#3B82F6',
            text: 'In Progress'
        },
        expired: {
            icon: AlertCircle,
            color: '#EF4444',
            text: 'Expired'
        }
    };

    const config = statusConfig[status];

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
            style={{
                backgroundColor: `${config.color}15`,
                color: config.color
            }}
        >
            <config.icon size={12} />
            <span>{config.text}</span>
        </motion.div>
    );
};