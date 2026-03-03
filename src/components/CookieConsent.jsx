'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const hasConsented = localStorage.getItem('auxinzio_cookie_consent');
        if (!hasConsented) {
            // Delay showing the popup for a more premium entrance
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('auxinzio_cookie_consent', 'true');
        // You could also set a proper document.cookie here for backend access
        document.cookie = "auxinzio_consent=true; path=/; max-age=" + 365 * 24 * 60 * 60;
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('auxinzio_cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-10 lg:w-[450px] z-[100]"
                >
                    <div className="relative bg-white/80 backdrop-blur-2xl border border-gray-100 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                        {/* Architectural Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] select-none pointer-events-none">
                            <Zap className="w-full h-full text-[#14b8a6]" strokeWidth={0.5} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-[#14b8a6]/10 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-[#14b8a6]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">Privacy Protocol</p>
                                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Cookie Architecture</h3>
                                </div>
                                <button
                                    onClick={handleDecline}
                                    className="ml-auto p-2 text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <p className="text-gray-500 text-sm leading-relaxed mb-10 font-light">
                                We utilize advanced tracking tokens to refine your digital interaction and maintain your data sovereignty. Synchronizing with our cookies ensures a high-fidelity experience optimized for your workflow.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button
                                    onClick={handleAccept}
                                    className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-black transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 group"
                                >
                                    Synchronize <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <Link
                                    href="/cookie-policy"
                                    className="text-[10px] font-bold uppercase tracking-widest text-[#14b8a6] hover:underline underline-offset-8 decoration-[#14b8a6]/30"
                                    onClick={() => setIsVisible(false)}
                                >
                                    Technical Specifics
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
