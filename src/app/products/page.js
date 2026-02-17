"use client";
import { ProductExperience } from '@/components/sections/ProductExperience';
import { ProductFeature } from '@/components/sections/ProductFeature';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Products() {
    return(
        <>
           {/* Product Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
                {/* Light gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50 to-teal-50" />
                
                {/* Abstract tech shapes */}
                <motion.div
                    animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    }}
                    transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                    }}
                    className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                    }}
                    transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                    }}
                    className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-3xl"
                />

                {/* Grid overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    }}
                />

                <div className="relative max-w-7xl mx-auto text-center z-10">
                    {/* Headline */}
                    <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                    >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                        Powerful Digital Products
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-[#14b8a6] via-[#06b6d4] to-[#22c55e] bg-clip-text text-transparent">
                        Built to Scale Your Business
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Enterprise-grade software solutions designed for modern teams. 
                        Streamline operations, accelerate growth, and transform your digital infrastructure.
                    </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-20"
                    >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-8 py-4 bg-gradient-to-r from-[#06b6d4] to-[#14b8a6] text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2"
                    >
                        Explore Products
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-[#06b6d4] hover:text-slate-900 transition-all duration-300 flex items-center gap-2"
                    >
                        <Play className="w-5 h-5" />
                        Request Demo
                    </motion.button>
                    </motion.div>

                    {/* Floating product mockups */}
                    <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative max-w-5xl mx-auto"
                    >
                    {/* Main dashboard mockup */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#06b6d4]/20 to-[#14b8a6]/20 rounded-3xl blur-2xl" />
                        <div className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl">
                        {/* Mock dashboard header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="text-xs text-slate-400 font-mono">Auxinz Dashboard</div>
                        </div>
                        
                        {/* Mock content */}
                        <div className="space-y-4">
                            <div className="h-12 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="h-32 bg-gradient-to-br from-[#06b6d4]/10 to-[#14b8a6]/10 border border-[#06b6d4]/20 rounded-lg p-4">
                                <div className="h-4 w-24 bg-[#06b6d4]/30 rounded mb-2" />
                                <div className="h-8 w-16 bg-gradient-to-r from-[#06b6d4] to-[#14b8a6] rounded mt-auto" />
                            </div>
                            <div className="h-32 bg-gradient-to-br from-[#14b8a6]/10 to-[#22c55e]/10 border border-[#14b8a6]/20 rounded-lg p-4">
                                <div className="h-4 w-24 bg-[#14b8a6]/30 rounded mb-2" />
                                <div className="h-8 w-16 bg-gradient-to-r from-[#14b8a6] to-[#22c55e] rounded mt-auto" />
                            </div>
                            <div className="h-32 bg-gradient-to-br from-[#22c55e]/10 to-[#06b6d4]/10 border border-[#22c55e]/20 rounded-lg p-4">
                                <div className="h-4 w-24 bg-[#22c55e]/30 rounded mb-2" />
                                <div className="h-8 w-16 bg-gradient-to-r from-[#22c55e] to-[#06b6d4] rounded mt-auto" />
                            </div>
                            </div>
                            <div className="h-48 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg p-4">
                            <div className="flex items-end justify-between h-full gap-2">
                                {[40, 70, 50, 80, 60, 90, 75].map((height, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-gradient-to-t from-[#06b6d4] to-[#14b8a6] rounded-t"
                                    style={{ height: `${height}%` }}
                                />
                                ))}
                            </div>
                            </div>
                        </div>
                        </div>
                    </motion.div>

                    {/* Floating accent cards */}
                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -left-12 top-20 hidden lg:block"
                    >
                        <div className="w-48 h-32 bg-white border border-slate-200 rounded-xl p-4 shadow-xl">
                        <div className="h-4 w-20 bg-[#06b6d4]/30 rounded mb-3" />
                        <div className="h-8 w-12 bg-gradient-to-r from-[#06b6d4] to-[#14b8a6] rounded" />
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 15, 0], rotate: [2, -2, 2] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-12 bottom-20 hidden lg:block"
                    >
                        <div className="w-48 h-32 bg-white border border-slate-200 rounded-xl p-4 shadow-xl">
                        <div className="h-4 w-24 bg-[#22c55e]/30 rounded mb-3" />
                        <div className="h-8 w-12 bg-gradient-to-r from-[#14b8a6] to-[#22c55e] rounded" />
                        </div>
                    </motion.div>
                    </motion.div>
                </div>
            </section> 

            {/* Product Features Section */}
            <ProductFeature />

            {/* Product Experience Section */}
            <ProductExperience />
        </>
    );
}
