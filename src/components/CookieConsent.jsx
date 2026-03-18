'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CookieConsent() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    // Only show on the main (home) page. 
    const isMainPage = pathname === '/';

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
            {isVisible && isMainPage && (
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[100]"
                >
                    <div className="relative bg-white/80 backdrop-blur-2xl border-t border-gray-300 rounded-t-[0.5rem] p-5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                        {/* Architectural Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] select-none pointer-events-none">
                            <Zap className="w-full h-full text-[#14b88f]" strokeWidth={0.5} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 rounded-2xl bg-[#14b88f]/10 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-[#14b88f]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">Privacy Protocol</p>
                                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Cookie Consent</h3>
                                </div>
                                <button
                                    onClick={handleDecline}
                                    className="ml-auto p-2 text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className='flex items-start gap-4'>
                                <p className="text-gray-500 text-sm leading-relaxed mb-3 font-light">
                                    Welcome to auxinz.io! In order to provide a more relevant experience for you, we use cookies to enable some website functionality. Cookies help us see which articles most interest you; allow you to easily share articles on social media; permit us to deliver content, jobs and ads tailored to your interests and locations; and provide many other site benefits. For more information, please review our <Link href="/cookie-policy" className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500" >Cookies Policy</Link> and <Link href="/privacy-policy" className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">Privacy Statement</Link>.
                                </p>

                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                    <button
                                        onClick={handleAccept}
                                        className="min-w-[200px] px-5 py-4 bg-gray-900 text-white rounded-2xl font-bold text-xs tracking-widest uppercase hover:bg-black transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 group"
                                    >
                                        Accept Cookie <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
