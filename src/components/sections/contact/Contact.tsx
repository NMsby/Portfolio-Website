"use client";

import React, {JSX, useState} from 'react';
import { motion } from 'framer-motion';
import {
    Mail, MapPin, Send, Loader2, Phone,
    Copy, Check,
    Github, Linkedin, Twitter, Award,
    AlertCircle, CheckCircle
} from 'lucide-react';
import PageSection from "@/components/layout/PageSection";
import SectionHeading from "@/components/layout/SectionHeading";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

type FormStatus = 'idle' | 'success' | 'error';

interface FormFeedback {
    message: string;
    type: FormStatus;
}

interface SocialLink {
    platform: string;
    icon: JSX.Element;
    url: string;
    color: string;
}

// Add social links data
const socialLinks: SocialLink[] = [
    {
        platform: 'GitHub',
        icon: <Github size={20} className="text-[#C9ADA7]" />,
        url: 'https://github.com/NMsby',
        color: '#F2E9E4'
    },
    {
        platform: 'LinkedIn',
        icon: <Linkedin size={20} className="text-[#C9ADA7]" />,
        url: 'https://linkedin.com/in/nmsby',
        color: '#0A66C2'
    },
    {
        platform: 'Credly',
        icon: <Award size={20} className="text-[#C9ADA7]" />,
        url: 'https://www.credly.com/users/nmsby',
        color: '#FF6B00'
    },
    {
        platform: 'Twitter',
        icon: <Twitter size={20} className="text-[#C9ADA7]" />,
        url: 'https://twitter.com/yourusername',
        color: '#1DA1F2'
    }
];

