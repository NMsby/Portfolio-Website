import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#22223B] py-4">
            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-sm" style={{ color: '#9A8C98' }}>
                    © {new Date().getFullYear()} Nelson Masbayi. All rights reserved.
                </p>
                <p className="text-sm flex items-center gap-1" style={{ color: '#9A8C98' }}>
                    Made with <Heart size={16} className="text=[#C9ADA7] fill-red-500" /> in Nairobi
                </p>
            </div>
        </footer>
    );
};

export default Footer;