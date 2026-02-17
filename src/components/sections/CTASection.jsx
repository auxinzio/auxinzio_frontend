"use client";
import { Phone, Mail, ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CTASection() {

    return(
        <>
            <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 font-sans">
                {/* Background Image with Parallax-like feel (static for now but layered) */}
                <div className="absolute inset-0 z-0">
                <Image 
                    src="/assets/img/bg.png" 
                    alt="Modern Corporate Glass Building" 
                    fill
                    className="w-full h-full object-cover scale-105"
                />
                {/* Primary Gradient Overlay: Blue -> Indigo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-indigo-900/90 to-slate-900/95 mix-blend-multiply" />
                
                {/* Secondary subtle blur overlay for depth */}
                <div className="absolute inset-0 backdrop-blur-[2px] bg-blue-950/30" />
                </div>

                {/* Floating Animated Particles */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                    key={i}
                    className="absolute rounded-full bg-blue-400/20 blur-3xl"
                    initial={{ 
                        x: Math.random() * 100 - 50 + "%", 
                        y: Math.random() * 100 - 50 + "%", 
                        scale: 0.5,
                        opacity: 0.3 
                    }}
                    animate={{ 
                        y: [null, Math.random() * -100 + "%"],
                        scale: [0.5, 1, 0.5],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                        duration: 15 + Math.random() * 10, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatType: "reverse"
                    }}
                    style={{
                        width: `${Math.random() * 400 + 200}px`,
                        height: `${Math.random() * 400 + 200}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    />
                ))}
                </div>

                {/* Main Content Container */}
                <div className="relative z-10 max-w-5xl w-full mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
                
                {/* Badge */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-cyan-900/20 hover:bg-cyan-500/20 transition-colors cursor-default">
                    Want to work with us?
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm"
                >
                    Digitally Transform & <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-white">
                    Grow Your Business
                    </span>
                </motion.h1>

                {/* Supporting Paragraph */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl text-blue-100/80 max-w-2xl leading-relaxed font-medium mb-10"
                >
                    Digitally transforming your business is key to staying competitive. 
                    We help you leverage the latest technologies to streamline operations, 
                    enhance customer experiences, and boost growth.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                >
                    {/* Primary CTA */}
                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all overflow-hidden"
                    >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Contact us
                        <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out transform skew-x-12" />
                    </motion.button>

                    {/* Secondary CTA */}
                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                    >
                    <Phone className="w-5 h-5" />
                    Call now
                    </motion.button>
                </motion.div>

                </div>
                
                {/* Bottom fade for smooth transition to next section if added later */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent z-10" />
            </div>
        </>
    )
}