const Contact = () => {
    // Form state
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<ContactFormData>>({});
    const [charCount, setCharCount] = useState(0);
    const [formFeedback, setFormFeedback] = useState<FormFeedback | null>(null);
    const maxMessageLength = 500;
    const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
    const [activeToolTip, setActiveToolTip] = useState<string | null>(null);

    // Copy Function
    const copyToClipboard = async (text: string, field: 'email' | 'phone') => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };

    // Validation Function
    const validateForm = () => {
        const newErrors: Partial<ContactFormData> = {};

        // Name validation
        if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Name must not exceed 50 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Message validation
        if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        } else if (formData.message.length > maxMessageLength) {
            newErrors.message = `Message must not exceed ${maxMessageLength} characters`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setFormFeedback({
                message: 'Please fix the errors in the form',
                type: 'error'
            });
            return;
        }

        setIsLoading(true);
        setFormFeedback(null);

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            setFormFeedback({
                message: 'Message sent successfully! I\'ll get back to you soon.',
                type: 'success'
            });

            // Reset form
            setFormData({ name:'', email: '', message: ''});
            setCharCount(0);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setFormFeedback({
                message: 'Failed to send message. Please try again.',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageSection
            id="contact"
            backgroundColor="background"
            containerWidth="default"
            className="py-4"
        >
            <SectionHeading
                title="Get in Touch"
                subtitle="Let's connect and discuss opportunities"
                align="center"
            />

            <div className="mt-2 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <form onSubmit={handleSubmit} className="space-y-2">
                            {/* Form Feedback Message */}
                            {formFeedback && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-lg flex items-center gap-2 ${
                                        formFeedback.type === 'success'
                                            ? 'bg-green-500/10 text-green-500'
                                            : 'bg-red-500/10 text-red-500'
                                    }`}
                                >
                                    {formFeedback.type === 'success' ? (
                                        <CheckCircle size={20} />
                                    ) : (
                                        <AlertCircle size={20} />
                                    )}
                                    <p>{formFeedback.message}</p>
                                </motion.div>
                            )}

                            {/* Name Input */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-medium font-medium mb-2"
                                    style={{ color: '#22223B' }}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({...formData, name: e.target.value});
                                        if (errors.name) setErrors({...errors, name: ''});
                                    }}
                                    className={`w-full px-4 py-2 rounded-lg bg-[#2D2D45] border ${
                                        errors.name ? 'border-red-500' : 'border-[#4A4E69]'
                                    } focus:ring-2 focus:ring-[#C9ADA7] focus:border-transparent`}
                                    style={{ color: '#F2E9E4' }}
                                    required
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <p id="name-error" className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-medium font-medium mb-2"
                                    style={{ color: '#22223B' }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({...formData, email: e.target.value});
                                        if (errors.email) setErrors({...errors, email: ''});
                                    }}
                                    className={`w-full px-4 py-2 rounded-lg bg-[#2D2D45] border ${
                                        errors.email ? 'border-red-500' : 'border-[#4A4E69]'
                                    } focus:ring-2 focus:ring-[#C9ADA7] focus:border-transparent`}
                                    style={{ color: '#F2E9E4' }}
                                    required
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && (
                                    <p id="email-error" className="mt-1 text-medium text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Message Input */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-medium font-medium mb-2"
                                    style={{ color: '#22223B' }}
                                >
                                    Message
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => {
                                            setFormData({...formData, message: e.target.value});
                                            if (errors.message) setErrors({...errors, message: ''});
                                        }}
                                        rows={5}
                                        className={`w-full px-4 py-2 rounded-lg bg-[#2D2D45] border ${
                                            errors.message ? 'border-red-500' : 'border-[#4A4E69]'
                                        } focus:ring-2 focus:ring-[#C9ADA7] focus:border-transparent`}
                                        style={{ color: '#F2E9E4' }}
                                        required
                                    />
                                    <div
                                        id="char-count"
                                        className={`absolute bottom-2 right-2 text-xs ${
                                            charCount > maxMessageLength * 0.9 
                                                ? 'text-red-500'
                                                : 'text-gray-400'
                                        }`}
                                    >
                                        {charCount}/{maxMessageLength}
                                    </div>
                                </div>
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                                style={{ backgroundColor: '#C9ADA7', color: '#22223B' }}
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-10"
                    >
                        <div className="bg-[#2D2D45] p-6 rounded-lg space-y-4">
                            {/* Email */}
                            <div className="flex items-start gap-4 group">
                                <Mail className="flex-shrink-0" size={24} style={{color: '#C9ADA7'}}/>
                                <div className="flex-grow">
                                    <h3 className="font-medium" style={{color: '#F2E9E4'}}>
                                        Email
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href="mailto:nelsonmasbayi@gmail.com"
                                            className="hover:underline"
                                            style={{color: '#9A8C98'}}
                                        >
                                            nelsonmasbayi@gmail.com
                                        </a>
                                        <button
                                            onClick={() => copyToClipboard('nelsonmasbayi@gmail.com', 'email')}
                                            className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Copy email address"
                                        >
                                            {copiedField === 'email' ? (
                                                <Check size={16} className={`text-green-500`} />
                                            ) : (
                                                <Copy size={16} className={`text-[#C9ADA7]`} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="flex items-start gap-4 group">
                                <Phone className="flex-shrink-0" size={24} style={{color: '#C9ADA7'}}/>
                                <div className="flex-grow">
                                    <h3 className="font-medium" style={{color: '#F2E9E4'}}>
                                        Phone
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href="tel:+254759792595"
                                            className="hover: underline"
                                            style={{color: '#9A8C98'}}>
                                            +254 759 792595
                                        </a>
                                        <button
                                            onClick={() => copyToClipboard('+254700000000', 'phone')}
                                            className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Copy phone number"
                                        >
                                            {copiedField === 'phone' ? (
                                                <Check size={16} className="text-green-500" />
                                            ) : (
                                                <Copy size={16} style={{ color: '#C9ADA7' }} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4">
                                <MapPin className="flex-shrink-0" size={24} style={{color: '#C9ADA7'}}/>
                                <div>
                                    <h3 className="font-medium" style={{color: '#F2E9E4'}}>
                                        Location
                                    </h3>
                                    <p style={{color: '#9A8C98'}}>
                                        Nairobi, Kenya
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-[#2D2D45] p-6 rounded-lg">
                            <h3 className="font-medium mb-4" style={{color: '#F2E9E4'}}>
                                Connect With Me
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social) => (
                                    <div
                                        key={social.platform}
                                        className="relative"
                                        onMouseEnter={() => setActiveToolTip(social.platform)}
                                        onMouseLeave={() => setActiveToolTip(null)}
                                    >
                                        <motion.a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-lg transition-all duration-300 hover:scale-110 block"
                                            style={{ backgroundColor: 'rgba(201, 173, 167, 0.1)' }}
                                            whileHover={{
                                                scale: 1.1,
                                                backgroundColor: `rgba(${social.color}, 0.1)`
                                            }}
                                            aria-label={`Visit my ${social.platform} profile`}
                                        >
                                            {social.icon}
                                        </motion.a>

                                        {/*  Tooltip  */}
                                        {activeToolTip === social.platform && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap bg-[#4A4E69] text-[#F2E9E4]"
                                            >
                                                {social.platform}
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageSection>
    );
};

export default Contact;